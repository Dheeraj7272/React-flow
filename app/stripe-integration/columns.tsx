"use client"

import { ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Customer = {
  id: string
 name:string
  email: string
}

type ColumnActions = {
  onDelete: (customer: Customer) => void
}

export const getColumns = ({
  onDelete,
}: ColumnActions): ColumnDef<Customer>[] => [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(customer.id)
              }
            >
              Copy customer ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(customer)}
            >
              Delete customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
