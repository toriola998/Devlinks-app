import ProfileLayout from "../components/layout/ProfileLayout";
import ProfileInputField from "../components/input/ProfileInputField";
import ProfileImage from "../components/input/ProfileImage";
import schemas from "../schemas";
import user from "../api/user";

import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../redux/userSlice.js";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export default function ProfileDetails() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.profileDetailsSchema),
   });

   const dispatch = useDispatch();
   const email = useSelector((state) => state.user.email);
   console.log(email);
   const userData = useSelector((state) => state.user.userProfile);

   const [selectedImage, setSelectedImage] = useState(userData?.photo);
   const [loading, setLoading] = useState(false);
   const [imageFile, setImageFile] = useState(null);

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      console.log(file);
      if (file) {
         setSelectedImage(URL.createObjectURL(file));
         const fileReader = new FileReader();

         fileReader.onload = function (fileLoadedEvent) {
            const base64 = fileLoadedEvent.target.result; // <--- data: base64
            console.log(base64, "base 64");
            setImageFile(base64);
         };

         fileReader.readAsDataURL(file);
      } else {
         setSelectedImage(null);
         return null;
      }
   };

   async function onSubmit(data) {
      console.log(data, "all data");
      console.log(imageFile);
      const payload = {
         photo: imageFile,
         firstName: data.firstName,
         lastName: data.lastName,
         profileEmail: data.email,
         // profileColorTheme:
      };
      try {
         setLoading(true);
         const response = await user.updateUser(payload, email);
         console.log(response);
         dispatch(saveProfile({ ...payload }));
         toast.success("Profile details successfully saved!");
      } catch (err) {
         console.log(err);
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
         <ProfileLayout
            title="Profile Details"
            subtitle="Add your details to create a personal touch to your profile."
         >
            <ProfileImage
               selectedImage={selectedImage}
               handleImageChange={handleImageChange}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="bg-light-grey p-5 rounded-xl mt-6 flex flex-col gap-2 md:gap-3">
                  <ProfileInputField
                     name="firstName"
                     type="text"
                     label="First name"
                     placeholder="Ben"
                     fieldName={register("firstName")}
                     errorMessage={errors.firstName?.message}
                     defaultValue={userData.firstName}
                  />
                  <ProfileInputField
                     name="lastName"
                     type="text"
                     label="Last name"
                     placeholder="Wright"
                     fieldName={register("lastName")}
                     errorMessage={errors.lastName?.message}
                     defaultValue={userData.lastName}
                  />
                  <ProfileInputField
                     name="email"
                     type="email"
                     label="Email Address"
                     placeholder="e.g. alex@email.com"
                     fieldName={register("email")}
                     errorMessage={errors.email?.message}
                     defaultValue={userData.profileEmail}
                  />
               </div>

               <div className="save-btn">
                  <div className="md:flex justify-end">
                     <button className="purple-btn my-6 w-full md:w-auto">
                        {loading ? <span className="loader"></span> : "Save"}
                     </button>
                  </div>
               </div>
            </form>
         </ProfileLayout>
      </>
   );
}
