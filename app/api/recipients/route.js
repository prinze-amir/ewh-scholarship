import { getAllRecipients, deleteRecipient } from "@/lib/mongo/recipients"
import connectMongoDB from "@/lib/mongo/mongoosedb";
import Recipient from "@/models/recipientModel";

const handler = async (request) => {
  //using mongoose and recipient model
  await connectMongoDB()
  const recipients = await Recipient.find({})
  //using mongodb
  //const recipients = await getAllRecipients()
  if (recipients) {
    return Response.json(recipients);

  } else {
    return { status: 404, body: { message: 'Not found' } }
  }
 

}

  export { handler as GET, handler as POST }

  

  