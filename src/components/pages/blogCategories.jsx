/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { fileavatar } from '../icons/icon'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import { Form, Modal } from 'react-bootstrap'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../config/firebase'
import { Input } from 'reactstrap'
import { message } from 'antd'
import Select from 'react-select';
import ProductTable from '../DataTable/productTable'
import { Edit, Edit2 } from 'react-feather'
const BlogCategories = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [lastId, setLastId] = useState(1);
    const [lastId2, setLastId2] = useState(0);
    const [count, setCount] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const [categoryStatus, setCategoryStatus] = useState('active')
    const [fileLoading, setFileLoading] = useState(false)
    const [selectedImg, setSelectedImg] = useState(null);
    const [courseImage, setCourseImage] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState(null);
    const uploadFoodFile = (courseFile) => {
        setFileLoading(true);
        if (!courseFile) return;
        const currentDate = new Date();
        const uniqueFileName = `${currentDate.getTime()}_${courseFile?.name}`;
        const imageRef = ref(storage, `courseFile/${uniqueFileName}`);
        uploadBytes(imageRef, courseFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setFileLoading(false);
                setCourseImage(url);
            });
        });
    };

    const handleCourseFile = (e) => {
        setFileLoading(true);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImg(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImg(null);
        }
        if (file) {
            uploadFoodFile(file);
        }
    };

    useEffect(() => {
        setTitle(selectedItem?.name)
        setSelectedImg(selectedItem?.image)
        setCategoryStatus(selectedItem?.status)
    }, [selectedItem])
    const handleShow = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const fetchData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': `${global.TOKEN}`,
        };
        setLoading(true);
        try {
            const res = await axios.get(`${global.BASEURL}api/blogcategories/admin/all`, { headers });
            if (res?.data) {
                setCategories(res?.data?.categories);
            }
            // }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const columns = [
        {
            name: "Category Name",
            sortable: true,
            minWidth: '200px',
            selector: row => row?.name
        },
        {
            name: "Category Status",
            sortable: true,
            selector: (row) => row?.status
        },
        {
            name: 'Action',
            sortable: true,
            cell: (row) => (
                <div className="flex gap-1">
                    <button
                        className='rounded-2 p-1'
                        style={{ backgroundColor: '#00a896', color: 'white' }}
                        onClick={() => handleShow(row)}
                    >
                        <Edit size={14} />
                    </button>
                </div>
            ),
        },
    ];

    const handleUpdate = async (e) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': `${global.TOKEN}`
        };
        const formData = {
            name: title,
            status: categoryStatus
        };
        setIsProcessing(true);
        try {
            const res = await axios.post(`${global.BASEURL}api/blogcategories/edit/${selectedItem?._id}`, formData, { headers });
            console.log(res);
            message.success('Category Updated Successfully')
            setShowModal(false)
            fetchData()
            setCategoryStatus('')
            setTitle('')
        } catch (error) {
            console.log(error);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <main className='min-h-screen lg:container py-4 px-4 mx-auto'>
            <div className="flex justify-between flex-wrap gap-3 items-center w-full">
                <div className="flex flex-col mb-3">
                    <h2 className='plusJakara_bold text_black'>Blog Categoriess</h2>
                    <h6 className="text_secondary plusJakara_regular">Information about your current plan and usages</h6>
                </div>

                <button onClick={() => { navigate('/blog-categories/add-category') }} style={{ minWidth: '150px' }} className="bg_primary py-3 rounded-3 text_white plusKajara_semibold">Add Blog Category</button>
            </div>
            {loading ? <div className="flex items-center justify-center my-5">
                <CircularProgress size={18} color="inherit" />
            </div> :
                !categories || categories.length === 0 ?
                    <main className='my-5 d-flex w-100 justify-content-center align-items-center'>
                        <span className="text_secondary plusJakara_medium">No Category Found</span>
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

            {selectedItem && (
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Body>
                        <Modal.Header className='border-0' closeButton />
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className='shadow_def px-3 mb-3'>
                                <Form.Label className="plusJakara_semibold text_dark">Blog Category Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{ padding: '10px 20px', }}
                                    className='custom_control rounded-3 plusJakara_regular text_secondarydark bg_white shadow-sm border'
                                    placeholder='Enter Name'
                                />
                            </Form.Group>
                            <Form.Group className='shadow_def px-3 mb-3'>
                                <Form.Label className="plusJakara_semibold text_dark">Status</Form.Label>
                                <div className="flex w-100 gap-2 items-center">
                                    <Form.Select
                                        value={categoryStatus}
                                        onChange={(e) => setCategoryStatus(e.target.value)}
                                        className="w-100 rounded-3 text_secondarydark plusJakara_medium bg_white shadow-sm border"
                                        style={{ padding: '10px 20px' }}
                                    >
                                        <option className='plusJakara_medium text_dark' value="active">Active</option>
                                        <option className='plusJakara_medium text_dark' value="deactive">Deactive</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                            <div className="flex justify-content-end my-4 w-100">
                                {!isProcessing ? (
                                    <button
                                        disabled={fileLoading}
                                        type='submit' className="flex justify-center bg_primary py-3 px-2 rounded-3 items-center">
                                        <span className="plusJakara_semibold text_white">Update Blog Category</span>
                                    </button>
                                ) : (
                                    <button type='button' disabled={isProcessing} className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center">
                                        <CircularProgress size={18} className='text_white' />
                                    </button>
                                )}
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}

        </main>
    )
}

export default BlogCategories