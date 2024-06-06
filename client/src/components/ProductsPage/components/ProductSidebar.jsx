import React, { useState } from "react";

const ProductSidebar = ({ categories, products, setProducts }) => {
  const [priceRange, setPriceRange] = useState(10000); // Initial price range value
  const [editablePrice, setEditablePrice] = useState(priceRange);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const isCategorySelected = (categoryId) => {
    return selectedCategories.includes(categoryId);
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange(value);
    setEditablePrice(value);
  };

  const handleEditablePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setEditablePrice(value);
    if (value >= 1 && value <= 10000) {
      setPriceRange(value);
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    switch (value) {
      case "a-z":
        setProducts([...products].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "z-a":
        setProducts([...products].sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case "highest-rated":
        setProducts([...products].sort((a, b) => b.rating - a.rating));
        break;
      case "lowest-rated":
        setProducts([...products].sort((a, b) => a.rating - b.rating));
        break;
      case "highest-price":
        setProducts([...products].sort((a, b) => b.price - a.price));
        break;
      case "lowest-price":
        setProducts([...products].sort((a, b) => a.price - b.price));
        break;
      default:
        // Default sorting
        setProducts([...products]);
        break;
    }
  };

  return (
    <div className="w-1/4 p-8 bg-white border-r border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${
              isCategorySelected(category.id)
                ? "bg-theme-black text-white"
                : "bg-theme-white text-black"
            } hover:bg-theme-black hover:text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Price Range</h2>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">1</span>
        <input
          type="range"
          min="1"
          max="10000"
          step="1"
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full mx-2"
        />
        <span className="text-gray-600">10,000</span>
      </div>
      <div className="mt-4 flex items-center">
        <span className="mr-2">Current Price:</span>
        <input
          type="number"
          min="1"
          max="10000"
          value={editablePrice}
          onChange={handleEditablePriceChange}
          className="border border-gray-300 rounded-md p-2 w-24 text-center"
        />
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Sort By</h2>
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="default" disabled>Default</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="highest-rated">Highest Rated</option>
        <option value="lowest-rated">Lowest Rated</option>
        <option value="highest-price">Highest Price</option>
        <option value="lowest-price">Lowest Price</option>
      </select>
    </div>
  );
};

export default ProductSidebar;
