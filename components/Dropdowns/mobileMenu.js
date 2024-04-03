import { Menu, MenuButton, MenuList, MenuItem, Button, IconButton} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';

export const MobileDropdown = () => {
    return (
        <Menu>
            <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            bgColor='#2fd6b9'
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
