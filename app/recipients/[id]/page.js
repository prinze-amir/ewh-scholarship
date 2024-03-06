import Image from "next/image"
import { getRecipient } from "@/lib/mongo/recipients";
import style from './single.module.css'
export default async function RecipientSinglePage({params}){
    const recipientId = params;
    console.log(recipientId, 'the id')

    // const fetchSingleRecipient = async () => {
    //     try {
    //         const recipient = await getRecipient(recipientId.id);
    //         return recipient;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // }
    
    const recipient = await getRecipient(recipientId.id);

    return (
        <div className={style.profileContainer}>
            <Image src={recipient.profileImage} alt={recipient.name} width={300} height={300} className={style.profileImage} />
            
        <h1>{recipient.name}</h1>
        <h2>My parents are {recipient.parents}</h2>
        <p>I graduated in {recipient.graduateYear}</p>
        <p>{recipient.bio}</p>

        </div>
    );
}
