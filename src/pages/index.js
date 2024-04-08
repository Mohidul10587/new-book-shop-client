
import { FiLoader } from 'react-icons/fi';

import { BsArrowRight } from 'react-icons/bs';
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
import { useContext, useEffect, useState } from 'react'
import url from '@/components/url'
import Link from 'next/link'
import ProductCard from '@/components/productCard';
import Business from '@/components/summary';
import { ThemeContext } from './_app';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mathematicsCollections, setMathematicsCollections] = useState([]);
  const [historyCollections, setHistoryCollections] = useState([]);
  const [scienceCollections, setScienceCollections] = useState([]);
  const [fictionCollections, setFictionCollections] = useState([]);
  const [biographyCollections, setBiographyCollections] = useState([]);



  const value = useContext(ThemeContext);
  useEffect(() => {


    fetch(`${url}/getProduct`, {
      method: "GET",
    }).then(res => res.json())
      .then(data => {
        filterData(value.searchText, data)
        const mathematicsCollections = data.filter(d => d.categoryName === 'Mathematics');
        setMathematicsCollections(mathematicsCollections);
        const historyCollections = data.filter(d => d.categoryName === "History");
        setHistoryCollections(historyCollections);
        const scienceCollections = data.filter(d => d.categoryName === "Science");
        setScienceCollections(scienceCollections);
        const fictionCollections = data.filter(d => d.categoryName === "Fiction");
        setFictionCollections(fictionCollections);
        const biographyCollections = data.filter(d => d.categoryName === "Biography");
        setBiographyCollections(biographyCollections);
        setLoading(false)
      })
      .catch(error => console.log(error));


  }, [value.searchText])


  const filterData = (searchText, dataList) => {

    const lowercasedValue = searchText.toLowerCase().trim();
    if (lowercasedValue === "") setProducts(dataList);
    else {
      const filteredData = dataList.filter(
        (item) =>
          item.name.toLowerCase().trim().replace(/\s+/g, '').includes(lowercasedValue.replace(/\s+/g, ''))

      );
      console.log(filteredData.length)
      setProducts(filteredData);
    }
  }


  return (
    <main className='pt-20 min-h-screen w-full'>
      <Banner />

      <div className='mt-10 md:px-10'>

        <div className='grid md:grid-cols-3 grid-cols-1 text-2xl font-bold px-8 my-4'>
          <h1>Book Collection</h1>
        </div>

        {
          loading ?
            <div className='flex justify-center items-center gap-2 my-16 '>
              <FiLoader className='animate-spin text-2xl' />
              <p className='text-center text-2xl'>Loading....</p>
            </div> :
            <div className='grid md:grid-cols-4 grid-cols-1 md:gap-5  gap-y-5 mb-10  md:px-4 place-content-center place-items-center'>
              {products.slice(0, 8).map(p => <ProductCard p={p} key={p._id} />)}
            </div>
        }
        <div className='flex justify-end text-xl font-bold px-4 my-4'>
          <Link href={`/products`}>
            <div className='flex items-center gap-2'> <h1>See all</h1>  <BsArrowRight /></div>
          </Link>
        </div>

        

      </div>



      {/* Bushiness Summary */}

      <Business />
      <h2 className="py-2  text-3xl text-center  my-24">What our clients say</h2>
      <div className="md:flex justify-between px-10 items-center bg-violet-200 py-10 ">
        <div className="md:w-1/2 flex md:justify-start justify-center ">
          <img src="review.jpeg" className='w-7/12 ' alt="" />

        </div>
        <div className="md:w-1/2 md:text-xl order-last mt-4 text-justify">
          <p>I recently stumbled upon this online book shop and I must say I am thoroughly impressed! The website is user-friendly and easy to navigate, and the selection of books is fantastic. I was able to find a book I had been searching for months, and it was priced very reasonably.

The checkout process was smooth and hassle-free, and my book arrived within a few days of ordering. The packaging was secure and the book was in excellent condition.


          </p>
          <p className="text-orange-500 font-semibold">Mohidul Islam</p><span>Faunder</span>
        </div>

      </div>



    </main>
  )
}