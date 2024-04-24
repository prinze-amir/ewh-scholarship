import { deleteRecipient, updateRecipient, getRecipient } from "@/lib/mongo/recipients"
import { isEmpty } from "@/utilities/forms"
import {deletePhoto, uploadGoogleDrive} from "@/lib/google/googleDriveService"

  export async function DELETE(request, { params }) {
     const recipientId = params.id
      const recipient = await getRecipient(recipientId)
      if (recipient.profileImage) {
        await deletePhoto(recipient.profileImage.id)
      }
     deleteRecipient(recipientId)

    return Response.json({message: recipientId + 'deleted successfully'})

  }

  export async function PUT(request, { params }) {
    const recipientId = params.id
    const data = await request.json()
    
    //need to delete image from google and upload new image
   
      if (data.profileImage) {

        const recipient = await getRecipient(recipientId)
        //check if profile image is new
        if (typeof data.profileImage !== 'object') {
          try {
            const uploadedImage  = await uploadGoogleDrive(data.profileImage, data.name);
            console.log(uploadedImage, 'uploaded image')
           
            data.profileImage = uploadedImage;
          } catch (error) {
           console.log(error.message, ' upload image error')
             return Response.json({error:{message: error.message}}, {status: 500});
            //return Response.error();    
          }  

          //delete the old image from google drive
          if (recipient.profileImage?.id) {
            await deletePhoto(recipient.profileImage.id)
          }
          
        } else if ( data.profileImage.id === recipient.profileImage.id) {
          //remove the profileImage from the data object
          delete data.profileImage;
        }
      
        
      }
    
    
   try { const update = {
      $set: data 
    }
    console.log(update, 'update')
    const recipient = await updateRecipient(recipientId, update)

    return Response.json(recipient)}
    catch (error) {
      console.error('Error updating recipient', error);
      return error;    
    }
  }