import Link from 'next/link'
import React from 'react'

const ProductCard = ({ p }) => {
    return (
        <div>
            <div className='border-t  md:mx-4 border-violet-400 shadow-lg shadow-violet-900  md:w-full w-[300px]  rounded-lg overflow-hidden hover:scale-105 duration-700' >
                <img className='w-[300px]   h-64 rounded-t-lg border border-b-black' src={p.img} alt={p.name} />
                <div className='pl-2 my-2 '>
                    <h2 className='font-bold'>{p.name}</h2>
                    <p>Price: {p.price} tk</p>
                </div>
                <Link href={`/productDetails/${p._id}`}>
                    <button className='md:w-full  w-full p-4 bg hover:bg-violet-900 font-bold text-white'>Show Details</button>
                </Link>
            </div>
        </div>
    )
}

export default ProductCard