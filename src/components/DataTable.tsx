import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Flex } from 'index'

const noSorting = (_: any) => 0

function getSortingValueGetter(sort?: Sort) {
  if (!sort) return noSorting
  const { value, func } = sort
  if (value) return (x: any) => x[value]
  if (func) return func
  return noSorting
}

export default function DataTable(props: DataTableProps) {
  const { columns, data, identifier } = props
  const initial = columns
    .map((x, i) => ({ ...x, index: i }))
    .find(x => x.sort && x.sort.default)
//TODO clean up this 3am code done at 11pm
  const [sortBy, setSortBy] = useState<number | null>(initial ? initial.index : null)
  const [sortOrder, setSortOrder] = useState<string | null>((initial && initial.sort && initial.sort.default) || 'idle')
  const [valueOf, setValueOf] = useState<(value: any) => number>(() => (initial ? getSortingValueGetter(initial.sort) : noSorting))

  const order = sortOrder === 'desc' ? -1 : 1
  const func = () => (a: any, b: any) => valueOf(a) === valueOf(b) ? 0 : (valueOf(a) > valueOf(b) ? 1 : -1) * order
  const sortData = (data: Array<any>) => sortBy === null ? data : data.sort(func())
  const getSortOrder = (sortingBy: number) => sortingBy === sortBy && sortOrder === 'asc' ? 'desc' : 'asc'

  const headerClicked = (sort: Sort, i: number) => {
    const getValue = getSortingValueGetter(sort)
    const sortOrder = getSortOrder(i)
    setValueOf(() => getValue)
    setSortOrder(sortOrder)
    setSortBy(i)
  }

  const sorted = sortData(data)
  return (
    <Table>
      <TableHeaders>
        {
          columns.map(({ header, sort }, i) => {
            const order = (sort === undefined ? 'none' : i === sortBy ? sortOrder : 'idle') as SortOrder
            if (order === null) throw Error('Order of sorteable columns should never be null')
            const onClick = sort ? () => headerClicked(sort, i) : () => {
            }
            return <TableHeader text={header} sortOrder={order} onClick={onClick} key={i} />
          })
        }
      </TableHeaders>
      <TableBody>
        {
          sorted.map((entry, i) =>
            <TableRow key={identifier(entry)} alternate={(i % 2) === 1}>
              {columns.map((column, j) => <TableData key={j}>{column.format(entry)}</TableData>)}
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}

export type DataTableProps = {
  columns: Array<ColumnFormat>
  data: Array<any>
  identifier: (entity: any) => string
}

type ColumnFormat = {
  header: string
  sort?: Sort
  format: (entry: any) => ReactNode
}

type Sort = {
  value?: string
  func?: (value: any) => any
  default?: string
}

type SortOrder = 'none' | 'desc' | 'asc' | 'idle'

const OrderingTriangles = styled.div<{ sort: SortOrder }>`
  height: 18px;
  margin-left: 3px;
  margin-right: 3px;
  position: relative;

  ::before {
    content: ${({sort}) => sort === 'idle' || sort === 'desc' ? '""' : 'auto'};
    top: 0;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-bottom: 4px solid white;
    position: absolute;
  }

  ::after {
    content: ${({sort}) => sort === 'idle' || sort === 'asc' ? '""' : 'auto'};;
    bottom: 0;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top: 4px solid white;
    position: absolute;
  }
`

const Table = styled.table`
  background-color: transparent;
  border-collapse: separate;
  empty-cells: show;
  border-spacing: 0;
  padding: 0;
  margin: 0;
  outline: 0;
  vertical-align: top;
  table-layout: auto;
  caption-side: top;
  background-clip: padding-box;
  overflow: hidden;
  width: 100%;

  border: 1px solid darkgray;
  border-radius: 10px;
`

const TableBody = styled.tbody``

const TableData = styled.td`
  padding-left: 8px;
  text-align: left;

  &:last-child {
    padding-right: 8px;
  }

  padding-top: 4px;
  padding-bottom: 4px;
`

function TableHeader({ text, sortOrder, onClick }: {
  text: string,
  sortOrder?: SortOrder,
  onClick?: () => void
}) {

  return (
    <Header onClick={onClick}>
      <Flex y-align="center">
        {text}
        <OrderingTriangles sort={sortOrder || 'none'} />
      </Flex>
    </Header>
  )
}

const Header = styled.th<any>`
  color: whitesmoke;
  font-weight: bold;
  font-style: italic;
  font-family: "Almendra SC", Times, serif;
  padding: 6px 2px 6px 8px;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
`

const TableHeaders = ({ children }: { children: ReactNode }) => <THead>
  <tr>{children}</tr>
</THead>

const THead = styled.thead`
  background-color: black;
`

const TableRow = styled.tr<{
  alternate?: boolean
}>`
  border: 1px solid darkgray;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${props => props.alternate ? 'lightgray' : 'white'};
`
