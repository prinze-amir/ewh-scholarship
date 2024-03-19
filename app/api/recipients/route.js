import { getAllRecipients, deleteRecipient } from "@/lib/mongo/recipients"

export async function GET(request) {
    const recipients = await getAllRecipients()
    if (recipients) {
      return Response.json(recipients);

    } else {
      return { status: 404, body: { message: 'Not found' } }
    }
   
  }

  export async function POST(request) {
    const body = JSON.parse(request.body)
    console.log(body, 'body')
    return { status: 200, body: { message: 'success' } }
  }

  