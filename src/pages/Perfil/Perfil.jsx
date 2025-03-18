import React, { use } from "react";
import  Perfil1  from "../Registration/Perfil1";
import  ActAsignados  from "../components/ActAsignados/ActAsignados";
import { Footer } from "../components/Footer/Footer";
import ActividadesReservadas from "../components/ActividadesReservadas/ActividadesReservadas";
import { UserContext } from "../../Context/UserContex";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const handleLogout = async () => {
  const auth = getAuth();
  const navigate = useNavigate();
  
  try {
    await auth.signOut();
    navigate("/"); // Esto redirigirá al usuario a la página principal (home)
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export default function Perfil() {
  const { profile } = use(UserContext);  // Corregido: useContext en lugar de use

  return (
    <main >
      <div >
        
        <Perfil1 />
        {profile.tipoUser === "Estudiante" && <ActividadesReservadas />}
        {profile.tipoUser === "Guía" && <ActAsignados />}
        <Footer />       
      </div>
    </main>
  );
}
