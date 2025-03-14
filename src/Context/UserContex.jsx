import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../credenciales";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const auth = getAuth(app);
const db = getFirestore(app);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Cambiado a useState y null
  const [profile, setProfile] = useState({});
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userConnected) => {
      if (userConnected) {
        setUser(userConnected); // Establecer el objeto de usuario
        const userDocRef = doc(db, "users", userConnected.uid);
        try {
          const docSnap = await getDoc(userDocRef);

          if (!docSnap.exists()) {
            console.log("No such document!");
            setProfile({});
          }
          setProfile(docSnap.data());
          setLogged(true);
        } catch (error) {
          console.log(error);
          setProfile({});
        }
      } else {
        setUser(null); // Establecer user a null si no hay usuario conectado
        setProfile({});
        setLogged(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, profile, setProfile, logged }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };