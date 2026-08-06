import { Outlet } from "react-router-dom";


import AdminSidebar from "../components/navigation/AdminSidebar/AdminSidebar";
import AdminNavbar from "../components/navigation/AdminNavbar/AdminNavbar";


import styles from "../styles/AdminLayout.scss";



const AdminLayout = () => {


    return (

        <div className={styles.admin_layout}>


            <AdminSidebar />


            <section className={styles.admin_layout__main}>


                <AdminNavbar />


                <main className={styles.admin_layout__content}>


                    <Outlet />


                </main>


            </section>


        </div>

    );

};



export default AdminLayout;