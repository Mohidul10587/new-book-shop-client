import React, { useState } from 'react';

const products = [
    { id: 1, name: 'Product 1', brand: 'Brand A', price: 10, color: 'Red' },
    { id: 2, name: 'Product 2', brand: 'Brand A', price: 20, color: 'Blue' },
    { id: 3, name: 'Product 3', brand: 'Brand B', price: 30, color: 'Green' },
    { id: 4, name: 'Product 4', brand: 'Brand B', price: 40, color: 'Red' },
    { id: 5, name: 'Product 5', brand: 'Brand C', price: 50, color: 'Blue' },
    { id: 6, name: 'Product 6', brand: 'Brand C', price: 60, color: 'Green' },
];


const ProductFilterPage = () => {
    const [filters, setFilters] = useState({
        brand: [],
        color: [],
        price: [],
    });

    const handleBrandFilter = (event) => {
        const brand = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setFilters({
                ...filters,
                brand: [...filters.brand, brand],
            });
        } else {
            setFilters({
                ...filters,
                brand: filters.brand.filter(b => b !== brand),
            });
        }
    };

    const handleColorFilter = (event) => {
        const color = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setFilters({
                ...filters,
                color: [...filters.color, color],
            });
        } else {
            setFilters({
                ...filters,
                color: filters.color.filter(c => c !== color),
            });
        }
    };

    const handlePriceFilter = (event) => {
        const priceRange = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setFilters({
            ...filters,
            price: [...filters.price, priceRange],
          });
        } else {
          setFilters({
            ...filters,
            price: filters.price.filter(p => p !== priceRange),
          });
        }
      };
      
      const filteredProducts = products.filter(product => {
        if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
          return false;
        }
        if (filters.color.length > 0 && !filters.color.includes(product.color)) {
          return false;
        }
        if (filters.price.length > 0) {
          const productPrice = parseInt(product.price);
          console.log(productPrice)
          const selectedPriceRanges = filters.price.map(p => p.split('-'));
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
    return (
        <div className="min-h-screen pt-24 container px-10">
            <h1 className="text-2xl font-bold mt-4">Product Filter</h1>
            <div className="flex justify-between mt-4">
                <div>
                    <h2 className="text-lg font-bold mb-2">Brand</h2>
                    <label className="flex items-center mb-1">
                        <input type="checkbox" value="Brand A" onChange={handleBrandFilter} />
                        <span className="ml-2">
                            Brand A</span>
                    </label>
                    <label className="flex items-center mb-1">
                        <input type="checkbox" value="Brand B" onChange={handleBrandFilter} />
                        <span className="ml-2">Brand B</span>
                    </label>
                    <label className="flex items-center mb-1">
                        <input type="checkbox" value="Brand C" onChange={handleBrandFilter} />
                        <span className="ml-2">Brand C</span>
                    </label>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Price</h2>
                    <label className="flex items-center mb-1">
                        <input type="checkbox" value="10-50" onChange={handlePriceFilter} />
                        <span className="ml-2">$10 - $50</span>
                    </label>
                    <label className="flex items-center mb-1">
                        <input type="checkbox" value="50-100" onChange={handlePriceFilter} />
                        <span className="ml-2">$50 - $100</span>
                    </label>
                    <label className="flex items-center mb-1">
                        <input type="checkbox" value="100-500" onChange={handlePriceFilter} />
                        <span className="ml-2">$100 - $500</span>
                    </label>
                    <label className="flex items-center mb-1">
                        <input type="checkbox" value="500-1000" onChange={handlePriceFilter} />
                        <span className="ml-2">$500-1000</span>
                    </label>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Color</h2>
                    <label className="flex items-center mb-1">
                        <input type="checkbox" value="Red" onChange={handleColorFilter} />
                        <span className="ml-2">Red</span>
                    </label>
                    <label className="flex items-center mb-1">
                        <input type="checkbox" value="Green" onChange={handleColorFilter} />
                        <span className="ml-2">Green</span>
                    </label>
                    <label className="flex items-center mb-1">
                        <input type="checkbox" value="Blue" onChange={handleColorFilter} />
                        <span className="ml-2">Blue</span>
                    </label>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Products</h2>
                {filteredProducts.length > 0 ? (
                    <ul>
                        {filteredProducts.map((product) => (
                            <li key={product.id} className="mb-2">
                                {product.name} - {product.brand} - {product.price} - {product.color}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default ProductFilterPage;