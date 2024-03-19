import { deleteRecipient, updateRecipient, getRecipient } from "@/lib/mongo/recipients"
import {deletePhoto} from "@/lib/google/googleDriveService"

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
    const update = {
      $set: data 
    }
    console.log(update, 'update')
    const recipient = await updateRecipient(recipientId, update)
    return Response.json(recipient)
  }