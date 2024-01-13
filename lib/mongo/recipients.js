import clientPromise from "./index.js";

let client; 
let collection;

async function connectToDatabase() {
    if (!client) {
        client = await clientPromise;
        collection = await client.db().collection("recipients");
    }
    return collection;
    }
    
    export async function getRecipients() {
        const collection = await connectToDatabase();
        const recipients = await collection.find({}).toArray();
        return recipients;
    }
