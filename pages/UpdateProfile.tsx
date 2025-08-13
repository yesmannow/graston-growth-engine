import { useParams } from "react-router-dom";
import { FullProviderProfile } from "@/types";
import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { mockProviderData } from "@/lib/mockData";
import { useEffect, useState } from "react";
import { mapMockToFullProfile } from "@/lib/dataMapping";

const UpdateProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<FullProviderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    const rawProviderData = mockProviderData.find((p: any) => p.id.toString() === id);
    const foundProvider = rawProviderData ? mapMockToFullProfile(rawProviderData) : null;
    setProvider(foundProvider);
    setIsLoading(false);
  }, [id]);

  const handleUpdate = (updatedProvider: FullProviderProfile) => {
    setProvider(updatedProvider);
    // Here you would typically make an API call to save the data
    console.log("Updated Provider Data:", updatedProvider);
  };

  if (isLoading) {
    return <UpdateProfileSkeleton />;
  }

  if (!provider || !id) {
    return <div className="text-center py-16">Provider not found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <UpdateProfileForm providerId={id} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

const UpdateProfileSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex-1 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default UpdateProfilePage;