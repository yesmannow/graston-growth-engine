import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import StaffDashboard from "@/components/dashboards/StaffDashboard";
import MarketingToolkitPage from "./pages/MarketingToolkit";
import Directory from "./pages/Directory";
import PublicProviderProfilePage from "./pages/PublicProviderProfilePage";
import Onboarding from "./pages/Onboarding";
import Reports from "./pages/Reports";
import Support from "./pages/Support";
import AnalyticsTracker from "./components/AnalyticsTracker";
import Layout from "./components/layout/Layout";
import AdminPage from "./pages/Admin";
import ProviderPage from "./pages/Provider";
import UpdateProfile from "./pages/UpdateProfile";
import ComparePage from "./pages/ComparePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Directory />} /> {/* Directory now the home page */}
            <Route path="/directory" element={<Directory />} />
            <Route path="/directory/provider/:id" element={<PublicProviderProfilePage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/support" element={<Support />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/provider/:id" element={<ProviderPage />} />
            <Route path="/provider/:id/update" element={<UpdateProfile />} />
            <Route path="/provider/:id/toolkit" element={<MarketingToolkitPage />} />
            <Route path="/compare" element={<ComparePage />} />
            {/* Add routes for new pages if needed, e.g. /about, /faq */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;