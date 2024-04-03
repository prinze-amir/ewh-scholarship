import LoginForm from '@/components/Forms/loginForm'
import { AdminRecipients } from '@/components/Recipients/adminRecipients'
import { getAllRecipients } from '@/lib/mongo/recipients'
import adminStyles from '@/app/admin/admin.module.css'
import {Search} from '@/components/Filters/search'
export default async function Admin (){
    const {recipients} = await getAllRecipients(0,0);
    const allRecipients = JSON.parse(JSON.stringify(recipients));
    return (
            
            <div className={adminStyles.recipients}>
                <Search theme={'white'}/>
                <AdminRecipients allRecipients={allRecipients} />
            </div>
            
        
    )
}