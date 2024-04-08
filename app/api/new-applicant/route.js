import { newApplicant } from "@/lib/mongo/recipients";  
import { driveService, googleFolderId, uploadGoogleDrive } from "@/lib/google/googleDriveService";
import connectMongoDB from "@/lib/mongo/mongoosedb";
import Recipient from "@/models/recipientModel";

export async function POST (request){

    try {
      const applicant = await request.json();

      if (applicant.profileImage ) {

        
        const uploadedImage  = await uploadGoogleDrive(applicant.profileImage, applicant.name);

        // Replace the base64 image data with the URL from Google Drive
        applicant.profileImage = uploadedImage;
      }

      console.log(applicant, 'the applicant')

        // Insert the new recipient into the database
      //  const result = await newApplicant(applicant);
      await connectMongoDB();
      const result = await Recipient.create(applicant);
  
      // Send a response back to the client
      return Response.json({ message: 'Applicant added successfully', result });
    } catch (error) {
      console.error("Failed to insert recipients", error);
     return Response.json({ message: 'Failed to add recipients' });
    }

  }

  
// export async function POST (request){

//     try {
//       const applicant = await request.json();

//       if (applicant.profileImage ) {

        
//         const uploadedImage  = await uploadGoogleDrive(applicant.profileImage, applicant.name);

//         // Replace the base64 image data with the URL from Google Drive
//         applicant.profileImage = uploadedImage;
//       }

//       console.log(applicant, 'the applicant')

//         // Insert the new recipient into the database
//         const result = await newApplicant(applicant);
  
//       // Send a response back to the client
//       return Response.json({ message: 'Applicant added successfully', result });
//     } catch (error) {
//       console.error("Failed to insert recipients", error);
//      return Response.json({ message: 'Failed to add recipients' });
//     }

//   }

  