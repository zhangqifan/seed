import ImageForm from "./ImageForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { ImageItem, Product } from "./ResultList";
import { getFormattedDate } from "../utils/date";
import { keyMapping, Payload } from "../utils/payload";
import { changeCkpt, loadCkpts, loadOptions } from "../utils/ckpt";

interface TextGenImageProps {
	onGeneratedProduct: (prod: Product) => void;
}

export default function TextGenImage(props: TextGenImageProps) {
	// Form elements
	const [ckpts, setCkpts] = useState<string[]>([]);
	const [ckpt, setCkpt] = useState<string>("");
	const [prompt, setPrompt] = useState<string>("");
	const [nPrompt, setNPrompt] = useState<string>("");
	const [method, setMethod] = useState<string>("Euler a");
	const [steps, setSteps] = useState<number>(20);
	const [width, setWidth] = useState<number>(512);
	const [height, setHeight] = useState<number>(512);
	const [cfgScale, setCfgScale] = useState<number>(7);
	const [isRandomSeed, setIsRandomSeed] = useState(true);
	const [concreteSeeds, setConcreteSeeds] = useState<string>("");
	const [batchCount, setBatchCount] = useState<number>(10);
	const [isValidConcreteSeedsFormat, setIsValidConcreteSeedsFormat] =
		useState<boolean>(true);
	const [isGenerating, setIsGenerating] = useState(false);
	const [isSwitchingCkpt, setIsSwitchingCkpt] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;

		switch (name) {
			case "ckpt":
				async function changeCkptTitle() {
					const r = await changeCkpt(value);
					setCkpt(value);
					setIsSwitchingCkpt(false);
				}
				setIsSwitchingCkpt(true);
				changeCkptTitle();
				break;
			case "prompt":
				setPrompt(value);
				break;
			case "negativePrompt":
				setNPrompt(value);
				break;
			case "width":
				setWidth(parseInt(value));
				break;
			case "height":
				setHeight(parseInt(value));
				break;
			case "steps":
				setSteps(parseInt(value));
				break;
			case "method":
				setMethod(value);
				break;
			case "cfgScale":
				setCfgScale(parseInt(value));
				break;
			case "randomSeed":
				const t = e.target as HTMLInputElement;
				setIsRandomSeed(Boolean(t.checked));
				break;
			case "concreteSeeds":
				setConcreteSeeds(value);
				break;
			case "batchCount":
				setBatchCount(parseInt(value));
				break;
			default:
				break;
		}
	};

	let seedLowerbound: number;
	let seedUpperbound: number;

	const handleSubmit = (e: React.FormEvent) => {
		// Get args and join each key-value with comma as a string.
		const args: Payload = {
			ckpt: ckpt,
			prompt: prompt,
			negativePrompt: nPrompt,
			samplingMethod: method,
			samplingSteps: steps,
			width: width,
			height: height,
			cfgScale: cfgScale,
			concreteSeeds: concreteSeeds,
			isRandomSeed: isRandomSeed,
			batchCount: batchCount,
		};

		const argsKeyValueString = Object.entries(args)
			.filter(([key, value]) => key !== "concreteSeeds" || value !== "")
			.map(([key, value]) => `${keyMapping[key as keyof Payload]}: ${value}`)
			.join(", ");

		// Recreate a new product instance of Product interface
		prod = {
			images: [],
			config: argsKeyValueString,
			triggerTime: getFormattedDate(),
			isRandomSeed: isRandomSeed,
		};
		imgs = [];

		if (isRandomSeed === false && concreteSeeds !== "") {
			// validate concrete seed value
			const pattern = /(?<=\d)-(?=\d)/;
			const isValid = pattern.test(concreteSeeds);
			setIsValidConcreteSeedsFormat(isValid);

			if (isValid === false) {
				e.preventDefault();
				return;
			}

			seedLowerbound = parseInt(concreteSeeds.split("-")[0]);
			seedUpperbound = parseInt(concreteSeeds.split("-")[1]);

			if (seedUpperbound < seedLowerbound) {
				setIsValidConcreteSeedsFormat(isValid);
				e.preventDefault();
				return;
			}

			for (let i = seedLowerbound; i <= seedUpperbound; i++) {
				gen(i);
			}
		} else {
			for (let i = 0; i < batchCount; i++) {
				gen();
			}
		}

		setIsGenerating(true); // set isGenerating to true before generating images
		e.preventDefault();
	};

	const host = "http://127.0.0.1:7860";

	const gen = async (seed?: number) => {
		try {
			let json = {
				prompt: prompt,
				negative_prompt: nPrompt,
				width: width,
				height: height,
				steps: steps,
				cfg_scale: cfgScale,
				sampler_name: method,
				seed: -1,
			};
			if (seed !== undefined) {
				json["seed"] = seed;
			}

			const genResp = await axios.post<{ images: string[] }>(
				host + "/sdapi/v1/txt2img",
				json
			);
			getPNGInfo(genResp.data.images[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const getPNGInfo = async (base64Image: string) => {
		try {
			const payload = {
				image: `data:image/png;base64,${base64Image}`,
			};
			const pngInfoResp = await axios.post<{ info: string }>(
				host + "/sdapi/v1/png-info",
				payload
			);
			const seed = getSeed(pngInfoResp.data.info);
			console.log("image generated: " + seed);
			appendImage({ image: base64Image, seed: seed });
			submitProduct();
		} catch (error) {
			console.log(error);
		}
	};

	function getSeed(raw: string) {
		const infos = raw.split(",");
		const seed = infos
			.filter((partial) => partial.trim().startsWith("Seed:"))[0]
			.trim()
			.replace("Seed: ", "");
		return seed;
	}

	let prod: Product;
	let imgs: ImageItem[];

	const appendImage = (imageItem: ImageItem) => {
		console.log("before imgs: " + imgs.length);
		const items = [...imgs, imageItem];
		imgs = items;
		// update product images
		prod.images = imgs;
		console.log(
			"image count: " +
				prod.images.length +
				" config: " +
				prod.config +
				" time: " +
				prod.triggerTime +
				" isRand: " +
				prod.isRandomSeed
		);
	};

	const submitProduct = () => {
		if (isRandomSeed === false && concreteSeeds !== "") {
			// Use concrete seeds
			if (prod.images.length === seedUpperbound - seedLowerbound + 1) {
				// post prod
				console.log("all done.");
				props.onGeneratedProduct(prod);
				setIsGenerating(false); // set isGenerating to false after all images are generated
			}
		} else {
			// Use random seeds
			if (prod.images.length === batchCount) {
				// post prod
				console.log("all done.");
				props.onGeneratedProduct(prod);
				setIsGenerating(false); // set isGenerating to false after all images are generated
			}
		}
	};

	/**
	 * load Options and Checkpoints
	 */

	useEffect(() => {
		async function loadCurrentCheckpoint() {
			const options = await loadOptions();
			if (options?.sdModelCheckpoint === undefined) {
				setCkpt("");
			} else {
				setCkpt(options.sdModelCheckpoint);
			}
		}
		loadCurrentCheckpoint();

		async function loadAllCkpts() {
			const ckpts = await loadCkpts();
			if (ckpts === undefined) {
				setCkpts([]);
			} else {
				setCkpts(ckpts.map((i) => i.title));
			}
		}
		loadAllCkpts();
	}, []);

	return (
		<>
			<ImageForm
				ckpt={ckpt}
				prompt={prompt}
				negativePrompt={nPrompt}
				width={width}
				height={height}
				samplingSteps={steps}
				samplingMethod={method}
				cfgScale={cfgScale}
				isRandomSeed={isRandomSeed}
				concreteSeeds={concreteSeeds}
				batchCount={batchCount}
				ckpts={ckpts}
				isValidConcreteSeedsFormat={isValidConcreteSeedsFormat}
				isGenerating={isGenerating}
				isSwitchingCkpt={isSwitchingCkpt}
				onChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</>
	);
}
