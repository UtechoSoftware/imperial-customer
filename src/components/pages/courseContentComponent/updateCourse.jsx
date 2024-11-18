/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Select, message } from "antd";
import { Input } from "reactstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase";
import axios from "axios";
import { fileavatar } from "../../icons/icon";
import { ArrowLeft, Video } from "react-feather";
import CKEditorComponent from "../../../newCk";
import { axiosInstance } from "../../api/axiosIntance";
// import CKEditorComponent from "../../../tiptap";

const UpateCourse = () => {
    const { state } = useLocation()
    const courseData = state?.courseDetail || null
    const [isProcessing, setIsProcessing] = useState(false);
    const [thumb, setThumb] = useState('')
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [docFile, setDocFile] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [fileLoading, setFileLoading] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    const [ckdata, setckData] = useState("");
    const [videoLoading, setVideoLoading] = useState(false);
    const [courseImage, setCourseImage] = useState("");
    const [title, setTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [category, setCategory] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoChange = (event) => {
        setVideoLoading(true);
        const file = event.target.files[0];
        if (file) {
            setSelectedVideo(file);
            uploadVideo(file);
        }
        setVideoLoading(false);
    };
    useEffect(() => {
        setCourseImage(courseData?.thumbnail)
        setSelectedImg(courseData?.thumbnail)
        setCategoryId(courseData?.category?._id)
        setTitle(courseData?.title)
        setckData(courseData?.courses_des)
    }, [courseData])

    const uploadVideo = (videoFile) => {
        setVideoLoading(true);
        if (!videoFile) return;
        const currentDate = new Date();
        const uniqueFileName = `${currentDate.getTime()}_${videoFile?.name}`;
        const videoRef = ref(storage, `courseVideo/${uniqueFileName}`);
        uploadBytes(videoRef, videoFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setVideoLoading(false);
                setVideoUrl(url);
            });
        });
    };
    const courseFirebaseImage = (courseContentFile) => {
        setFileLoading(true);
        if (!courseContentFile) return;
        const currentDate = new Date();
        const uniqueFileName = `${currentDate.getTime()}_${courseContentFile?.name
            }`;
        const imageRef = ref(storage, `courseContentFile/${uniqueFileName}`);
        uploadBytes(imageRef, courseContentFile).then((snapshot) => {
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
            courseFirebaseImage(file);
        }
    };

    const options = [
        { value: "", label: "Select category type" },
        { value: "savers", label: "Saver" },
        { value: "investors", label: "Investor" },
        { value: "entrepreneurs", label: "Entrepreneur" },
    ];
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        const formData = {
            category: categoryId,
            title: title,
            thumbnail: courseImage,
            courses_des: ckdata,
            course_doc: docFile,
        };
        if (!formData?.category || !formData?.title || !formData.courses_des) {
            message.error(`please fill form first`);
            setIsProcessing(false);
        }
        else {
            try {
                const res = await axiosInstance.post(
                    `api/courses/edit/${courseData?._id}`,
                    formData,
                );
                if (res?.data) {
                    message.success("Course added successfully");
                    navigate("/course-content");
                }
            } catch (error) {
                setIsProcessing(false);
                console.log(error);
            }
        }
    };

    const handleFetchCategory = async () => {
        try {
            const res = await axiosInstance.get(
                `api/categories/admin/all`,
            );
            setCategories(res?.data?.categories);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFetchCategory();
    }, [categoryId]);

    console.log(categoryId);

    return (
        <main className="min-h-screen lg:container py-4 px-4">
            <div className="flex justify-start gap-2 mb-3 items-start">
                <button type='button' onClick={() => { navigate(-1) }} style={{ height: 'fit-content' }} className="flex items-center h-fit justify-center p-2 bg_primary rounded-3">
                    <ArrowLeft className='text_white' />
                </button>
                <div className="flex flex-col w-full">
                    <h5 className="plusJakara_semibold text_black">
                        Update Course Content
                    </h5>
                    <h6 className="text_secondary plusJakara_regular">
                        Information about your current plan and usages
                    </h6>
                </div>
            </div>
            <Form
                onSubmit={handleSubmit}
                className="w-full bg_white rounded-3 shadow-md p-4"
            >
                <div className="flex flex-col px-3 mb-3 gap-2">
                    <Form.Label className="plusJakara_semibold text_dark">Course Thumbnail</Form.Label>
                    <div>
                        <label style={{ cursor: 'pointer' }} htmlFor="fileInput" className="cursor-pointer">
                            {fileLoading ? <div style={{ width: '120px', height: '100px', }} className='border rounded-3 d-flex justify-content-center align-items-center'>
                                <CircularProgress size={20} />
                            </div> :
                                selectedImg ? (
                                    <img src={selectedImg} alt="Preview" style={{ width: '120px', height: '100px', objectFit: 'cover' }} className="rounded-3 object-cover" />
                                ) : (
                                    <div style={{ width: '120px', height: '100px' }} className="border rounded-3 flex justify-center items-center">
                                        <img src={fileavatar} alt="Camera Icon" />
                                    </div>
                                )}
                        </label>
                        <Input
                            size='large'
                            type="file"
                            id="fileInput"
                            className="visually-hidden"
                            onChange={handleCourseFile}
                        />
                    </div>
                </div>
                {/* <Form.Group className="shadow_def px-3 mb-3">
                    <Form.Label className="plusJakara_semibold text_dark">
                        Category Type
                    </Form.Label>
                    <Form.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ width: '100%' }}
                        size="large"
                        required
                        className="custom_control rounded-2 plusJakara_regular text_secondarydark bg_white shadow-sm border"
                        placeholder="Select Category Type"
                        allowClear
                    >
                        {options.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group> */}
                <Form.Group className="shadow_def px-3 mb-3">
                    <Form.Label className="plusJakara_semibold text_dark">
                        Choose Educational Pathway
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
                        {categories.map((item, i) => (
                            <Select.Option key={i} value={item?._id}>
                                {item?.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Group>
                <Form.Group className="shadow_def px-3 mb-3">
                    <Form.Label className="plusJakara_semibold text_dark">
                        Enter Course Name
                    </Form.Label>
                    <Input
                        placeholder="Enter course name"
                        type="text"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </Form.Group>
                <Form.Label className="plusJakara_semibold text_dark px-3">
                    More Information
                </Form.Label>
                <div className="px-3">
                    <CKEditorComponent ckData={ckdata} setckData={setckData} />
                </div>
                <div className="d-flex justify-content-end my-4 w-100">
                    {!isProcessing ? (
                        <button
                            type="submit"
                            disabled={fileLoading}
                            className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
                        >
                            <span className="plusJakara_semibold text_white">Update Course</span>
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

export default UpateCourse;
