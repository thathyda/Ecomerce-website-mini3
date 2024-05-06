"use client";
import { Card } from "flowbite-react";
import { CartProductType, ProductType } from "@/lib/defination";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import { useAppDispatch } from "@/redux/hooks";
import { increment } from "@/redux/features/counter/counterSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import { useGetProductsQuery } from "@/redux/service/product";
import { useRouter } from "next/navigation";

export default function CardProduct({
  id,
  name,
  price,
  image,
  onClick,
}: CartProductType) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddToCart = () => {
    dispatch(increment());
    dispatch(addToCart({ id, name, image, price }));
  };

  // @ts-ignore
  return (
    <section>
      <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
        <div className="relative">
          <img
            className="w-full object-cover h-64"
            src={image}
            alt="Product Image"
          />
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
            SALE
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae
            ante vel eros fermentum faucibus sit amet euismod lorem.
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">${price}</span>
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded text-sm"
            >
              Add to cart 🛒
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
