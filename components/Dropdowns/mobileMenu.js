
import { Menu, MenuButton, MenuList, MenuItem, Button, IconButton} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { accentColor as themeAccentColor } from '@/utilities/theme';

export const MobileDropdown = () => {
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
            _hover={{color:'#333', backgroundColor:'white'}} 
            _active={{color:'#333', backgroundColor:'white'}} 
            />
            <MenuList color='#333'>
                <MenuItem as='a' href='/apply'>Apply</MenuItem>
                <MenuItem as='a' href='/recipients'>See Recipients</MenuItem>
                <MenuItem as='a' href='/login'>Login</MenuItem>
            </MenuList>
        </Menu>
    )
}
