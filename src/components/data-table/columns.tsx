"use client";

import { ColumnDef } from "@tanstack/react-table";

// Define the Provider interface
export type Provider = {
  id: string;
  name: string;
  email: string;
  tier: "Free" | "Preferred" | "Premier";
  trialStatus: "Active" | "Expired" | "N/A";
  activity: number; // e.g., views, clicks
  churnRisk: boolean;
};

export const columns: ColumnDef<Provider>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tier",
    header: "Tier",
  },
  {
    accessorKey: "trialStatus",
    header: "Trial Status",
  },
  {
    accessorKey: "activity",
    header: "Activity (Views)",
  },
  {
    accessorKey: "churnRisk",
    header: "Churn Risk",
    cell: ({ row }) => (row.original.churnRisk ? "High" : "Low"),
  },
];