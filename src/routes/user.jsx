import LinkList from "../components/LinkList";
import ProfileData from "../components/ProfileData";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function UserPage() {
   const location = useLocation();

   useEffect(() => {
      const userEmail = `${location.pathname}@gmail.com`;
      const email = userEmail.replace("/", "");
      console.log(email);
   }, []);

   return (
      <>
         <div className="bg-[transparent] md:bg-purple h-0 md:h-[357px] rounded-br-[32px] rounded-bl-[32px] md:p-6" />

         <main className="preview-tree mb-40">
            <ProfileData textStyleClass="font-bold text-[32px]" />

            <div className="flex-item justify-center py-[56px]">
               <div className="flex flex-col gap-y-5">
                  {/* <LinkList linkList={linkList?.items} /> */}
                  <LinkList />
               </div>
            </div>
         </main>
      </>
   );
}


