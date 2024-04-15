import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/authOptions"
import { User } from "@/Components/Users/single"
import { EditProfile } from "@/Components/Forms/editProfile"
import { getUser } from "@/app/actions";

export default async function Profile(){
    const session = await getServerSession(authOptions)
    const res = await getUser(session.user.id)
    const user = JSON.parse(JSON.stringify(res))
   // console.log(user, 'user model')
    
    return (
        <div className="flex gap-4 flex-wrap max-w-full">
            <User user={user}/>
            <EditProfile 
            user={user}
            />
        </div>
    )
}