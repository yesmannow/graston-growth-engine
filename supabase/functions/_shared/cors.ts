// This file configures Cross-Origin Resource Sharing (CORS) for the function.
// It allows your web app to securely call the function.
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};