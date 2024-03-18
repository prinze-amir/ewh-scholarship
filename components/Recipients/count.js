import { getAllRecipients } from "@/lib/mongo/recipients";
 const Count = async () => {

    const data = await getAllRecipients();

    if (!data) {    
        return (
            <h1>No recipients to display</h1>
        )
    }

    return (
        <div>
            <h1>{data.length} Recipients</h1>
        </div>
    )
}
export { Count }