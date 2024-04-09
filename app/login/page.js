import LoginForm from '@/Components/Forms/loginForm'
import { TransparentHeader } from '@/Components/Headers/transparentHeader'
import style from '@/app/login/login.module.css'
export default function Login () {
    return (
        <>
            <TransparentHeader
            bgColor={'bg-black'}
            />
            <div className={style.container}>
                <h1 className="p-5 text-3xl">Login</h1>
                <LoginForm />
            </div>
        </>
        
    )
}