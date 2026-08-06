import { Outlet } from "react-router-dom";


import TeacherSidebar from "../components/navigation/TeacherSidebar/TeacherSidebar";
import TeacherNavbar from "../components/navigation/TeacherNavbar/TeacherNavbar";


import styles from "../styles/TeacherLayout.scss";



const TeacherLayout = () => {


    return (

        <div className={styles.teacher_layout}>


            <TeacherSidebar />


            <section className={styles.teacher_layout__main}>


                <TeacherNavbar />


                <main className={styles.teacher_layout__content}>

                    <Outlet />

                </main>


            </section>


        </div>

    );

};


export default TeacherLayout;