
import Link from 'next/link'
import styles from '@/app/recipients/recipients.module.css'
import Image from 'next/image';
const uri = process.env.baseURI;
const Recipients = async () =>{

    const fetchRecipients = async () => {
        try {
            const recipients = await fetch(`${uri}/api/recipients`, {cache: "no-store"});
        const recipientData = await recipients.json();
       console.log(recipients, 'recipients outside component');
        return recipientData
        } catch (error) {
        console.log(error);
        return null;
        }
    }
    
    const data = await fetchRecipients();
    console.log(data, 'inside component')

    if (!data) {    
        return (
            <h1>No recipients to display</h1>
        )
    }
    let defaultProfile = 'https://drive.google.com/uc?export=view&id=1zML9_4lYJsPwtfi_abQTKOHKv0yj_Pay';
    return (
        
        <div className={styles.recipientsContainer}>   
            {data.map((recipient) => {
                if(recipient.recipient === true){
                return (
                    <div style={{padding:"10px", border:'solid 1px #eee', width:"450px" }} key={recipient._id}>
                        <Link href={`/recipients/${recipient._id}`}>
                            <Image alt={recipient.id} src={recipient.profileImage ? recipient.profileImage : defaultProfile} width={300} height={300} />
                        <h2>Name: {recipient.name}</h2></Link>
                        <p>Parents: {recipient.parents ? recipient.parents: '...'}</p>
                        <p>Graduated: {recipient.graduateYear}</p>
                        <p>School: {recipient.college}</p>
                        <p>Major: {recipient.major}</p>
                        <p>Bio: {recipient.bio}</p>
                    </div>
                )}
            })}
            
        </div>

    )
}

export { Recipients}