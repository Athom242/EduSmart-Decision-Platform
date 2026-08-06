import { Outlet } from "react-router-dom";

import Navbar from "../components/navigation/Navbar/Navbar";
import Footer from "../components/navigation/Footer/Footer";

import styles from "../styles/PublicLayout.scss";


const PublicLayout = () => {

    return (

        <div className={styles.public_layout}>


            <Navbar />


            <main className={styles.public_layout__content}>

                <Outlet />

            </main>


            <Footer />


        </div>

    );

};


export default PublicLayout;