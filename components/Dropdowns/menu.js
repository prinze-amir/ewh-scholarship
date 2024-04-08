import { Menu, MenuButton, MenuList, MenuItem, Button} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { accentColor as themeAccentColor } from '@/utilities/theme';
import {useState, useEffect} from 'react';

export const Dropdown = () => {
    const [accentColor, setAccentColor] = useState('');
    useEffect(() => {
        setAccentColor(themeAccentColor)
        }, []);
    return (
        <Menu>
            <MenuButton as={Button} bgColor={accentColor} color="white" rightIcon={<ChevronDownIcon />}
            _hover={{color:'#333', backgroundColor:'white'}} 
            _active={{color:'#333', backgroundColor:'white'}} 
            >
                Recipients
            </MenuButton>
            <MenuList color='#333'>
                <MenuItem as='a' href='/apply'>Apply</MenuItem>
                <MenuItem as='a' href='/recipients'>See Recipients</MenuItem>
            </MenuList>
        </Menu>
    )
}
