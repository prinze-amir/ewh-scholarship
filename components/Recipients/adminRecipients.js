'use client'
//import { getAllRecipients } from "@/lib/mongo/recipients";
import Link from 'next/link'
import styles from '@/components/Recipients/recipients.module.css'
import Image from 'next/image';
import {useState, useEffect} from 'react';

const AdminRecipients = () => {
    const [recipients, setRecipients] = useState([]);

    const fetchRecipients = async () => {
        try {
            const recipients = await fetch(`/api/recipients`, {cache: "no-store"});
            const recipientData = await recipients.json();
        // console.log(recipients, 'recipients outside component');
            return recipientData
            } catch (error) {
            console.log(error);
            return null;
        }
    }
    
    useEffect(() => {
        
        const data = fetchRecipients().then(data => {
            console.log(data, 'the data');
            setRecipients(data);

        });
    }, [])

   // const data = await fetchRecipients();

    if (!recipients) {    
        return (
            <h1>No recipients to display</h1>
        )
    }
    const defaultProfile = 'https://drive.google.com/uc?export=view&id=1zML9_4lYJsPwtfi_abQTKOHKv0yj_Pay';

    const handleDelete = async (e) => {
        const recipientId = e.target.id;

        try {
            const response = await fetch(`/api/recipients/${recipientId}`, {
                method: 'DELETE',
                body: JSON.stringify({recipientId}),
                headers: {
                    'Content-Type': 'application/json',
                  }
            });
            const data = await response.json();
            setRecipients(recipients.filter(recipient => recipient._id !== recipientId));
        } catch (error) {
            console.log(error);
        }
    }
   

    return (
        <div className={styles.adminRecipientsContainer}>   
            {recipients.map((recipient) => {
                return (
                    <div key={recipient._id} className={styles.recipientListItem}>
                            <Image alt={recipient.name} src={recipient.profileImage ? recipient.profileImage.src : defaultProfile} width={75} height={75} className={styles.adminProifileImage} />
                        <div className={styles.content}>
                            <h2 className="text-xl ">{recipient.name}</h2>
                            <p>Graduated in {recipient.graduateYear}</p>
                            <p>Attending {recipient.college}</p>
                            <p>Majoring in {recipient.major}</p>
                        </div>
                        <div className={styles.adminButtons}>
                            <button id={recipient._id} className={styles.editButton}>Edit</button>
                            <button id={recipient._id} onClick={handleDelete} className={styles.deleteButton}>Delete</button>
                        </div>
                    </div>
                )
            })}
            
        </div>

    )
}

export { AdminRecipients}