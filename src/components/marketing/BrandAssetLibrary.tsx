import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { brandAssets } from "@/data/marketingData";
import { motion } from "framer-motion";

const AssetCard = ({ asset }: { asset: { id: string, title: string, type: string, url: string, image: string } }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgb(0 0 0 / 0.1)" }}
    className="border rounded-lg overflow-hidden group"
  >
    <div className="aspect-video bg-muted flex items-center justify-center p-4">
      <img src={asset.image} alt={asset.title} className="max-h-full max-w-full object-contain" />
    </div>
    <div className="p-4 bg-background">
      <h4 className="font-semibold text-sm truncate">{asset.title}</h4>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-muted-foreground">{asset.type}</span>
        <Button size="sm" variant="ghost" asChild>
          <a href={asset.url} download>
            <Download className="h-4 w-4 mr-2" />
            Download
          </a>
        </Button>
      </div>
    </div>
  </motion.div>
);

const BrandAssetLibrary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brand & Digital Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="logos">
          <TabsList>
            <TabsTrigger value="logos">Logos & Badges</TabsTrigger>
            <TabsTrigger value="templates">Print Templates</TabsTrigger>
            <TabsTrigger value="stock-photos">Stock Photos</TabsTrigger>
            <TabsTrigger value="email-signatures">Email Signatures</TabsTrigger>
          </TabsList>
          <TabsContent value="logos" className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...brandAssets.logos, ...brandAssets.badges].map(asset => <AssetCard key={asset.id} asset={asset} />)}
            </div>
          </TabsContent>
          <TabsContent value="templates" className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brandAssets.templates.map(asset => <AssetCard key={asset.id} asset={asset} />)}
            </div>
          </TabsContent>
          <TabsContent value="stock-photos" className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brandAssets.stockPhotos.map(asset => <AssetCard key={asset.id} asset={asset} />)}
            </div>
          </TabsContent>
          <TabsContent value="email-signatures" className="pt-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brandAssets.emailSignatures.map(asset => <AssetCard key={asset.id} asset={{...asset, url: '#'}} />)}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BrandAssetLibrary;