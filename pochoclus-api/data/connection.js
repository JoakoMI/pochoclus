import "dotenv/config";
import { MongoClient } from "mongodb";
const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri);

let instance = null;

export default async function getConnection() {
    if (instance == null) {
        try {
            instance = await client.connect();
        } catch (error) {
            console.log(err.message);
        }
    }
    return instance;
}