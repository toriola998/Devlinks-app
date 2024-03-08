import { Link } from "react-router-dom";
import LinkList from "../components/LinkList";
import ProfileData from "../components/ProfileData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Preview() {
   const email = useSelector((state) => state.user.email);
   const linkList = useSelector((state) => state.user.links);

   function copyLink() {
      const username = email.split("@")[0];
      const userUrl =
         window.location.protocol +
         "//" +
         window.location.host +
         "/user/" +
         username;

      navigator.clipboard
         .writeText(userUrl)
         .then(() => {
            toast.success("Profile link copied to clipboard!");
         })
         .catch(() => {
            toast.error("Failed to copy profile link to clipboard.");
         });
   }

   return (
      <>
         <ToastContainer theme="colored" />
         <div className="bg-[transparent] md:bg-purple h-0 md:h-[357px] rounded-br-[32px] rounded-bl-[32px] md:p-6">
            <nav className="flex-item justify-between p-4 md:bg-white rounded-xl">
               <Link className="outline-btn w-auto" to="/customize-links">
                  Back to Editor
               </Link>
               <button className="purple-btn" onClick={copyLink}>
                  Share Link
               </button>
            </nav>
         </div>

         <main className="preview-tree mt-28 md:-mt-32 mb-40">
            <ProfileData textStyleClass="font-bold text-[32px]" />

            <div className="flex-item justify-center py-[56px]">
               <div className="flex flex-col gap-y-5">
                  <LinkList linkList={linkList} />
               </div>
            </div>
         </main>
      </>
   );
}
