import { Count } from '../../Components/Recipients/count'
import { getAllRecipients } from '@/lib/mongo/recipients'
import { AdminRecipients } from '@/Components/Recipients/adminRecipients'
import adminStyles from '@/app/admin/admin.module.css'
import {Search} from '@/Components/Filters/search'
import { accentColor } from '@/utilities/theme'
import {User} from '@/Components/Users/single'

export default async function Admin (){
    const limit = 3;
    const {recipients} = await getAllRecipients(0,limit);
    const allRecipients = JSON.parse(JSON.stringify(recipients));
    const pages = Math.ceil(allRecipients.length / limit);
    
    return (
        <div className={adminStyles.dashboardGrid}>
                
            <div>
            <User />
            <div id="totalRecipients" style={{backgroundColor:accentColor}} className={adminStyles.count}>
                <Count />
            </div> 
            </div>
           
            <div className={adminStyles.recipients}>
                <Search theme={'white'}/>
                <AdminRecipients limit={limit} pages={pages} allRecipients={allRecipients} />
            </div>
            
        </div>
    )
}