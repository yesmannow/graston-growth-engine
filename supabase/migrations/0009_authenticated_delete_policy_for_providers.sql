CREATE POLICY "Auth delete providers" 
  ON public.providers 
  FOR DELETE TO authenticated USING (true);