import { getAllRecipients } from "@/lib/mongo/recipients";
import { revalidatePath } from "next/cache";
import { StatusFilters } from "../filters/status";
const Count = async () => {
    const {recipients} = await getAllRecipients(0,0);

    if (!recipients) {    
        return (
            <h1>No recipients to display</h1>
        )
    }

   const approved = recipients.filter(recipient => recipient.isApproved === true);
   const pending = recipients.filter(recipient => recipient.isApproved === false);

   revalidatePath('/admin');

    return (
        <div>
            <h1 className="text-3xl my-2">{approved.length} Recipients</h1>
            <h1 className="text-3xl my-2">{pending.length} New Applicants</h1>
            <StatusFilters />
        </div>
    )
}
export { Count }