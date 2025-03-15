import React, { use } from "react";
import  Navigation  from "../components/Navigation/Navigation";
import  Perfil1  from "../Registration/Perfil1";
import  ActAsignados  from "../components/ActAsignados/ActAsignados";
import { Footer } from "../components/Footer/Footer";
import ActividadesReservadas from "../components/ActividadesReservadas/ActividadesReservadas";
import { UserContext } from "../../Context/UserContex";



export default function Perfil() {
  const { profile } = use(UserContext);  // Corregido: useContext en lugar de use

  return (
    <main >
      <div >
        <Navigation />
        <Perfil1 />
        {profile.tipoUser === "Estudiante" && <ActividadesReservadas />}
        {profile.tipoUser === "Guía" && <ActAsignados />}
        <Footer />       
      </div>
    </main>
  );
}
