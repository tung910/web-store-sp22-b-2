import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Grid, MenuItem, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Theme, useTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import InputField from "../../components/common/InputField";
import FormSelectOption from "../../components/common/FormSelectOption";
import UploadImages from "../../components/admin/product/UploadImages";
import uploadFile from "../../utils/uploadFile";
import SelectMultiple from "../../components/common/SelectMultiple";
import Alerts from "../../components/common/Alerts";
import IProducts from "../../interfaces/products";
import handleReducer from "../../reducers/products";
import { getCategories } from "../../api/categories";
import { addProduct } from "../../actions/products";
import useHandleChange from "../../hooks/useHandleChange";
import initial from "../../reducers/initial";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name: string, color: String, theme: Theme) {
	return {
		fontWeight:
			color.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const AddProductPage: React.FC = () => {
	const theme = useTheme();
	const sizes = ["S", "M", "L", "XL", "XXL"];
	const navigate = useNavigate();
	const [state, dispatch] = useReducer<(state: any, action: any) => any>(
		handleReducer,
		initial
	);

	const [
		handleChangeColor,
		handleChangeSize,
		handleChangeCategory,
		handleChangeSale,
	] = useHandleChange({ color: state.color, size: state.size }, dispatch);

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			title: "",
			price: "",
			category: "",
			sale: "",
			amount: 1,
			description: "",
			color: [],
			size: [],
			images: [],
		},
	});

	useEffect(() => {
		const getColors = async () => {
			try {
				const { data } = await axios.get("http://localhost:5001/api/colors");
				dispatch({
					type: "SET_DATA",
					brand: "colorList",
					payload: data,
				});
			} catch (error) {
				console.log(error);
			}
		};
		const getCategoryList = async () => {
			try {
				const { data } = await getCategories();
				dispatch({
					type: "SET_DATA",
					brand: "categoryList",
					payload: data,
				});
			} catch (error) {
				console.log(error);
			}
		};
		getColors();
		getCategoryList();
		return () => {};
	}, []);

	const onSubmit: any = async (data: any) => {
		dispatch({
			type: "LOADING",
			payload: true,
		});

		const response = Array.from(data.images).map(async (file: any) => {
			return await uploadFile(file);
		});
		const images = await Promise.all(response);
		data.images = images;
		const product: IProducts = {
			title: data.title.trim(),
			saleoff: +data.sale,
			albums: [...data.images],
			image: data.images[0],
			quantity: +data.amount,

			category: data.category,
			options: [
				{
					name: "color",
					value: [...data.color],
				},
				{
					name: "size",
					value: [...data.size],
				},
			],
			price: +data.price,
			description: /* textedit */ data.description,
		};
		dispatch(
			addProduct({
				data: product,
				color: [],
				size: [],
				images: [],
			})
		);
		dispatch({
			type: "LOADING",
			payload: false,
			color: [],
			size: [],
			images: [],
		});
		const res = await Swal.fire({
			title: "Success!",
			icon: "success",
			confirmButtonText: "Check!",
			denyButtonText: "Continue!",
		});
		reset();
		if (res.isConfirmed) return navigate("/admin/products");
		if (res.isDenied) return;
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Alerts
				loading={state.loading}
				open={state.toggle}
				setToggle={() => {}}
			/>
			<Grid container spacing={3}>
				<Grid item xs={12} md={8} lg={9}>
					<Paper
						sx={{
							p: 2,
							minHeight: 240,
						}}
					>
						<Typography variant="h5">Add products</Typography>
						<Grid
							sx={{
								p: 2,
								minHeight: 240,
							}}
						>
							<Grid
								container
								rowSpacing={3}
								columnSpacing={{ xs: 1, sm: 2, md: 3 }}
							>
								<Grid item xs={6}>
									{/* Title start */}
									<InputField
										title="title"
										label="Title"
										controls={control}
										errors={errors?.title}
									/>
									{/* Title end */}
								</Grid>
								<Grid item xs={6}>
									{/* Price start */}
									<InputField
										title="price"
										label="Price"
										type="number"
										controls={control}
										errors={errors?.price}
									/>
								</Grid>

								<Grid item xs={6}>
									<FormSelectOption
										title="category"
										label="Category"
										controls={control}
										state={state.category}
										handleChangeState={handleChangeCategory}
										errors={errors?.category}
									>
										{state.categoryList.length > 0 &&
											state.categoryList.map((cate: any) => (
												<MenuItem key={cate._id} value={cate._id}>
													{cate.title}
												</MenuItem>
											))}
									</FormSelectOption>
								</Grid>

								<Grid item xs={6}>
									<FormSelectOption
										title="sale"
										label="Sale"
										controls={control}
										state={state.sale}
										handleChangeState={handleChangeSale}
										errors={errors?.sale}
									>
										{Array(10)
											.fill("")
											.map((cate, index) => (
												<MenuItem
													key={index}
													value={`${index * 10}`}
													sx={{
														display: "flex",
														justifyContent: "space-between",
													}}
												>
													{`${index * 10}%`}
												</MenuItem>
											))}
									</FormSelectOption>
								</Grid>
								<Grid item xs={6}>
									<InputField
										title="amount"
										label="Amount"
										type="number"
										controls={control}
										errors={errors?.amount}
									/>
								</Grid>

								<Grid item xs={6}>
									<UploadImages
										field={register("images", { required: true })}
										errors={errors?.images}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							rowGap: 2,
							minHeight: 240,
						}}
					>
						<SelectMultiple
							register={register}
							title="color"
							value={state.color}
							onChange={handleChangeColor}
							MenuProps={MenuProps}
							errors={errors.color}
						>
							{state.colorList.length > 0 &&
								state.colorList.map(({ nameId, hexCode, name: title }: any) => (
									<MenuItem
										key={nameId}
										value={hexCode}
										style={getStyles(`${title}`, `${title}`, theme)}
									>
										{title}
									</MenuItem>
								))}
						</SelectMultiple>
						<SelectMultiple
							register={register}
							title="size"
							value={state.size}
							onChange={handleChangeSize}
							MenuProps={MenuProps}
							errors={errors?.size}
						>
							{sizes.length > 0 &&
								sizes.map((sizeValue) => (
									<MenuItem
										key={sizeValue}
										value={sizeValue}
										style={getStyles(sizeValue, sizeValue, theme)}
									>
										{sizeValue}
									</MenuItem>
								))}
						</SelectMultiple>

						{/* Size end */}
						<Button color="primary" variant="contained" type="submit">
							Add
						</Button>
					</Paper>
				</Grid>

				{/* Recent Orders */}
				<Grid item xs={12}>
					<Paper /* sx={{ p: 2, display: "flex", flexDirection: "column", minHeight: 600 }} */
					>
						{/* <TextField multiline fullWidth rows={4}></TextField> */}
						{/* <TextEditor
							title="description"
							register={register}
							editorState={editorState}
							setEditorState={setEditorState}
						/> */}
						<textarea
							cols={30}
							rows={10}
							{...register("description", { required: true })}
							className="p-3 w-full focus:border-inherit"
						></textarea>
					</Paper>
				</Grid>
			</Grid>
		</form>
	);
};

export default AddProductPage;
