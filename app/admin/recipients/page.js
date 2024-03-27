import LoginForm from '@/components/Forms/loginForm'
import { AdminRecipients } from '@/components/Recipients/adminRecipients'
import { getAllRecipients } from '@/lib/mongo/recipients'
import adminStyles from '@/app/admin/admin.module.css'
import {Search} from '@/components/Filters/search'
export default async function Admin (){
    const response = await getAllRecipients();
    const allRecipients = JSON.parse(JSON.stringify(response));
    return (
            
            <div className={adminStyles.recipients}>
                <Search theme={'white'}/>
                <AdminRecipients allRecipients={allRecipients} />
            </div>
            
        
    )
}