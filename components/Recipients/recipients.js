'use client';
import Link from 'next/link'
import styles from '@/components/Recipients/recipients.module.css'
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Spinner, CircularProgress, Button, ButtonGroup } from '@chakra-ui/react';
import { fetchNextPage } from '@/app/actions';
import { defaultProfile } from '@/utilities/defaults';
import { set } from 'mongoose';

const Recipients = ({allRecipients, limit, pages}) =>{

    const [recipients, setRecipients] = useState(allRecipients);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(pages-1);
    const [searchResults, setSearchResults] = useState([]);
    const searchParams = useSearchParams();
    let searchTerm = searchParams.get('search') || '';
    const [accentColor, setAccentColor] = useState('');
    useEffect(() => {
        setAccentColor(localStorage.getItem('theme-accent-color') || 'aquamarine');
    }   , [])

    
    useEffect(() => {
        // Fetch all recipients once if searching
        if (searchTerm) {
            fetchAllAndFilter();
        } else {
            // Reset to initial recipients when search is cleared
            setRecipients(allRecipients);
            setSearchResults([]);
            setPageCount(pages-1);
        }
    }, [searchTerm, allRecipients]);

    const fetchAllAndFilter = async () => {
        setIsLoading(true);
        try {
            const loadAll = await fetchNextPage(0, 0);
            const filtered = loadAll.filter(recipient => {
                return Object.values(recipient).some(value => {
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(searchTerm.toLowerCase());
                    } else if (typeof value === 'object' && value !== null) {
                        return Object.values(value).some(val => val.toString().toLowerCase().includes(searchTerm.toLowerCase()));
                    }
                    return false;
                });
            });

            setSearchResults(filtered);
            setPageCount(Math.ceil(filtered.length / limit)-1);
            setRecipients(filtered.slice(0, limit));
            setPage(0);
        } catch (error) {
            console.error('Error fetching and filtering recipients:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPageData = async (pageNum, pageSize) => {
        setIsLoading(true);
        try {
            const data = await fetchNextPage(pageNum, pageSize);
            setRecipients(data);
        } catch (error) {
            console.error('Error fetching page data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage, count) => {
        if (searchTerm && searchResults.length > 0) {
            // Handling pagination with filtered results
            const startIndex = newPage * limit;
            const endIndex = startIndex + limit;
            setRecipients(searchResults.slice(startIndex, endIndex));
        } else {
            // Handling normal pagination
            fetchPageData(newPage, limit);
        }
        setPage(newPage);
        setPageCount(count);
    };

    if (isLoading || recipients.length === 0) {
        return (
            <div className={styles.recipientsWrapper}>

            <div className="h-[100vh] items-center justify-center flex">
            <CircularProgress isIndeterminate color='green.300' size="150px" />
            </div>
            </div>
        );
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
                            <Image alt={recipient.name} src={recipient.profileImage ? recipient.profileImage.src : defaultProfile} width={250} height={250} className={styles.profileImage} />
                            </Link>
                        <div className={styles.content}>
                            <h2 className="text-2xl ">{recipient.name}</h2>
                            <p className="truncate">{recipient.college}</p>
                            <p className="truncate">Majoring in {recipient.major}</p>
                        </div>
                        
                    </div>
                )} 
            })}    
        </div>
        <div className="md:p-5 flex justify-center md:relative fixed bottom-0 bg-white w-[100%] p-3 z-10">
            <ButtonGroup gap='2'>
                <Button isDisabled={page === 0} onClick={() => handlePageChange(page - 1, pageCount+1)} bgColor={accentColor}>Previous</Button>
                <Button isDisabled={pageCount < 1} onClick={() => handlePageChange(page + 1, pageCount-1)} bgColor={accentColor} color={'white'}>Next</Button>
            </ButtonGroup>
        </div>
        </div>
    )
}

export { Recipients}