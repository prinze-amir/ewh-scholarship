import { authOptions } from "@/auth/authOptions";
import { getServerSession } from "next-auth";
import { SignOutButton } from "@/components/forms/signOutButton";
import { defaultUserPic, wait } from "@/utilities/defaults";
import Image from "next/image";
export const User = async ({user}) => {
    const session = await getServerSession(authOptions)
    if (user === undefined) {
        user = session.user;
    }
    const role = user?.role?.isSuperAdmin ? 'Super Admin': 'Admin'
    return (
        <div className="p-4 rounded-lg my-3 bg-slate-400 shadow-sm flex flex-col gap-2 h-fit w-fit">
            <Image src={user?.image?.src || defaultUserPic} alt="Profile-Image" className="p-1 rounded-full" width={100} height={100} />
            <h1 className="text-lg">{user?.name} is logged in.</h1>
            <h1>Privileges: {role}</h1>
            <SignOutButton/>  
        </div>
    )
}