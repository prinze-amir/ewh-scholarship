import { getLatestRecipient } from "@/lib/mongo/recipients"
export async function GET(request) {
    const latestRecpient = await getLatestRecipient();
    if (latestRecpient) {
      console.log(latestRecpient, 'latests recipient')
      return Response.json(latestRecpient);

    } else {
      return { status: 404, body: { message: 'Not found' } }
    }
   
  }