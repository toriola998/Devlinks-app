import InputField from "../components/input/InputField";
import AuthLayout from "../components/layout/AuthLayout";
import auth from "../api/auth";

import { useDispatch } from "react-redux";
import { saveEmail, saveProfile, saveLinks } from "../redux/userSlice.js";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemas from "../schemas";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Login() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.loginSchema),
   });

   useEffect(() => {
      sessionStorage.clear();
  }, []);

   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   async function onSubmit(formData) {
      let payload = {
         email: formData?.email,
         password: formData?.password,
      };

      try {
         setLoading(true);
         const response = await auth.login(payload);
         const data = response?.data;
         const token = data?.token;
         sessionStorage.setItem("token", token);
         if (token) {
            navigate("/customize-links", { replace: true });
         }
         const { firstName, lastName, photo, profileEmail, colorTheme, links } =
            data;
         dispatch(saveEmail(payload?.email));
         dispatch(
            saveProfile({
               firstName,
               lastName,
               photo,
               profileEmail,
               colorTheme,
            })
         );
         dispatch(saveLinks(links));
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
            title="Login"
            subtitle="Add your details below to get back into the app"
            authText="Don't have an account?"
            ctaText="Create Account"
            ctaLink="/signup"
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
                  placeholder="Enter your password"
                  fieldName={register("password")}
                  errorMessage={errors.password?.message}
               />
               <button className="purple-btn my-6">
                  {loading ? <span className="loader"></span> : "Login"}
               </button>
            </form>
         </AuthLayout>
      </>
   );
}
