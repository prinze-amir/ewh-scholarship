'use client'
import styles from '@/components/Recipients/recipients.module.css'
import Image from 'next/image';
import {useState, useEffect, useRef} from 'react';
import { Button, ButtonGroup, Spinner } from '@chakra-ui/react'
import {useRouter, useSearchParams} from 'next/navigation';
import CustomSwitch from '@/components/Forms/switchButton';
import { fetchNextPage } from '@/app/actions';

const AdminRecipients = ({allRecipients, limit, pages}) => {
    const [recipients, setRecipients] = useState(allRecipients);
    const [isLoading, setIsLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    let searchTerm = searchParams.get('search');
    let filter = searchParams.get('filter');
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(pages-1);

    useEffect(() => {
        if(!searchTerm || searchTerm === '' || searchTerm === 'undefined' || searchTerm === 'null' || searchTerm === 'false' || searchTerm === 'true'){
          return  setRecipients(allRecipients);
        };
        setRecipients(allRecipients.filter(recipient =>{

                return Object.values(recipient).some(value => {
                    if ( typeof value  === 'string'){
                        return value.toLowerCase().includes(searchTerm.toLowerCase());
                    } else if (typeof value === 'object'){
                        return Object.values(value).some(val => {
                            return val.toLowerCase().includes(searchTerm.toLowerCase());
                        })
                    }
                } 
            
            )
        }));
    }, [searchTerm])

    useEffect(() => {
        if (filter === 'pending') {
            setRecipients(allRecipients.filter(recipient => !recipient.isApproved));
        } else if (filter === 'approved') {
            setRecipients(allRecipients.filter(recipient => recipient.isApproved));
        }
    }, [filter])



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
        setIsLoading(pre=>({...pre, [recipientId]: true}));
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
            setIsLoading(pre=>({...pre, [recipientId]: false}));
        } catch (error) {
            console.log(error);
            setIsLoading(pre=>({...pre, [recipientId]: false}));
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

    const nextPage = async () => {
       
        const nextPageData = await fetchNextPage(page+1, limit)
        .then(data => {
            setRecipients(data);
            setPage(prev=>prev+1);
            setPageCount(prev=>prev-1);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const prevPage = async () => {
            

            const prevPageData = await fetchNextPage(page-1, limit)
            .then(data => {
                setRecipients(data);
                setPage(prev=>prev-1);
                setPageCount(prev=>prev+1);            })
            .catch(error => {
                console.log(error);
            })
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
                                <Button id={recipient._id} isLoading={isLoading[recipient._id]} colorScheme='blackAlpha' onClick={handleDelete} >DELETE</Button>
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
            <div className="p-5">
                <ButtonGroup gap='2' >
                <Button isDisabled={pageCount === pages-1} onClick={prevPage}>Previous</Button>

                    <Button isDisabled={pageCount<=0} onClick={nextPage}>Next</Button>
                </ButtonGroup>
            </div>

            
        </div>

    )
}

export { AdminRecipients}