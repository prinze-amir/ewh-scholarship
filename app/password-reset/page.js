import { TransparentHeader } from '@/components/Headers/transparentHeader';
import ResetPasswordForm from '@/components/forms/resetPassword';
import Image from 'next/image';
import Link from 'next/link';
export default async function PasswordResetPage() {
  return (
    <div>
            <TransparentHeader bgColor="bg-zinc-800"/>
    <div className="flex flex-col items-center  place-content-center self-center h-[100vh]">
        <ResetPasswordForm/>
    
    </div>
    </div>
    
  );
}