import LoginForm from '@/components/forms/loginForm'
import { TransparentHeader } from '@/components/Headers/transparentHeader'
import style from '@/app/login/login.module.css'
export default async function Login () {
    return (
        <div className="h-[100vh] ">
            <TransparentHeader
            bgColor={'bg-slate-900 shadow-md'}
            />
            <div className={style.container}>
                <h1 className="p-5 text-3xl">Login</h1>
                <LoginForm />
            </div>
        </div>
        
    )
}