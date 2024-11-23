import { createContext, useEffect, useState } from "react";
import { getAllOwnerAuth } from "../service/PetPalMockService";
import { mockOwnerAuths } from "../mockoon/mockData";

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
    setAllOwnerAuth(mockOwnerAuths);
    // setAllOwnerAuth(getAllOwnerAuth());
    console.log("allOwnerAuth", allOwnerAuth);
  }, []);

  const authenticateOwner = (email, password) => {
    console.log("email", email);
    console.log("password", password);
    for (const ownerAuth of allOwnerAuth) {
      console.log("OwnerAuth: ", ownerAuth);
      if (ownerAuth.email.toLowerCase() === email.toLowerCase() 
        && ownerAuth.password === password) {
        setOwnerAuth(ownerAuth);
        setIsLoggedIn(true);
        return true;
      }
    }
    return false;
  }

  const clearOwnerAuth = () => {
    setOwnerAuth({});
    setIsLoggedIn(false);
  }

  const contextValue = {
    allOwnerAuth,
    ownerAuth,
    isLoggedIn,
    authenticateOwner,
    clearOwnerAuth
  }

  return (
    <OwnerAuthContext.Provider value={contextValue}>
      {children}
    </OwnerAuthContext.Provider>
  )
}