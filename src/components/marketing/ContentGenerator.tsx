import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { Wand2, Copy, RefreshCw, CheckCircle } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import { contentGeneratorOptions } from "@/data/marketingData";

const ContentGenerator = () => {
  const [contentType, setContentType] = useState("");
  const [theme, setTheme] = useState("");
  const [tone, setTone] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    if (!contentType || !theme || !tone) return;
    
    setIsGenerating(true);
    setGeneratedContent("");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const topic = customTopic || theme.replace(/-/g, ' ');
    const mockContent = `Here is your AI-generated ${contentType} about "${topic}" with a ${tone} tone. This content is optimized for engagement and tailored to your practice's needs. Remember to add your clinic's specific details before posting!`;

    setGeneratedContent(mockContent);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    showSuccess("Content copied to clipboard!");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-purple-500" />
          AI Content Generator
        </CardTitle>
        <CardDescription>Generate compelling marketing content powered by AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Content Type</Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                {contentGeneratorOptions.types.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger><SelectValue placeholder="Select theme" /></SelectTrigger>
              <SelectContent>
                {contentGeneratorOptions.themes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tone of Voice</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue placeholder="Select tone" /></SelectTrigger>
              <SelectContent>
                {contentGeneratorOptions.tones.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Custom Topic (Optional)</Label>
            <Input value={customTopic} onChange={e => setCustomTopic(e.target.value)} placeholder="e.g., Sports Injuries" />
          </div>
        </div>

        <Button onClick={handleGenerate} disabled={!contentType || !theme || !tone || isGenerating} className="w-full">
          {isGenerating ? (
            <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
          ) : (
            <><Wand2 className="mr-2 h-4 w-4" /> Generate Content</>
          )}
        </Button>

        <AnimatePresence>
          {generatedContent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2 pt-4 border-t"
            >
              <div className="flex justify-between items-center">
                <Label>Generated Content:</Label>
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  {isCopied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2">{isCopied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
              <Textarea value={generatedContent} readOnly rows={8} className="font-mono text-sm" />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default ContentGenerator;