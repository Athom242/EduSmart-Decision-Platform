import type { RouteObject } from "react-router-dom";

import StudentLayout from "../layouts/StudentLayout";


// Dashboard

import StudentDashboard from "../pages/student/Dashboard/StudentDashboard";


// Courses

import MyCourses from "../pages/student/Courses/MyCourses";
import CourseDetails from "../pages/student/Courses/CourseDetails";


// Assessments

import Exams from "../pages/student/Assessments/Exams";
import Quiz from "../pages/student/Assessments/Quiz";
import Results from "../pages/student/Assessments/Results";


// Progress

import Progress from "../pages/student/Progress/Progress";
import Skills from "../pages/student/Progress/Skills";


// Learning

import LearningPlan from "../pages/student/Learning/LearningPlan";
import Recommendations from "../pages/student/Learning/Recommendations";


// Community

import Clubs from "../pages/student/Community/Clubs";
import Events from "../pages/student/Community/Events";
import Network from "../pages/student/Community/Network";


// Certificates

import Certificates from "../pages/student/Certificates/Certificates";


// Profile

import StudentProfile from "../pages/student/Profile/StudentProfile";



const StudentRoutes: RouteObject = {


    path: "/student",

    element: <StudentLayout />,


    children: [

        {
            index:true,
            element:<StudentDashboard/>
        },


        {
            path:"courses",
            element:<MyCourses/>
        },


        {
            path:"courses/:id",
            element:<CourseDetails/>
        },


        {
            path:"exams",
            element:<Exams/>
        },


        {
            path:"quiz/:id",
            element:<Quiz/>
        },


        {
            path:"results",
            element:<Results/>
        },


        {
            path:"progress",
            element:<Progress/>
        },


        {
            path:"skills",
            element:<Skills/>
        },


        {
            path:"learning-plan",
            element:<LearningPlan/>
        },


        {
            path:"recommendations",
            element:<Recommendations/>
        },


        {
            path:"clubs",
            element:<Clubs/>
        },


        {
            path:"events",
            element:<Events/>
        },


        {
            path:"network",
            element:<Network/>
        },


        {
            path:"certificates",
            element:<Certificates/>
        },


        {
            path:"profile",
            element:<StudentProfile/>
        },


    ]

};


export default StudentRoutes;