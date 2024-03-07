import ProfileLayout from "../components/layout/ProfileLayout";
import ProfileInputField from "../components/input/ProfileInputField";
import ProfileImage from "../components/input/ProfileImage";
import schemas from "../schemas";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";

export default function ProfileDetails() {
   // Get the form data from the Redux store
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schemas.profileDetailsSchema),
      defaultValues: formDataFromRedux || {
         firstName: "",
         lastName: "",
         email: "",
         photo: ""
      },
   });

  
   const [loading, setLoading] = useState(false);
   const [imageFile, setImageFile] = useState(null);

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setSelectedImage(URL.createObjectURL(file));
         setImageFile(file);
      } else {
         setSelectedImage(null);
         return null;
      }
   };

   

   async function onSubmit(data) {
      console.log(data)
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
                  />
                  <ProfileInputField
                     name="lastName"
                     type="text"
                     label="Last name"
                     placeholder="Wright"
                     fieldName={register("lastName")}
                     errorMessage={errors.lastName?.message}
                  />
                  <ProfileInputField
                     name="email"
                     type="email"
                     label="Email Address"
                     placeholder="e.g. alex@email.com"
                     fieldName={register("email")}
                     errorMessage={errors.email?.message}
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
