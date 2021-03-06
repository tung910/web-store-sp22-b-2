import React from "react";
import Box from "@mui/material/Box";
import styled, { css } from "styled-components";
import { Button, Checkbox, ListItemButton, Rating, Typography } from "@mui/material";
import IProducts, { Ioptions } from "../../interfaces/products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cart";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { addToWishList, removeItemInWishList } from "../../actions/wishlist";
const LabelStyled = styled.label`
	${(props) =>
		props.color
			? css`
					background-color: ${props.color};
			  `
			: ""}
`;
type Props = {
	options: Ioptions[];
	title: String;
	price: Number;
	saleoff: Number;
	image: String;
	_id?: String | undefined;
	quantity: Number;
};

const Contents: React.FC<Props> = ({
	options,
	title,
	price,
	saleoff,
	_id,
	image,
	quantity,
}: Props) => {
	const wishListSele: String[] = useSelector((state: { wishList: String[] }) => state.wishList);
	const dispatch = useDispatch();
	const [colorList, sizeList] = options;
	const handleAddtoCart = (data: IProducts | Object | any) => {
		dispatch(addToCart({ ...data, quantity: 1 }));
	};
	const handleFavori = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			dispatch(addToWishList(event.target.name));
		} else {
			dispatch(removeItemInWishList(event.target.name));
		}
	};
	return (
		<Box className="sticky top-32">
			<Typography variant="h3">{title}</Typography>
			<Typography variant="h6" className="py-3">
				{price.toLocaleString()} {`${saleoff && saleoff}%`}
			</Typography>
			<Rating name="simple-controlled" className="py-4" />
			<Typography>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam perferendis nostrum eius
				quidem odio omnis laboriosam fugit, nemo cum excepturi quod, incidunt minus sequi, ipsum
				pariatur. Quas quasi consequuntur itaque.
			</Typography>
			<Box sx={{ borderTop: 1, marginTop: 2, padding: 4 }}>
				<Typography variant="subtitle1" className="pb-4">
					Color
				</Typography>
				<div className="flex items-center space-x-3">
					{colorList.value &&
						colorList.value.length > 0 &&
						colorList.value.map((color: String, index: React.Key) => (
							<div className="relative" key={index}>
								<input className="sr-only peer" type="radio" name="color" id={`#${color}`} />
								<LabelStyled
									color={`#${color}`}
									className="flex h-8 w-8 border rounded-full border-gray-300 cursor-pointer focus:outline-none peer-checked:ring-gray-400 peer-checked:ring-offset-1 peer-checked:ring-2  peer-checked:border-transparent"
									htmlFor={`#${color}`}
								/>
							</div>
						))}
				</div>
			</Box>
			<Box sx={{ borderTop: 1, marginTop: 2, padding: 4 }}>
				<Typography variant="subtitle1" className="pb-4">
					Size
				</Typography>
				<div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
					{sizeList?.value &&
						sizeList?.value.length > 0 &&
						sizeList?.value.map((size: String, index: React.Key) => (
							<div className="relative" key={index}>
								<input
									className="sr-only peer"
									type="radio"
									value={`${size}`}
									name="size"
									id={`${size}`}
								/>
								<label
									className="flex py-3 px-4 border rounded-md items-center 
		justify-center text-sm font-medium uppercase bg-white shadow-sm text-gray-900 border-gray-300  cursor-pointer focus:outline-none  peer-checked:ring-gray-400 peer-checked:ring-offset-3 peer-checked:ring-2  peer-checked:border-transparent"
									htmlFor={`${size}`}
								>
									{size}
								</label>
							</div>
						))}
				</div>
			</Box>
			<Box sx={{ borderTop: 1, marginTop: 2, padding: 4 }}>
				<Typography variant="subtitle1" className="pb-4">
					Quantity
				</Typography>

				<select>
					{Array(quantity)
						.fill(0)
						.map((item, index) => (
							<option key={index}>{index + 1}</option>
						))}
				</select>
			</Box>
			<Box className="flex">
				<Button
					sx={{
						padding: 3,
						width: "100%",
						background: "black",
					}}
					variant="contained"
					onClick={() =>
						handleAddtoCart({
							title,
							price,
							image,
							saleoff,
							color: colorList.value[0],
							size: sizeList.value[0],
							_id,
						})
					}
				>
					Add to Cart
				</Button>
				<ListItemButton color="primary">
					<Checkbox
						color="default"
						onChange={handleFavori}
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite color="error" />}
						checked={wishListSele.find((item) => item == _id) ? true : false}
						name={`${_id}`}
					/>
				</ListItemButton>
			</Box>
		</Box>
	);
};

export default Contents;
