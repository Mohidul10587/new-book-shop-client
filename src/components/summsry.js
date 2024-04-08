import React, { useState, useEffect, useRef } from 'react';
import { FiFlag, FiHelpCircle, FiLoader } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { HiTemplate } from 'react-icons/hi';
import { CgDollar } from 'react-icons/cg';
function Business() {
  const [customerCount, setCustomerCount] = useState(300);
  const [District, setDistrict] = useState(44);
  const [feedBack, setFeedBack] = useState(360);
  const [items, setItems] = useState(4);
  const [revenues, setRevenues] = useState(780);

  



  const businessRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const businessPosition = businessRef.current.getBoundingClientRect();
      if (
        businessPosition.top < window.innerHeight * 0.75 &&
        businessPosition.bottom > window.innerHeight * 0.25
      ) {
        setTimeout(() => {
            const newCustomerCount = Math.min(customerCount + 1, 320);
            const newDistrict = Math.min(District + 1, 64);
            const newFeedBack = Math.min(feedBack + 1, 380);
            const newItems = Math.min(items + 1, 380);
            const newRevenues= Math.min(revenues + 1, 800);
          

            setCustomerCount(newCustomerCount);
            setDistrict(newDistrict);
            setFeedBack(newFeedBack)
            setItems(newItems)
            setRevenues(newRevenues)
        }, 150); // Increase the count every 100 milliseconds
      }
    }

    const businessPosition = businessRef.current.getBoundingClientRect();
    if (
      businessPosition.top < window.innerHeight * 0.75 &&
      businessPosition.bottom > window.innerHeight * 0.25
    ) {
      setTimeout(() => {
        const newCustomerCount = Math.min(customerCount + 1, 320);
        const newDistrict = Math.min(District + 1, 64);
        const newFeedBack = Math.min(feedBack + 1, 380);
        const newItems = Math.min(items + 1, 380);
        const newRevenues= Math.min(revenues + 1, 800);
        setCustomerCount(newCustomerCount);
        setDistrict(newDistrict);
        setFeedBack(newFeedBack)
        setItems(newItems)
        setRevenues(newRevenues)
      }, 150); // Increase the count every 100 milliseconds
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [customerCount]);

  return (
    <section ref={businessRef}>
   

      <h1 className=' text-3xl text-center  mt-20'>At a Glance</h1>
      <div className='md:flex justify-between md:px-20 px-4 my-20'>
        <div className='flex justify-center items-center border-[1px] mt-4 border-violet-900 h-44 md:w-44 w-full'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-violet-900'><FiFlag /></p>
            <p className='text-4xl mt-4 font-bold'>{District}</p>
            <p className='text-violet-900 font-bold'>Districts</p>
          </div>
        </div>
        <div className='flex justify-center items-center border-[1px] mt-4 border-violet-900 h-44 md:w-44 w-full'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-violet-900'><FaUsers /></p>
            <p className='text-4xl mt-4 font-bold'>{customerCount}+</p>
            <p className='text-violet-900 font-bold'>Satisfied Customer</p>
          </div>
        </div><div className='flex justify-center items-center border-[1px] mt-4 border-violet-900 h-44 md:w-44 w-full'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-violet-900'><AiFillLike /></p>
            <p className='text-4xl mt-4 font-bold'>{feedBack}+</p>
            <p className='text-violet-900 font-bold'>Feedback</p>
          </div>
        </div><div className='flex justify-center items-center border-[1px] mt-4 border-violet-900 h-44 md:w-44 w-full'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-violet-900'><HiTemplate /></p>
            <p className='text-4xl mt-4 font-bold'>{items}+</p>
            <p className='text-violet-900 font-bold'>Items</p>
          </div>
        </div><div className='flex justify-center items-center border-[1px] mt-4 border-violet-900 h-44 md:w-44 w-full'>
          <div className='text-center'>
            <p className='flex justify-center text-4xl text-violet-900'><CgDollar /></p>
            <p className='text-4xl mt-4 font-bold'>{revenues}K$+</p>
            <p className='text-violet-900 font-bold'>Revenues</p>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Business;
