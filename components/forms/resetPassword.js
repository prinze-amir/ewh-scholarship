"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { accentColor } from "@/utilities/theme";
import { sendResetPasswordEmail, resetPassword} from "@/app/password-reset/actions";
import { Spinner } from "@chakra-ui/react";
export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [ color, setColor] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const router = useRouter();
  useEffect(() => {
    setColor(accentColor);
  },[]);

  useEffect(() => {
    if (!token || !email) {
        return;
    }
  
  }, [token, email]);



  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
        const result = await resetPassword(email, token, password);
        console.log(result, 'result')
        if (result.error) {
            setError(result.error);
            return;
        }
        setSuccess("Password reset successfully");
    } catch (e) {
      // Handle response, e.g., redirect to login page or show error
      console.error(e);
      setError(e.message);
    } finally {
        setLoading(false);
        router.push('/login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = e.target[0].value;

      const sendEmail = await sendResetPasswordEmail(email);
      if (sendEmail.error) {
        setError(sendEmail.error);
        return;
      }
      setSuccess("Password reset link sent to your email");
      console.log(sendEmail, "sendEmail Token");
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
        setLoading(false);
        }
  };
  if (success){
    return (
        <>
            <h1 className="text-2xl p-2 m-2">Password Reset</h1>
            <p className="mb-3 text-md">{success}</p>
            <Link href="/login">
            <button
                className="rounded-lg text-white shadow-md hover:bg-slate-500 hover:p-3 bg-teal-400 my-3 p-3"
                type="submit"
            >
                Go Back
            </button>
            </Link>
        </>
        );

  }

  if (!token || !email) {
    return (
      <>
        <Link href="/">
          <Image id="logo"
            className="rounded-full shadow-lg hover:bg-slate-200 p-3 bg-slate-100"
            src="/images/logo2.svg"
            alt="logo"
            width={200}
            height={200}
          />
        </Link>
        <h1 className="text-2xl p-2 m-2">Password Reset</h1>
        <p className="mb-3 text-md">
          Enter your email to send the password reset link to your email
        </p>
        {error && (
          <p className="text-red-500 mb-4 rounded-lg p-3 bg-slate-100 border">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="shadow-lg rounded-xl p-4 bg-slate-100"
        >
          <div className="flex flex-col gap-2 md:w-[400px]">
            <input
              className="h-10 border p-2 rounded-lg mb2"
              type="email"
              required
              autoComplete="email"
              placeholder="Email Address"
            />
          </div>
          <div className="flex justify-between gap-3">
           { !loading && <button
              className="rounded-lg text-white shadow-md hover:bg-slate-500 hover:p-3 bg-teal-400 my-3 p-3"
              type="submit"
            >
              Reset Password
            </button>}
            {loading && <Spinner size="xl" className="mt-3 ml-5" color={color} />}
            <Link href="/login">
              <button
                className="rounded-lg text-white shadow-md hover:bg-slate-500 hover:p-3 bg-zinc-400 my-3 p-3"
                type="submit"
              >
                Go Back
              </button>
            </Link>
          </div>
        </form>
      </>
    );
  }

 

  return (
    <>
      <h1 className="text-xl p-2 m-2">Enter your new password</h1>
      {error && (
        <p className="text-red-500 mb-4 rounded-lg p-3 bg-slate-100 border">
          {error}
        </p>
      )}

      <div className="shadow-lg rounded-xl p-4 bg-slate-100 flex md:flex-row flex-col gap-4 ">
        <input
          className="p-2 my-2 rounded-md"
          autoComplete="new-password"
          name="new-password"
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        <input
          className="p-2 rounded-md my-2"
          autoComplete="new-password"
          name="confirm-password"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm Password"
        />
        <button
          className=" hover:bg-slate-400 rounded-3xl p-3 bg-zinc-800 text-white"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
    </>
  );
}
