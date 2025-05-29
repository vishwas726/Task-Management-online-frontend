"use client"
// import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdAddRoad, MdKeyboardArrowUp, MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Link from 'next/link';
import axios from "axios"

type Task = {
    _id: string;
    title: string;
    tags: string;
    description: string;
    status: "Completed" | "Pending";
};

type FormData = {
    _id?: string;
    title: string;
    tags: string;
    description: string;
};

type ErrorType = {
    tags: string;
    description: string;
    title: string;
};

const Page: React.FC = () => {

    const [data, setData] = useState<Task[]>([])
    const [editTaskId, setEditTaskId] = useState<string>("")
    const [optionsFilter, setOptionsFilter] = useState<"All" | "Completed" | "Pending">("All");
    const [optionsFilterDrop, setOptionsFilterDrop] = useState<boolean>(false);
    const [filteredData, setfilteredData] = useState<Task[]>([])

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const fetchData = async () => {

        try {
 
            const res = await axios.get(`${API_BASE_URL}/tasks`)
            setData(res.data)
            console.log(res)
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch tasks. Please try again later.");
        }

    }
    useEffect(() => {

        fetchData()

    }, [])

    useEffect(() => {
          
        const prevData = data.slice();

        if (optionsFilter === "All") {

            setfilteredData(prevData)
            return;
        }

        let newData = [...prevData];

        if (optionsFilter === "Completed") {
            newData = newData.filter((item) => item.status === "Completed")
        } else if (optionsFilter === "Pending") {
            newData = newData.filter((item) => item.status === "Pending")
        }

        // setData(newData)
        setfilteredData(newData)
    }, [optionsFilter,data])

    const onDelete = async (_id: string) => {

        try {
            await axios.delete(`${API_BASE_URL}/tasks/${_id}`)
            fetchData()
            toast.success(`Task Deleted Successfully`)

        } catch (error) {

            console.log(error);
            toast.error("Failed to delete task. Please try again later.");

        }


    }

    const [formData, setformData] = useState<FormData>({
        tags: "",
        description: "",
        title: ""
    })

    const [error, setError] = useState<ErrorType>({
        tags: "",
        description: "",
        title: "",
    })

    const [showEditBox, setShowEditBox] = useState<boolean>(false)

    const onEdit = (item: Task) => {
        setformData({ _id: item._id, title: item.title, tags: item.tags, description: item.description })
        setEditTaskId(item._id)
        setShowEditBox(true);
    }

    const onChangeStatus = (task: Task) => {
        const newStatus: "Completed" | "Pending" = task.status === "Completed" ? "Pending" : "Completed";
       
        axios.put(`${API_BASE_URL}/tasks/${task._id}/status`, { status: newStatus })
            .then((res) => {
                console.log(res);
                fetchData();
                toast.success(`Task marked as ${newStatus}`);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to update task status. Please try again later.");
            });

    }

    const onSubmitEdit =async (id: string) => {
        if (formData.tags === "") {
            setError((prev) => { return { ...prev, tags: "tags is Required" } })
            return;
        }
        if (formData.description === "") {
            setError((prev) => { return { ...prev, description: "description is Required" } })
            return;
        }
        if (formData.title === "") {
            setError((prev) => { return { ...prev, title: "title is Required" } })
            return;
        }

        try {

            const res =await axios.put(`${API_BASE_URL}/tasks/${id}`, formData)
            console.log(res)
            console.log("Task Edited Successfully")
            
        fetchData()
        setShowEditBox(false);

        setformData({
            tags: "",
            description: "",
            title: ""
        })

        setError({
            tags: "",
            description: "",
            title: "",
        })

        toast.success("Edited Successfully")
        } catch (error) {

            console.log(error)
            toast.error("Failed to edit task. Please try again later.");     
            return;         
        }


    }

    return (
        <>
            <div className="flex mx -4 w-full overflow-x-hidden">
                <Sidebar />
                <div className="Wrapper w-full">
                    {/* <Navbar /> */}
                    <div className=" shadow pb-52 mt-10 rounded-2xl mx-4 overflow-hidden">
                        <div className="h-[100px] flex-row-reverse mt- 10 bg-gradient-to-r from-blue-400 to-orange-200 w-full flex items-center justify-between p-4">
                            <div onClick={() => setOptionsFilterDrop(!optionsFilterDrop)} className="bg-white me-10 text-[14px] text-gray-600 relative w-fit p-2 justify-center  transition-all duration-200 cursor-pointer  rounded-lg flex gap-3 items-center">
                                <p className='text-gray-600'>{optionsFilter}</p>
                                <MdKeyboardArrowUp className={`${optionsFilterDrop ? "" : "rotate-180"} transition-all duration-200`} />
                                <div className={`absolute ${optionsFilterDrop ? "block ToTop" : "hidden"} space-y-3 shadow  bg-white p-3 rounded-lg text-center   top-11`}>
                                    <p className={`${optionsFilter === "All" ? "bg-slate-100" : ""} hover:bg-slate-100 p-2 text-gray-600 rounded-xl`} onClick={() => setOptionsFilter("All")}>All</p>
                                    <p className={`${optionsFilter === "Pending" ? "bg-slate-100" : ""} hover:bg-slate-100 p-2 text-gray-600 rounded-xl`} onClick={() => setOptionsFilter("Pending")}>Pending</p>
                                    <p className={`${optionsFilter === "Completed" ? "bg-slate-100" : ""} hover:bg-slate-100 p-2 text-gray-600 rounded-xl`} onClick={() => setOptionsFilter("Completed")}>Completed</p>
                                </div>
                            </div>
                            <Link href="/add">
                            {/* ${"path" == "add" ? "bg-blue-100 text-blue-500" : ""} */}
                                <div className={` text-blue-600 flex sm:hidden gap-2 font-bold py-2 px-2.5  rounded-lg  bg-white  cursor-pointer `}>
                                    <MdAddRoad className="text-[1.7rem]  -gray-400" />
                                    Add Task
                                </div>
                            </Link>
                        </div>
                        <p className="text-[18px] font-bold text-black mt-10 px-4"> All Tasks</p>
                        <div className="flex flex-col-reverse flex-wrap shrink-0 gap-10 w-full p-4 ">
                            {showEditBox && <div className="EditBox p-4 overflow-hidden fixed left-0 top-0  flex h-[100vh] justify-center items-center w-full  bg-[#000000b9]">
                                <div className="bg-white max-w-full p-6  w-[800px] rounded-lg">
                                    <div className="form mt-6 space-y-6 px-4">
                                        <div className="flex gap-5 md:flex-row flex-col">
                                            <div className="flex flex-col w-full ">
                                                <label htmlFor="name" className="font-medium">Title</label>
                                                <div className="bg-white mt-4 px-3 shadow py-3 rounded-lg  flex items-center gap-2">
                                                    <input type="text" value={formData.title} className="outline-none " placeholder="Title" name="" id="" onChange={(e) => (setformData({ ...formData, title: e.target.value }))} />
                                                </div>
                                                {error.title && <p className="capitalize text-sm text-red-500 mt-2 ms-2">{error.title}</p>}
                                            </div>
                                            <div className="flex flex-col w-full ">
                                                <label htmlFor="name" className="font-medium">Tags</label>
                                                <div className="bg-white mt-4 px-3 shadow py-3 rounded-lg  flex items-center gap-2">
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
                                        <button className="bg-blue-600 cursor-pointer font-medium hover:opacity-70 text-white rounded-lg mt-10 px-5 py-2" onClick={() => onSubmitEdit(editTaskId)} >Edit Tasks</button>
                                        <button className="bg-red-600 ms-5 cursor-pointer font-medium hover:opacity-70 text-white rounded-lg mt-10 px-5 py-2" onClick={() => setShowEditBox(false)} >Cancel</button>
                                    </div>
                                </div>
                            </div>}
                            {
                                filteredData?.map((item) => (
                                    <div className={`w-full   capitalize space-y-6 g rid gap-4 h-fit   gri d-cols-4  text-start bg-slate-50 p-4 rounded-lg `} key={item._id}>
                                        <p className={`font-medium text-[1.6rem] ${item.status === "Completed" ? "line-through" : ""}`}>{item.title}</p>
                                        <p className='rounded-xl bg-[#ffffff] shadow px-2 py-1.5 w-fit'>{item.tags}</p>
                                        {/* <p className='rounded-xl bg-[#ffffff] shadow px-2 py-1.5 w-fit'>{item._id}</p> */}
                                        <p className='font-medium p-2 h-fit   w-full  outline-none   '>{item.description}</p>
                                        <p className={`shadow w-fit font-medium p-2 h-fit ${item.status === "Completed" ? "bg-green-400" : "bg-amber-400"} text-white rounded-xl  outline-none   `}>{item.status}</p>
                                        <div className="flex justify-end  gap-6">
                                            <div className="flex gap-2 items-center">
                                                <input type="checkbox" name="status" id="" checked={item.status === "Completed"} onChange={() => onChangeStatus(item)} />
                                                <label htmlFor="status">Mark as Completed</label>
                                            </div>
                                            <MdOutlineDelete className='text-red-500 text-[1.6rem] cursor-pointer' onClick={() => onDelete(item._id)} />
                                            <CiEdit className='text-green-500 text-[1.9rem] cursor-pointer' onClick={() => onEdit(item)} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page






