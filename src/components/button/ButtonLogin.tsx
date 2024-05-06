import React from 'react';
import {useRouter} from "next/navigation";

const ButtonLogin = () => {

    const router = useRouter();

    return (
        <button onClick={()=> router.push("/login")} className='text-[14px] font-semibold px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg'>
            Login
        </button>
    );
};

export default ButtonLogin;