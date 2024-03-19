'use client'
//import { getAllRecipients } from "@/lib/mongo/recipients";
import Link from 'next/link'
import styles from '@/components/Recipients/recipients.module.css'
import Image from 'next/image';
import {useState, useEffect} from 'react';
import { Button, ButtonGroup, Switch, Spinner } from '@chakra-ui/react'
import {useRouter} from 'next/navigation';

const AdminRecipients = ({props}) => {
    const [recipients, setRecipients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const router = useRouter();

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
        setIsLoading(true);
        try {
            const response = await fetch(`/api/recipients/${recipientId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  cache: "no-store"
            });
            const data = await response.json();
            setRecipients(recipients.filter(recipient => recipient._id !== recipientId));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
   const handleEdit = (e) => {
         const recipientId = e.target.id;
         router.push(`/admin/recipients/${recipientId}`);
    }

    const toggleRecipient = async (e) => {
        const recipientId = e.target.id;
        setUpdating(true);
        setRecipients(prev=>prev.map(recipient => {
            if (recipient._id === recipientId) {
                recipient.isApproved = e.target.checked;
            }
            return recipient;
        }));

        console.log(e.target.isChecked, 'is checked')
        try {
            const response = await fetch(`/api/recipients/${recipientId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    isApproved: e.target.checked,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: "no-store"
            });
            const data = await response.json();
            console.log(e.target.checked, 'checked');
            setUpdating(false);
        } catch(error) {
            console.log(error);
            setUpdating(false);
        }

    }


    return (
        <div className={styles.adminRecipientsContainer}>   
         {updating && <Spinner size='sm' color='green.500' />}
            {recipients.map((recipient) => {
                const id = JSON.stringify(recipient._id);
                
                return (
                    <div key={id} className={styles.recipientListItem}>
                            <Image alt={recipient.name+id} src={recipient.profileImage ? recipient.profileImage.src : defaultProfile} width={75} height={75} className={styles.adminProifileImage} />
                        <div className={styles.adminContent}>
                            <h2 className="text-xl ">{recipient.name}</h2>
                            <p>Graduated in {recipient.graduateYear}</p>
                            <p>Attending {recipient.college}</p>
                            <p>Majoring in {recipient.major}</p>
                        </div>
                        <div className={styles.adminButtons}>
                             <ButtonGroup gap='2'>
                            <Button id={recipient._id} onClick={handleEdit} colorScheme='whiteAlpha'>EDIT</Button>
                            <Button id={recipient._id} isLoading={isLoading} colorScheme='blackAlpha' onClick={handleDelete} >DELETE</Button>
                        </ButtonGroup>
                        <div className={styles.switch}>
                            <h1>APPROVE</h1>
                            <Switch id={recipient._id} size='lg'  isChecked={recipient.isApproved} colorScheme='green' onChange={toggleRecipient} />
                           
                        </div>
                        
                        </div>
                       

                    </div>
                )
            })}

            
        </div>

    )
}

export { AdminRecipients}