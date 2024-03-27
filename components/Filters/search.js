'use client'
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Input, Button, Stack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import style from './filters.module.css';
const Search = ({theme}) => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (search) {
            router.push(`${pathname}?search=${search}`, {shalllow: true});
        } else {
            router.push(pathname, {shalllow: true});
        }

    };
    const handleChange = (e) => {
        setSearch(e.target.value);
       
        router.push(`${pathname}?search=${e.target.value}`, {shalllow: true});

    }
    return (
        <form className="flex mt-5 justify-center" onSubmit={handleSearch}>
            <Stack spacing={2} direction="row" mb="20px">
                <Input
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search"
                    color={theme}
                />
                <Button type="submit" bgColor="#2fd6b9" color="white" _hover={{color:'#333', backgroundColor:'white'}} >
                    <SearchIcon />
                </Button>
            </Stack>
        </form>
    );
}

export { Search }