import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "../../components/public/Headers";
import Footer from "../../components/public/Footer";/

const Home : React.FC=()=>{

    return(
        <div className="app-layout">

            <Headers/>
                <main>
                    <Outlet/>
                </main>
            <Footer/>

        </div>
    )
}


export default Home;