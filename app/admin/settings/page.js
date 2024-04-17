import ColorPicker from "@/components/Forms/colorPicker"
import { RegisterForm } from "@/components/Forms/newUserForm"
import { Users } from '@/components/users/user'
import { getUsers } from "@/app/actions"
import { Suspense } from "react";

export default async function Settings() {

    const users = await getUsers();
    //must convert to plain object to avoid mongoose error
    const usersArray = JSON.parse(JSON.stringify(users));

 return (
    <div className='flex gap-4 flex-wrap-reverse justify-center items-baseline'>
        <div className="flex flex-col gap-4">
            <ColorPicker />
            <Suspense fallback={<div>Loading...</div>}>
            <Users initialUsers={usersArray} />
            </Suspense>
        </div>
      
        <RegisterForm />
    </div>
    
  )
}



