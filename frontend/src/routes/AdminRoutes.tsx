import type{ RouteObject } from "react-router-dom";


import AdminLayout from "../layouts/AdminLayout";


// Dashboard

import InstitutionDashboard from "../pages/admin/Dashboard/InstitutionDashboard";


// Students

import StudentManagement from "../pages/admin/Students/StudentManagement";


// Academic

import Programs from "../pages/admin/Academic/Programs";
import Departments from "../pages/admin/Academic/Departments";


// Analytics

import Reports from "../pages/admin/Analytics/Reports";
import KPIs from "../pages/admin/Analytics/KPIs";


// Quality

import QualityManagement from "../pages/admin/Quality/QualityManagement";


// Settings

import Settings from "../pages/admin/Settings/Settings.tsx";



const AdminRoutes:RouteObject = {


    path:"/admin",

    element:<AdminLayout/>,

    children:[


        {
            index:true,
            element:<InstitutionDashboard/>
        },


        {
            path:"students",
            element:<StudentManagement/>
        },


        {
            path:"programs",
            element:<Programs/>
        },


        {
            path:"departments",
            element:<Departments/>
        },


        {
            path:"reports",
            element:<Reports/>
        },


        {
            path:"kpis",
            element:<KPIs/>
        },


        {
            path:"quality",
            element:<QualityManagement/>
        },


        {
            path:"settings",
            element:<Settings/>
        },


    ]

};


export default AdminRoutes;