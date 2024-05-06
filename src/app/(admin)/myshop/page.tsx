"use client";
import {ProductType} from "@/lib/defination";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import {Button, Modal} from "flowbite-react";
import Image from "next/image";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/react";
import {useGetProductsQuery} from "@/redux/service/product";
import {IoEllipsisHorizontal} from "react-icons/io5";
import {useRouter} from "next/navigation";

export default function Dashboard() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState(false);

    const {data, error, isLoading} = useGetProductsQuery({
        page: 1, pageSize: 10
    })
    const router = useRouter();

    const [productDetail, setProductDetail] = useState<ProductType | null>(null);
    // fetch products
    useEffect(() => {
        setLoading(isLoading);
        if (data) {
            setProducts(data.results);
        }
    }, [data, isLoading]);

    useEffect(() => {
        if (error) {
            // Handle error here, such as showing a toast message or logging the error
            console.error("Error fetching products:", error);
        }
    }, [error]);

    const [imagePlaceholder, setImagePlaceholder] = useState<string>(
        "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
    );

    const handleViewProduct = (product: ProductType) => {
        setProductDetail(product);
        setOpenModal(true);
    };

    const columns: TableColumn<ProductType>[] = [
        {
            name: "Product Title",
            selector: (row) => row.name,
        },
        {
            name: "Price (USD)",
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: "Image",
            selector: (row): any => (
                <Image height={1000} width={1000} className="w-16 h-16" src={row.image} alt={row.image} />
            ),
            sortable: true,
        },
        {
            name: "Category",
            selector: (row) => row.category,
            sortable: true,
        },
        {
            // name: "Action",
            // selector: (row): any => (
            //     <div>
            //         <button
            //             onClick={() => handleViewProduct(row)}
            //             className="text-blue-600 mx-2"
            //         >
            //             view
            //         </button>
            //         <button className="text-yellow-400 mx-2">edit</button>
            //         <button className="text-red-600 mx-2">delete</button>
            //     </div>
            // ),
            name: "Action",
            cell: (row) => {
                return (
                    <div className="rounded-[50%] bg-gray-50 w-max p-2">
                        <Dropdown >
                            <DropdownTrigger>
                                <button>
                                    <IoEllipsisHorizontal />
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">

                                <DropdownItem
                                    className="w-max hover:rounded-xl font-bold text-green-400 hover:bg-green-400 hover:font-bold hover:text-white"
                                    // key="detail"
                                    // onClick={() => route.push(`/${row.id}`)}
                                    key="detail"
                                    // onClick={()=> router.push(`/product/${products.filter(product=>product.id)}`)}
                                    onClick={()=> router.push(`/product/${row.id}`)}
                                >
                                    View Detail
                                </DropdownItem>

                                <DropdownItem key="edit"
                                              className="w-max hover:rounded-xl font-bold text-yellow-400 hover:bg-yellow-400 hover:font-bold hover:text-white"
                                              onClick={() => router.push(`/myshop/update/${row.id}`)}
                                >
                                    Edit
                                </DropdownItem>

                                <DropdownItem
                                    key="delete"
                                    className="w-max hover:rounded-xl font-bold text-red-400 hover:bg-red-400 hover:font-bold hover:text-white"
                                    color="danger"
                                >
                                    Delete
                                </DropdownItem>

                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            },
        }
    ];

    return (
        <main className="my-10 mx-[100px]">
            <button onClick={() => router.push(`/myshop/create`)}>
                Create New
            </button>
            <DataTable
                fixedHeader
                progressPending={loading}
                columns={columns}
                data={products}
                pagination
                customStyles={customStyles}
                striped
                highlightOnHover
            />
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Product Detial</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <Image
                            src={productDetail?.image || imagePlaceholder}
                            alt={productDetail?.name || "Untitle"}
                            width={250}
                            height={300}
                        />
                        <h3 className="text-3xl text-gray-700">{productDetail?.name || "Untitle"}</h3>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {productDetail?.desc || "No description"}
                        </p>

                    </div>
                </Modal.Body>
            </Modal>
        </main>
    );
}

const customStyles = {
    rows: {
        style: {
            minHeight: "72px", // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: "38px", // override the cell padding for head cells
            paddingRight: "8px",
            fontSize: "1.2rem",
            backgroundColor: "#f1f1f1",
        },
    },
    cells: {
        style: {
            paddingLeft: "38px", // override the cell padding for data cells
            paddingRight: "8px",
        },
    },
};