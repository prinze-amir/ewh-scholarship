import LoginForm from '@/Components/Forms/loginForm'
import { Count } from '@/Components/Recipients/count'
import { getAllRecipients } from '@/lib/mongo/recipients'
import { AdminRecipients } from '@/Components/Recipients/adminRecipients'
import adminStyles from '@/app/admin/admin.module.css'
import {Search} from '@/Components/Filters/search'
import { accentColor } from '@/utilities/theme'

export default async function Admin (){
    const limit = 3;
    const {recipients, pages} = await getAllRecipients(0,limit);
    const allRecipients = JSON.parse(JSON.stringify(recipients));

    return (
        <div className={adminStyles.dashboardGrid}>

            <div id="totalRecipients" style={{backgroundColor:accentColor}} className={adminStyles.count}>
                <Count />
            </div>
            <div className={adminStyles.recipients}>
                <Search theme={'white'}/>

                <AdminRecipients limit={limit} pages={pages} allRecipients={allRecipients} />

            </div>
            
        </div>
    )
}