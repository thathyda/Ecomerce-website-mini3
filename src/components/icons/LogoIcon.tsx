import React from 'react';
import Image from "next/image";

const LogoIcon = () => {
    return (
        <div>
            <Image width={50} height={50} src="/images/logo.png" alt=""/>
        </div>
    );
};

export default LogoIcon;