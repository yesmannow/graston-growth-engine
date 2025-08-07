import { Link } from "react-router-dom";
import { Gem } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-bold">Graston Provider Directory</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Find certified Graston Technique® providers near you.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h3 className="font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/directory" className="text-muted-foreground hover:text-primary">Find a Provider</Link></li>
                <li><Link to="/onboarding" className="text-muted-foreground hover:text-primary">Onboarding Guide</Link></li>
                <li><Link to="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/support" className="text-muted-foreground hover:text-primary">Contact Support</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Graston Technique, LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;