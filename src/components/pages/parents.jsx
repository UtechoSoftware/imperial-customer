/* eslint-disable no-useless-concat */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ProductTable from '../DataTable/productTable';
import { dataTable } from '../DataTable/productsData';
import { avatarman, preview, trash } from '../icons/icon';
import { StyleSheetManager } from 'styled-components';
import axios from 'axios';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosIntance';

const Parents = () => {
    const [search, setSearch] = useState('')

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(1);
    const [lastId, setLastId] = useState(1);
    const [lastId2, setLastId2] = useState(0);
    const [count, setCount] = useState(0);
    const [categories, setCategories] = useState([])

    const columns = [
        // {
        //     name: 'No',
        //     sortable: true,
        //     maxwidth: '25px',
        //     selector: row => row?.child
        // },
        {
            name: "Parents",
            sortable: true,
            selector: row => !row?.username ? 'User Not found' : row.username
        },
        // {
        //     name: "Display Name",
        //     sortable: true,
        //     selector: row => !row?.first_name && !row?.last_name ? 'User Not found' : row.first_name + ' ' + row?.last_name
        // },
        {
            name: "Email",
            sortable: true,
            minWidth: '200px',
            selector: row => row.email
        },
        {
            name: "Total Childs",
            sortable: true,
            selector: (row) => row?.child ? row?.child?.length : 0,
        },
        {
            name: 'Honeypots',
            sortable: true,
            selector: (row) => row?.honey_pot ? row?.honey_pot?.length : 0 + ' ' + 'Honeypots',
        },
        {
            name: 'Action',
            allowoverflow: true,
            cell: (row) => {
                return (
                    <div className='flex gap-1'>
                        {row?.child?.length === 0 ? '' :
                            <button onClick={() => navigate(`/parents/${row?._id}`, { state: { parentData: row } })} className="bg-[#2B7F75] flex justify-center rounded-3 w-[24px] h-[24px] items-center"><img className="w-[12px] h-auto" src={preview} alt="" /></button>
                        }
                        {/* <button className="bg-[#CE2C60] flex justify-center rounded-3 w-[24px] h-[24px] items-center"><img className="w-[12px] h-auto" src={trash} alt="" /></button> */}
                    </div>
                )
            }
        }
    ]

    const fetchData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': `${global.TOKEN}`,
        };
        setLoading(true);
        try {
            const res = await axiosInstance.get(`api/info/all/parent/${lastId}`, { headers });
            if (res?.data) {
                setCategories(res?.data?.parents);
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
                <div className="flex flex-col mb-3 w-full">
                    <h2 className='plusJakara_bold text_black'>Parents</h2>
                    <h6 className="text_secondary plusJakara_regular">Information about your current plan and usages</h6>
                </div>
                {!categories || categories.length === 0 ?
                    <main className='my-5 d-flex w-100 justify-content-center align-items-center'>
                        <span className="text_secondary plusJakara_medium">No Parents Found</span>
                    </main> :
                    <ProductTable
                        setSearch={setSearch}
                        search={search}
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

export default Parents;