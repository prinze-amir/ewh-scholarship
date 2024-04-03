import { getAllRecipients } from "@/lib/mongo/recipients"

export const fetchNextPage = async (page, limit) => {
    const {recipients} = await getAllRecipients(page, limit);
    const allRecipients = JSON.parse(JSON.stringify(recipients));
    return allRecipients
}