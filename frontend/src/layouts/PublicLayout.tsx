import { Outlet } from "react-router-dom";


import Header from "../components/navigation/Header/Header";
// import Navbar from "../components/navigation/Navbar/Navbar";
import Footer from "../components/navigation/Footer/Footer";

import styles from "../styles/PublicLayout.module.scss";



const PublicLayout = () => {

    return (

        <div className={styles.public_layout}>
            <Header/>
            {/* <Navbar /> */}


            <main className={styles.public_layout__content}>

                <Outlet />

            </main>


            <Footer />


        </div>

    );

};


export default PublicLayout;