"use client";

import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {productApi} from "@/redux/service/product";
import Loading from "@/app/(user)/loading";
import { signIn } from "next-auth/react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
type ValueTypes = {
    email: string;
    password: string;
};

const initialValues: ValueTypes = {
    email: "",
    password: ""
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required")
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    useEffect(() => {
      if (status === "authenticated") {
        router.push('/');
      }
    }, [status]);
    const handleLogin = (values: ValueTypes) => {
      setLoading(true);
      fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
        
    };
  

    return (
        <main className={`${style.container}`}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    handleLogin(values);
                }}
            >
                <Form className="bg-pink-300 p-4 rounded-lg w-96">
                    <h1 className={`${style.title}`}>Login</h1>
                    {/* Email */}
                    <div className="mb-5">
                        <label className={`${style.label}`} htmlFor="email">
                            Email
                        </label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            className={`${style.input}`}
                        />
                        <ErrorMessage
                            name="email"
                            component="section"
                            className={`${style.error}`}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className={`${style.label}`} htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <Field
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                className={`${style.input}`}
                            />
                            {!showPassword ? (
                                <IoEyeOffSharp
                                    onClick={() => handleShowPassword()}
                                    className="cursor-pointer absolute right-2 top-4"
                                />
                            ) : (
                                <IoEyeSharp
                                    onClick={() => handleShowPassword()}
                                    className="cursor-pointer absolute right-2 top-4"
                                />
                            )}
                        </div>
                        <ErrorMessage
                            name="password"
                            component="section"
                            className={`${style.error}`}
                        />
                    </div>
                    <div className="flex flex-col items-center">
                  <button
                    onClick={() => signIn("google")}
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  >
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign In with Google</span>
                  </button>

                  <button
                    onClick={() => signIn("github")}
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                  > 
                    <div className="bg-white p-1 rounded-full">
                      <svg className="w-6" viewBox="0 0 32 32">
                        <path
                          fill-rule="evenodd"
                          d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign In with GitHub</span>
                  </button>
                </div>
                    {/* button submit */}
                    <button type="submit" className={`bg-green-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                        Login
                    </button>
                </Form>
            </Formik>
        </main>
    );
}