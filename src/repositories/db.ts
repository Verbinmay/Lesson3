import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()
export type ProductType = {
  id: number;
  title: string;
};

const mongoUri = process.env.MONGO_URL;
if (!mongoUri){
  throw new Error('! URL DOESNT FOUND ')
}
export const client = new MongoClient(mongoUri);

const db = client
  .db("shop");
export const productsCollections = db
  .collection<ProductType>("products");

export async function runDb() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("products").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Cant connect to mongo server");
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
