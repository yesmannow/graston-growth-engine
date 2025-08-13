import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import ProviderDetail from "@/pages/ProviderDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="providers/:providerId" element={<ProviderDetail />} />
          {/* ... other existing routes ... */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;