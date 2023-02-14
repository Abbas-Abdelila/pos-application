import React from 'react'
import { addProduct } from '../../redux/cartSlice'
import { useDispatch } from 'react-redux'


const ProductItem = ({ item }) => {

  const dispatcher = useDispatch()


  return (

    <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none rounded-lg"
    onClick={() => {dispatcher(addProduct({...item, quantity: 1}))}}>
          <div className="product-img">
            <img
              src={item.img}
              alt=""
              className="h-28 object-contain w-full border-b rounded-lg"
            />
          </div>
          <div className="product-info flex flex-col p-3">
            <span className="font-bold">{item.title}</span>
            <span>${item.price}</span>
          </div>
        </div>
  )
}

export default ProductItem