import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { showError } from "@/utils/toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const AdminAiAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const examplePrompts = [
    "Show me all Premier providers who haven’t received a form lead in 30 days.",
    "Suggest 3 profiles to feature in the monthly spotlight.",
    "Which profiles had traffic drops this month and are at risk?",
    "List providers in California with a low profile score."
  ];

  const mutation = useMutation({
    mutationFn: async (query: string) => {
      // In a real implementation, this would call a Supabase Edge Function
      // that queries the database and uses an LLM to generate a response.
      // For now, we'll simulate a response.
      console.log("Querying AI assistant with:", query);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (query.toLowerCase().includes("spotlight")) {
        return { data: "Based on recent performance and profile completeness, I suggest featuring: \n1. Dr. Emily Carter (High engagement, new 5-star reviews) \n2. The Wellness Clinic (Trending for 'sports recovery') \n3. Dr. Ben Adams (Recently upgraded to Premier and completed profile)." };
      }
      if (query.toLowerCase().includes("at risk")) {
        return { data: "The following profiles have seen a >20% traffic drop this month and have not been updated in over 60 days: \n- Dr. Sarah Jenkins (-25% traffic) \n- Motion Physical Therapy (-30% traffic)" };
      }
      return { data: "This is a simulated response. To implement this, you would need to create a Supabase Edge Function named 'admin-assistant' that processes the prompt, queries your database, and returns a result." };
    },
    onSuccess: (result) => {
      setResponse(result.data);
    },
    onError: (error: Error) => {
      setResponse(`An error occurred: ${error.message}`);
    }
  });

  const handleQuery = (query: string) => {
    if (!query.trim()) {
      showError("Please enter a prompt.");
      return;
    }
    setPrompt(query);
    setResponse('');
    mutation.mutate(query);
  };

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6" />
          AI Admin Assistant
        </CardTitle>
        <CardDescription>Ask questions about your provider data. The AI will analyze your database to find answers.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Example Prompts:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((p, i) => (
              <Button key={i} variant="outline" size="sm" onClick={() => handleQuery(p)} disabled={mutation.isPending}>
                {p}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Input 
            placeholder="e.g., 'List providers with high churn risk...'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleQuery(prompt)}
            disabled={mutation.isPending}
          />
          <Button onClick={() => handleQuery(prompt)} disabled={mutation.isPending}>
            {mutation.isPending ? 'Thinking...' : 'Ask'}
          </Button>
        </div>

        {mutation.isError && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Assistant Error</AlertTitle>
            <AlertDescription>
              {mutation.error.message}
            </AlertDescription>
          </Alert>
        )}

        {(mutation.isPending || response) && (
          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="generated-content">Assistant's Response:</Label>
            <div id="generated-content" className="prose prose-sm dark:prose-invert max-w-none p-3 bg-muted rounded-md min-h-[100px] whitespace-pre-wrap">
              {mutation.isPending ? <span className="animate-pulse">Analyzing data...</span> : response}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminAiAssistant;