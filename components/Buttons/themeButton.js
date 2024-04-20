'use client'
import { accentColor as themeAccentColor } from '@/utilities/theme';
import {useEffect, useState} from 'react'
import {Button} from '@chakra-ui/react'
import Link from 'next/link'

export const ThemeButton = ({text, link='#', theme='light'}) => {
    const [accentColor, setAccentColor] = useState('');
    useEffect(() => {
        setAccentColor(themeAccentColor)
        }, []);
    if (theme === 'dark') {
        return (
            <Link href={link}>
                <Button _hover={{backgroundColor:accentColor}} shadow='md' border="1px" bgColor='#333' rounded="lg" color='white' size='lg' >{text}</Button>
            </Link>
        )
    }    
    return (
        <Link href={link}>
            <Button _hover={{backgroundColor:'#333'}} shadow='md' bgColor={accentColor} rounded="lg" color='white' size='lg' >{text}</Button>
        </Link>
    )
}