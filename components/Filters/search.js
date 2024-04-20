'use client'
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input, Button, Stack } from '@chakra-ui/react';
import { accentColor as themeAccentColor } from '@/utilities/theme';
import { SearchIcon } from '@chakra-ui/icons';
import style from './filters.module.css';
const Search = ({theme}) => {

    const [search, setSearch] = useState('');
    const [accentColor, setAccentColor] = useState('');
    const [mobileStyle, setMobileStyle] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
  
    useEffect(() => {
        setAccentColor(themeAccentColor);
        if (pathname.includes('admin')){
            setMobileStyle('my-0 top-0 m-auto self-center p-3 fixed bg-[#333] w-[100%]');
        }
    }, [pathname]);
        
    const handleSearch = (e) => {
        e.preventDefault();
        if (search) {
            //creates a new url query wth existing params
            const query = new URLSearchParams(params);
            //adds onto the query
            query.set('search', search);
            //pushes the new query to the url
            router.push(`${pathname}?${query.toString()}`, {shalllow: true});
        } else {
            router.push(pathname, {shalllow: true});
        }

    };
    const handleChange = (e) => {
        if (e.target.value){
            setSearch(e.target.value);
            const query = new URLSearchParams(params);
            query.set('search', e.target.value);
        router.push(`${pathname}?${query.toString()}`, {shalllow: true});
        } else {
            setSearch('');
            router.push(pathname, {shalllow: true});
        }
        

    }
    return (
        <form className={`flex md:bg-transparent md:my-5 md:relative justify-center z-10 search-form ${mobileStyle}`} onSubmit={handleSearch}>
            <Stack spacing={2} direction="row">
                <Input
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search"
                    color={theme}
                />
                <Button type="submit" bgColor={accentColor} color="white" _hover={{color:'#333', backgroundColor:'white'}} >
                    <SearchIcon />
                </Button>
            </Stack>
        </form>
    );
}

export { Search }