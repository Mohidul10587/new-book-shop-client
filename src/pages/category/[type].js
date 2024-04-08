import url from '@/components/url'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '@/components/productCard'
import { ThemeContext } from '../_app'
import { FiLoader } from 'react-icons/fi'



const Category = () => {
 
 

 
 
  const priceRanges = ["10-50", "500-1000","1000-1500","1500-2000"];

  const [products, setProducts] = useState([])
  const [showFlavour, setShowFlavour] = useState(false)
  const [showPrice, setShowPrice] = useState(false)

  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const category = router.query.type
  const value = useContext(ThemeContext);
  const [filters, setFilters] = useState({
    flavour: [],
    price:[]
  });

  const handleFlavorsFilter = (event) => {
    const flavour = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setFilters({
        ...filters,
        flavour: [...filters?.flavour, flavour],
      });
    } else {
      setFilters({
        ...filters,
        flavour: filters?.flavour.filter(b => b !== flavour),
      });
    }
  };


  
  console.log(filters?.price)

  const filteredProducts = products.filter(product => {

    if (filters?.price.length > 0) {
      const productPrice = parseInt(product.price);
      console.log(productPrice)
      const selectedPriceRanges = filters?.price.map(p => p.split('-'));
      console.log(selectedPriceRanges)
      const isPriceMatch = selectedPriceRanges.some(
        ([min, max]) => (min === '' || productPrice >= min) && (max === '' || productPrice <= max)
      );
      if (!isPriceMatch) {
        return false;
      }
    }
    return true;
  });


  useEffect(() => {
    if (category) {
      fetch(`${url}/cakeType/${category}`, {
        method: "GET",
      }).then(res => res.json())
        .then(data => {
          filterData(value.searchText, data)
          setLoading(false)
        })
        .catch(error => console.log(error));
    }
  }, [value.searchText, category])


  const filterData = (searchText, dataList, filters) => {
    const lowercasedValue = searchText.toLowerCase().trim();
    let filteredData = dataList;
    if (lowercasedValue !== "") {
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().trim().replace(/\s+/g, '').includes(lowercasedValue.replace(/\s+/g, ''))
      );
    }


    setProducts(filteredData);
  };
  

  if (loading) return <div className='min-h-screen pt-24 flex justify-center items-center gap-2'>
    <FiLoader className='animate-spin text-2xl' />
    <p className='text-center text-2xl'>Loading....</p>
  </div>

  return (
    <div className='min-h-screen pt-24'>

      <div className='px-10'>
        <h1 className='text-center md:text-3xl text-xl px-5'>{category}</h1>
        <div className='md:flex  md:mt-10 mt-4 '>
          
          <div className='md:w-3/4'>

            {products.length > 0 ? (
              <div className='grid md:grid-cols-3 grid-cols-1 gap-5 mb-10  px-4 place-content-center place-items-center'>

                {filteredProducts.map(p => <ProductCard p={p} key={p._id} />)}
              </div>
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>

    </div>

  )
}

export default Category