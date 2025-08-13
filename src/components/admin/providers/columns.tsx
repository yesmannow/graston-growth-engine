"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Provider } from "@/types/index"
import TierBadge from "@/components/TierBadge"

export const columns: ColumnDef<Provider>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Provider
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const provider = row.original
        return (
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={provider.profileImage} alt={provider.name} />
                    <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">{provider.name}</span>
                    <span className="text-sm text-muted-foreground">{provider.email}</span>
                </div>
            </div>
        )
    }
  },
  {
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) => <TierBadge tier={row.original.tier} />,
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "engagementScore",
    header: "Engagement",
    cell: ({ row }) => {
        const score = row.original.engagementScore ?? 0;
        let color = "bg-red-500";
        if (score > 70) color = "bg-green-500";
        else if (score > 40) color = "bg-yellow-500";
        return (
            <div className="flex items-center gap-2">
                <span className="font-medium">{score}%</span>
                <div className="w-20 h-2 bg-muted rounded-full">
                    <div className={`h-2 rounded-full ${color}`} style={{ width: `${score}%` }} />
                </div>
            </div>
        )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const provider = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(provider.id)}>
              Copy provider ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>View as Provider</DropdownMenuItem>
            <DropdownMenuItem>Manage Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]