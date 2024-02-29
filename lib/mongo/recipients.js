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
    
     async function getAllRecipients() {
        const collection = await connectToDatabase();
        const recipients = await collection.find({}).toArray();
        return recipients;
    }
    async function newApplicant(applicant) {
        const collection = await connectToDatabase();
        const result = await collection.insertOne(applicant);
        return result;
    }
    async function getLatestRecipient() {
        const collection = await connectToDatabase();
        const recipient = await collection.find({}).sort({_id: -1}).limit(1).toArray();
        return recipient;
    }
     async function getRecipient(_id) {
        const collection = await connectToDatabase();
        const recipient = await collection.findOne({_id: id});
        return recipient;
    }
    async function createRecipient(recipient) {
        const collection = await connectToDatabase();
        const result = await collection.insertOne(recipient);
        return result;
    }
    async function updateRecipient(_id, recipient) {
        const collection = await connectToDatabase();
        const result = await collection.replaceOne({_id: id}, recipient);
        return result;
    }
    async function deleteRecipient(_id) {
        const collection = await connectToDatabase();
        const result = await collection.deleteOne({_id: id});
        return result;
    }
    export { getAllRecipients, newApplicant, getLatestRecipient, getRecipient, createRecipient, updateRecipient, deleteRecipient };
