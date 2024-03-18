import { deleteRecipient, updateRecipient, getRecipient } from "@/lib/mongo/recipients"
import {deletePhoto} from "@/lib/google/googleDriveService"

  export async function DELETE(request, { params }) {
     const recipientId = params.id
      const recipient = await getRecipient(recipientId)
      if (recipient.profileImage) {
        deletePhoto(recipient.profileImage.id)
      }
     deleteRecipient(recipientId)

    return Response.json({message: recipientId + 'deleted successfully'})


  }