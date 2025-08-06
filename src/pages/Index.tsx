import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Graston Provider Growth Engine
        </h1>
        <p className="text-lg mb-6 text-muted-foreground">
          Your hub for finding providers and managing your profile.
        </p>
        <div className="space-x-4 mb-8">
          <Link to="/directory">
            <Button>Find a Provider</Button>
          </Link>
          <Link to="/login">
            <Button>Provider Login</Button>
          </Link>
        </div>
        <div className="mt-8 text-left inline-block w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Testing Navigation
          </h2>
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>
              <Link to="/" className="underline hover:text-blue-600">
                Home
              </Link>{" "}
              <span className="text-muted-foreground">/</span>
            </li>
            <li>
              <Link to="/directory" className="underline hover:text-blue-600">
                Directory
              </Link>{" "}
              <span className="text-muted-foreground">/directory</span>
            </li>
            <li>
              <Link
                to="/directory/provider/123"
                className="underline hover:text-blue-600"
              >
                Public Provider Profile
              </Link>{" "}
              <span className="text-muted-foreground">
                /directory/provider/:id
              </span>
            </li>
            <li>
              <Link to="/login" className="underline hover:text-blue-600">
                Login
              </Link>{" "}
              <span className="text-muted-foreground">/login</span>
            </li>
            <li>
              <Link to="/admin" className="underline hover:text-blue-600">
                Admin Dashboard
              </Link>{" "}
              <span className="text-muted-foreground">/admin</span>
            </li>
            <li>
              <Link to="/staff" className="underline hover:text-blue-600">
                Staff Dashboard
              </Link>{" "}
              <span className="text-muted-foreground">/staff</span>
            </li>
            <li>
              <Link to="/provider/123" className="underline hover:text-blue-600">
                Provider Dashboard
              </Link>{" "}
              <span className="text-muted-foreground">/provider/:id</span>
            </li>
            <li>
              <Link
                to="/provider/123/update"
                className="underline hover:text-blue-600"
              >
                Update Profile
              </Link>{" "}
              <span className="text-muted-foreground">
                /provider/:id/update
              </span>
            </li>
            <li>
              <Link
                to="/provider/123/toolkit"
                className="underline hover:text-blue-600"
              >
                Toolkit
              </Link>{" "}
              <span className="text-muted-foreground">
                /provider/:id/toolkit
              </span>
            </li>
            <li>
              <Link to="/404" className="underline hover:text-blue-600">
                404 Not Found
              </Link>{" "}
              <span className="text-muted-foreground">/404</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;