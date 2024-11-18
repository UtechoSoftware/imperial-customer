/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { course1, course2, course3, course4, course5, fileavatar, testpdf } from '../icons/icon'
import { Link, useNavigate } from 'react-router-dom'
import { StyleSheetManager } from 'styled-components';
import ProductTable from '../DataTable/productTable';
import { dataTable } from '../DataTable/productsData';
import { Edit, Trash2 } from 'react-feather';
import axios from 'axios';
import { Form, Modal } from 'react-bootstrap';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { Select, message } from 'antd';
import { CircularProgress } from '@mui/material';
import { Input } from 'reactstrap';
import CKEditorComponent from '../../newCk';
import { axiosInstance } from '../api/axiosIntance';

const DigitalProductsChild = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [ckdata, setckData] = useState(null);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [image, setImage] = useState(null);
  const [longDescription, setLongDescription] = useState('');
  const [productdata, setProductData] = useState([]);
  const [honeypots, setHoneypots] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setCount] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const handleFile = (e) => {
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
      uploadFile(file);
    }
  };
  const uploadFile = (digitalProductFile) => {
    setFileLoading(true);
    if (!digitalProductFile) return;
    const currentDate = new Date();
    const uniqueFileName = `${currentDate.getTime()}_${digitalProductFile?.name
      }`;
    const imageRef = ref(storage, `digitalProductFile/${uniqueFileName}`);
    uploadBytes(imageRef, digitalProductFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileLoading(false);
        setImage(url);
      });
    });
  };

  console.log(categoryId, "cck")

  const handleFetchCategory = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": global.TOKEN,
    };
    try {
      const res = await axiosInstance.get(
        `api/product_cat/admin/all/1`,
        {
          headers,
        }
      );
      setCategories(res?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    handleFetchCategory();
    setLongDescription(selectedItem?.long_des)
    setShortDescription(selectedItem?.des)
    setTitle(selectedItem?.title)
    setHoneypots(selectedItem?.honeypot)
    setImage(selectedItem?.image)
    setckData(selectedItem?.tos)
    setCategoryId(selectedItem?.category?._id)
  }, [showModal, selectedItem]);


  const handleShow = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  console.log(selectedItem, "dd")
  const data = [
    {
      name: "Category",
      sortable: true,
      cell: (row) => row?.category?.name,
    },
    {
      name: "Name",
      sortable: true,
      cell: (row) => row?.title,
    },
    {
      name: "HoneyPots",
      sortable: true,
      selector: (row) => row?.honeypot,
    },
    {
      name: "Action",
      allowoverflow: true,
      cell: (row) => {
        return (
          <div className="flex gap-1">
            <button
              onClick={() => handleShow(row)}
              style={{ backgroundColor: "#06d6a0" }}
              className="blex justify-center inter_medium text-xs text_white rounded-3 p-2 items-center"
            >
              <Edit size={16} />
            </button>
            {/* <button style={{ backgroundColor: '#ff6f61' }} className="flex justify-center inter_medium text-xs text_white rounded-3 p-2 items-center"><Trash2 size={16} /></button> */}
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": `${global.TOKEN}`,
    };
    try {
      const res = await axiosInstance.get(
        `api/product/admin/${lastId}/child`,
        { headers }
      );
      if (res?.data) {
        setProductData(res?.data?.products);
        setCount(res?.data?.count?.totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": global.TOKEN,
    };
    const formData = {
      image: image,
      category: categoryId,
      title: title,
      honeypot: honeypots,
      des: shortDescription,
      long_des: longDescription,
      tos: ckdata,
      user_type: 'child'
    };
    try {
      const res = await axiosInstance.put(
        `api/product/edit/${selectedItem?._id}`,
        formData,
        { headers }
      );
      console.log(res);
      if (res?.data) {
        message.success("Product Updated successfully");
        navigate("/digital-products-child");
        setShowModal(false);
        fetchData();
      }
    } catch (error) {
      setIsProcessing(false);
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastId]);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !['sortActive'].includes(prop)}>
      <main className='min-h-screen lg:container py-4 px-4 mx-auto'>
        <div className="flex justify-between flex-wrap gap-3 items-center w-full">
          <div className="flex flex-col mb-3">
            <h2 className='plusJakara_bold text_black'>Child Side Digital Products</h2>
            <h6 className="text_secondary plusJakara_regular">Information about your current plan and usages</h6>
          </div>
          <button onClick={() => { navigate('/digital-products-child/add-product') }} style={{ minWidth: '150px' }} className="bg_primary py-3 rounded-3 text_white plusJakara_medium">Add New Product</button>
        </div>
        {isProcessing ? <main className='my-5 d-flex w-100 justify-content-center align-items-center'>
          <CircularProgress size={24} className='text_dark' />
        </main> :
          !categories || categories.length === 0 ?
            <main className='my-5 d-flex w-100 justify-content-center align-items-center'>
              <CircularProgress size={18} color="inherit" />

            </main> :
            <div className="my-4 w-full">
              <ProductTable
                // loading={loading}
                setSearch={setSearch}
                search={search}
                count={count}
                setCurrentPage={setLastId2}
                currentPage={lastId2}
                columns={data}
                data={productdata}
                setLastId={setLastId}
              />
            </div>
        }
      </main>

      {selectedItem && (
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Body>
            {/* <Form onSubmit={handleSubmit} className="w-full bg_white d-flex flex-column my-3 gap-3">
                            <div className="flex flex-col mb-3 gap-2 px-3">
                                <Form.Label className="plusJakara_semibold text_dark">Upload Document</Form.Label>
                                <div className="d-flex align-items-center">
                                    <Input
                                        type="file"
                                        accept=".pdf"
                                        id="docInput"
                                        onChange={handleDocumentChange}
                                    />
                                </div>
                                {selectedDoc ? '' :
                                    <Link
                                        to={selectedItem?.url}
                                        target='_blank'
                                        style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}
                                        className="text_dark plusJakara_medium">{selectedItem?.url}
                                    </Link>
                                }
                            </div>
                            <Form.Group className='shadow_def px-3 w-full'>
                                <Form.Label className="plusJakara_semibold text_dark">Product Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{ padding: '10px 20px', }}
                                    className='custom_control rounded-4 plusJakara_regular text_secondarydark bg_white shadow-sm border'
                                    placeholder='Enter product name'
                                />
                            </Form.Group>
                            <Form.Group className='shadow_def px-3 w-full'>
                                <Form.Label className="plusJakara_semibold text_dark">How much honeypots will Product Unlock</Form.Label>
                                <Form.Control
                                    type='number'
                                    required
                                    value={honeyPots}
                                    onChange={(e) => setHoneyPots(e.target.value)}
                                    style={{ padding: '10px 20px', }}
                                    className='custom_control rounded-4 plusJakara_regular text_secondarydark bg_white shadow-sm border'
                                    placeholder='Honeypots'
                                />
                            </Form.Group>
                            <div className="flex justify-content-end my-4 w-100">
                                {!isProcessing ? (
                                    <button
                                        disabled={docLoading}
                                        type='submit' className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center">
                                        <span className="plusJakara_semibold text_white">Update Product</span>
                                    </button>
                                ) : (
                                    <button type='button' disabled={isProcessing} className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center">
                                        <CircularProgress size={18} className='text_white' />
                                    </button>
                                )}
                            </div>
                        </Form> */}
            <h4 className="mb-0 mt-4 px-3">Edit Child Product</h4>
            <Form
              onSubmit={handleSubmit}
              className="w-full bg_white rounded-3  py-4"
            >
              <Form.Group className="shadow_def px-3 mb-3">
                <Form.Label className="plusJakara_semibold text_dark">
                  Image
                </Form.Label>
                <div>
                  <label
                    style={{ cursor: "pointer" }}
                    htmlFor="fileInput"
                    className="cursor-pointer"
                  >
                    {fileLoading ? (
                      <div
                        style={{ width: "120px", height: "100px" }}
                        className="border rounded-3 d-flex justify-content-center align-items-center"
                      >
                        <CircularProgress size={20} />
                      </div>
                    ) : image ? (
                      <img
                        src={image}
                        alt="Preview"
                        style={{
                          width: "120px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        className="rounded-3 object-cover"
                      />
                    ) : (
                      <div
                        style={{ width: "120px", height: "100px" }}
                        className="border rounded-3 flex justify-center items-center"
                      >
                        <img src={fileavatar} alt="Camera Icon" />
                      </div>
                    )}
                  </label>
                  <Input
                    size="large"
                    type="file"
                    required={!image}
                    id="fileInput"
                    className="visually-hidden"
                    onChange={handleFile}
                  />
                </div>
              </Form.Group>
              <Form.Group className="shadow_def px-3 mb-3">
                <Form.Label className="plusJakara_semibold text_dark">
                  Choose  Category
                </Form.Label>
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  size="large"
                  className="custom_control rounded-2 plusJakara_regular text_secondarydark bg_white"
                  placeholder="Select..."
                  value={categoryId}
                  required
                  allowClear
                  onChange={(e) => setCategoryId(e)}
                >
                  {categories?.map((item, i) => (
                    <Select.Option key={i} value={item?._id}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Group>
              <Form.Group className="shadow_def px-3 mb-3">
                <Form.Label className="plusJakara_semibold text_dark">
                  Digital Product Name
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ padding: "10px 20px" }}
                  className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
                  placeholder="Enter Name"
                />
              </Form.Group>
              <Form.Group className="shadow_def px-3 mb-3">
                <Form.Label className="plusJakara_semibold text_dark">
                  Honeypots
                </Form.Label>
                <Form.Control
                  type="number"
                  required
                  value={honeypots}
                  onChange={(e) => setHoneypots(e.target.value)}
                  style={{ padding: "10px 20px" }}
                  className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
                  placeholder="Enter Honeypots"
                />
              </Form.Group>
              <Form.Group className="shadow_def px-3 mb-3">
                <Form.Label className="plusJakara_semibold text_dark">
                  Short Description
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  style={{ padding: "10px 20px" }}
                  className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
                  placeholder="Enter Short Description"
                />
              </Form.Group>

              <Form.Group className="shadow_def px-3 mb-3">
                <Form.Label className="plusJakara_semibold text_dark">
                  Long Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  required
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  style={{ padding: "10px 20px" }}
                  className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
                  placeholder="Enter Long Description"
                />
              </Form.Group>

              <Form.Group className="shadow_def px-3 mb-3">
                <Form.Label className="plusJakara_semibold text_dark">
                  Terms & Conditions
                </Form.Label>
                <CKEditorComponent setckData={setckData} ckdata={ckdata} />
              </Form.Group>

              <div className="flex justify-content-end my-4 w-100">
                {!isProcessing ? (
                  <button
                    type="submit"
                    disabled={fileLoading}
                    className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
                  >
                    <span className="plusJakara_semibold text_white">
                      Edit Product
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isProcessing}
                    className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center"
                  >
                    <CircularProgress size={18} className="text_white" />
                  </button>
                )}
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}

    </StyleSheetManager>
  )
}

export default DigitalProductsChild