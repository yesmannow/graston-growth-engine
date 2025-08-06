import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MarketingResource, Tier } from "@/types";
import { Download, Lock, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";

interface ResourceCardProps {
  resource: MarketingResource;
  userTier: Tier;
  providerId: string;
  status?: 'read' | 'downloaded';
  onStatusChange: (resourceId: string, status?: 'read' | 'downloaded') => void;
}

const tierLevel: Record<Tier, number> = {
  Free: 0,
  Preferred: 1,
  Premier: 2,
};

const ResourceCard = ({ resource, userTier, providerId, status, onStatusChange }: ResourceCardProps) => {
  const hasAccess = tierLevel[userTier] >= tierLevel[resource.tier];
  const { toast } = useToast();

  const handleDownload = async () => {
    // Optimistically update the UI
    onStatusChange(resource.id, 'downloaded');

    // Then, update the database
    const { error } = await supabase
      .from('provider_resources')
      .upsert(
        {
          provider_id: providerId,
          resource_id: resource.id,
          status: 'downloaded',
          last_accessed: new Date().toISOString(),
        },
        { onConflict: 'provider_id, resource_id' }
      );

    if (error) {
      console.error("Error updating resource status:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "Could not save your progress. Please try again.",
      });
      // Revert optimistic update on error
      onStatusChange(resource.id, status);
    } else {
      // Trigger the file download
      window.open(resource.filePath, '_blank');
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0 relative">
        <img src={resource.image} alt={resource.title} className="rounded-t-lg object-cover aspect-video" />
        {status === 'downloaded' && (
            <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                <CheckCircle className="h-4 w-4" />
            </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{resource.category}</Badge>
        <h3 className="font-semibold text-lg">{resource.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {hasAccess ? (
            status === 'downloaded' ? (
                <Button disabled className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Downloaded
                </Button>
            ) : (
                <Button onClick={handleDownload} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </Button>
            )
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                Upgrade to {resource.tier}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This resource is available for {resource.tier} and Premier members.</p>
            </TooltipContent>
          </Tooltip>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;