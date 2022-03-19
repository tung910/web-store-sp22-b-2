import React, { useEffect } from "react";
import IProducts from "../../interfaces/products";
import { getProducts } from "../../api/products";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import useDataTable from "../../hooks/useDataTable";

const ImageField: any = styled.img`
	width: 200px;
`;
const columns: any = [
	{
		id: "title",
		name: "Title",
		sortable: true,
		sortField: "title",
		selector: (row: IProducts) => row.title,
	},
	{
		id: "image",
		name: "image",
		selector: (row: IProducts) => <ImageField src={row?.image} />,
	},
	{
		id: "price",
		name: "price",
		sortable: true,
		sortField: "price",
		selector: (row: IProducts) => row.price,
	},
];
const ProductsManager: React.FC = () => {
	const {
		setData,
		resetPaginationToggle,
		handleRowSelected,
		contextActions,
		toggleCleared,
		filteredItems,
		subHeaderComponentMemo,
	} = useDataTable();

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await getProducts();
			setData(data);
		};
		fetchData();
	}, []);

	return (
		<DataTable
			title="Product List"
			columns={columns}
			data={filteredItems}
			pagination
			paginationResetDefaultPage={resetPaginationToggle}
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			selectableRows
			persistTableHead
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
		/>
	);
};

export default ProductsManager;
