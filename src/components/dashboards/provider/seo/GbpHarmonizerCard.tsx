import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, AlertTriangle, RefreshCw } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface Inconsistency {
  field: string;
  directoryValue: string;
  gbpValue: string;
}

const GbpHarmonizerCard = () => {
  const [gbpUrl, setGbpUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<Inconsistency[] | null>(null);

  const handleScan = async () => {
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    // Mock results
    setResults([
      { field: "Phone Number", directoryValue: "(555) 123-4567", gbpValue: "(555) 123-4568" },
      { field: "Address", directoryValue: "123 Main St", gbpValue: "123 Main Street" },
    ]);
    setIsScanning(false);
  };

  const handleHarmonize = (field: string) => {
    setResults(prev => prev ? prev.filter(item => item.field !== field) : null);
    showSuccess(`${field} has been updated on your directory profile.`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Business Profile Harmonizer</CardTitle>
        <CardDescription>Ensure your core business info is consistent for better local SEO.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            placeholder="Enter your Google Business Profile URL..."
            value={gbpUrl}
            onChange={(e) => setGbpUrl(e.target.value)}
          />
        </div>
        <Button onClick={handleScan} disabled={!gbpUrl || isScanning} className="w-full">
          {isScanning ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : null}
          {isScanning ? "Scanning..." : "Scan for Inconsistencies"}
        </Button>

        {results && (
          <div className="space-y-4 pt-4 border-t">
            {results.length === 0 ? (
              <Alert variant="default" className="bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">All Clear!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your directory profile and Google Business Profile are perfectly in sync.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-3">
                <h4 className="font-semibold">Inconsistencies Found:</h4>
                {results.map(item => (
                  <Alert key={item.field} variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>{item.field}</AlertTitle>
                    <AlertDescription>
                      <div className="text-xs space-y-1">
                        <p><strong>Directory:</strong> {item.directoryValue}</p>
                        <p><strong>Google:</strong> {item.gbpValue}</p>
                      </div>
                      <Button size="sm" className="mt-2" onClick={() => handleHarmonize(item.field)}>
                        Update Directory Profile
                      </Button>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GbpHarmonizerCard;