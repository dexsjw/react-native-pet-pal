import { createContext, useEffect, useState } from "react";
import { getAllOwnerAuth } from "../service/PetPalMockService";

const initialOwnerAuth = {
  id: null,
  email: "",
  password: "",
  ownerId: null
}

export const OwnerAuthContext = createContext();

export function OwnerAuthProvider({ children }) {
  const [allOwnerAuth, setAllOwnerAuth] = useState([]);
  const [ownerAuth, setOwnerAuth] = useState(initialOwnerAuth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setAllOwnerAuth(getAllOwnerAuth());
  }, []);

  const authenticateOwner = (email, password) => {
    for (const ownerAuth of allOwnerAuth) {
      if (ownerAuth.email === email && ownerAuth.password === password) {
        setOwnerAuth(ownerAuth);
        setIsLoggedIn(true);
      }
    }
  }

  const contextValue = {
    ownerAuth,
    isLoggedIn,
    authenticateOwner
  }

  return (
    <OwnerAuthContext.Provider value={contextValue}>
      {children}
    </OwnerAuthContext.Provider>
  )
}