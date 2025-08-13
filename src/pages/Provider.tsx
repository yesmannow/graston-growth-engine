import { useParams } from "react-router-dom";
import { FullProviderProfile } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { mockProviderData } from "@/lib/mockData";
import { useEffect, useState } from "react";
import { mapMockToFullProfile } from "@/lib/dataMapping";

const ProviderPage = () => {
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

  if (isLoading) {
    return <ProviderSkeleton />;
  }

  if (!provider) {
    return <div className="text-center py-16">Provider not found.</div>;
  }

  const tierColors: { [key: string]: string } = {
    Premier: 'bg-purple-600 text-white',
    Preferred: 'bg-blue-500 text-white',
    Free: 'bg-gray-200 text-gray-800',
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={provider.profileImage} />
                <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{provider.name}</h1>
                <p className="text-lg text-gray-600">{provider.specialty}</p>
                <div className="mt-2 flex items-center justify-center md:justify-start space-x-2">
                  <Badge className={tierColors[provider.tier]}>{provider.tier}</Badge>
                  <Badge variant="outline">{provider.grastonLevel}</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                {provider.tier !== 'Free' && <TabsTrigger value="specialties">Specialties</TabsTrigger>}
                {provider.tier !== 'Free' && <TabsTrigger value="reviews">Reviews</TabsTrigger>}
                {provider.tier === 'Premier' && <TabsTrigger value="media">Media</TabsTrigger>}
              </TabsList>
              <TabsContent value="about" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p>{provider.bio}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              {provider.tier !== 'Free' && (
                <TabsContent value="specialties" className="mt-4">
                  <Card>
                    <CardHeader><CardTitle>Conditions Treated</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {provider.services?.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
              {provider.tier !== 'Free' && (
                <TabsContent value="reviews" className="mt-4">
                  <Card>
                    <CardHeader><CardTitle>Testimonials</CardTitle></CardHeader>
                    <CardContent>
                      {/* This part needs real review data if available */}
                      <p className="italic">"A fantastic provider with excellent care."</p>
                      <p className="text-right text-sm font-semibold">- {"★".repeat(provider.rating || 5)}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
              {provider.tier === 'Premier' && (
                <TabsContent value="media" className="mt-4">
                  <Card className="mb-4">
                    <CardHeader><CardTitle>Intro Video</CardTitle></CardHeader>
                    <CardContent>
                      <iframe className="w-full aspect-video rounded-md" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Intro Video" allowFullScreen></iframe>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Photo Gallery</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <img src="https://placehold.co/600x400/a5b4fc/ffffff?text=Lobby" alt="Gallery" className="rounded-md" />
                      <img src="https://placehold.co/600x400/818cf8/ffffff?text=Treatment+Room" alt="Gallery" className="rounded-md" />
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
          <div>
            <Card>
              <CardHeader><CardTitle>Contact & Location</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2"><Phone className="h-4 w-4" /><span>{provider.phone}</span></div>
                <div className="flex items-center space-x-2"><Mail className="h-4 w-4" /><span>{provider.email}</span></div>
                <div className="flex items-center space-x-2"><MapPin className="h-4 w-4" /><span>{provider.clinicAddress}</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProviderSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-48" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  </div>
);

export default ProviderPage;