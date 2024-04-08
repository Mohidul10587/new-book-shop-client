import { useState, useEffect } from 'react';
import Link from 'next/link';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';

import UserManagement from './userManagement';
import AddProduct from './addProduct';
import Orders from './allOrders';
import AllProducts from './allProducts';

import url from '@/components/url';
import { RxCross2 } from 'react-icons/rx'
import { GoThreeBars } from 'react-icons/go'




export default function Dashboard() {
  const [activeLink, setActiveLink] = useState('add-product');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [dropdown, setDropdown] = useState(true);
  const [toggleCross, setToogleCross] = useState(false)




  const handleLinkClick = (link) => {
    setActiveLink(link);
  };




  useEffect(() => {
    const handleClickOutside = () => {
      setDropdown(true);
      setToogleCross(false)
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);








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
        setEmail(email)
        const data = await fetch(`${url}/users/${email}`).then((res) => res.json());
        if (data.role) {
          setLoading(false);

        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };


    fetchCartProducts();
  }, []);

  let pageContent;
  switch (activeLink) {
    case 'add-product':
      pageContent = <AddProduct />;
      break;
    case 'user-management':
      pageContent = <UserManagement />;
      break;
    case 'all-orders':
      pageContent = <Orders />;
      break;
    case 'all-products':
      pageContent = <AllProducts />;
      break;

    default:
      pageContent = <AddProduct />;
  }


  if (loading) return <div className='min-h-screen pt-20 flex justify-center items-center'>
     <p className='text-xl'> Loading...</p>
  </div>



  return (
    <div className="md:flex pt-20 pb-4 min-h-screen">


      {/* for desktop  */}
      <div className="bg text-white px-4 md:w-2/12 hidden md:block">
        <ul className='mt-4'>
          <li className="p-2 rounded border border-white mt-2 hover:bg-white hover:text-black">
            <Link href="/dashboard">
              <p onClick={() => handleLinkClick('add-product')}>Add Products</p>
            </Link>
          </li>
          <li className="p-2 rounded border border-white mt-2 hover:bg-white hover:text-black">
            <Link href="/dashboard">
              <p onClick={() => handleLinkClick('user-management')}>User Management</p>
            </Link>
          </li>
          <li className="p-2 rounded border border-white mt-2 hover:bg-white hover:text-black">
            <Link href="/dashboard">
              <p onClick={() => handleLinkClick('all-orders')}>All Orders</p>
            </Link>
          </li>

          <li className="p-2 rounded border border-white mt-2 hover:bg-white hover:text-black">
            <Link href="/dashboard">
              <p onClick={() => handleLinkClick('all-products')}>All Products</p>
            </Link>
          </li>
        </ul>
      </div>

      {/* for mobile  */}

      <div className='mt-3'>
        <GoThreeBars className={toggleCross ? "hidden bg-white text-black rounded-full p-1 text-4xl" : "md:hidden  bg-white text-black rounded-full p-1 text-4xl"}
          onClick={(e) => {
            e.stopPropagation();
            setDropdown(!dropdown)
            setToogleCross(true)

          }} />
        <RxCross2 className={toggleCross ? "md:hidden bg-white text-black rounded-full p-1 text-4xl" : "hidden  bg-white text-black rounded-full p-1 text-4xl"}
          onClick={(e) => {
            e.stopPropagation();
            setDropdown(true)
            setToogleCross(false)

          }} />

        <div onClick={() => {
          setDropdown(true)
          setToogleCross(false)
        }} className={dropdown ? 'rounded-b bg  md:hidden fixed top-20 w-64   z-30 -left-64 transition-all duration-700' : ' bg text-red-600 md:hidden fixed top-20 w-64 left-0  z-30 transition-all duration-700 rounded-b'} >

          <Link href='/dashboard'><p onClick={() => handleLinkClick('add-product')} className=" border  px-2 py-1 mx-2 rounded my-3 text-white ">Add Products</p></Link>
          <Link href='/dashboard'><p onClick={() => handleLinkClick('user-management')} className=" border  px-2 py-1 mx-2 rounded my-3 text-white ">User Management</p></Link>
          <Link href='/dashboard'><p onClick={() => handleLinkClick('all-orders')} className=" border  px-2 py-1 mx-2 rounded my-3 text-white ">All Orders</p></Link>
          <Link href='/dashboard'><p onClick={() => handleLinkClick('all-products')} className=" border  px-2 py-1 mx-2 rounded my-3 text-white ">All Products</p></Link>


        </div>
      </div>

      <div className="mt-4 md:w-10/12">


        {pageContent}


      </div>
    </div>
  );
}
