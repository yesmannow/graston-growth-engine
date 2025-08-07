@@
-  const specialties = [...new Set(mockProviders.map(p => p.specialty).filter(Boolean))];
+  const specialties = [...new Set(mockProviders.map(p => p.specialty).filter(Boolean))] as string[];