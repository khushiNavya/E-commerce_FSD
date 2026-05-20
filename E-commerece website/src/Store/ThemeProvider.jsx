import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const defaultTheme = localStorage.getItem("theme");
    const [theme, setTheme] = useState(defaultTheme ? defaultTheme : "light");
    const data = { theme, setTheme };
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);
    return <ThemeContext.Provider value={data}>
        {children}
    </ThemeContext.Provider>
}

export default ThemeProvider;