import InputField from "../components/input/InputField";
import AuthLayout from "../components/layout/AuthLayout";
import auth from "../api/auth";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemas from "../schemas";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Signup() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.signupSchema),
   });

   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   async function onSubmit(formData) {
      let payload = {
         email: formData?.email,
         password: formData?.password,
      };
      try {
         setLoading(true);
         const response = await auth.register(payload);
         const token = response?.data?.token;
         localStorage.setItem("token", token);
         if (token) {
            navigate("/customize-links", { replace: true });
         }
      } catch (err) {
         const errorMsg = err?.response?.data?.msg;
         if (errorMsg) {
            toast.error(errorMsg);
         } else toast.error("Something seems wrong, try again later!");
      } finally {
         setLoading(false);
      }
   }
   return (
      <>
         <AuthLayout
            title="Create Account"
            subtitle="Let's get you started sharing your links!"
            authText="Already have an account?"
            ctaText="Login"
            ctaLink="/"
         >
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="flex flex-col gap-6"
            >
               <InputField
                  name="email"
                  type="email"
                  label="Email Address"
                  icon="/images/icons/email.svg"
                  placeholder="e.g. alex@email.com"
                  fieldName={register("email")}
                  errorMessage={errors.email?.message}
               />
               <InputField
                  name="password"
                  type="password"
                  label="Password"
                  icon="/images/icons/password.svg"
                  placeholder="At least 8 characters"
                  fieldName={register("password")}
                  errorMessage={errors.password?.message}
               />
               <InputField
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  icon="/images/icons/password.svg"
                  placeholder="At least 8 characters"
                  fieldName={register("confirmPassword")}
                  errorMessage={errors.confirmPassword?.message}
               />
               <button className="purple-btn my-6">
                  {loading ? (
                     <span className="loader"></span>
                  ) : (
                     "Create new account"
                  )}
               </button>
            </form>
         </AuthLayout>
      </>
   );
}
