import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Map } from "lucide-react";

const GeographicHeatmap = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Heatmap</CardTitle>
        <CardDescription>
          Patient search density and profile views by region.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] bg-muted rounded-md flex items-center justify-center">
            <div className="text-center text-muted-foreground">
                <Map className="mx-auto h-12 w-12 mb-2" />
                <p>Interactive Map Placeholder</p>
                <p className="text-xs">Integration with a map library (e.g., Google Maps, Mapbox) is required.</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeographicHeatmap;