/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
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
import { message } from "antd";
import Select from "react-select";
import { axiosInstance } from "../../api/axiosIntance";
const AddBlogCategory = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [courseImage, setCourseImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  console.log(category);
  // console.log(selectedImg);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: title,
    };
    setIsProcessing(true);
    try {
      const res = await axiosInstance.post(
        `api/blogcategories/create`,
        formData);
      navigate("/blog-categories");
      message.success("Category Created Successfully");
      setTitle("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen lg:container py-4 px-4 ">
      <div className="d-flex gap-4 align-items-start w-full">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="flex items-center justify-center p-2 bg_primary rounded-3"
          >
            <ArrowLeft className="text_white" />
          </button>
        </div>
        <div className="flex flex-col mb-3 w-full">
          <h4 className="plusJakara_semibold text_black">Add Blog Category</h4>
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
            Blog Category Name
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
        <div className="flex justify-content-end my-4 w-100">
          {!isProcessing ? (
            <button
              type="submit"
              disabled={fileLoading}
              className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
            >
              <span className="plusJakara_semibold text_white">
                Add Blog Category
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
  );
};

export default AddBlogCategory;
