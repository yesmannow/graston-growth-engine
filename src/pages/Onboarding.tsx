import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Onboarding = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Provider Onboarding Guide</CardTitle>
          <CardDescription>
            Welcome! Follow these steps to set up and optimize your listing for success.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="welcome" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <TabsTrigger value="welcome">Welcome</TabsTrigger>
              <TabsTrigger value="profile">Profile Setup</TabsTrigger>
              <TabsTrigger value="standout">Stand Out</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="article">First Article</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="welcome" className="mt-4">
              <div className="p-6 border rounded-lg">
                <h3 className="text-2xl font-semibold">Welcome to the Directory!</h3>
                <p className="mt-2 text-muted-foreground">
                  This guide will walk you through everything you need to know to create a compelling profile that attracts new patients.
                </p>
                <div className="mt-4 aspect-video rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/k7ZjfEPxrKM"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-4">
               <div className="p-6 border rounded-lg space-y-4">
                <h3 className="text-2xl font-semibold">Step 1: Complete Your Profile</h3>
                <p className="text-muted-foreground">A complete profile is the most important factor for ranking higher in search results.</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Add your headshot and clinic logo.</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Write a detailed bio and list all specialties.</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Add your clinic location and contact info.</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Upload your GT certification and other accreditations.</li>
                </ul>
                <Button>Go to My Profile</Button>
              </div>
            </TabsContent>

            <TabsContent value="standout" className="mt-4">
              <div className="p-6 border rounded-lg space-y-4">
                <h3 className="text-2xl font-semibold">Step 2: Tips for Standing Out</h3>
                <p className="text-muted-foreground">Go beyond the basics to attract more patients.</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> List all languages spoken.</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Embed a welcome video on your profile (Premier Tier).</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Encourage patients to leave reviews.</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-4">
              <div className="p-6 border rounded-lg space-y-4">
                <h3 className="text-2xl font-semibold">Step 3: Understanding Your Analytics</h3>
                <p className="text-muted-foreground">Track your performance to see what's working.</p>
                <p>Your dashboard shows you key metrics like profile views, clicks to your website, and leads generated. More complete and active profiles tend to get more visibility.</p>
                <Button>View My Analytics</Button>
              </div>
            </TabsContent>

            <TabsContent value="article" className="mt-4">
              <div className="p-6 border rounded-lg space-y-4">
                <h3 className="text-2xl font-semibold">Step 4: Submit Your First Article</h3>
                <p className="text-muted-foreground">Publishing content establishes you as an expert and boosts your profile.</p>
                <p>Write about a common condition you treat or a patient success story. Our team can even help you draft one with our AI assistant!</p>
                <Button>Submit an Article</Button>
              </div>
            </TabsContent>

            <TabsContent value="support" className="mt-4">
              <div className="p-6 border rounded-lg space-y-4">
                <h3 className="text-2xl font-semibold">Need Help?</h3>
                <p className="text-muted-foreground">Our support team is here for you.</p>
                <p>If you have any questions about your profile, billing, or the directory in general, don't hesitate to reach out.</p>
                <Button asChild><Link to="/support">Contact Support</Link></Button>
              </div>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;