'use server'
import clientPromise from "./index.js";
import { ObjectId } from "mongodb";

let client; 
let collection;

async function connectToDatabase() {
    if (!client) {
        client = await clientPromise;
        collection = await client.db().collection("recipients");
    }

    return collection;
}
    
     async function getAllRecipients(page=0,limit=6) {
       try{
            const collection = await connectToDatabase();
             const total = await collection.countDocuments();
            // const pages = Math.ceil(total / limit);
            const recipients = await collection.find({}).skip(page*limit).limit(limit).toArray();

            return {recipients, total};
       } catch (error) {
           console.log(error);
       }
       
    }
    async function newApplicant(applicant) {
        const collection = await connectToDatabase();
        const result = await collection.insertOne(applicant);
        return result;
    }
    async function getLatestRecipient() {
        const collection = await connectToDatabase();
        const recipient = await collection.find({isApproved:true}).sort({graduationYear: -1}).limit(1).toArray();
        return recipient;
    }
     async function getRecipient(id) {
        const objectId = new ObjectId(id);
        const collection = await connectToDatabase();
        const recipient = await collection.findOne({_id: objectId});
        return recipient;
    }
    async function createRecipient(recipient) {
        const collection = await connectToDatabase();
        const result = await collection.insertOne(recipient);
        return result;
    }
    async function updateRecipient(id, data) {
        const objectId = new ObjectId(id);
        const collection = await connectToDatabase();
        const result = await collection.updateOne({_id: objectId}, data);
        console.log(result, 'update result')
        return result;
    }
    async function deleteRecipient(id) {
        const objectId = new ObjectId(id);
        const collection = await connectToDatabase();
        const result = await collection.deleteOne({_id: objectId});
        return result;
    }
    export { getAllRecipients, newApplicant, getLatestRecipient, getRecipient, createRecipient, updateRecipient, deleteRecipient };
