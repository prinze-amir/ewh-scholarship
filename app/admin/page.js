import LoginForm from '@/components/Forms/loginForm'
export default function Admin (){
    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"70vh", flexFlow:"column"}}>
            <h1 class="p-5 text-3xl">Login</h1>
            <LoginForm />
        </div>
    )
}