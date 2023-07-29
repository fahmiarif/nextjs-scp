import axios from '@/config/axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'

export default function index() {
  const [error, setError] = useState('');
  const router = useRouter();

  /** SUBMIT FORM */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { name, description, sku, stock, category_id, price, image } = e.target.elements;
    const body = {
      name: name.value,
      description: description.value,
      sku: sku.value,
      stock: stock.value,
      category_id: category_id.value,
      price: price.value,
      image: image.value,
    };
    setError('')
    try {
      const resp = await axios.post('/platform/product', body);
      if (resp.data.status === true) {
        setError(resp.data.response);
        router.push('/product');
      } else {
        setError(resp.data);
      }

    } catch (error: any) {
      setError(error.message)
      alert(error.status)
    }
  };

  /** CATEGORY */
  const [category, setDataCategory] = useState<[]>([])
  const getCategory = async () => {
    try {
      let res = await axios.get('/platform/product/categories');
      setDataCategory(res.data.response)
    } catch (error: any) {
      alert(error.message)
    }
  }
  useEffect(() => {
    getCategory();
  }, [])
  return (
    <>
      <form onSubmit={handleSubmit} action="" className='flex flex-col md:flex-row'>
        <div className="flex flex-col gap-4 p-6 w-full">
          {error && <span className='text-red-400'>{error} <br /></span>}
          <Link href={'/product'} className='text-blue-500 underline block md:hidden'>Back</Link>
          <h3 className='font-bold text-lg'>Add New Product</h3>
          <div className='form-group'>
            <label htmlFor="" className='text-blue-1'>Product Name</label>
            <input type="text" name='name' />
          </div>
          <div className='form-group'>
            <label htmlFor="" className='text-blue-1'>Description</label>
            <textarea name="description" id="" rows={4}></textarea>
          </div>
          <div className='flex gap-4 flex-col md:flex-row'>
            <div className='form-group'>
              <label htmlFor="" className='text-blue-1'>SKU</label>
              <input type="text" name='sku' />
            </div>
            <div className='form-group'>
              <label htmlFor="" className='text-blue-1'>Stock</label>
              <input type="number" name='stock' />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor="" className='text-blue-1'>Category</label>
            <div className='flex gap-4 w-full'>
              {category.map((item: any, i: number) => (
                <div key={i} className="inline-block radio">
                    <input name="category_id" type="radio" id={item.id} hidden={true} value={item.id} />
                    <label htmlFor={item.id} className="px-2 py-1 rounded-lg flex justify-center items-center text-sm font-semibold w-auto h-10" >
                        {item.name}
                    </label>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-between items-end'>
            <div className='form-group'>
              <label htmlFor="" className='text-blue-1'>Price</label>
              <input type="number" name='price' />
            </div>
            <button type='submit' className='px-4 py-2 bg-green-1 rounded text-white fixed md:relative bottom-0 z-10 mb-2 md:mb-0 md:w-auto width-btn'>Publish</button>
          </div>
        </div>
        <aside className='w-full md:w-[250px] bg-[#F5FCFF] p-6 pb-10'>
          <figure className='bg-white rounded'>
            <div className="flex relative justify-center py-8">
              <img className='w-1/2' src="../assets/icon/thumb.png" alt="" />
              <input name='image' className='w-full h-full absolute opacity-0 cursor-pointer' type="file" />
            </div>
            <figcaption className='text-center pb-4'>
              <label className='font-bold text-blue-1 underline' htmlFor="">Upload image here</label>
            </figcaption>
          </figure>
        </aside>
      </form>
    </>
  )
}
