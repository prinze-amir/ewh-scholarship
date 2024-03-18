'use client'
import Link from 'next/link'
import headerStyles from '@/components/Headers/header.module.css'
 export const Header = () => {

  
    return (
        <div className={headerStyles.divContainer}>
            <Link href="/"><h1>EWH Scholarships</h1></Link>
            <ul className={headerStyles.navmenu}>
                <li><Link href="/recipients">Recipients</Link></li>
                <li><Link href="/apply">Apply</Link></li>
                <li><Link href="/donate">Donate</Link></li>
                <li><Link href="/login">Login</Link></li>    
           
            </ul>
        </div>
    )
}
