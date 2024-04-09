'use server'
import { getAllRecipients } from "@/lib/mongo/recipients"
import  connectToDatabase  from "@/lib/mongo/mongoosedb"
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import bycrypt from "bcrypt";
import User from "@/models/userModel";

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

export const addNewUser = async (formData) => {
   try {
        const { name, email, password, confirmPassword, access } = Object.fromEntries(formData);
        let role;
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }
        if (access === "superAdmin") {
            role = { isAdmin: true, isSuperAdmin: true };
        } else {
             role = { isAdmin: true, isSuperAdmin: false };
        }
        console.log(role, 'role')
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        console.log(hashedPassword, 'hashed password')

        await connectToDatabase();
        const newUser = new User({ name, email, password:hashedPassword, role });
         await newUser.save();
    }
    catch(error){
        console.log(error.message, 'error')
        return error.message;

    }
   // revalidatePath('/admin/settings')
    redirect('/admin/settings')
}