import { getAllRecipients, deleteRecipient } from "@/lib/mongo/recipients"
import connectMongoDB from "@/lib/mongo/mongoosedb";
import Recipient from "@/models/recipientModel";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";

const handler = async (request) => {
//This is a test to get the token
  const token = await getToken( {req: request, secret: process.env.NEXTAUTH_SECRET});
  const session = await getServerSession()//session missing token info
  console.log(token, 'token')
  console.log(session, 'session')
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

  

  