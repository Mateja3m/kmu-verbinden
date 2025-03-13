
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

    console.log(`Analyzing website: ${url}`);

    // Fetch website content
    let html = '';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch website: ${response.status} ${response.statusText}`);
      }
      html = await response.text();
      console.log(`Successfully fetched website content (${html.length} characters)`);
    } catch (fetchError) {
      console.error('Error fetching website content:', fetchError);
      throw new Error(`Failed to fetch website content: ${fetchError.message}`);
    }

    // Call Claude API directly
    try {
      console.log('Calling Claude API...');
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: "claude-3-sonnet-20240229",
          max_tokens: 2000,
          messages: [{
            role: "user",
            content: `You are a professional website analyst. Analyze this website's HTML and provide a detailed assessment including:
            1. Basic information (company name, contact details if found)
            2. Design evaluation (layout, colors, responsiveness)
            3. Content quality
            4. Technical aspects
            5. Specific improvement suggestions
            
            Format the response as a JSON object with these properties:
            {
              "score": number (0-100),
              "companyInfo": { "name": string, "contact": string, "address": string },
              "design": { "score": number, "feedback": string[] },
              "content": { "score": number, "feedback": string[] },
              "technical": { "score": number, "feedback": string[] },
              "improvements": string[]
            }
            
            HTML to analyze:
            ${html}`
          }]
        })
      });

      if (!claudeResponse.ok) {
        const errorText = await claudeResponse.text();
        console.error('Claude API error:', errorText);
        throw new Error(`Claude API error: ${claudeResponse.status} ${claudeResponse.statusText}`);
      }

      const claudeData = await claudeResponse.json();
      console.log('Claude API response received:', claudeData);

      // Parse Claude's response which should be JSON
      try {
        const textContent = claudeData.content[0].text;
        const jsonStart = textContent.indexOf('{');
        const jsonEnd = textContent.lastIndexOf('}') + 1;
        
        if (jsonStart === -1 || jsonEnd === 0) {
          throw new Error('Could not find JSON in Claude response');
        }
        
        const jsonString = textContent.substring(jsonStart, jsonEnd);
        const analysis = JSON.parse(jsonString);
        
        console.log('Successfully parsed analysis JSON');
        
        return new Response(JSON.stringify(analysis), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error('Error parsing Claude response:', parseError);
        throw new Error(`Failed to parse Claude response: ${parseError.message}`);
      }
    } catch (claudeError) {
      console.error('Error calling Claude API:', claudeError);
      throw new Error(`Claude API error: ${claudeError.message}`);
    }
  } catch (error) {
    console.error('Error in analyze-website function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
