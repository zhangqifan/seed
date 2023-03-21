import { useState } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import Notification from "./Notification";

export interface OutputItemDefinition {
	src: string;
	seed: string;
	points: number;
}

const OutputItem = (item: OutputItemDefinition) => {
	const [showNotification, setShowNotification] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(item.seed);
		setShowNotification(true);
	};

	return (
		<div key={item.seed} className="group relative">
			<div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
				<img
					src={`data:image/png;base64,${item.src}`}
					alt={item.seed}
					className="h-full w-full object-cover object-center lg:h-full lg:w-full"
				/>
			</div>
			<div className="mt-4 flex justify-between items-center">
				<h3 className="text-sm text-gray-700 flex-1">Seed: {item.seed}</h3>
				<button
					type="button"
					onClick={handleCopy}
					className="flex items-center py-1 px-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-800"
				>
					<ClipboardDocumentIcon className="h-4 w-4" />
				</button>
			</div>
			{showNotification && (
				<Notification
					title="Copied!"
					subtitle={`You copied seed is ${item.seed}`}
				/>
			)}
		</div>
	);
};

export default OutputItem;
