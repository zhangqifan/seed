import React, { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface NotificationProps {
	title: string;
	subtitle: string;
	onClose?: () => void;
}

const Notification = ({ title, subtitle, onClose }: NotificationProps) => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(false);
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const handleClose = () => {
		setShow(false);

		if (onClose) {
			onClose();
		}
	};

	return (
		<>
			{show && (
				<div
					className="fixed top-4 right-4 z-50 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto overflow-hidden fade-in-right"
					onAnimationEnd={() => {
						if (!show && onClose) {
							onClose();
						}
					}}
				>
					<div className="px-4 py-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<CheckIcon className="h-6 w-6 text-green-500 mr-4" />
								<div className="text-sm font-medium text-gray-900">{title}</div>
							</div>
							<button
								className="text-gray-400 hover:text-gray-500 focus:outline-none"
								onClick={handleClose}
							>
								<span className="sr-only">Close</span>
								<svg
									className="h-6 w-6"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<div className="mt-2 text-sm text-gray-700">{subtitle}</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Notification;
