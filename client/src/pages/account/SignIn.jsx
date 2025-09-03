import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ErrorAlert from "@/components/ErrorAlert";
import { RiUser4Fill } from "@remixicon/react";
import { validateSignInSchema } from "@/utils/dataSchema";
import { loginUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contextstore";
import { useNavigate } from "react-router";

export default function SignIn() {
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateSignInSchema),
  });

  const {setAccessToken, user} = useAuth()
  const navigate = useNavigate();
      const mutation = useMutation({
        mutationFn: loginUser,
    onSuccess: (response)=> { //what you want to do if the api call is a success
      // console.log(response); //remove the response when you are done using it
      toast.success(response?.data?.message || "Login successful") 
      setAccessToken(response?.data?.data?.accessToken)
      if (!user?.isVerified) {
        navigate("/verify-account")
      }
      //save accessToken
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Login failed")
      
      
    },
    
      })
    
       const onSubmit = async (data) => {
mutation.mutate(data); //submitting our form to our mutation function to help us make the api call using our registerUser api
  }

  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center bg-slate-100 px-5 py-10 lg:py-0">
      <div className="bg-white shadow-md rounded-xl p-2 md:p-4 w-full max-w-sm">
        {/* Logo & Title */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center py-2 border-blue-500 border h-10 w-10 rounded-full">
            <RiUser4Fill className="text-blue-500" />
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 text-sm pr-4">Glad to see you again. Log in to your account.</p>
          </div>
        </div>

        {error && <ErrorAlert error={error} />}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="fieldset ">
            {/* Email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
                {...register("email")}
              />
            </fieldset>
            {errors.email?.message && (
              <span className="text-xs text-red-500">
                {errors.email?.message}
              </span>
            )}

            {/* Password */}
            <fieldset className="fieldset relative">
              <legend className="fieldset-legend">Password</legend>
              <input
                type={isVisible ? "text" : "password"}
                className="input w-full"
                placeholder="Password"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute bottom-3 right-2 text-xs font-bold cursor-pointer"
                onClick={togglePassword}
              >
                {isVisible ? "Hide" : "Show" }
              </button>
            </fieldset>
            {errors.password?.message && (
              <span className="text-xs text-red-500">
                {errors.password?.message}
              </span>
            )}

            {/* Forgot Password Link */}
            <div className="flex ">
              <a
                href="/account/forgotpassword"
                className="text-blue-500 text-sm hover:underline font-bold "
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              className="mt-2 btn btn-soft text-white bg-blue-500 hover:bg-blue-700 w-full "
              type="submit"
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-4 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a href="/account/signup" className="text-blue-500 font-medium">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
