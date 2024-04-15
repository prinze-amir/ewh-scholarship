'use client';
import Link from 'next/link'
import styles from '@/components/Recipients/recipients.module.css'
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Spinner, Button, ButtonGroup } from '@chakra-ui/react';
import { fetchNextPage } from '@/app/actions';
import { defaultProfile } from '@/utilities/theme';

const Recipients = ({allRecipients, limit, pages}) =>{

    const [recipients, setRecipients] = useState(allRecipients);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(pages-1);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filteredPage, setFilteredPage] = useState(0);
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
        console.log(page, 'page', pageCount, 'pageCount')
    }, [searchTerm])

    const searchRecipients = async () => {
        const loadAll = await fetchNextPage(0, 0);
        setRecipients(prev=>{
            
        const results = loadAll.filter(recipient =>{
               return Object.values(recipient).some(value => {
                    if ( typeof value  === 'string'){
                        return value.toLowerCase().includes(searchTerm.toLowerCase());
                    } else if (typeof value === 'object'){
                        return Object.values(value).some(val => {
                            return val.toLowerCase().includes(searchTerm.toLowerCase());
                        })
                    }
                })
                
            });
            console.log(results, 'results')
          //  return results
            setFilteredResults(results);
            const resultCount = results.length;
            const resultpages = Math.floor(resultCount/limit);
            const limited = results.slice(page*limit, (page+1)*limit)
            setPageCount(resultpages);
            console.log(resultCount, 'resultCount', resultpages, 'resultpages', limited, 'limited')
            return limited;
        }   

    );
    
        setFilteredPage(0);
        console.log(page, 'page', pageCount, 'pageCount')

    }

    const nextPage = async () => {
        if(!searchTerm || searchTerm === '' || searchTerm === 'undefined' || searchTerm === 'null' || searchTerm === 'false' || searchTerm === 'true'){
                const nextPageData = await fetchNextPage(page+1, limit)
                    .then(data => {
                        setRecipients(data);
                        setPage(prev=>prev+1);
                        setPageCount(prev=>prev-1);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    console.log(recipients, 'recipients')
                    return;
          };
          console.log(filteredResults, 'filteredResults')
          console.log(page, 'page', pageCount, 'pageCount')
          setRecipients(prev=>{
            const newLimited = filteredResults.slice((page+1)*limit, (page+1)*limit+limit)
            return newLimited;
          });
          setPage(prev=>prev+1);
          setPageCount(prev=>prev-1);

        
    }

    const prevPage = async () => {
        if(!searchTerm || searchTerm === '' || searchTerm === 'undefined' || searchTerm === 'null' || searchTerm === 'false' || searchTerm === 'true'){
            
           setRecipients(prev=>{
            const previousPageofFiltered = filteredResults.slice((page-1)*limit, (page-1)*limit+limit)
           })
        }
    }


    if(!recipients.some(recipient => recipient.isApproved === true)) {    
        return (
            <div className={styles.recipientsContainer}>
                <Spinner size="xl" color="green"/>
            </div>
        )
    }

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
                <Button isDisabled={ page === 0} onClick={prevPage} bgColor={accentColor} >Previous</Button>

                    <Button isDisabled={pageCount < 1} onClick={nextPage} bgColor={accentColor} color={'white'}>Next</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export { Recipients}