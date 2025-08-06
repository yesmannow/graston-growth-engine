"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import { mockProviders } from "@/lib/mockData";
import { FullProviderProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const UpdateProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<FullProviderProfile | null>(
    mockProviders.find(p => p.id === id) || null
  );

  if (!provider) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Provider not found</h1>
        <p className="text-muted-foreground mb-4">The provider you are looking for does not exist.</p>
        <Button onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin
        </Button>
      </div>
    );
  }

  const handleUpdate = (updatedProvider: FullProviderProfile) => {
    setProvider(updatedProvider);
    // In a real app, you would also update the provider in your data store/API
  };

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
          provider={provider} 
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default UpdateProfilePage;