'use client'
import Link from 'next/link'
import styles from './header.module.css'
import { useState, useEffect } from 'react';
import { Dropdown } from '@/components/Dropdowns/menu'
import { MobileDropdown } from '@/components/Dropdowns/mobileMenu'
 export const TransparentHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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
        <div className={isScrolled ? styles.solidHeader: styles.transparentHeader}>
            <Link href="/"><h1>EWH Scholarships</h1></Link>
            <ul className={styles.navmenu}>
                <li><Dropdown/></li>
                {/* <li><Link href="/donate">Donate</Link></li> */}
                <li><Link href="/login">Login</Link></li>    
                <li><Link href="/admin">Admin</Link></li> 
                <li><MobileDropdown /></li>   
   
            </ul>
        </div>
    )
}
