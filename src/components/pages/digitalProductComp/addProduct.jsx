/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { course1, course2, course3, course4, course5, fileavatar } from '../../icons/icon'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Input } from 'reactstrap';
import { ArrowLeft } from 'react-feather';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../config/firebase';
import axios from 'axios';
import { Select, message } from 'antd';
import CKEditorComponent from '../../../newCk';
import { axiosInstance } from '../../api/axiosIntance';

const AddProduct = () => {
  const [ckdata, setckData] = useState(null)
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([])
  const [honeypots, setHoneypots] = useState('');
  const [fileLoading, setFileLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [image, setImage] = useState(null);
  const [longDescription, setLongDescription] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [blogImage, setBlogImage] = useState('')
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [docLoading, setDocLoading] = useState(false)
  const [docFile, setDocFile] = useState(null)

  const navigate = useNavigate();

  const uploadDocument = (documentFile) => {
    setDocLoading(true)
    if (!documentFile) return;
    const currentDate = new Date();
    const uniqueFileName = `${currentDate.getTime()}_${documentFile?.name}`;
    const documentRef = ref(storage, `productDocument/${uniqueFileName}`);
    uploadBytes(documentRef, documentFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setDocLoading(false)
        setDocFile(url)
      });
    });
  };

  const handleDocumentChange = (event) => {
    setDocLoading(true)
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedDoc(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedDoc(null);
    }
    if (file) {
      uploadDocument(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // des,title,tos,honeypot,user_type,image,category
    const formData = {
      image: image,
      category: categoryId,
      title: title,
      honeypot: honeypots,
      des: shortDescription,
      long_des: longDescription,
      tos: ckdata,
      user_type: 'parent'
    };
    setIsProcessing(true);
    try {
      const res = await axiosInstance.post(`api/product/create`, formData,);
      console.log(res);
      navigate('/digital-products-parent')
      message.success('Product Created Successfully')
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };
  const uploadFile = (digitalProductFile) => {
    setFileLoading(true);
    if (!digitalProductFile) return;
    const currentDate = new Date();
    const uniqueFileName = `${currentDate.getTime()}_${digitalProductFile?.name}`;
    const imageRef = ref(storage, `digitalProductFile/${uniqueFileName}`);
    uploadBytes(imageRef, digitalProductFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileLoading(false);
        setImage(url);
      });
    });
  };

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
  const handleFetchCategory = async () => {
    try {
      const res = await axiosInstance.get(
        `api/product_cat/admin/all/1`,
      );
      setCategories(res?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchCategory();
  }, [categoryId]);
  return (
    <main className='min-h-screen lg:container py-4 px-4 '>
      <div className="d-flex gap-4 align-items-start w-full">
        <div className="flex items-center gap-3">
          <button type='button' onClick={() => { navigate('/digital-products-parent') }} className="flex items-center justify-center p-2 bg_primary rounded-3">
            <ArrowLeft className='text_white' />
          </button>
        </div>
        <div className="flex flex-col mb-3 w-full">
          <h4 className='plusJakara_semibold text_black'>Add Products</h4>
          <p className="text_secondary plusJakara_regular">Information about your current plan and usages</p>
        </div>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="w-full bg_white rounded-3 shadow-md p-4"
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
              ) : selectedImg ? (
                <img
                  src={selectedImg}
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
              required
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
            // value={categoryId}
            required
            allowClear
            onChange={(e) => setCategoryId(e)}
          >
            {categories.map((item, i) => (
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
          <CKEditorComponent setckData={setckData} />

        </Form.Group>


        <div className="flex justify-content-end my-4 w-100">
          {!isProcessing ? (
            <button
              type="submit"
              disabled={fileLoading}
              className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
            >
              <span className="plusJakara_semibold text_white">
                Add Product
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

    </main>
  )
}

export default AddProduct