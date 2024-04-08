"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const LoginForm = () => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
     // router.push("/admin");
     console.log('user is logged in')
    }
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(form)
    try{
      const resp = await signIn("credentials", {
        email: form.email,
        password: form.password,
       // redirect: false,
      });
      if (resp.error) {
        setError(resp.error);
        return;
      }
      console.log(resp, 'this is the response')
    } catch(e){
      //console.error(e)
      console.log('this is the error', e.message)
    }
  }
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   console.log(form)
  //   try {
      
  //     const res = await fetch("/api/auth/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(form),
  //     });
  //     if (res.ok) {
  //       const user = await res.json();
  //      console.log(user)
  //     }
  //   }catch(e){
  //     console.error(e)
  //     console.log('error', e.message)
  //   }
    
  // }

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
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
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="******************"
            onChange={(e) => setForm({ ...form, password: e.target.value })}

          />
          <p className="text-red-500 text-xs italic">
            {error ? error : ""}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2024 WeArePlu2o. All rights reserved.
      </p>
    </div>
  );
};

export default LoginForm;
