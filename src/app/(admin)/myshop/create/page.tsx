"use client";
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import Image from 'next/image';
import {useCreateProductMutation} from "@/redux/service/product";
import { useState } from 'react';

const FILE_SIZE = 1024 * 1024 * 5; // mean can store 5MB only
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
    image: Yup.mixed()
        .test("fileSize", "File too large", (value: any) => {
            if (!value) {
                return true;
            }
            return value.size <= FILE_SIZE;
        })
        .test("fileFormat", "Unsupported Format", (value: any) => {
            if (!value) {
                return true;
            }
            return SUPPORTED_FORMATS.includes(value.type);
        })
        .required("Required"),
});

const fieldStyle = "border border-gray-300 rounded-md";

const FormCreateProduct = () => {

    return (
        <div className="w-[700px] mx-auto h-[1000px]">
            <Formik
                onSubmit={(values: any, { setSubmitting, resetForm }) => {
                    console.log(values);
                    const formData = new FormData();
                    formData.append("image", values.image);
                    //   handleSubmitToServer({ image: formData });
                    setSubmitting(false);
                    resetForm();
                }}
                validationSchema={validationSchema}
                initialValues={{
                    category: {
                        name: "",
                        icon: "",
                    },
                    name: "",
                    desc: "",
                    image: undefined,
                    price: 0,
                    quantity: 0,
                }}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="flex m-[30px] flex-col gap-4">
                        {/* name */}
                        {/* Category Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category.name">Category Name:</label>
                            <Field
                                placeholder="Category name"
                                className={fieldStyle}
                                name="category.name"
                                type="text"
                            />
                            <ErrorMessage name="category.name" />
                        </div>

                        {/* Category Icon */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category.icon">Category Icon URL:</label>
                            <Field
                                placeholder="Category icon URL"
                                className={fieldStyle}
                                name="category.icon"
                                type="text"
                            />
                            <ErrorMessage name="category.icon" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Product Name: </label>
                            <Field
                                placeholder="Your product name"
                                className={fieldStyle}
                                name="name"
                                type="text"
                            />
                            {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
                        </div>
                        {/* description */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="desc">Description: </label>
                            <Field
                                placeholder="Your product description"
                                className={fieldStyle}
                                name="desc"
                                type="text"
                            />
                            {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
                        </div>
                        {/* price */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price">Price: </label>
                            <Field
                                placeholder="$0"
                                className={fieldStyle}
                                name="price"
                                type="number"
                            />
                            {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
                        </div>
                        {/* quantity */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price">Quantity: </label>
                            <Field
                                placeholder="1"
                                className={fieldStyle}
                                name="quantity"
                                type="number"
                            />
                            {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}

                            {/* Image  */}
                            <div>
                                <Field
                                    name="image"
                                    className={fieldStyle}
                                    type="file"
                                    title="Select a file"
                                    setFieldValue={setFieldValue} // Set Formik value
                                    component={CustomInput} // component prop used to render the custom input
                                />
                                <ErrorMessage name="image">
                                    {(msg) => <div className="text-danger">{msg}</div>}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className='ml-auto'>
                            <button
                                type="submit"
                                className="w-max px-4 py-3 bg-[#ff8b00] text-white rounded-lg"
                                disabled={isSubmitting}
                            >
                                Create
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormCreateProduct;

// custom Input
function CustomInput({ field, form, setFieldValue, ...props }: any) {
    const [previewImage, setPreviewImage] = useState<string | undefined>(
        undefined
    );
    const name = field.name;
    const onChange: any = (event: any) => {
        console.log("event:", event.currentTarget.files);
        const file = event.currentTarget.files[0];
        setFieldValue(name, file);
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <div className="flex flex-col gap-4 justify-center">
            <input
                type="file"
                onChange={onChange}
                {...props}
                className="border border-gray-300 rounded-md"
            />
            {previewImage && (
                <Image
                    className="rounded-md"
                    src={previewImage}
                    alt="preview Image"
                    width={100}
                    height={100}
                />
            )}
        </div>
    );
}