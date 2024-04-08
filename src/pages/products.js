import ProductCard from '@/components/productCard'
import url from '@/components/url'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { FiLoader } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ThemeContext } from './_app'

const AllProducts = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const value = useContext(ThemeContext);
    
    useEffect(() => {
        fetch(`${url}/getProduct`, {
            method: "GET",
        }).then(res => res.json())
            .then(data => {
                
                filterData(value.searchText, data)
                setLoading(false)
            })
            .catch(error => console.log(error));
    },[value.searchText])


    const filterData = (searchText, dataList) => {
        const lowercasedValue = searchText.toLowerCase().trim();
        if (lowercasedValue === "") setProducts(dataList);
        else {
          const filteredData = dataList.filter(
            (item) =>
          item.name.toLowerCase().trim().replace(/\s+/g, '').includes(lowercasedValue.replace(/\s+/g,''))
             
          );
          console.log(filteredData.length)
          setProducts(filteredData);
        }
      }
    




    const deleteProduct = async (productId) => {
        try {
            const res = await fetch(`${url}/products/${productId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete product');
            }

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    if (loading) return <div className='min-h-screen pt-20 flex justify-center items-center'>
        <div className='flex justify-center items-center gap-2 mb-5 '>
            <FiLoader className='animate-spin text-2xl' />
            <p className='text-center text-2xl'>Loading....</p>

        </div>
    </div>


    return (
        <div className='px-2 min-h-screen pt-24'>
            <h1 className='text-center text-3xl'>All Of awesome collection for you</h1>
            <div className='grid md:grid-cols-4 grid-cols-1 md:gap-5  gap-y-5 mb-10  md:px-4 place-content-center place-items-center'>
              {products.map(p => <ProductCard p={p} key={p._id} />)}
            </div>

        </div>
    )
}

export default AllProducts