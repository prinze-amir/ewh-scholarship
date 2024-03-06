import LoginForm from '@/components/Forms/loginForm'
import style from '@/app/login/login.module.css'
export default function Login () {
    return (
        <div className={style.container}>
            <h1 class="p-5 text-3xl">Login</h1>
            <LoginForm />
        </div>
    )
}