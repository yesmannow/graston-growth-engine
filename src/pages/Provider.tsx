"use client";

import { useParams } from "react-router-dom";
// import ProviderDashboard from "@/components/dashboards/ProviderDashboard";
// import { mockProviders } from "@/lib/mockData";

const ProviderPage = () => {
  const { id } = useParams<{ id: string }>();
  // const provider = mockProviders.find((p) => p.id === id);

  // if (!provider) {
  //   return (
  //     <div className="container mx-auto p-8 text-center">
  //       <h1 className="text-2xl font-bold">Provider not found</h1>
  //       <p>The provider you are looking for does not exist.</p>
  //     </div>
  //   );
  // }

  // return <ProviderDashboard provider={provider} />;
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold">Provider Page for ID: {id}</h1>
    </div>
  );
};

export default ProviderPage;