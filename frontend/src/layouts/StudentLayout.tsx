import { Outlet } from "react-router-dom";


import StudentSidebar from "../components/navigation/StudentSidebar/StudentSidebar";
import StudentNavbar from "../components/navigation/StudentNavbar/StudentNavbar";


import styles from "../../../styles/StudentLayout.module.scss";


const StudentLayout = () => {


    return (

        <div className={styles.student_layout}>


            <StudentSidebar />


            <section className={styles.student_layout__main}>


                <StudentNavbar />


                <main className={styles.student_layout__content}>

                    <Outlet />

                </main>


            </section>


        </div>

    );

};


export default StudentLayout;