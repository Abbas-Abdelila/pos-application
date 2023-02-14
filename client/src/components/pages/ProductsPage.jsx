import React from 'react'
import Header from '../header/Header'
import Edit from '../products/Edit'

const ProductsPage = () => {
  return (
    <>
    <Header />
    <div className='px-6 overflow-auto max-h-[calc(100vh_-_112px)] scroll-auto'>
        <h1 className='text-center text-4xl mb-3'>Products</h1>
        <Edit />
    </div>
    </>
    
  )
}

export default ProductsPage