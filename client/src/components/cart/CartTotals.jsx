import { Button, message } from "antd";
import React from "react";
import { ClearOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons"
import { useSelector, useDispatch } from "react-redux";
import { decrease, deleteProduct, increase, reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartTotals = () => {

  const cart = useSelector((state) => state.cart); 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <div className="cart h-screen flex flex-col max-h-[calc(100vh_-_90px)] pr-2">
      <h2 className="bg-blue-600 py-4 text-center text-white tracking-wide font-bold">
        Checkout Cart
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2 overflow-y-auto">
          {cart.cartItems.map((item) => (
                <li className="cart-item flex justify-between" key={item._id}>
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt=""
                    className="w-16 h-16 object-fit border rounded-lg cursor-pointer"
                    onClick={() => {
                      message.success("Item deleted successfully!")
                      dispatch(deleteProduct(item))
                    }}
                  />
                  <div className="flex flex-col ml-2">
                    <b>{item.title}</b>
                    <span>$ {item.price}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className="flex justify-center items-center !rounded-full"
                    size="small" 
                    onClick={() => (dispatch(increase(item)))}
                    />
       
                  <span className="font-semibold w-6 inline-block text-center ">{item.quantity}</span>
                  <Button
                    type="primary"
                    icon={<MinusOutlined />}
                    className="flex justify-center items-center !rounded-full"
                    size="small"
                    onClick={() => {
                      if(item.quantity === 1) {
                        if(window.confirm("Are you sure you want to delete item?")){
                          dispatch(decrease(item))
                          message.success("Item deleted successfully!")
                        }
                      }
                      else {
                        dispatch(decrease(item))
                      }
                    }}
                    />
                </div>
              </li>
          )).reverse()}
       
        

      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-b border-t">
          <div className="flex justify-between px-2">
            <b>Ara toplam</b>
            <span>$ {(cart.total > 0) ? cart.total.toFixed(2) : 0}</span>
          </div>
          <div className="flex justify-between px-2">
            <b>KDV %8</b>
            <span className="text-red-700">{(cart.total > 0) ? `+ $ ${(cart.total * cart.tax).toFixed(2)}` : 0}</span>
          </div>
        </div>
        <div className="mt-4 border-b">
          <div className="flex justify-between px-2">
            <b className="text-xl text-green-500">Genel toplam</b>
            <span className="text-xl">$ {(cart.total > 0) ? ` ${(cart.total * (1 + cart.tax)).toFixed(2)}` : 0}</span>
          </div>
        </div>
        <div className="mt-4  py-6 px-2">
          <Button type="primary" size="large" className="w-full mb-3"
          onClick={() => (navigate("/cart"))}
          disabled={(cart.cartItems.length > 0) ? false : true}
          >Siparis Olustur</Button>
          <Button type="primary" size="large" className="w-full flex justify-center items-center"
           danger icon={<ClearOutlined />}
           disabled={(cart.cartItems.length > 0) ? false : true}
           onClick={() => {
            if(window.confirm("Are you sure you want to empty cart?"))
              dispatch(reset())
              message.success("Cart Cleared Successfully!")
           }} 
          >Clear</Button>
        </div>


      </div>


    </div>
  );
};

export default CartTotals;
