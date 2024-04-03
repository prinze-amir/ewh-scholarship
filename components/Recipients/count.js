import { getAllRecipients } from "@/lib/mongo/recipients";
import { revalidatePath } from "next/cache";
import { ButtonFilters } from "../Filters/status";

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
            <h1>{approved.length} Recipients</h1>
            <h1>{pending.length} New Applicants</h1>
            <ButtonFilters />
        </div>
    )
}
export { Count }