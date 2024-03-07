import { useSelector } from "react-redux";

function ProfileData({ textStyleClass, profileData }) {
   const userData = useSelector((state) => state.user.userProfile);

   let firstName = userData?.firstName;
   let lastName = userData?.lastName;
   let initials = firstName?.charAt(0) + "." + lastName?.charAt(0);

   return (
      <>
         {!userData?.photo ? (
            <div className="initials photo">{initials}</div>
         ) : (
            <img src={profileData?.photo} alt="" className="photo" />
         )}
         <p
            className={`${textStyleClass} font-bold text-[32px] text-dark-grey mt-6 mb-2 text-center capitalize`}
         >
            {firstName} {lastName}
         </p>
         <a
            href={`mailto: ${profileData?.email}`}
            className="text-grey-1 text-center block"
         >
            {profileData?.email}
         </a>
      </>
   );
}

export default ProfileData;
