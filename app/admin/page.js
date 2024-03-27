import LoginForm from '@/components/Forms/loginForm'
import { Count } from '@/components/Recipients/count'
import { getAllRecipients } from '@/lib/mongo/recipients'
import { AdminRecipients } from '@/components/Recipients/adminRecipients'
import adminStyles from '@/app/admin/admin.module.css'
import {Search} from '@/components/Filters/search'
export default async function Admin (){
    const response = await getAllRecipients();
    const allRecipients = JSON.parse(JSON.stringify(response));

    return (
        <div className={adminStyles.dashboardGrid}>

            <div id="totalRecipients" className={adminStyles.count}>
                <Count />
            </div>
            <div className={adminStyles.recipients}>
                <Search theme={'white'}/>

                <AdminRecipients allRecipients={allRecipients} />

            </div>
            
        </div>
    )
}