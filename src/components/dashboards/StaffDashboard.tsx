import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { columns, Provider } from "@/components/data-table/columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const StaffDashboard = () => {
  // Dummy data for demonstration
  const providers: Provider[] = [
    { id: "1", name: "John Doe", email: "john@example.com", tier: "Premier", trialStatus: "N/A", activity: 1200, churnRisk: false },
    { id: "2", name: "Jane Smith", email: "jane@example.com", tier: "Preferred", trialStatus: "Active", activity: 350, churnRisk: false },
    { id: "3", name: "Peter Jones", email: "peter@example.com", tier: "Free", trialStatus: "Expired", activity: 50, churnRisk: true },
    { id: "4", name: "Alice Brown", email: "alice@example.com", tier: "Premier", trialStatus: "N/A", activity: 800, churnRisk: false },
    { id: "5", name: "Bob White", email: "bob@example.com", tier: "Preferred", trialStatus: "Active", activity: 200, churnRisk: true },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Admin/Staff Dashboard</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Providers</CardTitle>
            <CardDescription>View and manage all providers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
              <Input placeholder="Search providers..." className="max-w-sm" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="preferred">Preferred</SelectItem>
                  <SelectItem value="premier">Premier</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Checkbox id="trial-status" />
                <Label htmlFor="trial-status">Show Trial Expired</Label>
              </div>
              <Button variant="outline">Export Report</Button>
            </div>
            <DataTable columns={columns} data={providers} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
            <CardDescription>Perform actions on selected providers.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button>Apply Tags</Button>
            <Button variant="secondary">Send Slack Alert</Button>
            <Button variant="destructive">Trigger Funnel</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;