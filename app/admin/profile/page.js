import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/authOptions"
import { User } from "@/components/users/single"
import { EditProfile } from "@/components/Forms/editProfile"
import { getUser } from "@/app/actions";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Suspense } from "react";

export default async function Profile(){
    const session = await getServerSession(authOptions)
    const res = await getUser(session.user.id)
    const user = JSON.parse(JSON.stringify(res))
    
    return (
        <div className="flex gap-4 flex-wrap max-w-full">
            <Suspense fallback={<div className="bg-white p-4 h-[245px] rounded-lg flex flex-col gap-4 mt-1" ><SkeletonCircle size="80px"></SkeletonCircle><SkeletonText width="210px" noOfLines={3} spacing='4'></SkeletonText></div>}>
                <User user={user}/>
            </Suspense>
            <EditProfile 
            user={user}
            />
        </div>
    )
}
