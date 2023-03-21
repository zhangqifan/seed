import axios, { AxiosResponse } from "axios";

const host = "http://127.0.0.1:7860";

interface Options {
	sdModelCheckpoint: string;
}

const mapOptions = (options: any): Options => {
	return {
		sdModelCheckpoint: options.sd_model_checkpoint,
	};
};

export const loadOptions = async () => {
	try {
		const resp = await axios.get<Options>(host + "/sdapi/v1/options", {
			transformResponse: [
				function (data) {
					const options = JSON.parse(data);
					return mapOptions(options);
				},
			],
		});
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};

interface Checkpoint {
	title: string;
	modelName: string;
	hash: string;
	sha256: string;
	filename: string;
	config: string;
}

const mapCheckpoint = (checkpoint: any): Checkpoint => {
	return {
		title: checkpoint.title,
		modelName: checkpoint.model_name,
		hash: checkpoint.hash,
		sha256: checkpoint.sha256,
		filename: checkpoint.filename,
		config: checkpoint.config,
	};
};

export const loadCkpts = async () => {
	try {
		const resp = await axios.get<Checkpoint[]>(host + "/sdapi/v1/sd-models", {
			transformResponse: [
				function (data) {
					const checkpoints = JSON.parse(data);
					return checkpoints.map(mapCheckpoint);
				},
			],
		});
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};

export const changeCkpt = async (title: string) => {
	try {
		const resp = await axios.post(host + "/sdapi/v1/options", {
			sd_model_checkpoint: title,
		});
		console.log(resp.data);
	} catch (error) {
		console.log(error);
	}
};
