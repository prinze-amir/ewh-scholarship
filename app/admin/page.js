import LoginForm from '@/components/Forms/loginForm'
import { Count } from '@/components/Recipients/count'
import { AdminRecipients } from '@/components/Recipients/adminRecipients'
import Link  from 'next/link'
import adminStyles from '@/app/admin/admin.module.css'
export default function Admin (){
    return (
        <div className={adminStyles.dashboardGrid}>
            
            <div id="totalRecipients" className={adminStyles.count}>
                <Count />
            </div>
            <div className={adminStyles.recipients}>
                <AdminRecipients />

            </div>
            
        </div>
    )
}