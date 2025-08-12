import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProviderProfile } from '@/types/provider-profile';

interface GalleryTabProps {
  provider: ProviderProfile;
}

const GalleryTab = ({ provider }: GalleryTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinic Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        {provider.clinic_gallery && provider.clinic_gallery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {provider.clinic_gallery.map((image) => (
              <div key={image.id} className="group cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {image.caption && (
                  <p className="text-sm text-gray-600 mt-2">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No gallery images available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default GalleryTab;