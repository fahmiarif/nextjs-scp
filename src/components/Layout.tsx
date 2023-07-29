import { GlobalProvider } from '@/context/globalContext'
import React from 'react'
import SideMenu from './SideMenu'
import NavbarMenu from './NavbarMenu'

export default function Layout({ children }: any) {
    return (
        <GlobalProvider>
            <div className='flex'>
                <SideMenu />
                <div className="w-full bg-blue-1 h-full">
                    <NavbarMenu />
                    <div className='min-h-screen'>
                        {children}
                    </div>
                </div>
            </div>
        </GlobalProvider>
    )
}
