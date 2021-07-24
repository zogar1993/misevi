import React from "react"
import DataTableUnboxed, { DataTableProps } from 'components/DataTable'

export function Template({ ...args }: DataTableProps) {
  return <DataTable {...args}/>
}

function DataTable(props: DataTableProps) {
  return (
    <DataTableUnboxed
      {...props}
      columns={
        [
          {
            header: "mono",
            format: (value: any) => <span>{value.name}</span>,
            sort: {value: "name", default: "idle"}
          }
        ]
      }
      data={[]}
      identifier={() => ""}
    />
  )
}

export const items = [
  {code: "apothecary", name: "Apothecary"},
  {code: "apostle", name: "Apostle"},
  {code: "hexer", name: "Hexer"}
]
