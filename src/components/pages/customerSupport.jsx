/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import ProductTable from '../DataTable/productTable';
import { StyleSheetManager } from 'styled-components';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Edit } from 'react-feather';
import { message } from 'antd';
import { axiosInstance } from '../api/axiosIntance';

const CustomerSupport = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false)
    const [lastId, setLastId] = useState(1);
    const [lastId2, setLastId2] = useState(0);
    const [count, setCount] = useState(0);
    const [categories, setCategories] = useState([])

    const handleUpdate = async (item) => {
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': global.TOKEN
        };
        setIsProcessing(true);
        try {
            const res = await axiosInstance.put(`api/support/attended/${item}`, {});
            console.log(res);
            message.success('Message Attend Successfully')
            fetchData()
        } catch (error) {
            console.log(error);
            setIsProcessing(false);
        } finally {
            setIsProcessing(false);
        }
    }

    const columns = [
        {
            name: "User Name",
            sortable: true,
            selector: (row) => !row?.name ? 'User Not found' : row?.name
        },
        {
            name: "Message",
            sortable: true,
            selector: (row) => row?.msg
        },
        {
            name: 'Status',
            sortable: true,
            cell: (row) => {
                return (
                    row?.attended === true ?
                        <button disabled style={{ backgroundColor: '#ecf8f0', color: '#1C8C6E', padding: '6px 12px' }} className="plusJakara_medium rounded text-center h-auto">
                            {row?.attended === true ? 'Attended' : 'Not attended'}
                        </button> :
                        <button disabled={isProcessing} onClick={() => handleUpdate(row?._id)} style={{ backgroundColor: '#2B7F75', padding: '6px 20px' }} className="text_white flex justify-center rounded-3 items-center">Attend</button>
                )
            }
        },
        // {
        //     name: 'Action',
        //     allowoverflow: true,
        //     cell: () => {
        //         return (
        //             <div className='flex gap-1'>
        //                 <button className="bg-[#2B7F75] flex justify-center rounded-3 w-[24px] h-[24px] items-center"><Edit size={14} className='text_white' /></button>
        //             </div>
        //         )
        //     }
        // }
    ]

    const fetchData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': `${global.TOKEN}`,
        };
        setLoading(true);
        try {
            const res = await axiosInstance.get(`api/support/admin/${lastId}`, { headers });
            if (res?.data) {
                setCategories(res?.data?.Messages);
                setCount(res?.data?.count?.totalPage);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [lastId]);

    return (
        <StyleSheetManager shouldForwardProp={(prop) => !['sortActive'].includes(prop)}>
            <main className="min-h-screen lg:container py-5 px-4 mx-auto">
                <div className="flex items-center mb-4">
                    <h5 className="plusJakara_semibold text_dark">Customer Support</h5>
                </div>
                {loading ? <main className='my-5 d-flex w-100 justify-content-center align-items-center'>
                    <CircularProgress size={24} className='text_dark' />
                </main> :
                    !categories || categories.length === 0 ?
                        <main className='my-5 d-flex w-100 justify-content-center align-items-center'>
                            <span className="text_secondary plusJakara_medium">No data Found</span>
                        </main> :
                        <ProductTable
                            loading={loading}
                            count={count}
                            setCurrentPage={setLastId2}
                            currentPage={lastId2}
                            columns={columns}
                            data={categories}
                            setLastId={setLastId}
                        />
                }
            </main>
        </StyleSheetManager>
    )
}

export default CustomerSupport;