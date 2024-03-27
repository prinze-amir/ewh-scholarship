'use client'
import styles from '@/components/Recipients/recipients.module.css'
import Image from 'next/image';
import {useState, useEffect, useRef} from 'react';
import { Button, ButtonGroup, Spinner } from '@chakra-ui/react'
import {useRouter, useSearchParams} from 'next/navigation';
import CustomSwitch from '@/components/forms/switchButton';

const AdminRecipients = ({allRecipients}) => {
    const [recipients, setRecipients] = useState(allRecipients);
    const [isLoading, setIsLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    let searchTerm = searchParams.get('search');

    useEffect(() => {
        if(!searchTerm || searchTerm === '' || searchTerm === 'undefined' || searchTerm === 'null' || searchTerm === 'false' || searchTerm === 'true'){
          return  setRecipients(allRecipients);
        };
        setRecipients(allRecipients.filter(recipient => recipient.name.toLowerCase().includes(searchTerm.toLowerCase())));
        console.log(recipients, 'recipients')
    }, [searchTerm])

    if (recipients.length === 0) {    
        return (
            <div className={styles.empty}>
            <Spinner size="xl" color="white" />
            <h1>No RESULTS</h1>
            </div>
            
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
            setRecipients(recipients.filter(recipient => recipient._id.toString() !== recipientId));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
   const handleEdit = (e) => {
         const recipientId = e.target.id;
         router.push('/admin/recipients/'+ recipientId);
    }

    const toggleRecipient = async (e) => {
        const recipientId = e.target.id;
        setUpdating(true);
        setRecipients(prev=>prev.map(recipient => {
            if (recipient._id.toString() === recipientId) {
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
                 recipient._id = recipient._id.toString();
                
                return (
                    <div key={recipient._id} className={styles.recipientListItem}>
                            <Image alt={recipient.name+recipient._id} src={recipient.profileImage ? recipient.profileImage.src : defaultProfile} width={75} height={75} className={styles.adminProifileImage} />
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
                                <CustomSwitch
                                    id={recipient._id} size='lg'  isChecked={recipient.isApproved} onChange={toggleRecipient} 
                                />
                            </div>
                        
                        </div>
                
                    </div>
                )
            })}

            
        </div>

    )
}

export { AdminRecipients}