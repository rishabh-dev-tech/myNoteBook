import { useState } from "react"
import authContext from "./authContext"



function AuthState({ children }) {

    const [token, setToken] = useState(localStorage.getItem('token') || "")
    const [user, setUser] = useState({})



    return (
        <authContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState
