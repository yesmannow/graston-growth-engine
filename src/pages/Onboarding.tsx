"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Provider Onboarding Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Welcome! Download the complete Provider Membership Directory guide
            to help you set up and optimize your listing.
          </p>
          <Button asChild>
            <a
              href="/docs/Provider-Membership-Directory-Website-Pages-Content.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Onboarding Guide
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;