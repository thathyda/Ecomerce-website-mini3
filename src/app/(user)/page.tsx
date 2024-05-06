'use client'
import { useGetProductsQuery } from "@/redux/service/product";
import CardProduct from "@/components/card/CardProduct";
import { ProductType } from "@/lib/defination";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import HeroComponent from "@/components/herosection/HeroComponent";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1); // State to manage current page

    // Fetch products based on the current page
    const { data, error, isLoading } = useGetProductsQuery({
        page: currentPage,
        pageSize: 8 // Assuming page size is 10
    });
    const router = useRouter();

    // Check the structure of data and extract products if available
    const products = data?.results || [];

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <main className="text-4xl flex min-h-screen flex-col items-center justify-center p-24">
            <HeroComponent/>
            <section>
                <h1 className='text-center my-9 font-semibold text-2xl'>Latest Products</h1>
                {/* Check if data is available and not loading */}
                {products.length > 0 && !isLoading && (
                    <>
                        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.map((product: ProductType) => (
                                <CardProduct
                                    key={product.id}
                                    id={product.id}
                                    name={product.name} // Assuming product title is the name
                                    price={product.price}
                                    image={product.image}
                                />
                            ))}
                        </div>
                        {/* Render pagination */}
                        {/*<Pagination  layout="table" currentPage={currentPage} totalPages={100} onPageChange={handlePageChange} showIcons />*/}
                        <Pagination
                            className='mt-4 text-sm text-center'
                            layout="pagination"
                            currentPage={currentPage}
                            totalPages={1000}
                            onPageChange={handlePageChange}
                            previousLabel="Go back"
                            nextLabel="Go forward"
                            showIcons
                        />
                    </>
                )}
            </section>
        </main>
    );
}
