'use client'
import Link from 'next/link'
import styles from './header.module.css'
import { useState, useEffect } from 'react';
import { Dropdown } from '@/components/Dropdowns/menu'
import { MobileDropdown } from '@/components/Dropdowns/mobileMenu'
import {Button } from '@chakra-ui/react'
import { useSession, signOut, signIn } from 'next-auth/react';

 export const TransparentHeader = ({color='text-white', bgColor='bg-transparent'}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const {data: session} = useSession();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return (
        <div className={isScrolled ? styles.solidHeader: `${bgColor} ` + styles.transparentHeader}>
            <Link href="/"><h1 className='text-lg uppercase'>EWH Scholarships</h1></Link>
            <ul className={styles.navmenu}>
                <li><Dropdown/></li>
                {/* <li><Link href="/donate">Donate</Link></li> */}
                {!session && <li><Button onClick={signIn}>Login</Button></li>}    
                {session && <li><Link href="/admin">Admin</Link></li>}                
                {session && <li><h1>{session.user.name}</h1></li>}
                {session && <li><Button onClick={signOut}>Sign Out</Button></li>}
            </ul>
            <div className={styles.mobileMenu}><MobileDropdown session={session}/></div>
        </div>
    )
}
