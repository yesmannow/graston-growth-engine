import { FullProviderProfile } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Verified, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  provider: FullProviderProfile;
}

const ProfileHeader = ({ provider }: ProfileHeaderProps) => {
  const tierColor = {
    Premier: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    Preferred: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    Free: 'bg-gray-400',
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Banner Image */}
      <div className={`h-48 w-full ${tierColor[provider.tier]} relative`}>
        {/* You can add a banner image here if available */}
      </div>

      {/* Profile Info Section */}
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-20">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={provider.profileImage} alt={provider.name} />
              <AvatarFallback className="text-3xl">
                {provider.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Name and Details */}
          <div className="flex-1 pt-4 sm:pb-4 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
              {provider.name}
              <Verified className="h-6 w-6 text-blue-500" />
            </h1>
            <p className="text-md text-muted-foreground mt-1">{provider.specialty}</p>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {provider.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" /> {provider.rating?.toFixed(1)} ({provider.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pb-4 flex gap-2">
            <Button>
              Book Appointment
            </Button>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;