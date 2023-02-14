import Header from '../header/Header'
import CartTotals from '../cart/CartTotals'
import Categories from '../categories/Categories'
import Products from '../products/Products'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'


const HomePage = () => {

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


  const [categories, setCategories] = useState();
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getProducts = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all")
      const data = await res.json()
      setProducts(data)
      
    } catch (error) {
        console.log(error)
    }
  }

  getProducts()
  }, [])
  

  useEffect(() => {
    const getCategories = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all")
      const data = await res.json()
      data && setCategories(data.map((item) => {
        return {...item, value:item.title} 
      }))
      
    } catch (error) {
        console.log(error)
    }
  }

  getCategories()
  }, [])
  
  
  return (
    <>
      <Header setSearch={setSearch} />
      {categories && products ? (
        <div className="home px-6 flex flex-col md:flex-row justify-between gap-10 md:pb-0 pb-24">
        <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
          <Categories 
            setFiltered={setFiltered} 
            categories={categories} 
            setCategories={setCategories}
            products={products} />
          </div>

        <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto min-h-[500px]">
          <div>
            <Products 
              categories={categories} 
              filtered={filtered} 
              products={products} 
              setProducts={setProducts}
              search={search}  
            />
            </div>
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border-l">
          <div>
            <CartTotals />
          </div>
        </div>
      </div>
      ): <Spin size="large" className="absolute top-1/2 h-screen w-screen flex justify-center" />}
    </>
  )
}

export default HomePage