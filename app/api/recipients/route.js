import { getAllRecipients } from "@/lib/mongo/recipients"
export async function GET(request) {
    const recipients = await getAllRecipients()
    if (recipients) {
     // console.log(recipients, 'all these recipients')
      return Response.json(recipients);

    } else {
      return { status: 404, body: { message: 'Not found' } }
    }
   
  }