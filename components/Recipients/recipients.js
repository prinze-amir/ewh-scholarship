
import Link from 'next/link'
import styles from '@/components/Recipients/recipients.module.css'
import Image from 'next/image';
import { getAllRecipients } from '@/lib/mongo/recipients';
const uri = process.env.baseURI;
const Recipients = async () =>{

   
    const data = await getAllRecipients();

    if (!data.some(recipient => recipient.isApproved === true)) {    
        return (
            <div className={styles.recipientsContainer}>
                            <h1 className="text-4xl uppercase" >No recipients to display</h1>
            </div>
        )
    }
    const defaultProfile = 'https://drive.google.com/uc?export=view&id=1zML9_4lYJsPwtfi_abQTKOHKv0yj_Pay';

    return (
        
        <div className={styles.recipientsContainer}>   
            {data.map((recipient) => {
                if(recipient.isApproved === true){
                    const id = JSON.stringify(recipient._id);
                return (
                    <div className={styles.recipientCard} key={id}>
                        <Link href={`/recipients/${recipient._id}`}>
                            <Image alt={id} src={recipient.profileImage ? recipient.profileImage.src : defaultProfile} width={300} height={300} className={styles.profileImage} />
                            </Link>
                        <div className={styles.content}>
                            <h2 className="text-xl ">{recipient.name}</h2>
                            <p>Graduated in {recipient.graduateYear}</p>
                            <p>Attending {recipient.college}</p>
                            <p>Majoring in {recipient.major}</p>
                        </div>
                        
                    </div>
                )} 
            })}
            
        </div>

    )
}

export { Recipients}