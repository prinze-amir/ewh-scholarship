'use client'
import Link from 'next/link'
 export const TransparentHeader = () => {

    const headerStyles = {
        divContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'rgb(51 51 51 / 20%)',
            position:"relative",
            color: '#fff',
            width: '100%',
            zIndex: '31',
        },
        navmenu: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            listStyle: 'none',
            width: '30%'
        }
     }
    return (
        <div style={headerStyles.divContainer}>
            <Link href="/"><h1>EWH Scholarships</h1></Link>
            <ul style={headerStyles.navmenu}>
                <li><Link href="/recipients">Recipients</Link></li>
                <li><Link href="/apply">Apply</Link></li>
                <li><Link href="/donate">Donate</Link></li>
                <li><Link href="/login">Login</Link></li>    
           
            </ul>
        </div>
    )
}
