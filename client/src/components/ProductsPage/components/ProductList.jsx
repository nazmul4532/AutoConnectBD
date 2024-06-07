import React from "react";
import ProductCard from "./ProductCard";
import ProductSidebar from "./ProductSidebar";
("./Sidebar");

const ProductList = ({ products, categories, addToCart }) => {
  return (
    <div className="flex mt-8">
      {/* Sidebar */}
      <ProductSidebar categories={categories} />
      {/* Product Cards */}
      <div className="w-3/4 flex flex-wrap justify-center gap-6 p-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
