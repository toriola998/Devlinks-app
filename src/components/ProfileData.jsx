import { useSelector } from "react-redux";

function ProfileData({ textStyleClass }) {
   const userData = useSelector((state) => state.user.userProfile);

   let firstName = userData?.firstName;
   let lastName = userData?.lastName;
   let initials =
      firstName && lastName
         ? firstName.charAt(0) + "." + lastName.charAt(0)
         : "";

   return (
      <>
         {!userData?.photo ? (
            <div className="initials photo bg-grey-2">{initials}</div>
         ) : (
            <img src={userData?.photo} alt="" className="photo" />
         )}

         {userData.firstName ? (
            <>
               <p
                  className={`${textStyleClass} font-bold text-[32px] text-dark-grey mt-6 mb-2 text-center capitalize`}
               >
                  {firstName} {lastName}
               </p>
               <a
                  href={`mailto: ${userData?.profileEmail}`}
                  className="text-grey-1 text-center block"
               >
                  {userData?.profileEmail}
               </a>
            </>
         ) : (
            <div>
               <span className="bg-grey-2 rounded-full h-4 w-36 flex mx-auto mt-6" />
               <span className="bg-grey-2 rounded-full h-2 w-20 flex mx-auto mt-4" />
            </div>
         )}
      </>
   );
}

export default ProfileData;
