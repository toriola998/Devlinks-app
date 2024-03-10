import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import {
   Login,
   Signup,
   CustomizeLinks,
   ProfileDetails,
   Preview,
   UserPage,
   ErrorPage,
   ProtectedRoutes,
} from "./routes/index";
import "./api";
import store from "./redux/store";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
   },
   {
      path: "/signup",
      element: <Signup />,
   },
   {
      path: "/customize-links",
      element: (
         <ProtectedRoutes>
            <CustomizeLinks />
         </ProtectedRoutes>
      ),
   },
   {
      path: "/profile-details",
      element: (
         <ProtectedRoutes>
            <ProfileDetails />
         </ProtectedRoutes>
      ),
   },
   {
      path: "/preview",
      element: (
         <ProtectedRoutes>
            <Preview />
         </ProtectedRoutes>
      ),
   },
   {
      path: "user/:id",
      element: <UserPage />,
   },
]);

// Check if local storage is empty before clearing it on application initialization
if (Object.keys(localStorage).length === 0) {
   localStorage.clear();
 }

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </React.StrictMode>
);
