import { getRecipients } from "@/lib/mongo/recipients"
//import { getMovies } from "@/lib/mongo/movies"
export async function GET(request) {
    const recipients = await getRecipients()
    if (recipients) {
      console.log(recipients, 'recipients')
      return Response.json(recipients);

    } else {
      return { status: 404, body: { message: 'Not found' } }
    }
   
  }