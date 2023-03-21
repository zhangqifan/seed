import { Product } from "../components/ResultList";

const dbName = "gallery";
const version = 1;

function openDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const openRequest = indexedDB.open(dbName, version);

		openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains("products")) {
				db.createObjectStore("products", {
					keyPath: "id",
					autoIncrement: true,
				});
			}
		};

		openRequest.onsuccess = () => {
			resolve(openRequest.result);
		};

		openRequest.onerror = () => {
			reject(openRequest.error);
		};
	});
}

// Insert a product
export async function insertProduct(product: Product): Promise<number> {
	const db = await openDB();
	const transaction = db.transaction("products", "readwrite");
	const store = transaction.objectStore("products");
	const request = store.add(product);
	return new Promise((resolve, reject) => {
		transaction.oncomplete = () => {
			resolve(request.result as number);
		};
		transaction.onerror = () => {
			reject(transaction.error);
		};
	});
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
	const db = await openDB();
	const transaction = db.transaction("products", "readonly");
	const store = transaction.objectStore("products");
	const request = store.getAll();
	return new Promise((resolve, reject) => {
		transaction.oncomplete = () => {
			resolve(request.result as Product[]);
		};
		transaction.onerror = () => {
			reject(transaction.error);
		};
	});
}

// Update a product
export async function updateProduct(product: Product): Promise<void> {
	const db = await openDB();
	const transaction = db.transaction("products", "readwrite");
	const store = transaction.objectStore("products");
	const request = store.put(product);
	return new Promise((resolve, reject) => {
		transaction.oncomplete = () => {
			resolve();
		};
		transaction.onerror = () => {
			reject(transaction.error);
		};
	});
}

// Delete a product
export async function deleteProduct(id: number): Promise<void> {
	const db = await openDB();
	const transaction = db.transaction("products", "readwrite");
	const store = transaction.objectStore("products");
	const request = store.delete(id);
	return new Promise((resolve, reject) => {
		transaction.oncomplete = () => {
			resolve();
		};
		transaction.onerror = () => {
			reject(transaction.error);
		};
	});
}

// clear all products
export async function clearProducts(): Promise<void> {
	const db = await openDB();
	const transaction = db.transaction("products", "readwrite");
	const store = transaction.objectStore("products");
	store.clear();
	return new Promise((resolve, reject) => {
		transaction.oncomplete = () => {
			resolve();
		};
		transaction.onerror = () => {
			reject(transaction.error);
		};
	});
}
