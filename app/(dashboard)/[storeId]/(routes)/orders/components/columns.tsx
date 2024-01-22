"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string
  // phone: string;
  // address: string;
  isPaid: boolean
  totalPrice: string
  productVariant: string
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "productVariant",
    header: "Product Variant Name",
    cell: ({ row }) => {
      return (
        <div className="">
          {row.original?.productVariant}
        </div>
      )
    }
  },
  // {
  //   accessorKey: "phone",
  //   header: "Phone",
  // },
  // {
  //   accessorKey: "address",
  //   header: "Address",
  // },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  }
]
