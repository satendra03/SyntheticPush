// src/app/signup-first/page.tsx
"use client";

import Image from "next/image";

const SignupFirst = () => {
    return (
        <div className="container mx-auto w-full h-[50vh] flex flex-col items-center justify-center">
            <Image src="/signup.gif" alt="Signup First" width={500} height={500} />
            <h1 className="text-2xl font-bold text-green-500">Signup First</h1>
        </div>
    )
}

export default SignupFirst;