import { createBrowserRouter } from "react-router-dom";


import PublicRoutes from "./PublicRoutes";
import StudentRoutes from "./StudentRoutes";
import TeacherRoutes from "./TeacherRoutes";
import AdminRoutes from "./AdminRoutes";


import NotFound from "../pages/public/NotFound";



const router = createBrowserRouter([


    PublicRoutes,

    StudentRoutes,

    TeacherRoutes,

    AdminRoutes,


    {

        path:"*",

        element:<NotFound/>

    }


]);


export default router;