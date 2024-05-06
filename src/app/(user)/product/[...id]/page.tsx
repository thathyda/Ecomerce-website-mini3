'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetProductByIdQuery } from '@/redux/service/product';
import {any} from "prop-types";
import Loading from "@/app/(user)/loading";
import {FaCartShopping} from "react-icons/fa6";
import {addToCart } from "@/redux/features/cart/cartSlice";
import {useAppDispatch} from "@/redux/hooks";
import ProductDetailComponent from "@/components/card/ProductDetail";

export type ParamProps = {
    params: {
        id: number;
    };
};

function DetailPage({ params }: ParamProps) {
    const dispatch = useAppDispatch();
    const id = params.id;
    const { data:product, error, isLoading } = useGetProductByIdQuery(id);

    if (!product) return <div>No product found.</div>;

    const {name, image, price, desc} = product;

    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, price, image }));
    }

    if (isLoading) return <div><Loading/></div>;

    if (error) { // @ts-ignore
        return <div>Error: {error.message}</div>;
    }

    if (!product) return <div>No product found.</div>;

    return (
        <main>
            <section className="my-10 grid place-content-center">
                <ProductDetailComponent
                    id={id}
                    name={name}
                    price={price}
                    desc={desc}
                    image={image}
                    onClick={handleAddToCart}
                />
            </section>
        </main>
    );
}

export default DetailPage;
