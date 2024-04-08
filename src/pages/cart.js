import React, { useEffect, useState } from 'react';
import url from '@/components/url';
import Image from 'next/image';
import Link from 'next/link';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { FiLoader } from 'react-icons/fi';
import Loading from '@/components/Loading';

const CartProducts = () => {
  const router = useRouter();
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if(!token){
          router.push('/login');
          return;
        }
        const decodedToken = jwt_decode(token);
        if (!decodedToken) {
          router.push('/login');
          return;
        }

        const res = await fetch(`${url}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          router.push('/login');
        }
        const { email } = await res.json();

        const data = await fetch(`${url}/cartProducts/${email}`,{
          method:"GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
        setCartProducts(data);
        setTotalPrice(data.reduce((total, product) => total + product.price * product.quantity, 0));
        setLoading(false);
      } catch (err) {
        console.error(err);
        
      }
    };

    fetchCartProducts();
  }, [router]);

  if (loading) return <Loading />

  return (
    <div className='min-h-screen py-24 md:px-10 px-2'>
      <h2 className='text-center text-3xl'>Cart Products</h2>
      <div className='md:flex'>
        <div className='md:w-8/12'>
          <div className='my-2 border border-violet-900 rounded flex items-center justify-between p-2'>

            <p className='text-center w-20 font-bold'>Image</p>
            <p className='text-center w-20 font-bold'>Product name</p>
            <p className='text-center w-20 font-bold'>Product price</p>
            <p className='text-center w-20 font-bold'>Product quantity</p>
          </div>
          {cartProducts.map(product => (
            <div key={product._id} className='my-2 rounded border border-violet-900 flex items-center justify-between p-2'>
              <div className='w-16 h-16 relative'>
                <Image src={product.img} className='rounded-full border border-violet-900 p-1' alt='img' fill />
              </div>
              <p className='text-center w-20'>{product.name}</p>
              <p className='text-center w-20'>{product.price}</p>
              <p className='text-center w-20'>{product.quantity}</p>
            </div>
          ))}
        </div>

        <div className='md:w-3/12 h-96 border border-black md:ml-2 mt-2 relative rounded overflow-hidden'>
          <p className='text-center text-2xl mt-4'>Summary</p>

          <div className='p-4'>
            <div className='flex justify-between px-5'>
              <p>Total Items</p>
              <p>{cartProducts.length}</p>
            </div>
            <div className='flex justify-between px-5'>
              <p>Subtotal </p>
              <p>{totalPrice} tk</p>
            </div>
            <div className='flex justify-between px-5'>
              <p>Shipping charge</p>
              <p> {totalPrice * 0.02} tk</p>
            </div>
            <div className='flex justify-between px-5'>
              <p>Vat</p>
              <p>{totalPrice * 0.15} tk</p>
            </div>
            <p className='px-5'>----------------------------------------------</p>
            <div className='flex justify-between px-5'>
              <p>Total Price </p>
              <p>{totalPrice + totalPrice * 0.02 + totalPrice * 0.15} tk</p>
            </div>

          </div>

          <Link href='/checkout'>
            <button className='p-2 text-white font-bold bg w-full absolute bottom-0 hover:bg-violet-900'>Proceed to checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
