import { useContext } from 'react'
import { createContext, useState } from 'react'

export const themeContext = createContext()


function ThemeState({ children }) {

    const [theme, setTheme] = useState("dark")

    const darkModefun = () => {
        setTheme("dark")
    }
    const lightModefun = () => {
        setTheme("light")
    }

    return (
        <themeContext.Provider value={{ theme, darkModefun, lightModefun }}>
            {children}
        </themeContext.Provider>
    )
}

export default ThemeState;

export function useTheme() {
    const value = useContext(themeContext)
    return value
}
