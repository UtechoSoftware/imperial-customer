/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import {
  course1,
  course2,
  course3,
  course4,
  course5,
  fileavatar,
} from "../../icons/icon";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Input } from "reactstrap";
import { ArrowLeft } from "react-feather";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase";
import axios from "axios";
import { Select, message } from "antd";
import CKEditorComponent from "../../../newCk";

const AddVoucher = () => {
  const [ckdata, setckData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [honeypots, setHoneypots] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [image, setImage] = useState(null);
  const [longDescription, setLongDescription] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [blogImage, setBlogImage] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docLoading, setDocLoading] = useState(false);
  const [docFile, setDocFile] = useState(null);

  const navigate = useNavigate();

  const uploadDocument = (documentFile) => {
    setDocLoading(true);
    if (!documentFile) return;
    const currentDate = new Date();
    const uniqueFileName = `${currentDate.getTime()}_${documentFile?.name}`;
    const documentRef = ref(storage, `productDocument/${uniqueFileName}`);
    uploadBytes(documentRef, documentFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setDocLoading(false);
        setDocFile(url);
      });
    });
  };

  const handleDocumentChange = (event) => {
    setDocLoading(true);
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
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": `${global.TOKEN}`,
    };
    // des,title,tos,honeypot,user_type,image,category
    const formData = {
      category: categoryId,
      title: title,
      description: description,
    };
    setIsProcessing(true);
    try {
      const res = await axios.post(
        `${global.BASEURL}api/faq/create`,
        formData,
        { headers }
      );
      console.log(res);
      navigate("/faqs");
      message.success("Faq Created Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFetchCategory = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": global.TOKEN,
    };
    try {
      const res = await axios.get(`${global.BASEURL}api/faq_cat/admin/all/1`, {
        headers,
      });
      setCategories(res?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchCategory();
  }, [categoryId]);
  return (
    <main className="min-h-screen lg:container py-4 px-4 ">
      <div className="d-flex gap-4 align-items-start w-full">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              navigate("/faqs");
            }}
            className="flex items-center justify-center p-2 bg_primary rounded-3"
          >
            <ArrowLeft className="text_white" />
          </button>
        </div>
        <div className="flex flex-col mb-3 w-full">
          <h4 className="plusJakara_semibold text_black">Add Faq</h4>
          <p className="text_secondary plusJakara_regular">
            Information about your current plan and usages
          </p>
        </div>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="w-full bg_white rounded-3 shadow-md p-4"
      >
        <Form.Group className="shadow_def px-3 mb-3">
          <Form.Label className="plusJakara_semibold text_dark">
            Choose Category
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
            Faq Name
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
            Description
          </Form.Label>
          <Form.Control
            as="textarea"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 200))}
            style={{ padding: "10px 20px" }}
            className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
            placeholder="Enter Description"
            rows={5} // Adjust the number of rows as needed
          />
          <div className="text-end">{description.length}/200</div>
        </Form.Group>

        <div className="flex justify-content-end my-4 w-100">
          {!isProcessing ? (
            <button
              type="submit"
              disabled={fileLoading}
              className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
            >
              <span className="plusJakara_semibold text_white">Add Faq</span>
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
  );
};

export default AddVoucher;
