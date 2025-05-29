import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoNotificationsOutline } from 'react-icons/io5'

const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 py-4 ">
    <div className="">
        <h1 className="font-bold ">Welcome, Amanda</h1>
        <p className="text-gray-500">Tue, 07 June 2025</p>
    </div>

    <div className="flex items-center gap-4">
        <div className="bg-white px-3 shadow py-3 rounded-lg hidden sm:flex items-center gap-2">
            <CiSearch className="text-[1.4rem]" />

            <input type="text" className="outline-none" placeholder="Search" name="" id="" />

        </div>
        <div className="shadow p-2 rounded-lg ">
            <IoNotificationsOutline className="text-[1.4rem]" />
        </div>

        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" className="w-[60px] object-cover rounded-lg" alt="" />

    </div>
</nav>
  )
}

export default Navbar