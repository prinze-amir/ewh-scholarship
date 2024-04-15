import LoginForm from '@/Components/Forms/loginForm'
import { AdminRecipients } from '@/Components/Recipients/adminRecipients'
import { getAllRecipients } from '@/lib/mongo/recipients'
import adminStyles from '@/app/admin/admin.module.css'
import {Search} from '@/Components/Filters/search'
export default async function Admin (){
    const limit = 4
    const {recipients} = await getAllRecipients(0,limit);
    const allRecipients = JSON.parse(JSON.stringify(recipients));
    const pages = Math.ceil(allRecipients.length / limit);
    return (
            
            <div className={adminStyles.recipients}>
                <Search theme={'white'}/>
                <AdminRecipients 
                pages={pages}
                limit={limit}
                allRecipients={allRecipients} />
            </div>
            
        
    )
}