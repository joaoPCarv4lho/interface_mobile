import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }){
    const [userId, setUserId] = useState({});

    return(
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    )
}