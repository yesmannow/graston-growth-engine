import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import Index from '@/pages/Index';
import EnhancedDirectory from '@/pages/EnhancedDirectory';
import Directory from '@/pages/Directory';
import Provider from '@/pages/Provider';
import PublicProviderProfilePage from '@/pages/PublicProviderProfilePage';
import ComparePage from '@/pages/ComparePage';
import UpdateProfile from '@/pages/UpdateProfile';
import Admin from '@/pages/Admin';
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
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/directory" element={<EnhancedDirectory />} />
          <Route path="/directory-old" element={<Directory />} />
          <Route path="/directory/provider/:id" element={<Provider />} />
          <Route path="/provider/:id" element={<PublicProviderProfilePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/marketing-toolkit" element={<MarketingToolkit />} />
          <Route path="/support" element={<Support />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/badges" element={<BadgeShowcase />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;