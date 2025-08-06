import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StaffDashboard from "./components/dashboards/StaffDashboard"; // Import StaffDashboard
import ProviderDashboard from "./components/dashboards/ProviderDashboard"; // Import ProviderDashboard
import Login from "./pages/Login"; // Import the new Login component
import { supabase } from "./lib/supabaseClient"; // Import supabase client
import { useEffect, useState } from "react"; // Import useState and useEffect
import AnalyticsTracker from "./components/AnalyticsTracker";

const queryClient = new QueryClient();

// A simple component to protect routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner component
  }

  if (!session) {
    navigate('/login');
    return null;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Add login route */}
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>} /> {/* Protect admin route */}
          <Route path="/provider" element={<ProtectedRoute><ProviderDashboard /></ProtectedRoute>} /> {/* Protect provider route */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;