import { useEffect, useState } from "react";
import {PlusOutlined, EditOutlined} from "@ant-design/icons"
import Add from "./Add";
import "./style.css"
import Edit from "./Edit";



const Categories = ({ categories, setCategories, setFiltered, products }) => {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("All");

  
  
  const showAddModal = () => {
    setIsAddModalOpen(true)
  }

  const showEditModal = () => {
    setIsEditModalOpen(true);
  }
 


    const showErrorOverlay = err => {
    // must be within function call because that's when the element is defined for sure.
    const ErrorOverlay = customElements.get('vite-error-overlay')
    // don't open outside vite environment
    if (!ErrorOverlay) {return}
    console.log(err)
    const overlay = new ErrorOverlay(err)
    document.body.appendChild(overlay)
}

  window.addEventListener('error', showErrorOverlay)
  window.addEventListener('unhandledrejection', ({reason}) => showErrorOverlay(reason))
  

  useEffect(() => {
    if (categoryTitle === "All") {
      setFiltered(products)
    }
    else {
      setFiltered(products.filter((item) => {return item.category === categoryTitle}))
    } 
    
  }, [products, setFiltered, categoryTitle])
  
  return (
    <ul className="flex md:flex-col gap-4">
     {categories.map((item) => {
      return(
      <li className={`category-item ${(item.title === categoryTitle)&&"!bg-pink-400"}`} key={item._id} onClick={() => setCategoryTitle(item.title)}>
        <span>{item.title}</span>
      </li>
      )
     })}
      
      <li className="category-item !bg-purple-800 hover:opacity-90" onClick={showAddModal} >
        <PlusOutlined className="text-3xl"/>
      </li>
      <li className="category-item !bg-orange-600 hover:opacity-90" onClick={showEditModal} >
        <EditOutlined className="text-3xl"/>
      </li>
     <Add 
          isAddModalOpen={isAddModalOpen} 
          setIsAddModalOpen={setIsAddModalOpen} 
          categories={categories} 
          setCategories={setCategories} />

      <Edit isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} categories={categories} setCategories={setCategories}/>
        
    </ul>
  );
}

export default Categories;
