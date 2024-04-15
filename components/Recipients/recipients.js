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
            fetchPageData(page, limit); // Fetch data for the current page
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
            setRecipients(filtered.slice(0, limit));
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

    const handlePageChange = (newPage) => {
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
    };

    if (isLoading) {
        return (
            <div className={styles.recipientsContainer}>
                <Spinner size="xl" color="green" />
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
        <ButtonGroup gap='2'>
        <Button isDisabled={page === 0} onClick={() => handlePageChange(page - 1)} bgColor={accentColor}>Previous</Button>
        <Button isDisabled={recipients.length < 0} onClick={() => handlePageChange(page + 1)} bgColor={accentColor} color={'white'}>Next</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export { Recipients}