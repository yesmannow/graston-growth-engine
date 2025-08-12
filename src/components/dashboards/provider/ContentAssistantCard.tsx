import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Copy, Check } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast"; // Changed import

// This is the expected response from the Supabase function
interface ContentResponse {
  content: string;
}

// This function will be called by the mutation
const generateContent = async (prompt: string): Promise<ContentResponse> => {
  const { data, error } = await supabase.functions.invoke('content-assistant', {
    body: { prompt },
  });

  if (error) {
    throw new Error(`Function invocation error: ${error.message}`);
  }

  if (data.error) {
    throw new Error(`API Error: ${data.error}`);
  }

  return data;
};


const ContentAssistantCard = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [hasCopied, setHasCopied] = useState(false);

  const mutation = useMutation<ContentResponse, Error, string>({
    mutationFn: generateContent,
    onSuccess: (data) => {
      showSuccess("Content generated successfully!"); // Changed usage
    },
    onError: (error) => {
      // Do nothing, the UI will show the error message
    }
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      showError("Please enter a prompt for the content you need."); // Changed usage
      return;
    }
    // Clear previous content before new generation
    setGeneratedContent('');
    mutation.mutate(prompt);
  };

  const handleCopy = () => {
    if(!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setHasCopied(true);
    showSuccess("Content copied to clipboard!"); // Changed usage
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Card className="md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>AI Content Assistant</CardTitle>
        <CardDescription>Generate SEO-optimized content for your profile, like bios, service descriptions, or video scripts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="content-prompt">What content do you need?</Label>
          <Textarea 
            id="content-prompt" 
            placeholder="e.g., 'Write a short, friendly bio for my profile focusing on sports injuries' or 'Create a list of 5 video ideas for patient testimonials'" 
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={mutation.isPending}
          />
        </div>
        <Button onClick={handleGenerate} className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Generating...' : 'Generate Content'}
        </Button>

        {mutation.isError && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>
              {mutation.error.message}. Please ensure the 'content-assistant' Supabase function is deployed correctly.
            </AlertDescription>
          </Alert>
        )}

        {generatedContent && !mutation.isPending && (
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between items-center">
              <Label htmlFor="generated-content">Generated Content:</Label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2">{hasCopied ? 'Copied!' : 'Copy'}</span>
              </Button>
            </div>
            <div id="generated-content" className="prose prose-sm dark:prose-invert max-w-none p-3 bg-muted rounded-md h-48 overflow-y-auto whitespace-pre-wrap">
              {generatedContent}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentAssistantCard;