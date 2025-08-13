import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { campaigns } from "@/data/marketingData";
import { motion } from "framer-motion";
import { Download, Rocket } from "lucide-react";

const CampaignInABox = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign-in-a-Box</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map(campaign => (
            <motion.div
              key={campaign.id}
              whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgb(0 0 0 / 0.1)" }}
              className="border rounded-lg overflow-hidden group"
            >
              <img src={campaign.image} alt={campaign.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{campaign.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{campaign.description}</p>
                <div className="space-y-2">
                  {campaign.assets.map(asset => (
                    <div key={asset.title} className="flex justify-between items-center text-sm">
                      <span>{asset.title}</span>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={asset.url} download>
                          <Download className="h-4 w-4 mr-2" />
                          {asset.type}
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <Rocket className="h-4 w-4 mr-2" />
                  Launch Campaign Guide
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignInABox;