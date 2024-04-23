import { Count } from '@/components/Recipients/counts'
import { getAllRecipients } from '@/lib/mongo/recipients'
import { AdminRecipients } from '@/components/Recipients/adminRecipients'
import adminStyles from '@/app/admin/admin.module.css'
import {Search} from '@/components/Filters/search'
import { accentColor } from '@/utilities/theme'
import {User} from '@/components/Users/single'
import { Suspense } from 'react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { ThemeButton } from '@/components/Buttons/themeButton'
import { ThemeDiv } from '@/utilities/theme'
export default async function Admin (){
    const limit = 3;
    const {recipients} = await getAllRecipients(0,limit);
    const {total} = await getAllRecipients();
    const allRecipients = JSON.parse(JSON.stringify(recipients));
    const pages = Math.ceil(total / limit);
    
    return (
        <div className={adminStyles.dashboardGrid}>
                
            <div className="flex flex-col gap-3">
            <Suspense fallback={<div className="bg-white p-4 h-[245px] rounded-lg flex flex-col gap-4 mt-1 w-fit mb-4" ><SkeletonCircle size="80px"></SkeletonCircle><SkeletonText width="210px" noOfLines={3} spacing='4'></SkeletonText></div>}>
                <User />
            </Suspense>
            <ThemeButton text="Add New Recipient" theme="dark" link="/apply" />

            <Suspense fallback={<Skeleton height="210px" width="420px" rounded="lg"/>}>
                <ThemeDiv style={adminStyles.count}>
                    <Count />
                </ThemeDiv>
               
            </Suspense>
            </div>                

            <div className={adminStyles.recipients}>
                    <Search theme={'white'}/>
                    <AdminRecipients
                    pages={pages}  
                    limit={limit} 
                    allRecipients={allRecipients} 
                    />
            </div>


        </div>
    )
}