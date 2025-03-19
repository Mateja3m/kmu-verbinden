
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CLAUDE_API_KEY = Deno.env.get('CLAUDE_API_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, industryId } = await req.json();

    if (!url) {
      throw new Error('URL ist erforderlich');
    }

    // Clean and normalize the URL
    let cleanUrl = url.trim(); // Remove any whitespace
    
    // Add https:// if missing
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    
    console.log(`Analysiere Website: ${cleanUrl}${industryId ? `, Branche: ${industryId}` : ''}`);

    // Fetch website content
    let html = '';
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout for slower sites
      
      const response = await fetch(cleanUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'de,en-US;q=0.7,en;q=0.3'
        },
        redirect: 'follow',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Fehler beim Abrufen der Website: ${response.status} ${response.statusText}`);
      }
      
      html = await response.text();
      console.log(`Website-Inhalt erfolgreich abgerufen (${html.length} Zeichen)`);
      
      if (html.length < 100) {
        throw new Error('Der abgerufene Inhalt ist zu kurz oder leer. Möglicherweise blockiert die Website Zugriffe.');
      }
      
      // Extract a smaller, more relevant part of the HTML for analysis
      // Focus on areas that might contain contact information
      let extractedHtml = html;
      
      // Prioritize important sections like header, footer, contact pages
      const importantSections = [
        // Contact section patterns
        /<section[^>]*contact[^>]*>[\s\S]*?<\/section>/i,
        /<div[^>]*contact[^>]*>[\s\S]*?<\/div>/i,
        /<div[^>]*kontakt[^>]*>[\s\S]*?<\/div>/i,
        // Footer usually contains contact info
        /<footer[\s\S]*?<\/footer>/i,
        // Header might contain phone numbers
        /<header[\s\S]*?<\/header>/i,
        // Look for contact info markup
        /<[^>]*itemtype="http:\/\/schema.org\/Organization"[\s\S]*?<\/[^>]*>/i,
        /<[^>]*class="[^"]*contact[^"]*"[\s\S]*?<\/[^>]*>/i,
        /<[^>]*class="[^"]*kontakt[^"]*"[\s\S]*?<\/[^>]*>/i,
        /<[^>]*id="[^"]*contact[^"]*"[\s\S]*?<\/[^>]*>/i,
        /<[^>]*id="[^"]*kontakt[^"]*"[\s\S]*?<\/[^>]*>/i,
      ];
      
      let priorityContent = '';
      for (const pattern of importantSections) {
        const matches = html.match(pattern);
        if (matches && matches.length > 0) {
          priorityContent += matches.join('\n') + '\n';
        }
      }
      
      // If we found important sections, use them, otherwise use the full HTML with a limit
      if (priorityContent.length > 500) {
        extractedHtml = priorityContent;
        console.log(`Extrahierte wichtige Sektionen für die Analyse (${extractedHtml.length} Zeichen)`);
      }
      
      // Limit HTML size to prevent large requests to Claude, but keep it generous
      // to ensure contact information is included
      if (extractedHtml.length > 50000) {
        extractedHtml = extractedHtml.substring(0, 50000);
        console.log("HTML-Inhalt auf 50.000 Zeichen gekürzt");
      }
      
      html = extractedHtml;
    } catch (fetchError) {
      console.error('Fehler beim Abrufen des Website-Inhalts:', fetchError);
      throw new Error(`Fehler beim Abrufen des Website-Inhalts: ${fetchError.message}`);
    }

    // Build the system prompt with industry context if provided
    let systemPrompt = `Du bist ein professioneller Website-Analyst. Analysiere den HTML-Code dieser Website und erstelle eine detaillierte Bewertung mit folgenden Punkten:
      1. Grundlegende Informationen (Firmenname, Kontaktdaten wenn vorhanden)
      2. Design-Bewertung (Layout, Farben, Responsivität)
      3. Inhaltliche Qualität
      4. Technische Aspekte
      5. Konkrete Verbesserungsvorschläge`;
    
    // Add industry-specific context if industryId is provided
    if (industryId) {
      console.log(`Füge branchenspezifischen Kontext für ${industryId} hinzu`);
      
      if (industryId === "zahnarzt" || industryId === "zahnaerzte") {
        systemPrompt += `\n\nWichtig: Diese Website gehört zu einer Zahnarztpraxis. 
        Berücksichtige bei deiner Analyse folgende branchenspezifische Aspekte:
        - Terminbuchungsmöglichkeiten für Patienten
        - Darstellung der angebotenen Behandlungen
        - Patienteninformationen und Beratungsangebote
        - Vertrauensbildende Elemente wie Qualifikationen, Zertifizierungen
        - Notfallkontaktmöglichkeiten
        - Erreichbarkeit und Anfahrtsinformationen`;
      } else if (industryId === "arzt" || industryId === "aerzte") {
        systemPrompt += `\n\nWichtig: Diese Website gehört zu einer Arztpraxis. 
        Berücksichtige bei deiner Analyse folgende branchenspezifische Aspekte:
        - Terminbuchungsmöglichkeiten für Patienten
        - Darstellung der Fachbereiche und Spezialisierungen
        - Patienteninformationen und Sprechzeiten
        - Vertrauensbildende Elemente wie Qualifikationen, Zertifizierungen
        - Notfallkontaktmöglichkeiten
        - Darstellung des Ärzteteams`;
      } else if (industryId === "anwalt" || industryId === "anwaelte") {
        systemPrompt += `\n\nWichtig: Diese Website gehört zu einer Anwaltskanzlei. 
        Berücksichtige bei deiner Analyse folgende branchenspezifische Aspekte:
        - Darstellung der Rechtsbereiche und Spezialisierungen
        - Erstberatungsmöglichkeiten
        - Vertrauensbildende Elemente wie Qualifikationen, Erfolge
        - Honorarinformationen
        - Darstellung des Anwaltsteams
        - Referenzen oder Fallbeispiele`;
      } else if (industryId === "restaurant") {
        systemPrompt += `\n\nWichtig: Diese Website gehört zu einem Restaurant. 
        Berücksichtige bei deiner Analyse folgende branchenspezifische Aspekte:
        - Menüdarstellung und -aktualität
        - Reservierungsmöglichkeiten
        - Aktuelle Öffnungszeiten
        - Informationen zu Veranstaltungen oder Specials
        - Bilder der Räumlichkeiten und Speisen
        - Online-Bestellmöglichkeiten`;
      } else if (industryId === "hotel") {
        systemPrompt += `\n\nWichtig: Diese Website gehört zu einem Hotel. 
        Berücksichtige bei deiner Analyse folgende branchenspezifische Aspekte:
        - Zimmerdarstellung und -buchungsmöglichkeiten
        - Preisinformationen
        - Darstellung der Einrichtungen und Angebote
        - Informationen zur Lage und Umgebung
        - Bewertungen und Gästefeedback
        - Spezielle Angebote oder Arrangements`;
      }
    }
    
    systemPrompt += `\n\nWICHTIG: Suche SEHR gründlich nach Kontaktinformationen wie Telefonnummer, E-Mail-Adresse, physische Adresse, Öffnungszeiten und Kontaktformular. 
    Die Kontaktdaten sind extrem wichtig für die Analyse!
    
    Durchsuche den gesamten Code nach:
    - Telefonnummern im Format +41, 0041, oder reguläre schweizer Formate
    - E-Mail-Adressen (suche nach @ Zeichen und üblichen Domains)
    - Physische Adressen (Straßennamen, PLZ, Städte in der Schweiz)
    - Öffnungszeiten und Geschäftszeiten
    - Schema.org Markup für Organisationen und Kontaktdaten
    - hCard oder vCard Informationen
    - Meta-Tags mit Kontaktinformationen
    - Elemente mit IDs oder Klassen wie "contact", "kontakt", "address", "footer"
    
    Achte besonders auf den Footer-Bereich, "Kontakt"-Seiten-Links, Schema.org-Markierungen, vCards oder strukturierte Daten.
    
    Formatiere die Antwort als JSON-Objekt mit diesen Eigenschaften:
    {
      "gesamtpunkte": Zahl (0-100),
      "firmeninfo": { 
        "name": String, 
        "telefon": String, 
        "email": String, 
        "adresse": String, 
        "oeffnungszeiten": String 
      },
      "design": { "punkte": Zahl, "feedback": String[] },
      "inhalt": { "punkte": Zahl, "feedback": String[] },
      "technik": { "punkte": Zahl, "feedback": String[] },
      "verbesserungen": String[]
    }
    
    Leer Felder bei firmeninfo mit "Nicht gefunden" ausfüllen - niemals ein Feld weglassen!
    
    SEHR WICHTIG: Gib NUR das JSON-Objekt zurück, ohne weitere Erklärungen oder Markdown-Formatierung.`;

    // Call Claude API with proper API version and format
    let retryCount = 0;
    const maxRetries = 2;
    
    while (retryCount <= maxRetries) {
      try {
        console.log(`Rufe Claude API auf (Versuch ${retryCount + 1})...`);
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: "claude-3-7-sonnet-20250219",
            max_tokens: 3000,
            messages: [{
              role: "user",
              content: `${systemPrompt}
              
              Zu analysierender HTML-Code:
              ${html}`
            }]
          })
        });

        if (!claudeResponse.ok) {
          const errorText = await claudeResponse.text();
          console.error('Claude API Fehlerantwort:', errorText);
          throw new Error(`Claude API Fehler: ${claudeResponse.status} ${claudeResponse.statusText}. Details: ${errorText}`);
        }

        const claudeData = await claudeResponse.json();
        console.log('Claude API Antwort erhalten:', JSON.stringify(claudeData).substring(0, 200) + '...');

        // Parse Claude's response - updated to match Claude 3.7 response format
        if (!claudeData.content || !Array.isArray(claudeData.content) || claudeData.content.length === 0) {
          console.error('Ungültiges Claude API Antwortformat:', JSON.stringify(claudeData));
          throw new Error('Ungültiges Claude API Antwortformat: content-Array fehlt');
        }
          
        const content = claudeData.content[0];
        if (!content || !content.text) {
          console.error('Ungültiges Claude API Antwortformat:', JSON.stringify(claudeData.content));
          throw new Error('Ungültiges Claude API Antwortformat: text in content fehlt');
        }
          
        const textContent = content.text;
        
        // Extract JSON from the response - improved to handle edge cases
        let jsonString = textContent;
        
        // If there's text before or after the JSON, extract just the JSON part
        const jsonStartIdx = textContent.indexOf('{');
        const jsonEndIdx = textContent.lastIndexOf('}');
        
        if (jsonStartIdx !== -1 && jsonEndIdx !== -1 && jsonEndIdx > jsonStartIdx) {
          jsonString = textContent.substring(jsonStartIdx, jsonEndIdx + 1);
        }
        
        console.log('Extrahiertes JSON:', jsonString.substring(0, 200) + '...');
          
        try {
          const analysis = JSON.parse(jsonString);
          console.log('Analyse-JSON erfolgreich geparst');
            
          // Validate required fields are present with fallback values
          if (!analysis.firmeninfo) analysis.firmeninfo = {};
          if (!analysis.firmeninfo.name) analysis.firmeninfo.name = "Nicht gefunden";
          if (!analysis.firmeninfo.telefon) analysis.firmeninfo.telefon = "Nicht gefunden";
          if (!analysis.firmeninfo.email) analysis.firmeninfo.email = "Nicht gefunden";
          if (!analysis.firmeninfo.adresse) analysis.firmeninfo.adresse = "Nicht gefunden";
          if (!analysis.firmeninfo.oeffnungszeiten) analysis.firmeninfo.oeffnungszeiten = "Nicht gefunden";
          
          return new Response(JSON.stringify(analysis), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (jsonError) {
          console.error('JSON-Parsing-Fehler:', jsonError, 'Antwort-JSON-String:', jsonString);
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`JSON-Parsing fehlgeschlagen, Versuch ${retryCount + 1} von ${maxRetries + 1}...`);
            continue;
          }
          throw new Error(`Fehler beim Parsen der Claude-Antwort als JSON: ${jsonError.message}`);
        }
      } catch (claudeError) {
        console.error('Fehler beim Aufruf der Claude API:', claudeError);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Claude API Fehler, Versuch ${retryCount + 1} von ${maxRetries + 1}...`);
          // Exponential backoff for retries
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
          continue;
        }
        throw new Error(`Claude API Fehler: ${claudeError.message}`);
      }
    }
    
    throw new Error("Maximale Anzahl an Versuchen überschritten");
  } catch (error) {
    console.error('Fehler in der analyze-website Funktion:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      errorType: error.name || 'Unbekannt',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
