"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Support = () => {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Support & Ticketing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Need help? Open a ticket or email our support team for assistance.
          </p>
          <Button asChild>
            <a href="mailto:support@yourdomain.com">Email Support</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;