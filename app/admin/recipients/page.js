import LoginForm from '@/components/Forms/loginForm'
import { AdminRecipients } from '@/components/Recipients/adminRecipients'
import adminStyles from '@/app/admin/admin.module.css'
export default function Admin (){
    return (
            
            <div className={adminStyles.recipients}>
                <AdminRecipients />
            </div>
            
        
    )
}