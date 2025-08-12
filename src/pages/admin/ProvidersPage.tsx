import { PlusCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/admin/providers/columns"; // Confirmed correct path
import { mockProviders } from "@/lib/mockData";

const ProvidersPage = () => {
  const providers = mockProviders;

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Provider Management</h1>
            <div className="flex items-center gap-2">
                <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Import/Export
                </Button>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Provider
                </Button>
            </div>
        </div>
        <Tabs defaultValue="all">
            <div className="flex items-center justify-between">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="premier">Premier</TabsTrigger>
                    <TabsTrigger value="preferred">Preferred</TabsTrigger>
                    <TabsTrigger value="free">Free</TabsTrigger>
                </TabsList>
                <div className="w-full max-w-sm">
                    <Input placeholder="Search by name, email, or specialty..." />
                </div>
            </div>
            <Card className="mt-4">
                <CardContent className="pt-6">
                    <TabsContent value="all">
                        <DataTable columns={columns} data={providers} />
                    </TabsContent>
                    <TabsContent value="premier">
                        <DataTable columns={columns} data={providers.filter(p => p.tier === 'Premier')} />
                    </TabsContent>
                    <TabsContent value="preferred">
                        <DataTable columns={columns} data={providers.filter(p => p.tier === 'Preferred')} />
                    </TabsContent>
                    <TabsContent value="free">
                        <DataTable columns={columns} data={providers.filter(p => p.tier === 'Free')} />
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    </div>
  );
};

export default ProvidersPage;