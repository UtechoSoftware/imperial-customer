/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from '@mui/material'
import { message } from 'antd'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { Edit, Trash2 } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../../config/firebase'
import ProductTable from '../../DataTable/productTable'
import { del_cat, get_cat } from '../../api/faqs'
import { ErrorHandler } from '../errorHandler'
const VoucherCategories = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [search,setSearch]=useState('')
    const [delLoader,setDelLoader]=useState(false)
const [showSearch,setShowSearch]=useState(false)
    const [loading, setLoading] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [lastId, setLastId] = useState(1);
    const [lastId2, setLastId2] = useState(0);
    const [count, setCount] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)

    const [categoryStatus, setCategoryStatus] = useState('active')
    const [fileLoading, setFileLoading] = useState(false)
    const [selectedImg, setSelectedImg] = useState(null);
    const [courseImage, setCourseImage] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState(null);
    

   
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

       get_cat(lastId,search).then((res)=>{
        setCategories(res?.data?.categories);
        setCount(res?.data?.count?.totalPage)
        setLoading(false);

       }).catch((err)=>{
        ErrorHandler(err)
        setLoading(false);

       })
    };

    useEffect(() => {
        if(!search){
            setLoading(true);
        }
        setShowSearch(true)
        fetchData();
    }, [lastId,search]);

    const columns = [
        {
            name: "Category Name",
            sortable: true,
            minWidth: '200px',
            selector: row => row?.name
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
            <button onClick={()=>{
                setShowModal2(true)
                setSelectedItem(row?._id)
            }} style={{ backgroundColor: '#ff6f61' }} className="flex justify-center inter_medium text-xs text_white rounded-2 p-1 items-center"><Trash2 size={16} /></button>

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
            const res = await axios.post(`${global.BASEURL}api/faq_cat/edit/${selectedItem?._id}`, formData, { headers });
            console.log(res);
            message.success('Category Updated Successfully')
            setShowModal(false)
            fetchData()
            let array = [...categories]
            const index = array?.findIndex((item=>item?._id===selectedItem?._id))
            if(index!==-1){
              array[index]= res?.data?.category
              setCategories(array)
            }

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
                    <h2 className='plusJakara_bold text_black'>Faq Categories</h2>
                    <h6 className="text_secondary plusJakara_regular">Information about your current plan and usages</h6>
                </div>

                {/* <button onClick={() => { navigate('/faq-categories/add-category') }} style={{ minWidth: '150px' }} className="bg_primary py-3 rounded-3 text_white plusKajara_semibold">Add Category</button> */}
            </div>
       
            
             
                    <ProductTable
                        loading={loading}
                        buttontext=' Faq Category' 
                    navigation={'/faq-categories/add-category'}   
                        count={count}
                        setCurrentPage={setLastId2}
                        setSearch={setSearch}
                        search={search}
                        showSearch={showSearch}
                        currentPage={lastId2}
                        columns={columns}
                        data={categories}
                        setLastId={setLastId}
                    />
            

            {selectedItem && (
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Body>
                        <Modal.Header className='border-0' closeButton >
                        <h5 className=''>Edit Category</h5>

                        </Modal.Header>
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className='shadow_def px-3 mb-3'>
                                <Form.Label className="plusJakara_semibold text_dark"> Category Name</Form.Label>
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
                            {/* <Form.Group className='shadow_def px-3 mb-3'>
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
                            </Form.Group> */}
                            <div className="flex justify-content-end my-4 w-100">
                                {!isProcessing ? (
                                    <button
                                        disabled={fileLoading}
                                        type='submit' className="flex justify-center bg_primary py-3 px-2 rounded-3 items-center">
                                        <span className="plusJakara_semibold text_white">Update Category</span>
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
            <Modal show={showModal2} onHide={() => setShowModal2(false)} centered>
      <Modal.Header className='border-0 mt-2 mr-2 p-0' closeButton>
      </Modal.Header>
      <Modal.Body className='text-center'>
        <h5>Are you sure?</h5>
        <div className='d-flex justify-content-center mt-4'>
          <Button
            variant="danger"
            className='me-2'
            onClick={() => {
                let rowArray = [...categories];
                const index = rowArray.findIndex(
                  (value) => value?._id === selectedItem?._id
                );
                setDelLoader(true)
                del_cat(selectedItem).then((res)=>{
                    fetchData()
                    setShowModal2(false)
                setDelLoader(false)
                if (index !== -1) {
                  rowArray?.splice(index, 1);
                  setCategories(rowArray);
                    message.success('category deleted successfully')
                }

                }).catch((er)=>{
                    setShowModal2(false)
                    setDelLoader(false)

                })
            }}
          >
         {delLoader ? 
           <Spinner size='sm'/>: 
            "Delete"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowModal2(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
        </main>
    )
}

export default VoucherCategories