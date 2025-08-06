import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Graston Provider Growth Engine
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          The official directory for finding certified Graston Technique® providers.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/directory">
              <Search className="mr-2 h-5 w-5" />
              Find a Provider
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/login">Provider Login</Link>
          </Button>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;