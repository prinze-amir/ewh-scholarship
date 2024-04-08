'use server'
import { getAllRecipients } from "@/lib/mongo/recipients"
import  connectToDatabase  from "@/lib/mongo/mongoosedb"
import Recipient from "@/models/recipientModel";

export const fetchNextPage = async (page, limit) => {
    const {recipients} = await getAllRecipients(page, limit);
    const allRecipients = JSON.parse(JSON.stringify(recipients));
    return allRecipients
}

export const getRecipients = async (page=0,limit=6) => {
    await connectToDatabase();
    const total = await Recipient.countDocuments();
    const  pages = Math.ceil(total / limit);
    const recipients = await Recipient.find({}).skip(page*limit).limit(limit);
    return {recipients, total, pages, page, limit};
    console.log(recipients, 'recipients')   
}