import LoginForm from '@/components/forms/loginForm'
import { TransparentHeader } from '@/components/Headers/transparentHeader'
import style from '@/app/login/login.module.css'
import Image from 'next/image'
import Link from 'next/link'
export default async function Login () {
    return (
        <div className="h-[100vh] ">
            {/* <TransparentHeader
            bgColor={'bg-neutral-800 shadow-md'}
            /> */}
            <div className={style.container}>
                <Link href="/"><Image className="mt-20 bg-slate-200 p-5 rounded-full hover:bg-slate-100" src="/images/logo2.svg"alt="logo" width={150} height={150} /></Link>
                <h1 className="text-2xl font-semibold my-4">EWH Scholarship Fund</h1>
                <LoginForm />
            </div>
        </div>
        
    )
}