import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

// These environment variables must be set in your Supabase project settings
const FLUENTCRM_API_URL = Deno.env.get('FLUENTCRM_API_URL')
const FLUENTCRM_API_KEY = Deno.env.get('FLUENTCRM_API_KEY')

serve(async (req: Request) => { // Added type annotation for 'req'
  // This is needed for CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!FLUENTCRM_API_URL || !FLUENTCRM_API_KEY) {
      throw new Error('FluentCRM API URL or Key not set in your Supabase project environment variables.')
    }

    // Fetch the 5 most recent contacts from FluentCRM.
    // Note: This assumes the API key is a Bearer token. This might need adjustment based on FluentCRM's specific authentication method.
    const response = await fetch(`${FLUENTCRM_API_URL}/contacts?sort_by=created_at&sort_order=desc&per_page=5`, {
      headers: {
        'Authorization': `Bearer ${FLUENTCRM_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`FluentCRM API error: ${response.status} ${response.statusText} - ${errorBody}`)
    }

    const leads = await response.json()

    return new Response(JSON.stringify({ leads }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: unknown) { // Asserted error type to unknown
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), { // Safely access error.message
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})