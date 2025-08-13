import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServicesCardProps {
  services?: string[];
}

const ServicesCard = ({ services }: ServicesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Services Offered</CardTitle>
      </CardHeader>
      <CardContent>
        {services && services.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {services.map((service, index) => (
              <Badge key={index} variant="secondary">{service}</Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No services listed.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ServicesCard;