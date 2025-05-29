"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [name, setName] = useState<string>("")


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        console.log(name + email + password)

    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md ">
                <h1 className="text-2xl font-bold mb-4 ">Sign Up Now</h1>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3 min-w-72 ">
                        <p className="text-sm font-medium text-gray-700 mb-2 ">Name</p>
                        <input value={name} onChange={(e) => setName(e.target.value)} name="name" className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="text" placeholder="your@email.com" required />
                    </div>

                    <div className="mb-3 min-w-72 ">
                        <p className="text-sm font-medium text-gray-700 mb-2 ">Email Address</p>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="text" placeholder="your@email.com" required />
                    </div>

                    <div className="mb-3 min-w-72 ">
                        <p className="text-sm font-medium text-gray-700 mb-2 ">Password</p>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="password" placeholder="password" required />
                    </div>


                    <button className="cursor-pointer mt-2 w-full py-2 px-4 rounded-md bg-black text-white" type="submit">Sign Up</button>
                    <div className=" flex justify-center items-center">
                        <Link href="/login" className='text-sm mx-auto text-blue-500 mt-4  text-center' >Alredy Have Account ? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page