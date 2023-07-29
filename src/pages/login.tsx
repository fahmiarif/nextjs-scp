import axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const { settoken, setuser } = useAuth();
  const [error, setError] = React.useState('');
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const body = {
      email: email.value,
      password: password.value,
    };
    setError('')
    try {
      const resp = await axios.post('/platform/user/sign-in', body);
      if (resp.data.status === true) {
        settoken(resp.data.response);
        router.push('/');
      } else {
        setError(resp.data.message);
      }
      const user = await axios.get('/platform/user/info');
      if (resp.data.status === true) {
        setuser(user.data.response.name)
      }

    } catch (error: any) {
      console.log(error);

      alert(error.status)
    }
  };

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      router.push('/');
    }
  }, [])
  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <form action="" onSubmit={handleSubmit}>
          <h1 className='font-bold text-lg'>Login Page</h1>

          {error && <span className='text-red-400'>{error}</span>} <br />

          <input type="text" name='email' placeholder='ovickbs@gmail.com' /> <br /> <br />
          <input type="password" name='password' placeholder='qwerpilkopi' /> <br />
          <button type='submit' className='bg-green-1 rounded-md w-full text-white py-2 my-4'>Submit</button>
          <br /><br />
          <Link href={'/register'}>Not have account? Register</Link>
        </form>
      </div>
    </>
  )
}
