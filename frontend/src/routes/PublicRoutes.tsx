import type { RouteObject } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

// Public pages
import Home from "../pages/public/Home";
import Features from "../pages/public/Features";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";


const PublicRoutes: RouteObject = {

    path: "/",

    element: <PublicLayout />,

    children: [

        {
            index: true,
            element: <Home />,
        },

        {
            path: "features",
            element: <Features />,
        },

        {
            path: "about",
            element: <About />,
        },

        {
            path: "contact",
            element: <Contact />,
        },


        // Authentication

        {
            path: "login",
            element: <Login />,
        },

        {
            path: "register",
            element: <Register />,
        },

        {
            path: "forgot-password",
            element: <ForgotPassword />,
        },

    ],

};


export default PublicRoutes;