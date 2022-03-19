import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import Description from "./Description";
type Props = {};

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
	};
}

const Images: React.FC = (props: Props) => {
	return (
		<div>
			<ImageList gap={1}>
				{itemData.map((item) => {
					const cols = item.featured ? 2 : 1;
					const rows = item.featured ? 2 : 1;

					return (
						<ImageListItem key={item.img} cols={cols} rows={rows}>
							<img {...srcset(item.img, 250, 200, rows, cols)} alt={item.title} loading="lazy" />
						</ImageListItem>
					);
				})}
			</ImageList>
			<Description />
		</div>
	);
};

const itemData = [
	{
		img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
		title: "Breakfast",
		author: "@bkristastucchio",
		featured: true,
	},
	{
		img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
		title: "Burger",
		author: "@rollelflex_graphy726",
	},
	{
		img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
		title: "Camera",
		author: "@helloimnik",
	},
	{
		img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
		title: "Coffee",
		author: "@nolanissac",
	},
	{
		img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
		title: "Hats",
		author: "@hjrc33",
	},
	{
		img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
		title: "Honey",
		author: "@arwinneil",
		featured: true,
	},
	{
		img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
		title: "Basketball",
		author: "@tjdragotta",
	},
	{
		img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
		title: "Fern",
		author: "@katie_wasserman",
	},
	{
		img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
		title: "Mushrooms",
		author: "@silverdalex",
	},
];
export default Images;
