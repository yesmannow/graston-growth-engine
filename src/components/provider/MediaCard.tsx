import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import { MediaItem } from '@/types/index';

interface MediaCardProps {
  media?: MediaItem[];
}

const MediaCard = ({ media }: MediaCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Media Gallery
        </CardTitle>
      </CardHeader>
      <CardContent>
        {media && media.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {media.map((item, index) => (
              <motion.div
                key={index}
                className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src={item.url} alt={`Gallery item ${index + 1}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No media has been uploaded yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaCard;