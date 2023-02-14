import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from "./components/pages/HomePage";
import CartPage from "./components/pages/CartPage";
import BillPage from "./components/pages/BillPage";
import CustomersPage from "./components/pages/CustomersPage";
import StatisticsPage from "./components/pages/StatisticsPage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ProductsPage from "./components/pages/ProductsPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const cart = useSelector((state) => (state.cart));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteControl>
          <HomePage />
        </RouteControl>} />
        <Route path="/cart" element={<RouteControl>
          <CartPage />
        </RouteControl>} />
        <Route path="/bills" element={ <RouteControl>
          <BillPage />
        </RouteControl> } />
        <Route path="/customers" element={ <RouteControl>
          <CustomersPage />
        </RouteControl>} />
        <Route path="/statistics" element={<RouteControl>
          <StatisticsPage />
        </RouteControl>} />
        <Route path="/products" element={<RouteControl>
          <ProductsPage />
        </RouteControl>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

export const RouteControl = ({ children }) => {
  if(localStorage.getItem("posUser")) {
    return children
  }
  else {
    return <Navigate to="/login" />
  }
}
