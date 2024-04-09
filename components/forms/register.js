import { addNewUser } from "@/app/actions"
import { accentColor } from "@/utilities/theme"
import {Heading} from '@chakra-ui/react'
export const RegisterForm = () => {
    
    return (
        <div className=' flex flex-col justify-center p-5 bg-slate-100 rounded-xl gap-4 w-[50%]'>
            <Heading>Add New User</Heading>
            <form action={addNewUser} className=" flex flex-col m-2 gap-2 justify-center">
                <label htmlFor="name">Name</label>
                <input className="border p-2 rounded-lg" type="text" name="name" id="name" required />
                <label htmlFor="email">Email</label>
                <input className="border p-2 rounded-lg" type="email" name="email" required id="email" autoComplete="username" />
                <label htmlFor="password">Password</label>
                <input className="border p-2 rounded-lg" type="password" autoComplete="new-password" name="password" id="password" required />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input className="border p-2 rounded-lg" type="password" autoComplete="new-password" name="confirmPassword" id="confirmPassword" required />
                <label htmlFor="access">Role</label>
                <select className="border p-2 rounded-lg" name="access" id="access">
                    <option value={"admin"}>Admin</option>
                    <option value="superAdmin">Super Admin</option>
                </select>
                <button style={{backgroundColor:accentColor}} className="p-3 rounded-lg w-fit shadow-md" type="submit">Add New User</button>
            </form>
        </div>
    )
}