import type { RouteObject } from "react-router-dom";


import TeacherLayout from "../layouts/TeacherLayout";


// Dashboard

import TeacherDashboard from "../pages/teacher/Dashboard/TeacherDashboard";


// Courses

import CreateCourse from "../pages/teacher/Courses/CreateCourse";
import ManageCourses from "../pages/teacher/Courses/ManageCourses";


// Assessments

import CreateExam from "../pages/teacher/Assessments/CreateExam";
import Assignments from "../pages/teacher/Assessments/Assignments";
import Correction from "../pages/teacher/Assessments/Correction";


// Students

import StudentTracking from "../pages/teacher/Students/StudentTracking";
import Performance from "../pages/teacher/Students/Performance";


// Analytics

import ClassAnalytics from "../pages/teacher/Analytics/ClassAnalytics.tsx";



const TeacherRoutes:RouteObject = {


    path:"/teacher",

    element:<TeacherLayout/>,

    children:[


        {
            index:true,
            element:<TeacherDashboard/>
        },


        {
            path:"courses",
            element:<ManageCourses/>
        },


        {
            path:"courses/create",
            element:<CreateCourse/>
        },


        {
            path:"exams/create",
            element:<CreateExam/>
        },


        {
            path:"assignments",
            element:<Assignments/>
        },


        {
            path:"correction",
            element:<Correction/>
        },


        {
            path:"students",
            element:<StudentTracking/>
        },


        {
            path:"performance",
            element:<Performance/>
        },


        {
            path:"analytics",
            element:<ClassAnalytics/>
        },


    ]

};


export default TeacherRoutes;