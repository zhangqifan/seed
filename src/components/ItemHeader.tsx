interface ItemHeaderProps {
	index: number;
	usingRandomSeeds: boolean;
	payload: string;
	onDownloadClick: () => void;
}

const ItemHeader: React.FC<ItemHeaderProps> = ({
	index,
	usingRandomSeeds,
	payload,
	onDownloadClick,
}) => {
	return (
		<div className="flex items-center justify-between mt-6">
			<div className="w-1/2 pr-4">
				<div className="flex items-center">
					<h3 className="text-lg font-medium text-gray-900">
						第 {index + 1} 组
					</h3>
					{usingRandomSeeds && (
						<span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
							随机种子
						</span>
					)}
					{!usingRandomSeeds && (
						<span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
							指定种子范围
						</span>
					)}
				</div>
				<p className="mt-1 text-sm italic text-gray-400">{payload}</p>
			</div>
			<div className="flex-shrink-0">
				<button
					type="button"
					onClick={onDownloadClick}
					className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<span>Download for Excel</span>
				</button>
			</div>
		</div>
	);
};

export default ItemHeader;
