import React, { useContext } from 'react'
import { GlobalContext } from '@/context/globalContext';
import { useAuth } from '@/context/AuthContext';

export default function NavbarMenu() {
  const { toggleMenu } = useContext(GlobalContext);
  const { user } = useAuth();
  return (
    <>
      <div className='w-full h-14 bg-white px-6 flex justify-between items-center'>
        <div>
          <h3 className='hidden md:block font-bold text-2xl'>Home</h3>
          <div onClick={toggleMenu} className='mobile md:hidden w-6 h-6 rounded-full border-[3px] border-white relative bg-blue-4'>
            <span className='w-3 h-3 bg-red-1 rounded-full absolute -top-1 -right-4 border-2 border-white'></span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <img className='w-6' src="../assets/icon/user.svg" alt="" /><h3>{user}</h3>
        </div>
      </div>
    </>
  )
}
