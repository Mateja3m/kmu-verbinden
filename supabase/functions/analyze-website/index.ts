
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { anthropic } from "https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@0.4.3/+esm";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CLAUDE_API_KEY = Deno.env.get('CLAUDE_API_KEY')!;
const client = new anthropic({ apiKey: CLAUDE_API_KEY });

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

    // Fetch website content
    const response = await fetch(url);
    const html = await response.text();

    // Analyze with Claude
    const message = await client.messages.create({
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
    });

    // Parse and validate Claude's response
    const analysis = JSON.parse(message.content[0].text);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-website function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
