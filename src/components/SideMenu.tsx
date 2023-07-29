import { GlobalContext } from '@/context/globalContext';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext } from 'react'

export default function SideMenu() {
    const router = useRouter();
    const currentPath = router.asPath;
    const { isMenuOpen, toggleMenu } = useContext(GlobalContext);
    
	// logout user
	const handleLogout = async () => {
		try {
            localStorage.removeItem('token');
            window.location.href = '/login';
		} catch (error) {
			console.log(error);
		}
	};
    return (
        <>
            <div className={`${isMenuOpen ? 'flex z-20' : 'hidden'} md:flex max-w-[250px] bg-blue-3 flex-col min-h-full`}>
                <div className='relative flex items-center gap-4 justify-center mt-6 px-6'>
                    <div className='w-6 h-6 md:w-10 md:h-10 rounded-full border-[3px] border-white relative bg-blue-4'>
                        <span className='w-3 h-3 bg-red-1 rounded-full absolute -top-1 -right-4 border-2 border-white'></span>
                    </div>
                    <h2 className='text-white font-bold text-sm md:text-xl'>BeLaundry</h2>
                    <div onClick={toggleMenu} className='absolute right-4 top-0 text-white block md:hidden'>
                        X
                    </div>
                </div>
                <div className='p-4' onClick={toggleMenu}>
                    <h3 className='text-white text-sm font-semibold mb-2'>Menu</h3>
                    <ul>
                        <li><Link href="/" className={`${currentPath === '/' ? 'bg-white text-blue-1' : 'text-white'} rounded-md px-4 py-2 mb-2 flex items-center w-full gap-4 text-sm md:text-lg font-semibold`}> <img className='w-5' src="../assets/icon/coolicon.svg" alt="" />Home</Link></li>
                        <li><Link href="/product" className={`${currentPath === '/product' ? 'bg-white text-blue-1' : 'text-white'} rounded-md px-4 py-2 mb-2 flex items-center w-full gap-4 text-sm md:text-lg font-semibold`}> <img className='w-5' src="../assets/icon/file.svg" alt="" />Products</Link></li>
                        <li><Link href="/sales" className={`${currentPath === '/sales' ? 'bg-white text-blue-1' : 'text-white'} rounded-md px-4 py-2 mb-2 flex items-center w-full gap-4 text-sm md:text-lg font-semibold`}> <img className='w-5' src="../assets/icon/line_chart_up.svg" alt="" />Sales</Link></li>
                        <li><Link href="/setting" className={`${currentPath === '/setting' ? 'bg-white text-blue-1' : 'text-white'} rounded-md px-4 py-2 mb-2 flex items-center w-full gap-4 text-sm md:text-lg font-semibold`}> <img className='w-5' src="../assets/icon/settings.svg" alt="" />Settings</Link></li>
                        <button className='text-red-400 px-4' onClick={handleLogout}>Logout</button>
                    </ul>
                </div>
            </div>
        </>
    )
}
