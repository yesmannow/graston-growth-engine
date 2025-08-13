import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { reputationTools } from "@/data/marketingData";
import { Copy, Mail, MessageSquare } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const ReputationManager = () => {
  const [method, setMethod] = useState('email');
  const [reviewSite, setReviewSite] = useState('google');
  const [reviewLink, setReviewLink] = useState('');
  const [generatedTemplate, setGeneratedTemplate] = useState('');

  const generateTemplate = () => {
    if (!reviewLink) return;
    const siteName = reputationTools.reviewSites.find(s => s.value === reviewSite)?.label || 'our page';
    if (method === 'email') {
      setGeneratedTemplate(`Subject: How was your visit?

Hi [Patient Name],

Thank you for choosing us for your care. We value your feedback and would love it if you could take a moment to share your experience on ${siteName}.

Your review helps others in the community find trusted care.

Click here to leave a review:
${reviewLink}

Thank you,
[Your Name]`);
    } else {
      setGeneratedTemplate(`Hi [Patient Name], thanks for visiting us! We'd appreciate it if you could share your experience on ${siteName}. Click here to leave a review: ${reviewLink}`);
    }
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(generatedTemplate);
    showSuccess("Template copied to clipboard!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reputation Management Suite</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Review Site</Label>
            <Select value={reviewSite} onValueChange={setReviewSite}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {reputationTools.reviewSites.map(site => <SelectItem key={site.value} value={site.value}>{site.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Direct Review Link</Label>
            <Input value={reviewLink} onChange={e => setReviewLink(e.target.value)} placeholder="https://g.page/r/..." />
          </div>
          <div className="space-y-2">
            <Label>Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {reputationTools.communicationMethods.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={generateTemplate} disabled={!reviewLink} className="w-full">
          {method === 'email' ? <Mail className="h-4 w-4 mr-2" /> : <MessageSquare className="h-4 w-4 mr-2" />}
          Generate Request Template
        </Button>
        {generatedTemplate && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Generated Template</Label>
              <Button variant="ghost" size="sm" onClick={copyTemplate}>
                <Copy className="h-4 w-4 mr-2" /> Copy
              </Button>
            </div>
            <Textarea value={generatedTemplate} readOnly rows={8} className="font-mono text-sm" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReputationManager;