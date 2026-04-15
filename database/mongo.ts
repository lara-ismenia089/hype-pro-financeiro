import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
	throw new Error("MONGODB_URI não definida");
}

declare global {
	var _mongoClient: MongoClient | undefined;
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClient) {
	client = new MongoClient(uri);
	global._mongoClient = client;
	global._mongoClientPromise = client.connect();
} else {
	client = global._mongoClient;
	clientPromise = global._mongoClientPromise!;
}

export async function getClient() {
	if (!clientPromise) {
		clientPromise = client.connect();
	}
	return clientPromise;
}

export async function getDb() {
	const client = await getClient();
	return client.db();
}