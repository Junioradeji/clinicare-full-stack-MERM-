import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateLoginSchema } from "@/utils/dataSchema";
import { toast } from "sonner";
import ErrorAlert from "@/components/ErrorAlert";
import {
  RiUser2Fill,
  RiUser2Line,
  RiUser4Fill,
  RiUser4Line,
  RiUser6Line,
  RiUserAddFill,
} from "@remixicon/react";
import { registerUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contextstore";

export default function SignUp() {
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateLoginSchema),
  });

  // const queryClient = useQueryClient() //intializing our query client from tanstack
  const { setAccessToken } = useAuth();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      //what you want to do if the api call is a success

      toast.success(response?.data?.message || "Registration successful");
      //save accessToken
      setAccessToken(response?.data?.data?.accessToken);
    },
    onError: (error) => {
      console.log(error);
      setError(error?.response?.data?.message || "Registraction failed");
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data); //submitting our form to our mutation function to help us make the api call using our registerUser api
  };

  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center bg-slate-100 border-blue-500 px-5">
      <div className="bg-white shadow-md rounded-xl p-2 md:p-4 w-full max-w-[400px]">
        {/* Logo & Title */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center py-2 border-blue-500 border h-10 w-10 rounded-full">
            <RiUser4Fill className=" text-blue-500 " />
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold">Create Account</h1>
            <p className="text-gray-500 text-sm">
              Enter your details to sign up
            </p>
          </div>
        </div>
        {error && <ErrorAlert error={error} />}
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="fieldset ">
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Full name</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Full name"
                  {...register("fullname")}
                  id="fullname"
                />
              </fieldset>
              {errors.fullname?.message && (
                <span className="text-xs text-red-500">
                  {errors.fullname?.message}
                </span>
              )}
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  {...register("email")}
                  id="email"
                />
              </fieldset>
              {errors.email?.message && (
                <span className="text-xs text-red-500">
                  {errors.email?.message}
                </span>
              )}
            </div>

            <div>
              <fieldset className="fieldset relative">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type={isVisible ? "text" : "password"}
                  className="input w-full"
                  placeholder="Password"
                  {...register("password")}
                  id="password"
                />
                <button
                  type="button"
                  className="absolute bottom-3 font-bold insert-y-0 right-2 border-0 cursor-pointer"
                  onClick={togglePassword}
                >
                  {isVisible ? "Hide" : "Show"}
                </button>
              </fieldset>
              {errors.password?.message && (
                <span className="text-xs text-red-500">
                  {errors.password?.message}
                </span>
              )}
            </div>

            <button
              className="btn btn-soft text-white bg-blue-500 hover:bg-blue-700 w-full mt-4"
              type="submit"
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending
                ? "creating Account..."
                : "Create Account"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/account/signin" className="text-blue-500 font-bold">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
