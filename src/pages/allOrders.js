import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import url from '@/components/url';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
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
          return;
        }
        const { email } = await res.json();

        const data = await fetch(`${url}/users/${email}`).then((res) => res.json());

        if (data.role) {
          fetch(`${url}/orderedProducts`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(res => res.json())
            .then(data => {
              setOrders(data)
              setLoading(false)
            })
            .catch(error => console.log(error));

        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };


    fetchCartProducts();
  }, [orders, router]);




  if (loading) return <div className='min-h-screen flex justify-center items-center text-xl pt-20'><p> loading...</p></div>;

  return (
    <div className='min-h-screen  md:px-10 mx-2'>
      <div className=''>
        <h1 className='text-3xl mb-5'>All Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className='w-full'>

            <div className='flex justify-start   border border-black m-1'>

              <p className=' px-4 py-2 md:w-44 w-full  border border-r-black'>Customer Info <span className='md:hidden '>& Order Info</span></p>
              <p className=' px-4 py-2  md:w-96 w-full  text-center md:block hidden'>Ordered Product</p>
              <p className=' px-4 py-2 md:w-32 border  border-l-black md:block hidden'>Total Amount</p>

            </div>


            {orders.map((order) => (
              <div className='md:flex justify-start   border border-black m-1' key={order._id}>

                <div className=' px-4 py-2 md:w-44 w-full border-r-black border  flex items-center'>
                  <p className=' '>
                    <span>Phone: {order.phoneNo}<br />  <span>Adress: {order.deliveryAddress}</span></span></p></div>


                <div className=''>
                  {order.cartProducts?.map((p) => <div key={p._id} className='md:flex grid grid-cols-2 gap-3 px-4 py-2 w-1/2  md:w-96 mb-1 items-center'>
                    <div className='w-12 h-12'>
                      <img src={p.img} className='w-full h-full  rounded-full' alt="" />
                    </div>
                    <p>{p.name}</p>

                  </div>)}

                </div>
                <div className=' px-4 py-2 md:w-32 border hidden border-l-black md:flex items-center'><p>{order.amount} tk</p></div>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default Orders;
