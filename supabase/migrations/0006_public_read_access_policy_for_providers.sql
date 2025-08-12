CREATE POLICY "Public read providers" 
  ON public.providers 
  FOR SELECT USING (true);