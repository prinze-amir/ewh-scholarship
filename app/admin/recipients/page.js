import { AdminRecipients } from '@/components/Recipients/adminRecipients'
import { getAllRecipients } from '@/lib/mongo/recipients'
import adminStyles from '@/app/admin/admin.module.css'
import {Search} from '@/components/Filters/search'
export default async function Admin (){
    const limit = 4
    const {recipients} = await getAllRecipients(0,limit);
    const {total} = await getAllRecipients();
    const allRecipients = JSON.parse(JSON.stringify(recipients));
    const pages = Math.ceil(total / limit);
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