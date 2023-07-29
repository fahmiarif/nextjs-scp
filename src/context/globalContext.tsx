"use client";
import React, { createContext, useState } from 'react';

const GlobalContext = createContext({
    isMenuOpen: false,
    toggleMenu: () => {},
});

const GlobalProvider = ({children}: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoading, setisLoading] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <GlobalContext.Provider value = {{
            isMenuOpen,
            toggleMenu,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export { GlobalProvider, GlobalContext };