'use client'
import Link from 'next/link'
import headerStyles from '@/components/Headers/header.module.css'
import { Dropdown } from '@/components/Dropdowns/menu'
import { MobileDropdown } from '../Dropdowns/mobileMenu'

 export const Header = () => {

    return (
        <div className={headerStyles.solidHeader}>
            <Link href="/"><h1>EWH Scholarships</h1></Link>
            <ul className={headerStyles.navmenu}>
                <li><Dropdown /></li>
                {/* <li><Link href="/donate">Donate</Link></li> */}
                <li><Link href="/login">Login</Link></li>    
                <li><Link href="/admin">Admin</Link></li> 
                <li><MobileDropdown /></li>   
           
            </ul>
        </div>
    )
}
