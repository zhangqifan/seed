import { Product } from "../components/ResultList";

export interface Payload {
	ckpt: string;
	prompt: string;
	negativePrompt: string;
	samplingMethod: string;
	samplingSteps: number;
	width: number;
	height: number;
	cfgScale: number;
	isRandomSeed: boolean;
	concreteSeeds?: string;
	batchCount: number;
}

export const keyMapping: Record<keyof Payload, string> = {
	ckpt: "Checkpoint",
	prompt: "Prompt",
	negativePrompt: "Negative Prompt",
	samplingMethod: "Sampling Method",
	samplingSteps: "Sampling Steps",
	width: "Width",
	height: "Height",
	cfgScale: "CFG Scale",
	concreteSeeds: "Concrete Seeds",
	isRandomSeed: "Using Random Seed",
	batchCount: "Batch Count",
};
