import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

// Define the structure of a lead from FluentCRM
interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

const fetchLeads = async () => {
  const { data, error } = await supabase.functions.invoke('get-fluentcrm-leads');

  if (error) {
    throw new Error(`Function invocation error: ${error.message}`);
  }
  
  if (data.error) {
    throw new Error(`API Error: ${data.error}`);
  }

  // The function returns { leads: { data: [...] } } or { leads: [...] }
  // We check for a nested data property which is common in APIs.
  const leadData = data.leads.data ? data.leads.data : data.leads;
  return leadData as Lead[];
};

const LeadInboxCard = () => {
  const { data: leads, isLoading, isError, error } = useQuery<Lead[], Error>({
    queryKey: ['fluentCrmLeads'],
    queryFn: fetchLeads,
    retry: false, // Don't retry on failure, to avoid spamming the API
  });

  return (
    <Card className="md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Lead Inbox</CardTitle>
        <CardDescription>Recent form submissions from FluentCRM.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}
        {isError && (
           <Alert variant="destructive">
             <Terminal className="h-4 w-4" />
             <AlertTitle>Error Fetching Leads</AlertTitle>
             <AlertDescription>
               Could not load leads from FluentCRM. Please ensure API keys are set correctly in your Supabase project and that the function is deployed.
               <pre className="mt-2 whitespace-pre-wrap text-xs font-mono bg-destructive-foreground/10 p-2 rounded">
                {error.message}
               </pre>
             </AlertDescription>
           </Alert>
        )}
        {!isLoading && !isError && (
          <>
            {leads && leads.length > 0 ? (
              <ul className="divide-y divide-border">
                {leads.map((lead) => (
                  <li key={lead.id} className="py-3">
                    <p className="font-semibold">{lead.first_name} {lead.last_name}</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Received: {new Date(lead.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border rounded-md p-4 text-center">
                <p className="text-sm text-muted-foreground">No new leads found.</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadInboxCard;