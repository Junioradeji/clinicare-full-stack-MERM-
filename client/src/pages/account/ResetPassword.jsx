import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/utils/dataSchema";
import { toast } from "sonner";
import { RiLockFill, RiLockPasswordFill } from "@remixicon/react";
import ErrorAlert from "@/components/ErrorAlert";
import { resetPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router";

export default function ResetPassword() {
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // look for values on our url bar
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  // console.log({email, token});

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      navigate("/account/signin")
    },

    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message);
    },
  });

  const onFormSubmit = async (data) => {
    const userData = { ...data, email, token };
    mutation.mutate(userData);
  };

  const togglePassword = () => setIsVisible((prev) => !prev);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-5">
      <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-sm">
        {/* Icon & Title */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center py-2 border-blue-500 border h-10 w-10 rounded-full">
            <RiLockFill className="text-blue-500 rounded-full" />
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold">Create New Password</h1>
            <p className="text-gray-500 text-sm px-4">
              Please enter a new password. Your new password must be different
              from your previous password.
            </p>
          </div>
        </div>
        {error && <ErrorAlert error={error} />}

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-4">
          {/* New Password */}
          <div>
            <fieldset className="fieldset relative">
              <legend className="fieldset-legend">Password</legend>
              <input
                type={isVisible ? "text" : "password"}
                className="input"
                placeholder="password"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute bottom-3 right-2 text-xs font-semibold cursor-pointer"
                onClick={togglePassword}
              >
                {isVisible ? "Hide" : "Show"}
              </button>
            </fieldset>
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <fieldset className="fieldset relative ">
              <legend className="fieldset-legend">Confirm Password</legend>
              <input
                type={isVisible ? "text" : "password"}
                className="input"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                className="absolute bottom-3 right-2 text-xs font-semibold cursor-pointer"
                onClick={togglePassword}
              >
                {isVisible ? "Hide" : "Show"}
              </button>
            </fieldset>
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="btn btn-soft text-white bg-blue-500 hover:bg-blue-700 w-full mt-2"
            type="submit"
            disabled={isSubmitting || mutation.isPending}
          >
            {isSubmitting || mutation.isPending ? "Resetting..." : "Reset"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center text-gray-600 text-sm">
          Remembered your password?{" "}
          <a
            href="/account/signin"
            className="text-blue-500 font-bold hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
