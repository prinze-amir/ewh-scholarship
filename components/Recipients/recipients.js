'use client';
import Link from 'next/link'
import styles from '@/components/Recipients/recipients.module.css'
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Spinner, Button, ButtonGroup } from '@chakra-ui/react';
import { fetchNextPage } from '@/app/actions';
const uri = process.env.baseURI;

const Recipients = ({allRecipients, limit, pages}) =>{

    const [recipients, setRecipients] = useState(allRecipients);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(pages-1);
    const searchParams = useSearchParams();
    let searchTerm = searchParams.get('search');
    const [accentColor, setAccentColor] = useState('');
    useEffect(() => {
        setAccentColor(localStorage.getItem('theme-accent-color') || 'aquamarine');
    }   , [])
    useEffect(() => {
        if(!searchTerm || searchTerm === '' || searchTerm === 'undefined' || searchTerm === 'null' || searchTerm === 'false' || searchTerm === 'true'){
          return  setRecipients(allRecipients);
        };
        searchRecipients();
    }, [searchTerm])

    const searchRecipients = async () => {
        const loadAll = await fetchNextPage(0, 0);
        setRecipients(prev=>loadAll.filter(recipient =>{
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
        setPage(0);

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

    if(!recipients.some(recipient => recipient.isApproved === true)) {    
        return (
            <div className={styles.recipientsContainer}>
                <Spinner size="xl" color="green"/>
            </div>
        )
    }

    const defaultProfile = 'https://drive.google.com/uc?export=view&id=1zML9_4lYJsPwtfi_abQTKOHKv0yj_Pay';

    return (
        <div className={styles.recipientsWrapper}>
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
        <div className="p-5 flex justify-center">
                <ButtonGroup gap='2' >
                <Button isDisabled={pageCount === pages-1} onClick={prevPage} bgColor={accentColor} >Previous</Button>

                    <Button isDisabled={pageCount<=0} onClick={nextPage} bgColor={accentColor} color={'white'}>Next</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export { Recipients}