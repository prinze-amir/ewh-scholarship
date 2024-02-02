// Import the MongoClient from the MongoDB driver
import clientPromise from "@/lib/mongo";
import { recipients } from "@/data/recipients";

// Function to connect to the database

async function connectToDatabase() {
   
      const  client = await clientPromise;
      const  collection = await client.db('ewh').collection("recipients");
  
  return collection ;
}
export async function GET (request) {
  
   return Response.json(recipients)
}

// Example API route in Next.js
export async function POST (request){

  try {
   

    // Assuming your collection is named "recipients"
    const  client = await clientPromise;
    const  collection = await client.db('ewh').collection("recipients");    
    // // Correcting field name inconsistencies and missing fields before insertion
    // const correctedRecipients = recipients.map(recipient => ({
    //   ...recipient,
    //   parents: recipient.parents || 'Unknown', // Provide a default value for missing 'parents'
    //   college: recipient.college || 'Not provided',
    //   major: recipient.major || recipient.majaor || 'Not provided', // Correct typo in 'major'
    //   bio: recipient.bio || 'Not provided',
    // }));

    // Insert recipients into the MongoDB collection
    const result = await collection.insertMany(recipients);

    // Close the database connection
    client.close();

    // Send a response back to the client
    return Response.json({ message: 'Recipients added successfully', result });
  } catch (error) {
    console.error("Failed to insert recipients", error);
   return Response.json({ message: 'Failed to add recipients' });
  }
}
