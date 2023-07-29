import axios from '@/config/axios'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'

export default function Home() {
  const [data, setData] = useState<[]>([])
  const get = async () => {
    try {
      let res = await axios.get('/platform/product/report')
      setData(res.data)
    } catch (error:any) {
      alert(error.message)
    }
  }
  useEffect(() => {
    get();
  }, [])
  
  return (
    <>
      <div className='p-6'>
        <div className="card bg-white rounded-lg px-4 py-2">
          <div className='flex items-center justify-between border-b border-gray-100 pb-4'>
            <h3 className='font-bold '>Product Sold</h3>
            <select className='border rounded-md px-2 py-1'>
              <option value="">This week</option>
              <option value="">This month</option>
            </select>
          </div>
          <ul className='flex gap-4 mt-4 h-[150px] items-end'>
            {data.map((item:any, i:number) => (
              <li key={i} className='flex flex-col items-center'>
                <div className={`w-8 bg-[#B2C5D4] rounded hover:bg-blue-500`} style={{height: parseInt(item.total)}}></div>
                <span className='text-xs mt-2'>{item.created_at}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className='w-full md:w-1/2'>
          <div className="card px-4 py-2 bg-white rounded-lg my-6">
            <div className='flex items-center justify-between border-gray-100 pb-4'>
              <h3 className='font-bold '>Top selling product</h3>
              <select className='border rounded-md px-2 py-1'>
                <option value="">This week</option>
                <option value="">This month</option>
              </select>
            </div>
            <table className='w-full p-4'>
              <tbody>
                <tr className='border-b'>
                  <td>Name</td>
                  <td>Value</td>
                </tr>
                <tr>
                  <td>Item A</td>
                  <td>$ 120.00</td>
                </tr>
                <tr>
                  <td>Item A</td>
                  <td>$ 120.00</td>
                </tr>
                <tr>
                  <td>Item B</td>
                  <td>$ 120.00</td>
                </tr>
                <tr>
                  <td>Item C</td>
                  <td>$ 120.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
