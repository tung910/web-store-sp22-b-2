import React, { useState } from "react";
import BasicBreadcrumbs from "../../components/common/BasicBreadcrumbs";
import Filters from "../../features/Filters";
import Product from "../../components/product/Product";
import AccordionProduct from "../../components/product/Accordion ";
import Flexs from "../../components/layouts/Flexs";
import Grids from "../../components/layouts/Grids";

const ProductsPage: React.FC = () => {
	const [toggle, setToggle] = useState<boolean>(false);
	return (
		<div>
			<BasicBreadcrumbs />
			<Filters toggle={toggle} onClick={setToggle} />
			<Flexs className="px-10 my-10">
				{!toggle && (
					<div className="w-[30%] transition-all">
						<AccordionProduct />
					</div>
				)}
				<Grids className="col-span-2 w-full">
					<Product />
				</Grids>
			</Flexs>
		</div>
	);
};

export default ProductsPage;
