import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/authOptions"
import { User } from "@/Components/Users/single"
import { EditProfile } from "@/Components/Forms/editProfile"
import { getUser } from "@/app/actions";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Suspense } from "react";

export default async function Profile(){
    const session = await getServerSession(authOptions)
    const res = await getUser(session.user.id)
    const user = JSON.parse(JSON.stringify(res))
    
    return (
        <div className="flex gap-4 flex-wrap max-w-full">
            <Suspense fallback={<Skeleton><SkeletonCircle></SkeletonCircle><SkeletonText></SkeletonText></Skeleton>}>
                <User user={user}/>
            </Suspense>
            <EditProfile 
            user={user}
            />
        </div>
    )
}
