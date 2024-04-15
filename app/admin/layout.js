import adminStyles from './admin.module.css'
import Link from 'next/link'
import { MdHome, MdOutlineSettings, MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
export default function AdminLayout({ children }) {

  return (
        <section className={adminStyles.adminContainer}>
                <div id="adminNav" className={adminStyles.nav}>
                    <ul>
                        <Link href="/"><li className="flex gap-1 items-center"><MdHome /><span>Home</span></li></Link>
                        <Link href="/admin"><li className="flex gap-1 items-center"><MdOutlineSpaceDashboard/><span>Dashboard</span></li></Link>
                        <Link href="/admin/recipients"><li className="flex gap-1 items-center"><FaUserGraduate/><span>Graduates</span></li></Link>
                        <Link href="/admin/profile"><li className="flex gap-1 items-center"><ImProfile/><span>Profile</span></li></Link>                    
                        <Link href="/admin/settings"><li className="flex gap-1 items-center"><MdOutlineSettings/><span>Settings</span></li></Link>                    

                    </ul>
                </div>

          {children}
        </section>
  
   
  )
}
