import EmptyLinksState from "../components/EmptyLinksState";
import ProfileLayout from "../components/layout/ProfileLayout";
import SaveButton from "../components/SaveButton";
import InputField from "../components/input/InputField";
import SelectDropdown from "../components/input/SelectDropdown";
import user from "../api/user.js";
import platforms from "../data/platformList.js";

import { useDispatch, useSelector } from "react-redux";
import { saveLinks } from "../redux/userSlice.js";
import { toast } from "react-toastify";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import schemas from "../schemas";
import InputSelect from "../components/input/InputSelect.jsx";

export default function CustomizeLinks() {
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();
   const email = useSelector((state) => state.user.email);
   const links = useSelector((state) => state.user.links);

   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      watch,
      setValue,
   } = useForm({
      resolver: yupResolver(schemas.linkSchema),
      // defaultValues: initialValues,
      defaultValues: {
         items: links, // Assuming `links` contains the initial values
      },
   });

   const { fields, append, remove } = useFieldArray({
      name: "items",
      control,
   });

   const [selectedPlatform, setSelectedPlatform] = useState(
      fields.map(() => ({
         name: "Github",
         icon: "github.svg",
      }))
   );

   async function onSubmit(data) {
      const payload = {
         links: data.items,
      };
      try {
         setLoading(true);
         const response = await user.updateUser(payload, email);
         console.log(response);
         dispatch(saveLinks(data?.items));
         toast.success("Links successfully saved!");
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
            title="Customize your links"
            subtitle="Add/edit/remove links below and then share all your profiles with the world!"
         >
            <button
               className="outline-btn"
               type="button"
               onClick={() => {
                  append({
                     link: "",
                     platform: { name: "Github", icon: "github.svg" },
                  });
               }}
            >
               + Add new link
            </button>
            {fields.length === 0 && <EmptyLinksState />}
            <form onSubmit={handleSubmit(onSubmit)}>
               {fields.length >= 1 && (
                  <div className="max-h-[400px] overflow-y-scroll modal-scroll mt-5 pr-5">
                     {fields.map((field, index) => {
                        return (
                           <section
                              key={field.id}
                              className="rounded-lg bg-light-grey p-4 mt-6"
                           >
                              <div className="flex-item justify-between">
                                 <div className="flex-item gap-x-2">
                                    <img
                                       src="/images/icons/highlight.svg"
                                       alt=""
                                    />
                                    <p className="text-grey-1 font-bold">
                                       Link #{index + 1}
                                    </p>
                                 </div>
                                 <button
                                    className="text-grey-1"
                                    type="button"
                                    onClick={() => remove(index)}
                                 >
                                    Remove
                                 </button>
                              </div>
                              <InputSelect
                                 label="Platform"
                                 options={platforms}
                              />

                              <SelectDropdown
                                 selectedPlatform={selectedPlatform[index]} // Pass the specific selectedPlatform
                                 setSelectedPlatform={(platform) => {
                                    const updatedPlatforms = [
                                       ...selectedPlatform,
                                    ];
                                    updatedPlatforms[index] = platform;
                                    setSelectedPlatform(updatedPlatforms);
                                 }}
                                 setValue={setValue}
                                 watch={watch}
                                 index={index}
                              />
                              <InputField
                                 name="link"
                                 type="text"
                                 label="Link"
                                 icon="/images/icons/links.svg"
                                 placeholder="https://www.github.com/benwright"
                                 fieldName={register(`items.${index}.link`)}
                                 errorMessage={
                                    errors?.items?.[index]?.link?.message
                                 }
                              />
                           </section>
                        );
                     })}
                  </div>
               )}

               <SaveButton linkList={fields} isLoading={loading} />
            </form>
         </ProfileLayout>
      </>
   );
}
