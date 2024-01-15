"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { ITag } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export type ProductColumn = {
  id: string
  name: string;
  // price: string;
  category: string;
  tags: ITag[];
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  // {
  //   accessorKey: "price",
  //   header: "Price",
  // },
  {
    accessorKey: "category",
    header: "Category",
  },
  // {
  //   accessorKey: "size",
  //   header: "Size",
  // },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {/* {row.original.color} */}
        {row.original?.tags?.map((tag) => (
          <Badge key={tag.id}>{tag.name}</Badge>
        ))}
        
        {/* <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color }} /> */}
      </div>
    )
  },
  // {
  //   accessorKey: "weight",
  //   header: "Weight",
  // },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
