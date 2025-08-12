import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import AdminLayout from '@/components/layout/AdminLayout';
import Index from '@/pages/Index';
import EnhancedDirectory from '@/pages/EnhancedDirectory';
import Directory from '@/pages/Directory';
import Provider from '@/pages/Provider';
import PublicProviderProfilePage from '@/pages/PublicProviderProfilePage';
import ComparePage from '@/pages/ComparePage';
import UpdateProfile from '@/pages/UpdateProfile';
import DashboardPage from '@/pages/admin/DashboardPage';
import ProvidersPage from '@/pages/admin/ProvidersPage';
import AiAssistantPage from '@/pages/admin/AiAssistantPage'; // New import
import AnalyticsPage from '@/pages/admin/AnalyticsPage'; // New import
import Reports from '@/pages/Reports';
import MarketingToolkit from '@/pages/MarketingToolkit';
import Support from '@/pages/Support';
import Onboarding from '@/pages/Onboarding';
import BadgeShowcase from '@/pages/BadgeShowcase';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="directory" element={<EnhancedDirectory />} />
          <Route path="directory-old" element={<Directory />} />
          <Route path="directory/provider/:id" element={<Provider />} />
          <Route path="provider/:id" element={<PublicProviderProfilePage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="reports" element={<Reports />} />
          <Route path="marketing-toolkit" element={<MarketingToolkit />} />
          <Route path="support" element={<Support />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="badges" element={<BadgeShowcase />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="providers" element={<ProvidersPage />} />
            <Route path="ai-assistant" element={<AiAssistantPage />} /> {/* New route */}
            <Route path="analytics" element={<AnalyticsPage />} /> {/* New route */}
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;