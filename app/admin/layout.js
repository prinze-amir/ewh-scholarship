import adminStyles from './admin.module.css'
import Link from 'next/link'
import { ChakraProvider } from '@chakra-ui/react'

export default function AdminLayout({ children }) {

  return (
    <ChakraProvider>
        <section className={adminStyles.adminContiainer}>
                <div id="adminNav" className={adminStyles.nav}>
                    <ul>
                        <Link href="/admin"><li>Home</li></Link>
                        <li>Recipients</li>
                        <li>Donors</li>
                        <Link href="/admin/settings"><li>Settings</li></Link>                    
                        <li><input placeholder="Search Recipients"/></li>

                    </ul>
                </div>
          {children}
        </section>
    </ChakraProvider>
  
   
  )
}
