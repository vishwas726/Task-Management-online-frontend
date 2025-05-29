"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiCircleList } from "react-icons/ci";
import { MdAddRoad } from "react-icons/md";

const Sidebar = () => {
    const location = usePathname()
    const path = location.split("/")[1];
    console.log()

    return (
        <div className="w-[80px] hidden sm:flex ">
        <div className="w-[80px] fixed top-0  hidden  pt-[78px] h-[100vh] space-y-10 mt-6 rounded-lg sm:flex flex-col items-center shadow    ite p-4">


            <Link href="/add">
                <div className={` p-2 rounded-lg ${path == "add" ? "bg-blue-100 text-blue-500" : ""}  cursor-pointer `}>
                    <MdAddRoad className="text-[1.7rem]  -gray-400" />
                </div>
            </Link>

            <Link href="/list">
                <div className={`p-2 rounded-lg ${path == "list" ? "bg-blue-100 text-blue-500" : ""} cursor-pointer`}>
                    <CiCircleList className="text-[1.7rem] t" />
                </div>
            </Link>

        </div>
        </div>
    );
};

export default Sidebar;
