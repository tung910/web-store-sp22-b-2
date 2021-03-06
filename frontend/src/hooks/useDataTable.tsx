import React, { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import differenceBy from "lodash/differenceBy";
import { useDispatch } from "react-redux";
import { AxiosResponse } from "axios";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { logout } from "../actions/users";
import FilterComponent from "../features/admin/FilterComponent";
import Flexs from "../components/layouts/Flexs";

const useDataTable = ({
	page,
	isButton,
	remove,
}: {
	page: Boolean;
	isButton: Boolean;
	remove?: (
		slug: String | undefined
	) => Promise<AxiosResponse<any, any>> | undefined;
}) => {
	const [data, setData] = useState<any[]>([]);
	const [filterText, setFilterText] = useState<string>("");
	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState<boolean>(false);
	const [resetPaginationToggle, setResetPaginationToggle] =
		useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	/**
	 * Search by title
	 */
	const filteredItems = data.filter((item) => {
		if (item.title) {
			return (
				item.title &&
				item.title.toLowerCase().includes(filterText.toLowerCase())
			);
		} else if (item.name) {
			return (
				item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
			);
		} else {
			return (
				item.username &&
				item.username.toLowerCase().includes(filterText.toLowerCase())
			);
		}
	});
	/**
	 * edit & remove
	 */
	let handleRowSelected;
	let contextActions;
	if (remove) {
		handleRowSelected = useCallback((state) => {
			setSelectedRows(state.selectedRows);
		}, []);

		contextActions = useMemo(() => {
			const handleDelete = async () => {
				try {
					const result = await Swal.fire({
						title: "Are you sure?",
						text: "You won't be able to revert this!",
						icon: "warning",
						showCancelButton: true,
						confirmButtonColor: "#3085d6",
						cancelButtonColor: "#d33",
						confirmButtonText: "Yes, delete it!",
					});
					if (result.isConfirmed) {
						if (page) {
							setToggleCleared(!toggleCleared);
						}
						setData(differenceBy(data, selectedRows, "title"));
						selectedRows.forEach(async (r: any) => {
							try {
								await remove(r.slug);
							} catch (error: any) {
								await Swal.fire(
									"Oop...!",
									error.response.data.message,
									"error"
								);
								dispatch(logout(null));
								return navigate("/");
							}
						});
						return Swal.fire(
							"Deleted!",
							"Your file has been deleted.",
							"success"
						);
					}
				} catch (error: any) {
					return Swal.fire("Deleted!", error.response.data.message, "error");
				}
			};

			return (
				<Button key="delete" title="Clear" onClick={handleDelete} color="error">
					Delete
				</Button>
			);
		}, [data, selectedRows, toggleCleared]);
	}
	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText("");
			}
		};
		return (
			<Flexs className="items-center">
				<FilterComponent
					onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
						setFilterText(e.target.value)
					}
					onClear={handleClear}
					filterText={filterText}
				/>
				{remove != undefined && page
					? isButton && (
							<Button
								component={Link}
								to="add"
								size="medium"
								variant="contained"
								color="primary"
							>
								<AddCircleIcon titleAccess="Add"></AddCircleIcon>
							</Button>
					  )
					: isButton && (
							<Button
								size="medium"
								variant="contained"
								color="primary"
								onClick={() => setToggleCleared(!toggleCleared)}
							>
								<AddCircleIcon titleAccess="Add"></AddCircleIcon>
							</Button>
					  )}
			</Flexs>
		);
	}, [filterText, resetPaginationToggle]);

	const handleRowClicked = (row: object, event: object) => {
		console.log(event);
	};
	return {
		handleRowClicked,
		setData,
		resetPaginationToggle,
		handleRowSelected,
		contextActions,
		toggleCleared,
		filteredItems,
		subHeaderComponentMemo,
		setToggleCleared,
	};
};
export default useDataTable;
