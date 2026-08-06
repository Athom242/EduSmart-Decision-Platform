import { Outlet } from "react-router-dom";


import StudentSidebar from "../components/navigation/StudentSidebar/StudentSidebar";
import StudentNavbar from "../components/navigation/StudentNavbar/StudentNavbar";


import styles from "../StudentLayout.scss";


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