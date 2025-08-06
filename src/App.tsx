import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import AdminPage from "./pages/Admin";
import ProviderPage from "./pages/Provider";
import UpdateProfile from "./pages/UpdateProfile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { supabase } from "./lib/supabaseClient";
import { useEffect, useState } from "react";
import AnalyticsTracker from "./components/AnalyticsTracker";
import MarketingToolkitPage from "./pages/MarketingToolkit";
import Directory from "./pages/Directory";

const queryClient = new QueryClient();

// This component protects nested routes. It checks for a user session
// and redirects to the login page if one doesn't exist.
const ProtectedLayout = () => {
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
  }, [navigate]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading authentication...</div>;
  }

  if (!session) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to so we can send them there after login.
    navigate('/login', { replace: true });
    return null;
  }

  return <Outlet />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/provider/:id" element={<ProviderPage />} />
            <Route path="/provider/:id/update" element={<UpdateProfile />} />
            <Route path="/provider/:id/toolkit" element={<MarketingToolkitPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;