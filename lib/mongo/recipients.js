import clientPromise from "./index.js";

let client; 
let collection;

export default async function connectToDatabase() {
    if (!client) {
        client = await clientPromise;
        collection = await client.db().collection("recipients");
    }
    return collection;
    }

// Compare this snippet from pages/api/recipient.js:
// import connectToDatabase from "../../lib/mongo";
//
// export default async function handler(req, res) {
//   const { method } = req;
//   const collection = await connectToDatabase();
//
//   switch (method) {
//     case "GET":
//       try {
//         const recipients = await collection.find({}).toArray();
//         res.status(200).json({ success: true, data: recipients });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     case "POST":
//       try {
//         const recipient = await collection.insertOne(req.body);
//         res.status(201).json({ success: true, data: recipient });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;
//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }
// Compare this snippet from pages/index.js:

// import Head from 'next/head';
// import { useState } from 'react';
// import { Footer } from '../components/footer';
// import { Header } from '../components/header';



