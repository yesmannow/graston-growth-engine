import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FullProviderProfile } from '@/types/index';
import { mockProviderData } from '@/lib/mockData';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Star, Users, Award, Video, Image as ImageIcon } from 'lucide-react';
import { mapMockToFullProfile } from '@/lib/dataMapping';

const PublicProviderProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<FullProviderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      const rawProviderData = mockProviderData.find((p: any) => p.id.toString() === id);
      const foundProvider = rawProviderData ? mapMockToFullProfile(rawProviderData) : null;
      setProvider(foundProvider);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  if (!provider) {
    return <div className="flex justify-center items-center h-screen">Provider not found.</div>;
  }

  const tierColorMap: { [key: string]: string } = {
    Premier: "bg-purple-100 text-purple-800 border-purple-300",
    Preferred: "bg-blue-100 text-blue-800 border-blue-300",
    Free: "bg-gray-100 text-gray-800 border-gray-300",
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <Card className="overflow-hidden mb-8 shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32" />
            <div className="p-6 bg-white">
              <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16">
                <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                  <AvatarImage src={provider.profileImage} alt={provider.name} />
                  <AvatarFallback className="text-4xl">{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-gray-800">{provider.name}</h1>
                  <p className="text-md text-gray-600">{provider.specialty}</p>
                  <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge variant="outline" className={tierColorMap[provider.tier]}>{provider.tier} Member</Badge>
                    <Badge variant="secondary">{provider.grastonLevel}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About Me</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">{provider.bio}</p>
                </CardContent>
              </Card>

              {/* Media for Premier */}
              {provider.tier === 'Premier' && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center"><Video className="mr-2 h-5 w-5 text-purple-500" /> Introduction Video</h2>
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe 
                        className="w-full h-full rounded-lg" 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Contact Info */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center"><Phone className="h-5 w-5 mr-3 text-gray-500" /> {provider.phone}</li>
                    <li className="flex items-center"><Mail className="h-5 w-5 mr-3 text-gray-500" /> {provider.email}</li>
                    <li className="flex items-start"><MapPin className="h-5 w-5 mr-3 mt-1 text-gray-500" /> <span>{provider.clinicAddress}</span></li>
                  </ul>
                </CardContent>
              </Card>

              {/* Key Info */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">At a Glance</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center"><Star className="h-5 w-5 mr-3 text-yellow-500" /> {provider.rating} Stars ({provider.reviews} reviews)</li>
                    <li className="flex items-center"><Users className="h-5 w-5 mr-3 text-blue-500" /> Specializes in {provider.specialty}</li>
                    <li className="flex items-center"><Award className="h-5 w-5 mr-3 text-green-500" /> {provider.experience} of experience</li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Gallery for Premier */}
              {provider.tier === 'Premier' && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center"><ImageIcon className="mr-2 h-5 w-5 text-purple-500" /> Clinic Gallery</h2>
                    <div className="grid grid-cols-2 gap-2">
                      <img src="https://placehold.co/600x400/a5b4fc/ffffff?text=Lobby" alt="Clinic" className="rounded-md" />
                      <img src="https://placehold.co/600x400/818cf8/ffffff?text=Treatment" alt="Clinic" className="rounded-md" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PublicProviderProfilePage;