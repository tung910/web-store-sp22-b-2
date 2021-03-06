import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { getRelated } from "../../api/products";
import { Link } from "react-router-dom";
import IProducts from "../../interfaces/products";
type IProps = {
	slugs?: String | undefined;
};
export default function Likes({ slugs }: IProps) {
	const fetchData = useRef<Object | any>({});
	const [imageData, setImageData] = useState<[]>([]);
	fetchData.current = async () => {
		const { data } = await getRelated(slugs);
		setImageData(data);
	};
	useEffect(() => {
		fetchData.current();
	}, []);
	return (
		<Box>
			<ImageList variant="masonry" cols={3} gap={9}>
				{imageData.length > 0 &&
					imageData.map((item: IProducts, index) => (
						<Link to={`/products/${item.slug}`} key={index}>
							<ImageListItem sx={{ display: "block" }} className="p-7 h-min">
								<img
									srcSet={`${item.image}?w=100&auto=format&dpr=2`}
									alt={`${item.title}`}
									loading="lazy"
									className="object-cover"
								/>
								<Box className="flex justify-between">
									<ImageListItemBar position="below" title={item.title} />
									<ImageListItemBar position="below" title={+item.price} />
								</Box>
							</ImageListItem>
						</Link>
					))}
			</ImageList>
		</Box>
	);
}

const itemData = [
	{
		img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
		title: "Bed",
		author: "swabdesign",
	},
	{
		img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
		title: "Books",
		author: "Pavel Nekoranec",
	},
	{
		img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
		title: "Sink",
		author: "Charles Deluvio",
	},
	{
		img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
		title: "Kitchen",
		author: "Christian Mackie",
	},
	{
		img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
		title: "Blinds",
		author: "Darren Richardson",
	},
	{
		img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
		title: "Chairs",
		author: "Taylor Simpson",
	},
	{
		img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
		title: "Laptop",
		author: "Ben Kolde",
	},
	{
		img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
		title: "Doors",
		author: "Philipp Berndt",
	},
	{
		img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
		title: "Coffee",
		author: "Jen P.",
	},
	{
		img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
		title: "Storage",
		author: "Douglas Sheppard",
	},
	{
		img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
		title: "Candle",
		author: "Fi Bell",
	},
	{
		img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
		title: "Coffee table",
		author: "Hutomo Abrianto",
	},
];
