import React from "react";
import { Outlet } from "react-router-dom";

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