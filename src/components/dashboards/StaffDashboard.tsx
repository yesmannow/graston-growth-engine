import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { Button } from "@/components/ui/button";
import { mockProviders } from "@/lib/mockData";

const StaffDashboard = () => {
  // Use the properly typed mock providers instead of inline data
  const providers = mockProviders;

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