import { MongoClient, ServerApiVersion } from "mongodb";
import config from "../config";

export const client = new MongoClient(config.mongo.url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
client.connect();
