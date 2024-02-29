import { newApplicant } from "@/lib/mongo/recipients";  
export async function POST (request){

    try {
        const applicant = await request.json();
      //console.log(applicant, 'applicant')
        // Insert the new recipient into the database
        const result = await newApplicant(applicant);
        console.log(result, 'result')
  
      // Send a response back to the client
      return Response.json({ message: 'Applicant added successfully', result });
    } catch (error) {
      console.error("Failed to insert recipients", error);
     return Response.json({ message: 'Failed to add recipients' });
    }
  }
  