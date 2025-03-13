
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
    const { url } = await req.json();

    if (!url) {
      throw new Error('URL is required');
    }

    // Clean and normalize the URL
    let cleanUrl = url.trim(); // Remove any whitespace
    
    // Add https:// if missing
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    
    console.log(`Analysiere Website: ${cleanUrl}`);

    // Fetch website content
    let html = '';
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(cleanUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
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
      
      // Limit HTML size to prevent large requests to Claude
      if (html.length > 30000) {
        html = html.substring(0, 30000);
        console.log("HTML-Inhalt auf 30.000 Zeichen gekürzt");
      }
    } catch (fetchError) {
      console.error('Fehler beim Abrufen des Website-Inhalts:', fetchError);
      throw new Error(`Fehler beim Abrufen des Website-Inhalts: ${fetchError.message}`);
    }

    // Call Claude API with proper API version and format
    try {
      console.log('Rufe Claude API mit korrekter Konfiguration auf...');
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: "claude-3-7-sonnet-20250219",
          max_tokens: 2000,
          messages: [{
            role: "user",
            content: `Du bist ein professioneller Website-Analyst. Analysiere den HTML-Code dieser Website und erstelle eine detaillierte Bewertung mit folgenden Punkten:
            1. Grundlegende Informationen (Firmenname, Kontaktdaten wenn vorhanden)
            2. Design-Bewertung (Layout, Farben, Responsivität)
            3. Inhaltliche Qualität
            4. Technische Aspekte
            5. Konkrete Verbesserungsvorschläge

            WICHTIG: Suche SEHR gründlich nach Kontaktinformationen wie Telefonnummer, E-Mail-Adresse, physische Adresse, Öffnungszeiten und Kontaktformular. 
            Achte besonders auf den Footer-Bereich, "Kontakt"-Seiten-Links, Schema.org-Markierungen, vCards oder strukturierte Daten.
            Die Kontaktdaten sind äußerst wichtig und müssen unbedingt gefunden werden.
            
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
      
      // Extract JSON from the response
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('Vollständige Claude-Antwort:', textContent);
        throw new Error('Konnte kein JSON in der Claude-Antwort finden');
      }
        
      const jsonString = jsonMatch[0];
      console.log('Extrahiertes JSON:', jsonString.substring(0, 200) + '...');
        
      try {
        const analysis = JSON.parse(jsonString);
        console.log('Analyse-JSON erfolgreich geparst');
          
        return new Response(JSON.stringify(analysis), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (jsonError) {
        console.error('JSON-Parsing-Fehler:', jsonError, 'Antwort-JSON-String:', jsonString);
        throw new Error(`Fehler beim Parsen der Claude-Antwort als JSON: ${jsonError.message}`);
      }
    } catch (claudeError) {
      console.error('Fehler beim Aufruf der Claude API:', claudeError);
      throw new Error(`Claude API Fehler: ${claudeError.message}`);
    }
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
