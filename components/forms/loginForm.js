"use client";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { accentColor } from "@/utilities/theme";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@chakra-ui/react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [color, setColor] = useState('');
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
   const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setColor(accentColor)
  } ,[]);

  useEffect(() => {
    if (session) {
      router.push('/admin');  // Redirect to dashboard if logged in
    }
  }, [session, router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(form)
    setLoading(true);

    try{
      const resp = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (resp.error) {
        setError(resp.error);
        return;
      }
     // router.push("/admin");
    } catch(e){
      console.error(e)
      setError(e.message);
    }
    finally {
      setLoading(false);
    }

  }

  const showPassword = () => {
    const password = document.getElementById('password');
    if (password.type === 'password') {
      password.type = 'text';
      document.getElementById('show').classList.add('hidden');
      document.getElementById('hide').classList.remove('hidden');
    } else {
      password.type = 'password';
      document.getElementById('show').classList.remove('hidden');
      document.getElementById('hide').classList.add('hidden');
    }
  }

  return (
    <div className="w-full max-w-xs">
      <form className="bg-slate-100 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email Address"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex relative">
             <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="******************"
            onChange={(e) => setForm({ ...form, password: e.target.value })}

          />
          <FaRegEye id="show" onClick={showPassword} className="absolute text-zinc-400 right-2 top-2 z-3 text-2xl" />
          <FaRegEyeSlash id="hide"onClick={showPassword} className="absolute hidden right-2 top-2 z-3 text-2xl" />
          </div>
         
          <p className="text-red-500 text-xs italic">
            {error ? error : ""}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Button isLoading={loading} bgColor={color} color='white' rounded="lg" 
          _hover={{backgroundColor: '#333',shadow: 'md'}}
          _active={{p:3}}
           my={3} shadow="md"
            
            type="submit"
          >
            Sign In
          </Button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/password-reset"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      {/* <button
          className="bg-white shadow-md hover:bg-slate-900 hover:text-white text-slate-800 font-bold py-2 px-4 mx-auto my-3 rounded-lg flex gap-3"
          onClick={() => signIn("google")}
        >
          <FcGoogle className="text-2xl" /> Sign in with Google
        </button> */}
      <p className="text-center text-gray-500 text-xs">
        &copy;2024 WeArePlu2o. All rights reserved.
      </p>
    </div>
  );
};

export default LoginForm;
