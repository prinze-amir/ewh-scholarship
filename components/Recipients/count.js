import { getAllRecipients } from "@/lib/mongo/recipients";
import { revalidatePath } from "next/cache";
 const Count = async () => {

    const data = await getAllRecipients();

    if (!data) {    
        return (
            <h1>No recipients to display</h1>
        )
    }

   const approved = data.filter(recipient => recipient.isApproved === true);
   const pending = data.filter(recipient => recipient.isApproved === false);

   revalidatePath('/admin');

    return (
        <div>
            <h1>{approved.length} Recipients</h1>
            <h1>{pending.length} New Applicants</h1>
        </div>
    )
}
export { Count }