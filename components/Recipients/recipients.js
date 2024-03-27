'use client';
import Link from 'next/link'
import styles from '@/components/Recipients/recipients.module.css'
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
const uri = process.env.baseURI;

const Recipients = ({allRecipients}) =>{

    const [recipients, setRecipients] = useState(allRecipients);
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    let searchTerm = searchParams.get('search');
    
    useEffect(() => {
        if(!searchTerm || searchTerm === '' || searchTerm === 'undefined' || searchTerm === 'null' || searchTerm === 'false' || searchTerm === 'true'){
          return  setRecipients(allRecipients);
        };
        setRecipients(allRecipients.filter(recipient => {
            
                return Object.values(recipient).some(value => { 
                    return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
                });
            }
        ));
    }, [searchTerm])


    if(!recipients.some(recipient => recipient.isApproved === true)) {    
        return (
            <div className={styles.recipientsContainer}>
                <Spinner size="xl" color="green"/>
            </div>
        )
    }

    const defaultProfile = 'https://drive.google.com/uc?export=view&id=1zML9_4lYJsPwtfi_abQTKOHKv0yj_Pay';

    return (
        
        <div className={styles.recipientsContainer}>   
            {recipients.map((recipient) => {
                if(recipient.isApproved === true){
                    recipient._id = recipient._id.toString();
                return (
                    <div className={styles.recipientCard} key={recipient._id}>
                        <Link href={`/recipients/${recipient._id}`}>
                            <Image alt={recipient.name} src={recipient.profileImage ? recipient.profileImage.src : defaultProfile} width={300} height={300} className={styles.profileImage} />
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