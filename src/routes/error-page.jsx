import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
   const error = useRouteError();
   return (
      <div className="error-page bg-light-grey min-h-screen flex-item justify-center">
         <div>
            <img
               src="/images/404.svg"
               alt=""
               className="w-[300px] md:w-[350px] mx-auto block"
            />

            <h1 className="text-center mx-[10%] mb-8 text-lg md:text-xl">
               {error?.message ||
                  `Oops! The page you're looking for isn't what you thought it was.`}
            </h1>
            <div className="flex justify-center w-full">
               <Link to="/customize-links" className="purple-btn">
                  Go Home
               </Link>
            </div>
         </div>
      </div>
   );
}
