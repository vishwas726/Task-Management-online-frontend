"use client"
// import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiCircleList, CiSearch } from "react-icons/ci";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { MdKeyboardArrowDown } from "react-icons/md";

import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

type FormData = {
    tags: string;
    description: string;
  
    title: string;
    status: "Pending" | "Completed";
};

type ErrorType = {
    tags: string;
    description: string;
  
    title: string;
};


const Page = () => {

 const [formData, setformData] = useState<FormData>({
        tags: "",
        description: "",      
        title: "",
        status: "Pending"
    });

    const [error, setError] = useState<ErrorType>({

        tags: "",
        description: "",
       
        title: "",

    })

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const onSubmit = async () => {
        const newErrors = {
            tags: formData.tags.trim() === "" ? "tags is Required" : "",
            description: formData.description.trim() === "" ? "description is Required" : "",
            title: formData.title.trim() === "" ? "title is Required" : "",
        };

        setError(newErrors);

        for (let key in newErrors) {
            if (newErrors[key as keyof ErrorType] !== "") {
                return;
            }
        }

        try {
            await axios.post(`${API_BASE_URL}/tasks`, formData);
            toast.success("Data Added Successfully");
            setformData({
                tags: "",
                description: "",
                status: "Pending",
                title: ""
            });
            setError({
                tags: "",
                description: "",
                title: "",
            });
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }



    return (

        <div className="flex mx -4 w-full overfloxh">

            <Sidebar />

            <div className="Wrapper w-full ">

                {/* <Navbar /> */}
                <div className=" shadow mt-10  pb-52 rounded-2xl mx-4 overflow-hidden">
                    <div className="h-[100px] mt- 10 bg-gradient-to-r from-blue-400 to-orange-200 w-full items-center flex p-4 justify-end">
                            
                             <Link href="/list">
                                <div className={` text-blue-600 flex sm:hidden gap-2 font-bold py-2 px-2.5  rounded-lg ${"path" == "add" ? "bg-blue-100 text-blue-500" : ""} bg-white  cursor-pointer `}>
                                    <CiCircleList className="text-[1.7rem]  -gray-400" />
                                    List Task
                                </div>
                            </Link>

                    </div>

                    <p className="text-[18px] font-bold text-black mt-10 px-4">Add New Task</p>

                    <div className="form mt-6 space-y-6 px-4">

                        <div className="flex gap-5 md:flex-row flex-col">

                            <div className="flex flex-col w-full ">
                                <label htmlFor="name" className="font-medium">Title</label>

                                <div className="bg-white mt-4 px-3 shadow py-3 rounded-lg  flex items-center gap-2">
                                    {/* , name: e.target.value  */}
                                    <input type="text" value={formData.title} className="outline-none " placeholder="Title" name="" id="" onChange={(e) => (setformData({ ...formData, title: e.target.value }))} />



                                </div>


                                {error.title && <p className="capitalize text-sm text-red-500 mt-2 ms-2">{error.title}</p>}


                            </div>

                            <div className="flex flex-col w-full ">
                                <label htmlFor="name" className="font-medium">Tags</label>

                                <div className="bg-white mt-4 px-3 shadow py-3 rounded-lg  flex items-center gap-2">
                                    {/* , name: e.target.value  */}
                                    <input type="text" className="outline-none " placeholder="Tags" name="" id=""
                                        value={formData.tags}
                                        onChange={(e) => (setformData({ ...formData, tags: e.target.value }))} />
                                </div>

                                {error.tags && <p className="capitalize text-sm text-red-500 mt-2 ms-2">{error.tags}</p>}


                            </div>

                        </div>

                        <div className="flex gap-5 md:flex-row flex-col">

                            <div className="flex flex-col w-full ">
                                <label htmlFor="name" className="font-medium">Description</label>

                                <div className="bg-white mt-4 px-3 shadow py-3 rounded-lg  flex items-center  ga p-2">
                                    {/* , name: e.target.value  */}
                                    <textarea
                                        value={formData.description}
                                        className="outline-none  w-full"
                                        placeholder="Description"
                                        name=""
                                        id=""
                                        onChange={(e) =>
                                            setformData({ ...formData, description: e.target.value })
                                        }
                                    />

                                </div>

                                {error.description && <p className="capitalize text-sm text-red-500 mt-2 ms-2">{error.description}</p>}




                            </div>



                        </div>



                        <button className="bg-blue-600 cursor-pointer font-medium hover:opacity-70 text-white rounded-lg mt-10 px-5 py-2" onClick={onSubmit} >Add Tasks</button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Page;
