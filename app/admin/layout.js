import adminStyles from './admin.module.css'
import Link from 'next/link'

export default function AdminLayout({ children }) {

  return (
        <section className={adminStyles.adminContainer}>
                <div id="adminNav" className={adminStyles.nav}>
                    <ul>
                        <Link href="/"><li>Home</li></Link>
                        <Link href="/admin"><li>dasboard</li></Link>
                        <Link href="/admin/recipients"><li>Recipients</li></Link>
                        <Link href="/admin/settings"><li>Settings</li></Link>                    

                    </ul>
                </div>

          {children}
        </section>
  
   
  )
}
