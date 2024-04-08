import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FiPhone, FiDollarSign, FiCreditCard, FiMapPin } from 'react-icons/fi';
import { IoIosSend } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';



import url from '@/components/url'
import jwt_decode from 'jwt-decode';

const Checkout = () => {
  const [bkashNo, setBkashNo] = useState('')
  const [transactionId, setTransactionId] = useState('')

  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [email, setEmail] = useState('')
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem('token');
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
          return;
        }
        const { email } = await res.json();
        console.log(email)
        const data = await fetch(`${url}/cartProducts/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        setCartProducts(data)
        setLoading(false);
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };


    fetchCartProducts();
  }, [router]);

  const subTotal = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)

  const amount = subTotal + subTotal * 0.02 + subTotal * 0.15

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data = {
      bkashNo,
      transactionId,
      amount,
      deliveryAddress,
      phoneNo,
      cartProducts,
      email
    }

    try {
      const response = await fetch(`${url}/orderedProducts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        alert('Your order placed successfully')
      } else {
        console.log('An error occurred while submitting the form')
      }










      
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }


  if (loading) return <div className='min-h-screen pt-20 flex justify-center items-center'>
    <p className='text-xl'> Loading...</p>

  </div>
  return (

    <div className="bg-gray-50 min-h-screen pt-24 pb-24 md:px-10">
      <div className="flex justify-center">
        <form
          className="w-full md:w-1/2 p-4 md:p-10 rounded-lg shadow-lg  border bg-violet-400 border-black"
          onSubmit={handleSubmit}
        >
          <p className="text-center text-2xl md:text-3xl font-bold text-gray-700 mb-4">
            Payment and Delivery Information
          </p>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
              Amount
            </label>
            <div className="relative">
              <input
                id="amount"
                className="appearance-none  rounded w-full py-2 px-3 border border-black leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={amount}
                readOnly

              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <FiDollarSign className="text-gray-500" />
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="bkash" className="block text-gray-700 font-bold mb-2">
              Card number
            </label>
            <div className="relative">
              <input
                id="bkash"
                className="appearance-none  rounded w-full py-2 px-3 border border-black leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={bkashNo}
                onChange={(e) => setBkashNo(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <FiCreditCard className="text-gray-500" />
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
              Expiration date
            </label>
            <div className="relative">
              <input
                id="date"
                className="appearance-none  rounded w-full py-2 px-3 border border-black leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
              />
           
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="transactionId" className="block text-gray-700 font-bold mb-2">
              CVV
            </label>
            <div className="relative">
              <input
                id="transactionId"
                className="appearance-none  rounded w-full py-2 px-3 border border-black leading-tight focus:outline-none focus:shadow-outline"
                type="number"
               
               
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <IoIosSend className="text-gray-500" />
              </span>
            </div>
          </div>
       

          <div className="mb-4">
            <label htmlFor="deliveryAddress" className="block text-gray-700 font-bold mb-2">
              Delivery Address
            </label>
            <div className="relative">
              <input
                id="deliveryAddress"
                className="appearance-none  rounded w-full py-2 px-3 border border-black leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <MdLocationOn className="text-gray-500" />
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNo" className="block text-gray-700 font-bold mb-2">
              Phone No.
            </label>
            <div className="relative">
              <input
                id="phoneNo"
                className="appearance-none  rounded w-full py-2 px-3 border border-black leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <FiPhone className="text-gray-500" />
              </span>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-violet-500 hover:bg-violet-600 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
