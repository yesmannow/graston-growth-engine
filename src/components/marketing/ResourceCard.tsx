import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { MarketingResource } from '@/data/marketingResources';

interface ResourceCardProps {
  resource: MarketingResource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgb(0 0 0 / 0.1)" }}
      className="h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden">
        <div className="aspect-video bg-muted flex items-center justify-center p-4 overflow-hidden">
          <img 
            src={resource.thumbnailUrl} 
            alt={resource.title} 
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4 flex-grow">
          <Badge variant="secondary" className="mb-2">{resource.category}</Badge>
          <h3 className="font-semibold text-md leading-snug">{resource.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full">
            <a href={resource.fileUrl} download>
              <Download className="h-4 w-4 mr-2" />
              Download ({resource.type})
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ResourceCard;