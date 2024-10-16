'use client'
import styles from '@/components/Recipients/recipients.module.css'
import Image from 'next/image';
import {useState, useEffect, useRef} from 'react';
import { Button, ButtonGroup, Spinner, CircularProgress, theme } from '@chakra-ui/react'
import {useRouter, useSearchParams} from 'next/navigation';
import CustomSwitch from '@/components/Buttons/switchButton';
import { fetchNextPage } from '@/app/actions';
import { accentColor as themeColor } from '@/utilities/theme';
import {defaultProfile} from '@/utilities/defaults';
const AdminRecipients = ({allRecipients, limit, pages}) => {
    const [recipients, setRecipients] = useState(allRecipients);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(pages-1);
    const [searchResults, setSearchResults] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [accentColor, setAccentColor] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    let searchTerm = searchParams.get('search');
    let filter = searchParams.get('filter');

    useEffect( ()=>{
        setAccentColor(themeColor);
    },[]);
    useEffect(() => {
        if (filter){
            filterStatus();
        }
    }, [filter])

    useEffect(() => {
        // Fetch all recipients once if searching
        if (searchTerm) {
            searchRecipients();
        } else {
            // Reset to initial recipients when search is cleared
            setRecipients(allRecipients);
            setSearchResults([]);
            setPageCount(pages-1);
        }
    }, [searchTerm, allRecipients]);

    const searchRecipients = async () => {
        setUpdating(true);
        try {
            if (!filter){
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

        } else {
            const searchFiltered = recipients.filter(recipient => {
                return Object.values(recipient).some(value => {
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(searchTerm.toLowerCase());
                    } else if (typeof value === 'object' && value !== null) {
                        return Object.values(value).some(val => val.toString().toLowerCase().includes(searchTerm.toLowerCase()));
                    }
                    return false;
                });
            });
            setSearchResults(searchFiltered);
            setPageCount(Math.ceil(searchFiltered.length / limit)-1);
            setRecipients(searchFiltered.slice(0, limit));
            setPage(0);

         }
           
        } catch (error) {
            console.error('Error fetching and filtering recipients:', error);
        } finally {
            setUpdating(false);
        }
    }
 
    const filterStatus = async () =>{
        //need to fetch the filtered data so that it cam be limited prior****
        setUpdating(true);
        try{
            const loadAll = await fetchNextPage(0, 0);
            const filtered = loadAll.filter(recipient => {
                if (filter === 'pending') {
                    return !recipient.isApproved;
                } else if (filter === 'approved') {
                    return recipient.isApproved;
                } 
            });
            console.log(filtered, 'filtered');
            setSearchResults(filtered);
            setPageCount(Math.ceil(filtered.length / limit)-1);
            setRecipients(filtered.slice(0, limit));

        }catch(error){
            console.log(error);
        }finally{
            setUpdating(false);
            document.getElementById('admin-recipients').scrollIntoView({behavior: 'smooth'});

        }
        
    }

   
    const handleDelete = async (e) => {
        const recipientId = e.target.id;
        setIsLoading(pre=>({...pre, [recipientId]: true}));
        const confirmed = confirm('Are you sure you want to delete this recipient?');
        if (!confirmed) {
            setIsLoading(pre=>({...pre, [recipientId]: false}));
            return;
        }
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

    const fetchPageData = async (pageNum, pageSize) => {
        setUpdating(true);
        try {
            const data = await fetchNextPage(pageNum, pageSize);
            setRecipients(data);
        } catch (error) {
            console.error('Error fetching page data:', error);
        } finally {
            setUpdating(false);
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

    if (recipients.length === 0) {    
        return (
            <div className={styles.empty}>
            <Spinner size="xl" color="white" />
            <h1>NO RESULTS</h1>
            <button className="p-3 bg-zinc-600 rounded-lg" onClick={() => router.push('/admin')}>Go Back</button>
            </div>
            
        )
    }
    
    return (
        <div id="admin-recipients" className={styles.adminRecipientsContainer}>   
         {updating || recipients.length === 0 && <div className="absolute h-[100%] w-[100%] flex flex-col justify-center align-middle"><CircularProgress isIndeterminate zIndex={3} size="100px" color={accentColor} display='flex' justifyContent={'center'} alignSelf={'center'} position='absolute' margin='auto' left='50%'
                 transform='translate(-50%, -50%)' />
                 <div className={styles.overlay}></div>
                 </div>
                 }
            {recipients.map((recipient) => {
                 recipient._id = recipient._id.toString();
                
                return (
                    <div key={recipient._id} className={styles.recipientListItem}>
                            <Image priority alt={recipient.name+recipient._id} src={recipient.profileImage ? recipient.profileImage.src : defaultProfile} width={250} height={250} className={styles.adminProifileImage} />
                        <div className={styles.adminContent}>
                            <h2 className="text-xl ">{recipient.name}</h2>
                            <p>Graduated in {recipient.graduationYear}</p>
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
                                    id={recipient._id} size='lg'  
                                    isChecked={recipient.isApproved} 
                                    onChange={toggleRecipient}
                                    bgcolor={accentColor} 
                                />
                            </div>
                        
                        </div>
                
                    </div>
                )
            })}
            <div className="p-5">
                <ButtonGroup gap='2' >
                <Button isDisabled={page === 0} onClick={() => handlePageChange(page - 1, pageCount+1)}>Previous</Button>

                    <Button isDisabled={pageCount< 1} onClick={() => handlePageChange(page + 1, pageCount-1)}>Next</Button>
                </ButtonGroup>
            </div>

        </div>

    )
}

export { AdminRecipients}