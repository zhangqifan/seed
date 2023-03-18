import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "tailwindcss/tailwind.css";

interface ApiResponse {
	images: string[];
}

interface ProgressResponse {
	progress: number;
	eta_relative: number;
	state: Record<string, unknown>;
	current_image: string;
	textinfo: string;
}

export default function TextGenImage() {
	const [text, setText] = useState<string>("");
	const [image, setImage] = useState<string | null>(null);
	const [progress, setProgress] = useState<number>(0);
	const [polling, setPolling] = useState<boolean>(false);

	useEffect(() => {
		const pollProgress = async () => {
			if (polling) {
				try {
					const response = await axios.get<ProgressResponse>(
						"http://127.0.0.1:7860/sdapi/v1/progress"
					);
					setProgress(response.data.progress);
				} catch (error) {
					console.error("Error polling progress:", error);
				}
			}
		};

		const interval = setInterval(() => {
			pollProgress();
		}, 500); // Poll every 1 second (1000 ms)

		return () => {
			clearInterval(interval);
		};
	}, [polling]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const saveImage = async (base64Image: string, info: string) => {
		const img = new Image();
		img.src = base64Image;
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(img, 0, 0);
				canvas.toBlob((blob) => {
					if (blob) {
						saveAs(blob, "output.png");
					}
				}, "image/png");
			}
		};
	};

	const handleSubmit = async () => {
		try {
			setPolling(true); // Start polling
			const response = await axios.post<ApiResponse>(
				"http://127.0.0.1:7860/sdapi/v1/txt2img",
				{
					prompt: text,
					steps: 20,
				}
			);
			const base64Image = response.data.images[0];
			setImage(base64Image);

			const pngPayload = {
				image: `data:image/png;base64,${base64Image}`,
			};
			const response2 = await axios.post<{ info: string }>(
				"http://127.0.0.1:7860/sdapi/v1/png-info",
				pngPayload
			);

			saveImage(base64Image, response2.data.info);
			setPolling(false); // Start polling
			// Set progress to 100% when the image is generated
			setProgress(1);
		} catch (error) {
			console.error("Error generating image:", error);
			setPolling(false);
			// Set progress to 0% when the image encounter an error
			setProgress(0);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full max-w-md">
				<label
					htmlFor="prompt"
					className="block text-gray-700 text-sm font-bold mb-2"
				>
					Enter your text:
				</label>
				<input
					type="text"
					id="prompt"
					value={text}
					onChange={handleChange}
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
				{/* Progress bar */}
				<div className="relative pt-1 mb-4">
					<div className="overflow-hidden h-4 text-xs flex rounded bg-blue-200">
						<div
							style={{ width: `${progress * 100}%` }}
							className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
						>
							{progress * 100}%
						</div>
					</div>
				</div>
			</div>
			<button
				onClick={handleSubmit}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
			>
				Generate Image
			</button>
			{image && (
				<div className="mt-4">
					<img
						src={`data:image/png;base64,${image}`}
						alt="Generated"
						className="max-w-md mx-auto"
					/>
				</div>
			)}
		</div>
	);
}
