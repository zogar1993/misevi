import React from "react"
import {render} from "@testing-library/react"
import DataTable from "components/DataTable"

xdescribe("Data Table should", () => {
	let screen: Element
	let acum = 0
	const next = (_: any) => (++acum).toString()

	it("be empty when it has no data", async () => {
		given_an_empty_table_with_no_columns_and_no_data()
		await there_should_be_no_headers()
		await there_should_be_no_rows_in_the_body()
	})

	it("have specified headers and data", async () => {
		const headers = ["header 1", "header 2"]
		const data = [["A1", "A2"], ["B1", "B2"]]
		given_a_table_with_headers_and_data(headers, data)
		await headers_should_be_shown(headers)
		await data_should_be_shown_in_rows_in_the_body(data)
	})

	it("not be ordered by default", async () => {
		const data = [["A", "2"], ["C", "1"], ["B", "3"]]
		screen = render(
			<DataTable
				columns={[
					{header: "", format: (value: string) => value[0]},
					{header: "", format: (value: string) => value[1]}
				]}
				data={data}
				identifier={next}
			/>).baseElement
		await data_should_be_shown_in_rows_in_the_body(data)
	})

	it("be ordered by selected default if ascendant", async () => {
		const data = [["A", "2"], ["C", "1"], ["B", "3"]]
		const ordered = [["C", "1"], ["A", "2"], ["B", "3"]]
		screen = render(
			<DataTable
				columns={[
					{header: "", format: (value: string) => value[0]},
					{header: "", format: (value: string) => value[1], sort: {default: "asc", value: "1"}}
				]}
				data={data}
				identifier={next}
			/>).baseElement
		await data_should_be_shown_in_rows_in_the_body(ordered)
	})

	it("be ordered by selected default if descendant", async () => {
		const data = [["A", "2"], ["C", "1"], ["B", "3"]]
		const ordered = [["B", "3"], ["A", "2"], ["C", "1"]]
		screen = render(
			<DataTable
				columns={[
					{header: "", format: (value: string) => value[0]},
					{header: "", format: (value: string) => value[1], sort: {default: "desc", value: "1"}}
				]}
				data={data}
				identifier={next}
			/>).baseElement
		await data_should_be_shown_in_rows_in_the_body(ordered)
	})

	function given_an_empty_table_with_no_columns_and_no_data() {
		screen = render(<DataTable columns={[]} data={[]} identifier={next}/>).baseElement
	}

	function given_a_table_with_headers_and_data(headers: Array<string>, data: Array<Array<string>>) {
		screen = render(<DataTable columns={headers.map((x, i) => ({
			header: x, format: (value: string) => value[i]
		}))} data={data} identifier={next}/>)
	}

	async function there_should_be_no_headers() {
		const ths = await queryChildrenOf(screen, {tag: "th"})
		expect(ths).toHaveLength(0)
	}

	async function there_should_be_no_rows_in_the_body() {
		const body = await findChildOf(screen, {tag: "tbody"})
		const rows = await queryChildrenOf(body, {tag: "tr"})
		expect(rows).toHaveLength(0)
	}

	async function headers_should_be_shown(headers: Array<string>) {
		const ths = await findChildrenOf(screen, {tag: "th"})
		expect(ths.map(x => x.textContent)).toEqual(headers)
	}

	async function data_should_be_shown_in_rows_in_the_body(data: Array<Array<string>>) {
		const body = await findChildOf(screen, {tag: "tbody"})
		const rows = await findChildrenOf(body, {tag: "tr"})
		const cells = []
		for (const row of rows) {
			const cell = await findChildrenOf(row, {tag: "td"})
			cells.push(cell.map(x => x.textContent))
		}
		expect(cells).toEqual(data)
	}
})
