import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <SearchX className="h-24 w-24 mx-auto text-primary/20 mb-6" />
        <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/support">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;