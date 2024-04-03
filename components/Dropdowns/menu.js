import { Menu, MenuButton, MenuList, MenuItem, Button} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const Dropdown = () => {
    return (
        <Menu>
            <MenuButton as={Button} bgColor="#2fd6b9" color="white" rightIcon={<ChevronDownIcon />}
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
