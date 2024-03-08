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
} from "./routes/index";
import "./api";
import store from "./redux/store";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Login />,
   },
   {
      path: "/signup",
      element: <Signup />,
   },
   {
      path: "/customize-links",
      element: <CustomizeLinks />,
   },
   {
      path: "/profile-details",
      element: <ProfileDetails />,
   },
   {
      path: "/preview",
      element: <Preview />,
   },
   {
      path: "/:id",
      element: <UserPage />,
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </React.StrictMode>
);
