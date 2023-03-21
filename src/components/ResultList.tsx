import ItemHeader from "./ItemHeader";
import OutputItem from "./OutputItem";
import { useState } from "react";
import ClearDialog from "./ClearDialog";
import { clearProducts } from "../utils/db";

// output image interfaces
export interface ImageItem {
	image: string;
	seed: string;
}

export interface Product {
	id?: number;
	images: ImageItem[];
	config: string;
	triggerTime: string;
	isRandomSeed: boolean;
}

const ResultList = ({
	prods,
	listener,
}: {
	prods: Product[];
	listener: () => void;
}) => {
	const onDownloadClick = () => {};

	const [isClearDialogOpen, setClearDialogIsOpen] = useState<boolean>(false);

	const onOpenClearDialog = () => {
		setClearDialogIsOpen(true);
	};

	const onDismissClearDialogWithClear = (toClear: boolean) => {
		setClearDialogIsOpen(false);
		if (toClear) {
			async function doCleaning() {
				await clearProducts();
				listener();
			}
			doCleaning();
		}
	};

	return (
		<div className="relative z-10">
			<div key="header">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						实验结果
					</h2>
					<button
						type="button"
						onClick={onOpenClearDialog}
						className="px-3 py-1 flex items-center space-x-1 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
					>
						<span>清空实验记录</span>
					</button>
				</div>
				<div className="bg-yellow-100 border-l-4 border-yellow-400 px-4 py-3 my-6 rounded-md text-sm font-semibold leading-6 text-gray-800">
					<span>
						1. 以下每一组的生成结果顺序皆由腾讯人脸相关接口进行打分和排序。
					</span>
					<br />
					<span>
						2. 结果相似度或其他客观分数均与训练模型质量高度相关，Seed
						结果仅供参考。
					</span>
					<br />
					<span>3. 如需清空实验结果，点击「清空实验记录」即可。</span>
				</div>
			</div>

			{prods.map((product, index) => (
				<div key={index}>
					<ItemHeader
						index={index}
						usingRandomSeeds={product.isRandomSeed}
						payload={product.config}
						onDownloadClick={onDownloadClick}
					/>
					<div className="mt-6 grid gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
						{product.images.map((image, imageIndex) => (
							<OutputItem
								key={`product-${index}-image-${imageIndex}`}
								src={image.image}
								seed={image.seed}
								points={111}
							/>
						))}
					</div>
				</div>
			))}

			{isClearDialogOpen && (
				<ClearDialog toClear={onDismissClearDialogWithClear} />
			)}
		</div>
	);
};

export default ResultList;
