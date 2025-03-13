import React from "react";
import  Navigation  from "../components/Navigation/Navigation";
import  Perfil1  from "../Registration/Perfil1";
import  ActAsignados  from "../components/ActAsignados/ActAsignados";
import { Footer } from "../components/Footer/Footer";


export default function Perfil() {
  return (
    <main >
      <div >
        <Navigation />
        <Perfil1 />
        <ActAsignados />
        <Footer />       
      </div>
    </main>
  );
}
