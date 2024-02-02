import clientPromise from "./index.js";

let client; 
let collection;

async function connectToDatabase() {
    if (!client) {
        client = await clientPromise;
        collection = await client.db('ewh').collection("recipients");
    }

    return collection;
    }
    
     async function getRecipients() {
        const collection = await connectToDatabase();
        const recipients = await collection.find({}).toArray();
       // const nayla = await collection.find({name: 'Nayla Arnett'}).toArray();
       console.log(recipients, 'recipients')
        return recipients;
    }
export { getRecipients };