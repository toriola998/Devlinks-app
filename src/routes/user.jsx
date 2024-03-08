import LinkList from "../components/LinkList";
import ProfileData from "../components/ProfileData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import user from "../api/user";

import { useDispatch } from "react-redux";
import { saveProfile, saveLinks } from "../redux/userSlice.js";

export default function UserPage() {
   const param = useParams();
   const linkList = useSelector((state) => state.user.links);
   const dispatch = useDispatch();
   const [userData, setUserData] = useState("");
   const [loading, setLoading] = useState(false);
   const [errorMsg, setErrorMsg] = useState(false);

   useEffect(() => {
      const userEmail = `${param?.id}@gmail.com`;
      const email = userEmail.replace("/", "");
      getUser(email);
   }, []);

   async function getUser(payload) {
      try {
         setLoading(true);
         const response = await user.getUser(payload);
         const data = response?.data.user || {};
         setUserData(user);
         const { firstName, lastName, photo, profileEmail, colorTheme, links } =
            data;
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
            setErrorMsg(errorMsg);
         } else setErrorMsg("Something seems wrong, try again later!");
      } finally {
         setLoading(false);
      }
   }

   return (
      <div>
         {loading && (
            <div className="min-h-screen flex items-center justify-center">
               <p>
                  <span className="loader flex mx-auto border-b-purple"></span>
                  <span className="text-center">Loading...</span>
               </p>
            </div>
         )}
         {errorMsg && (
            <div className="min-h-screen flex items-center justify-center">
               <p className="text-center">
                  <span className="font-bold text-center">Opps!</span>
                  <br />
                  <span className="text-center">{errorMsg}</span>
               </p>
            </div>
         )}
         {userData && (
            <>
               <div className="bg-[transparent] md:bg-purple h-0 md:h-[357px] rounded-br-[32px] rounded-bl-[32px] md:p-6" />
               <main className="preview-tree mt-10 md:-mt-48 mb-40">
                  <ProfileData textStyleClass="font-bold text-[32px]" />

                  <div className="flex-item justify-center py-[56px]">
                     <div className="flex flex-col gap-y-5">
                        <LinkList linkList={linkList} />
                     </div>
                  </div>
               </main>
            </>
         )}
      </div>
   );
}
