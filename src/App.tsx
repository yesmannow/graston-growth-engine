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
import StaffDashboard from "@/components/dashboards/StaffDashboard";
import MarketingToolkitPage from "./pages/MarketingToolkit";
import Directory from "./pages/Directory";
import PublicProviderProfilePage from "./pages/PublicProviderProfilePage";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Reports from "./pages/Reports";
import Support from "./pages/Support";
import { supabase } from "./lib/supabaseClient";
import { useEffect, useState } from "react";
import AnalyticsTracker from "./components/AnalyticsTracker";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  if (!session) {
    navigate("/login");
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
          <Route path="/directory/provider/:id" element={<PublicProviderProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/support" element={<Support />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/provider/:id" element={<ProtectedRoute><ProviderPage /></ProtectedRoute>} />
          <Route path="/provider/:id/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path="/provider/:id/toolkit" element={<ProtectedRoute><MarketingToolkitPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;