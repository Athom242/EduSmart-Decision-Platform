
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./styles/index.module.scss";

import router from "./routes/AppRouter";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);



// import React from "react";
// import ReactDOM from "react-dom/client";

// console.log("1 - main.tsx chargé");
// console.log("2 - React :", React);
// console.log("3 - ReactDOM :", ReactDOM);

// const rootElement = document.getElementById("root");

// console.log("4 - root :", rootElement);

// if (!rootElement) {
//     throw new Error("ELEMENT #root INTROUVABLE");
// }

// const root = ReactDOM.createRoot(rootElement);

// console.log("5 - createRoot OK");

// root.render( React.createElement( "div", { style: { position: "fixed", top: "0", left: "0", zIndex: "999999", background: "red", color: "white", padding: "40px", fontSize: "40px", fontFamily: "Arial", }, }, "REACT FONCTIONNE" ) );

// console.log("6 - render exécuté");