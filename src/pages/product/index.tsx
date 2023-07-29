import Link from 'next/link'
import axios from '@/config/axios'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

export default function index() {
  const [data, setData] = useState<[]>([])
  const [isLoading, setisLoading] = useState(false)

  /** GET DATA */
  const get = async () => {
    setisLoading(true)
    try {
      let res = await axios.get('/platform/product');
      setData(res.data.response)
    } catch (error: any) {
      alert(error.message)
    }
    setisLoading(false)

  }
  /** DELETE */
  const handleDelete = async (id: number) => {
    try {
      let oke = confirm('Are you sure want to delete?');
      if (oke) {
        let res = await axios.delete('/platform/product/' + id);
        alert(res.data.message)
        get();
      }
    } catch (error: any) {
      alert(error.message)
    }
  }
  useEffect(() => {
    get();
  }, [])

  return (
    <>
      <div className='p-6'>
        <Link href={`/product/create`} className='bg-blue-3 rounded-md text-white px-4 py-2'>Create New</Link>
        <table className='w-full my-4'>
          <thead>
            <tr className='border'>
              <th className='border px-4'>Name</th>
              <th className='border px-4'>SKU</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, i: number) => (
              <tr key={i} className='border'>
                <td className='border p-2'>{item.name}</td>
                <td className='border p-2'>{item.sku}</td>
                <td className='border p-2 space-y-2'><Link className='bg-blue-2 px-4 py-1 rounded' href={`product/${item.id}`}>Edit</Link> <button onClick={() => handleDelete(item.id)} className='bg-red-1 px-4 py-1 rounded'>Delete</button></td>
              </tr>
            ))}
            {isLoading && (<>Loading...</>)}
            {data.length == 0 && !isLoading && (<>No data</>)}
          </tbody>
        </table>
      </div>
    </>
  )
}
