import { getRecipient } from "@/lib/mongo/recipients";
import { EditForm } from "@/components/Forms/editForm";
import Image   from 'next/image';
import style from '@/app/admin/admin.module.css';
export default async function EditRecipient({params}) {
    const recipientId = params;
    
    const recipient = await getRecipient(recipientId.id);

    console.log(recipient, 'recipient data');
    const imageUrl = recipient.profileImage ? recipient.profileImage.src : "/images/nayla.jpeg";

  return (
    <div className={style.adminContiainer}>
        <div className={style.recipientView}>
                <div>
                <p>{recipient.name}</p>
                <p> {recipient.email}</p>
                <p> {recipient.phone}</p>
                <p> Bio: {recipient.bio}</p>
                </div>
                <Image src={imageUrl} height={250} width={250} alt={recipient.name} />
            </div>
        <EditForm recipient={recipient} />
    </div>
  );
}