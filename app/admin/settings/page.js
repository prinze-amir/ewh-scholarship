import ColorPicker from "@/Components/Forms/colorPicker"
import { RegisterForm } from "@/Components/Forms/register"
export default async function Settings() {

 return (
    <div className='flex gap-4'>
        <ColorPicker />
        <RegisterForm />
    </div>
    
  )
}



