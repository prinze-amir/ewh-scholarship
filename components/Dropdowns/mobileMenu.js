import { Menu, MenuButton, MenuList, MenuItem, Button, IconButton} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { accentColor as themeAccentColor } from '@/utilities/theme';
import {useState, useEffect} from 'react';

import { signOut } from 'next-auth/react';

export const MobileDropdown = ({session}) => {
    const [accentColor, setAccentColor] = useState('');
    useEffect(() => {
        setAccentColor(themeAccentColor)
        }, []);

    return (
        <Menu>
            <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            bgColor={accentColor}
            variant='outline'
            shadow='md'
            _hover={{color:'#333', backgroundColor:'white'}} 
            _active={{color:'#333', backgroundColor:'white'}} 
            />
            <MenuList color='#333' shadow='md'>
                <MenuItem as='a' href='/apply'>Apply</MenuItem>
                <MenuItem as='a' href='/recipients'>See Recipients</MenuItem>
                {!session && <MenuItem as='a' href='/login'><button style={{backgroundColor:accentColor}} className={"p-1.5 rounded-lg shadow-md text-white"} >Login</button></MenuItem>}
                {session && <MenuItem as='a' href='/admin'>Admin</MenuItem>}
                {session && <MenuItem as='li'><button className="p-1.5 rounded-lg w-fit bg-slate-600 text-white" onClick={signOut}>LogOut</button></MenuItem>}
            </MenuList>
        </Menu>
    )
}
