import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Copy, Check } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import { FullProviderProfile } from "@/types";

interface KeywordGeneratorCardProps {
  provider: FullProviderProfile;
}

const KeywordGeneratorCard = ({ provider }: KeywordGeneratorCardProps) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI call
    
    // Mock results based on provider data
    const mockKeywords = [
      `best ${provider.specialty} in ${provider.location}`,
      `${provider.services?.[0] || 'treatment'} near me in ${provider.location.split(',')[0]}`,
      `top rated physical therapist ${provider.location}`,
      `Graston Technique for back pain in ${provider.location.split(',')[0]}`,
    ];
    setKeywords(mockKeywords);
    setIsGenerating(false);
  };

  const handleCopy = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    showSuccess("Keyword copied!");
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Local Keyword Generator</CardTitle>
        <CardDescription>Discover keywords to use in your profile bio and marketing content.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
          <Lightbulb className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating..." : "Generate Keyword Ideas"}
        </Button>

        {keywords.length > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-semibold">Suggested Keywords:</h4>
            <div className="flex flex-wrap gap-2">
              {keywords.map(kw => (
                <Badge key={kw} variant="secondary" className="p-2 flex items-center gap-2">
                  <span>{kw}</span>
                  <Button size="icon" variant="ghost" className="h-5 w-5" onClick={() => handleCopy(kw)}>
                    {copiedKeyword === kw ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeywordGeneratorCard;