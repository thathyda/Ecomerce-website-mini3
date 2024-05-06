"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
    selectProducts,
    selectTotalPrice,
    selectTotalQuantity
} from "@/redux/features/cart/cartSlice";
import CartProduct from "@/components/card/CartProduct";

export default function Cart() {
    const products = useAppSelector((state) => state.cart.products);
    const totalPrice = useAppSelector(selectTotalPrice);
    const dispatch = useAppDispatch();
    const totalQuantity = useAppSelector(selectTotalQuantity);


    return (
        <main className="w-max my-10 gap-12 grid grid-cols-2 mx-auto">
            <div>
                {products.length !== 0 &&
                    products.map((product) => (
                    <CartProduct id={product.id}
                                 key={product.id}
                                 name={product.name}
                                 price={product.price}
                                 image={product.image}
                                 />
                    ))}
                {products.length == 0 && <h1 className="text-6xl">Cart is Empty!</h1>}
            </div>
            <div>
                {products.length !== 0 && (
                    <div className='text-left'>
                        <h1 className="text-5xl font-semibold p-2">
                            Total of product{" "}
                            <span className="text-red-500">{products.length}</span>
                        </h1>
                        <h2 className="text-4xl my-3 p-2">
                            Total Price $ <span className=" text-red-500">{totalPrice}</span>
                        </h2>
                    </div>
                )}
            </div>
        </main>
    );
}
