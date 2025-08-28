// @ts-expect-error: Deno-specific import, will work in Supabase Edge Functions
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { providerEmail, name, email, message } = await req.json()

    if (!providerEmail || !name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // In a real application, you would use an email sending service like Resend or SendGrid here.
    // This function is ready for that integration. For now, we'll simulate the action.
    console.log(`Simulating email send to: ${providerEmail}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Message: ${message}`);
    
    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})