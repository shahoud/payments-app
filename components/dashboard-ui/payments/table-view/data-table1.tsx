"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTableSh<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  //Initialize the table
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return <div className="rounded-md border"></div>;
}
