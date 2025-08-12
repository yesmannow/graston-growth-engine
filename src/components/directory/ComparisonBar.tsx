import { FullProviderProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface ComparisonBarProps {
  providers: FullProviderProfile[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

const ComparisonBar = ({ providers, onClear, onRemove }: ComparisonBarProps) => {
  const navigate = useNavigate();

  if (providers.length === 0) return null;

  const handleCompare = () => {
    const ids = providers.map(p => p.id).join(',');
    navigate(`/compare?ids=${ids}`);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-2xl z-50 px-4">
      <Card className="shadow-2xl">
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pr-2">
            {providers.map(p => (
              <div key={p.id} className="relative shrink-0" title={p.name}>
                <Avatar>
                  <AvatarImage src={p.profile_image || undefined} alt={p.name} />
                  <AvatarFallback>{p.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <button onClick={() => onRemove(p.id)} className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground rounded-full p-0.5 hover:bg-destructive hover:text-destructive-foreground transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button onClick={handleCompare} disabled={providers.length < 2}>
              Compare ({providers.length})
            </Button>
            <Button variant="ghost" size="icon" onClick={onClear}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComparisonBar;