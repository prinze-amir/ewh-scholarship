import Image from "next/image"
import { getRecipient } from "@/lib/mongo/recipients";
import style from './single.module.css'
export default async function RecipientSinglePage({params}){
    const recipientId = params;
    
    const recipient = await getRecipient(recipientId.id);
    const defaultProfile = 'https://drive.google.com/uc?export=view&id=1zML9_4lYJsPwtfi_abQTKOHKv0yj_Pay';

   

    const profileImage = recipient.profileImage ? recipient.profileImage.src : defaultProfile;

    return (
        <div className={style.profileContainer}>
            <Image src={profileImage} alt={recipient.name} width={300} height={300} className={style.profileImage} />
            
        <h1>{recipient.name}</h1>
        <h2>My parents are {recipient.parents}</h2>
        <p>I graduated in {recipient.graduateYear}</p>
        <p>{recipient.bio}</p>

        </div>
    );
}
