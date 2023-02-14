import { useState, useEffect } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import ProductItem from "./ProductItem";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ( {categories, filtered, products, setProducts, search}) => {

  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate()

 


  
    return (
      <div className="products-wrapper grid grid-cols-card gap-4">
        {filtered.filter((product) => (product.title.toLowerCase().includes(search)))
        
        .map((item) => (
         <ProductItem item={item} key={item._id} />
         ))       
      }
      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none 
        bg-purple-800 flex justify-center items-center hover:opacity-90 h-[173px] rounded-lg"
        onClick={() => { setIsAddModalOpen(true)}}
      >
        <PlusOutlined className="text-white md:text-2xl" />
      </div>
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none
       bg-orange-600 flex justify-center items-center hover:opacity-90 h-[173px] rounded-lg"
       onClick={() => {navigate("/products")}} >
        <EditOutlined className="text-white md:text-2xl" />
      </div>
      <Add isAddModalOpen={isAddModalOpen} 
        setIsAddModalOpen={setIsAddModalOpen} 
        products={products} 
        setProducts={setProducts}
        categories={categories} />
       
    </div>
      
    );
  
    
 
};

export default Products;