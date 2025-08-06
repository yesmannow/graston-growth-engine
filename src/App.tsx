import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import AdminPage from "./pages/Admin";
import ProviderPage from "./pages/Provider";
import UpdateProfile from "./pages/UpdateProfile";
import NotFound from "./pages/NotFound";
import StaffDashboard from "./components/dashboards/StaffDashboard";
import ProviderDashboard from "./components/dashboards/ProviderDashboard";
import Login from "./pages/Login";
import { supabase } from "./lib/supabaseClient";
import { useEffect, useState } from "react";
import AnalyticsTracker from "./components/AnalyticsTracker";
import MarketingToolkitPage from "./pages/MarketingToolkit";
import Directory from "./pages/Directory";

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
    return <div>Loading authentication...</div>;
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
          <Route path="/" element={<Index />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/provider/:id" element={<ProviderPage />} />
          <Route path="/provider/:id/update" element={<UpdateProfile />} />
          <Route path="/provider/:id/toolkit" element={<MarketingToolkitPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;