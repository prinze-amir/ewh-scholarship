import Link from 'next/link'

 export const Header = () => {

    const headerStyles = {
        divContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'rgb(51 51 51 / 20%)',
            color: '#fff',
            position: 'absolute',
            width: '100%',
            zIndex: '3',
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
            <h1>EWH Scholarships</h1>
            <ul style={headerStyles.navmenu}>
                <li><Link href="/recipients">Recipients</Link></li>
                <li><Link href="/apply">Apply</Link></li>
                <li><Link href="/donate">Donate</Link></li>
                <li><Link href="/admin">Login</Link></li>    
            </ul>
        </div>
    )
}
