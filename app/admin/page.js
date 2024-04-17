import { Count } from '@/components/Recipients/counts'
import { getAllRecipients } from '@/lib/mongo/recipients'
import { AdminRecipients } from '@/components/Recipients/adminRecipients'
import adminStyles from '@/app/admin/admin.module.css'
import {Search} from '@/components/Filters/search'
import { accentColor } from '@/utilities/theme'
import {User} from '@/components/Users/single'
import { Suspense } from 'react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export default async function Admin (){
    const limit = 3;
    const {recipients} = await getAllRecipients(0,limit);
    const allRecipients = JSON.parse(JSON.stringify(recipients));
    const pages = Math.ceil(allRecipients.length / limit);
    
    return (
        <div className={adminStyles.dashboardGrid}>
                
            <div>
            <Suspense fallback={<div className="bg-white p-4 h-[245px] rounded-lg flex flex-col gap-4 mt-1 w-fit mb-4" ><SkeletonCircle size="80px"></SkeletonCircle><SkeletonText width="210px" noOfLines={3} spacing='4'></SkeletonText></div>}>
                <User />
            </Suspense>
            <div id="totalRecipients" style={{backgroundColor:accentColor}} className={adminStyles.count}>
                <Suspense fallback={<div className="h-[200px] w-[300px]">Loading...</div>}>
                <Count />
                </Suspense>
            </div> 
            </div>
        <Suspense fallback={<div>Loading...</div>}>

            <div className={adminStyles.recipients}>
                <Search theme={'white'}/>
                    <AdminRecipients limit={limit} pages={pages} allRecipients={allRecipients} />
            </div>
                            </Suspense>

        </div>
    )
}