import adminStyles from './admin.module.css'
import Link from 'next/link'
export default function AdminLayout({ children }) {

  return (
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
  )
}
