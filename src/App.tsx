import { useEffect, useState } from "react";
import PageHeader from "./components/PageHeader";
import ResultList, { Product } from "./components/ResultList";
import TextGenImage from "./components/TextGenImage";
import { getAllProducts, insertProduct, deleteProduct } from "./utils/db";

function App() {
	const [products, setProducts] = useState<Product[]>([]);

	// load products from IndexedDB
	useEffect(() => {
		async function fetchProduct() {
			const allProducts = await getAllProducts();
			setProducts(allProducts);
		}
		fetchProduct();
	}, []);

	// Example function to add a new product
	const onGeneratedProduct = async (prod: Product) => {
		const id = await insertProduct(prod);
		setProducts([...products, { ...prod, id }]);
		console.log("stored all products...");
	};

	// Example function to update a product
	// const handleUpdateProduct = async (id: number, updatedProduct: Product) => {
	// 	await updateProduct(updatedProduct);
	// 	const updatedProducts = products.map((product) =>
	// 		product.id === id ? updatedProduct : product
	// 	);
	// 	setProducts(updatedProducts);
	// };

	// Example function to delete a product
	// const handleDeleteProduct = async (id: number) => {
	// 	await deleteProduct(id);
	// 	const updatedProducts = products.filter((product) => product.id !== id);
	// 	setProducts(updatedProducts);
	// };

	return (
		<div
			className={`isolate bg-white py-24 px-6 sm:py-32 lg:px-8 ${
				products.length > 0 ? "grid grid-cols-2 gap-6" : ""
			}`}
		>
			<div className="relative z-10">
				<div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
					<svg
						className="relative left-1/2 -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-40rem)] sm:h-[42.375rem]"
						viewBox="0 0 1155 678"
					>
						<path
							fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
							fillOpacity=".3"
							d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
						/>
						<defs>
							<linearGradient
								id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
								x1="1155.49"
								x2="-78.208"
								y1=".177"
								y2="474.645"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#9089FC" />
								<stop offset={1} stopColor="#FF80B5" />
							</linearGradient>
						</defs>
					</svg>
				</div>
				<PageHeader />
				<TextGenImage onGeneratedProduct={onGeneratedProduct} />
			</div>
			{products.length > 0 && (
				<ResultList prods={products} listener={() => setProducts([])} />
			)}
		</div>
	);
}

export default App;
