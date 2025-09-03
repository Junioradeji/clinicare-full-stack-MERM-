import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RiLockFill, RiUser4Fill } from "@remixicon/react";
import { forgotPasswordSchema } from "@/utils/dataSchema";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";

export default function ForgotPassword() {
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Password reset link sent");
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Reset failed");
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center bg-slate-100 px-5 md:py-50 lg:py-10 py-15 ">
      <div className="bg-white shadow-md rounded-xl p-2 md:p-4 w-full max-w-sm">
        <div className="flex flex-col items-center">
          <div className="flex justify-center py-2 border-blue-500 border h-10 w-10 rounded-full">
            <RiLockFill className="text-blue-500 rounded-full " />
          </div>
          <div className="mt-4 md:mt-7 lg:mt-0 text-center">
            <h1 className="text-xl font-bold">Forgot Password?</h1>
            <p className="text-gray-500 text-sm mt-4">
              Enter your email address and we'll send you a code to reset your
              password.
            </p>
          </div>
        </div>
        {error && <ErrorAlert error={error} />}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="fieldset p-4">
            {/* Email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input"
                placeholder="Enter your email"
                {...register("email")}
              />
            </fieldset>
            {errors.email?.message && (
              <span className="text-xs text-red-500">
                {errors.email?.message}
              </span>
            )}

            {/* Submit Button */}
            <button
              className="btn btn-soft text-white bg-blue-500 hover:bg-blue-700 w-full mt-4"
              type="submit"
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending ? "Sending..." : "Send Link"}
            </button>
          </div>
        </form>

        {/* Back to Login Link */}
        <div className="mt-4 text-center text-gray-600 text-sm">
          Remembered your password?{" "}
          <a href="/account/signin" className="text-blue-500 font-medium">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
