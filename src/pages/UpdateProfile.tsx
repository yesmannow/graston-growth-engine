"use client";

import { useParams, useNavigate } from "react-router-dom";
import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import { FullProviderProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { mockProviders } from "@/lib/mockData";
import { useEffect, useState } from "react";

const UpdateProfilePage = () => {
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

  const handleUpdate = (updatedProvider: FullProviderProfile) => {
    // In a real app, this would trigger a refetch.
    // For mock data, we can just update the local state if we were managing it here.
    console.log("Profile updated (mock):", updatedProvider);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-6">
          <div className="mb-6">
            <Skeleton className="h-10 w-32 mb-4" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/provider/${provider.id}`)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
        </div>
        
        <UpdateProfileForm 
          providerId={provider.id} 
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default UpdateProfilePage;