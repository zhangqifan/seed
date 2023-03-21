// ImageForm.tsx
import React, { useState } from "react";
import { Payload } from "../utils/payload";

export interface ImageFormProps extends Payload {
	ckpts: string[];
	isValidConcreteSeedsFormat: boolean;
	isGenerating: boolean;
	isSwitchingCkpt: boolean;
	handleSubmit: (e: React.FormEvent) => void;
	onChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => void;
}

export default function ImageForm(props: ImageFormProps) {
	return (
		<form
			className="mx-auto mt-16 max-w-xl sm:mt-20"
			method="POST"
			onSubmit={props.handleSubmit}
		>
			<div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
				{/* Models selection */}
				<div className="sm:col-span-2">
					<label
						htmlFor="ckpt"
						className="block text-sm font-semibold leading-6 text-gray-900"
					>
						Checkpoint:
					</label>
					<div className="relative mt-2.5">
						<select
							id="ckpt"
							name="ckpt"
							value={props.ckpt}
							onChange={props.onChange}
							className={`block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
								props.isSwitchingCkpt ? "opacity-50 italic text-gray-400" : ""
							}`}
							disabled={props.isSwitchingCkpt}
						>
							{props.ckpts.map((checkpoint) => (
								<option key={`checkpoint-${checkpoint}`}>
									{props.isSwitchingCkpt ? (
										<span className="flex items-center">Switching ckpt...</span>
									) : (
										checkpoint
									)}
								</option>
							))}
						</select>
					</div>
				</div>
				{/* Prompt and Negative Prompt */}
				<div className="sm:col-span-2">
					<label
						htmlFor="prompt"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Prompt:
					</label>
					<div className="mt-2.5">
						<textarea
							name="prompt"
							id="prompt"
							rows={4}
							className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Prompt"
							value={props.prompt}
							onChange={props.onChange}
						/>
					</div>
				</div>
				<div className="sm:col-span-2">
					<label
						htmlFor="prompt"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Negative Prompt:
					</label>
					<div className="mt-2.5">
						<textarea
							name="negativePrompt"
							id="negativePrompt"
							rows={4}
							className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Negative prompt"
							value={props.negativePrompt}
							onChange={props.onChange}
						/>
					</div>
				</div>
				{/* Sampling Method */}
				<div className="sm:col-span-2">
					<label
						htmlFor="method"
						className="block text-sm font-semibold leading-6 text-gray-900"
					>
						Sampling Method:
					</label>
					<div className="relative mt-2.5">
						<select
							id="method"
							name="method"
							value={props.samplingMethod}
							onChange={props.onChange}
							className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						>
							<option>Euler a</option>
							<option>Euler</option>
							<option>LMS</option>
							<option>Heun</option>
							<option>DPM2</option>
							<option>DPM2 a</option>
							<option>DPM++ 2S a</option>
							<option>DPM++ 2M</option>
							<option>DPM++ SDE</option>
							<option>DPM fast</option>
							<option>DPM adaptive</option>
							<option>LMS Karras</option>
							<option>DPM2 Karras</option>
							<option>DPM2 a Karras</option>
							<option>DPM++ 2S a Karras</option>
							<option>DPM++ 2M Karras</option>
							<option>DPM++ SDE Karras</option>
							<option>DDIM</option>
							<option>PLMS</option>
						</select>
					</div>
				</div>
				{/* Sampling Steps */}
				<div className="sm:col-span-2">
					<label
						htmlFor="steps"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Sampling Steps: {props.samplingSteps}
					</label>
					<input
						type="range"
						id="steps"
						name="steps"
						min="1"
						max="150"
						value={props.samplingSteps}
						className="w-full"
						onChange={props.onChange}
					/>
				</div>
				{/* Width and Height */}
				<div className="sm:col-span-2">
					{/* Width */}
					<label
						htmlFor="width"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Width: {props.width}
					</label>
					<input
						type="range"
						id="width"
						name="width"
						min="1"
						max="2048"
						value={props.width}
						className="w-full"
						onChange={props.onChange}
					/>
				</div>
				<div className="sm:col-span-2">
					<label
						htmlFor="height"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Height: {props.height}
					</label>
					<input
						type="range"
						id="height"
						name="height"
						min="1"
						max="2048"
						value={props.height}
						className="w-full"
						onChange={props.onChange}
					/>
				</div>
				{/* CFG Scale */}
				<div className="sm:col-span-2">
					<label
						htmlFor="cfgScale"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						CFG Scale: {props.cfgScale}
					</label>
					<input
						type="range"
						id="cfgScale"
						name="cfgScale"
						min="1"
						max="30"
						value={props.cfgScale}
						className="w-full"
						onChange={props.onChange}
					/>
				</div>
				<div className="border-t border-gray-200 sm:col-span-2"></div>
				<div className="sm:col-span-2">
					{!props.isRandomSeed && (
						<div className="mb-4">
							<label
								htmlFor="concreteSeeds"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Concrete Seeds:
							</label>
							<input
								type="text"
								id="concreteSeeds"
								name="concreteSeeds"
								placeholder="输入指定种子范围，例如 1-10"
								className={`w-full py-2 px-3 text-gray-700 bg-white border rounded placeholder:italic ${
									props.isValidConcreteSeedsFormat
										? "border-gray-200 placeholder:text-gray-300 placeholder:font-mono placeholder:font-sm placeholder:text-sm"
										: "border-red-500 placeholder:text-gray-300 placeholder:font-mono placeholder:font-sm placeholder:text-sm"
								}`}
								onChange={props.onChange}
							/>
							{!props.isValidConcreteSeedsFormat && (
								<div className="text-red-500 text-sm mt-1">
									请输入正确的格式，后面数字不能比前面小，如：1-10
								</div>
							)}
						</div>
					)}
					{props.isRandomSeed && (
						<div className="sm:col-span-2">
							<div className="mb-4">
								<label
									htmlFor="batchCount"
									className="block text-gray-700 text-sm font-bold mb-2"
								>
									Batch Count: {props.batchCount}
								</label>
								<input
									type="range"
									id="batchCount"
									name="batchCount"
									min="1"
									max="100"
									value={props.batchCount}
									className="w-full"
									onChange={props.onChange}
								/>
							</div>
						</div>
					)}
					<div className="mt-4">
						<div className="relative flex items-start">
							<div className="flex items-center h-5">
								<input
									id="randomSeed"
									name="randomSeed"
									type="checkbox"
									checked={props.isRandomSeed}
									className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
									onChange={props.onChange}
								/>
							</div>
							<div className="ml-3 text-sm">
								<label
									htmlFor="randomSeed"
									className="block text-gray-700 text-sm font-bold mb-2"
								>
									Random Seed
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button
				type="submit"
				className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ${
					props.isGenerating ? "opacity-50 cursor-not-allowed" : ""
				}`}
				disabled={props.isGenerating}
			>
				{props.isGenerating ? (
					<>
						<span className="animate-spin inline-block mr-2">
							<i className="fas fa-circle-notch"></i>
						</span>
						Generating...
					</>
				) : (
					"Generate Image"
				)}
			</button>
		</form>
	);
}
