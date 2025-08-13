import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Reports = () => {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Access key insights from your directory performance and member
            engagement.
          </p>
          <Button asChild>
            <a
              href="/docs/Provider-Directory-Key-Insights-from-Your-Analytics.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Analytics Report
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;