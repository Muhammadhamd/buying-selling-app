import React, { useState, useEffect } from 'react';
import axios from "axios"
import oproductimg from "../img/productjeans1.jpg"
import Navcomponent from './navbar';

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items and total price from your API or state management
    // For this example, we'll use dummy data
    const dummyCartItems = [
      { id: 1, name: 'Product 1', price: 20, quantity: 2 },
      { id: 2, name: 'Product 2', price: 30, quantity: 1 },
    ];

    axios.get("http://localhost:2344/getcartdata")
    .then((res)=>{
    setCartItems(res.data)
    })
    .catch((e)=>{
        console.log(e)
    })
    const calculateTotalPrice = () => {
      return dummyCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    setTotalPrice(calculateTotalPrice());
  }, []);

  const removeFromCart = (itemId) => {
    // Remove an item from the cart based on its ID
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    setTotalPrice(calculateTotalPrice());
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto mt-10">
     <Navcomponent />

      <h1 className="text-3xl font-semibold mb-6">Shopping CartComponent</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300 px-[20px]">
            <thead>
              <tr className="bg-gray-100">
                <th className='w-[100px]'></th>
                <th className="p-2">Product</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Price</th>
                <th className="p-2">Total</th>
                {/* <th className="p-2">Actions</th> */}
              </tr>
            </thead>
            <tbody className=''>
              {cartItems.map((item) => (
                <tr key={item.id} className='text-center border-b border-gray-500 my-[40px]'>
                    <td className='w-[100px]'>
                        <img src={oproductimg} alt="" />
                    </td>
                  <td className="p-2">{item.name||"men jeanss"}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">${item.price||300}</td>
                  <td className="p-2">${item.price|| "300" * item.quantity}</td>
                  {/* <td className="p-2">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6">
            <p className="text-xl font-semibold">Total Price: ${totalPrice}</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-4">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
