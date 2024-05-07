'use client'
import React from 'react';
import Image from "next/image";
import {addToCart, removeFromCart, increment, decrement} from "@/redux/features/cart/cartSlice";
import {CartProductType, ProductType} from "@/lib/defination";
import {useAppSelector, useAppDispatch} from "@/redux/hooks";
import {useGetProductsQuery} from "@/redux/service/product";
// import {generators} from "openid-client";
import {useState} from "react";

const CartProduct = ({ id, name, price, image }: CartProductType) => {
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
  
    const handleRemoveFromCart = (id: number) => {
      dispatch(removeFromCart(id));
    };
  
    const handleIncrement = (id: number) => {
      setQuantity((prevQuantity) => prevQuantity + 1);
      dispatch(increment(id));
    };
  
    const handleDecrement = (id: number) => {
      if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
        dispatch(decrement(id));
      } else {
        handleRemoveFromCart(id);
      }
    };
  
    return (
      <div className="flex justify-between items-center bg-gray-100 shadow-md my-4 p-4 rounded-md">
        <div className="flex items-center">
          <div className="mr-4">
            <Image width={100} height={100} src={image} alt={name} />
          </div>
          <div>
            <h1 className="text-xl font-semibold">{name}</h1>
            <h2 className="text-red-500 mt-1">${price}</h2>
          </div>
        </div>
        <div className="flex items-center">
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mr-2" onClick={() => handleDecrement(id)}>
            -
          </button>
          <p className="text-xl font-semibold">{quantity}</p>
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 ml-2" onClick={() => handleIncrement(id)}>
            +
          </button>
          <button
            className="text-red-500 hover:text-white hover:bg-red-500 font-semibold text-sm ml-4 py-2 px-4 rounded-md"
            onClick={() => handleRemoveFromCart(id)}
          >
            Remove
          </button>
        </div>
      </div>
    );
  };
  
  export default CartProduct;