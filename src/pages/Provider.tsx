"use client";

import { useParams } from "react-router-dom";
import ProviderDashboard from "@/components/dashboards/ProviderDashboard";
import { FullProviderProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { mockProviders } from "@/lib/mockData";
import { useEffect, useState } from "react";

const ProviderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<FullProviderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const foundProvider = mockProviders.find(p => p.id === id) || null;
    setProvider(foundProvider);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Provider not found</h1>
        <p className="text-muted-foreground mb-4">The provider you are looking for does not exist or an error occurred.</p>
        <Button onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin
        </Button>
      </div>
    );
  }

  return <ProviderDashboard provider={provider} />;
};

export default ProviderPage;