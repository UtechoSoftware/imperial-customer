/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from "@mui/material";
import { Select, message } from "antd";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Input } from "reactstrap";
import { storage } from "../../../config/firebase";
import CKEditorComponent from "../../../newCk";
import { fileavatar } from "../../icons/icon";
import { axiosInstance } from "../../api/axiosIntance";

// import CKEditorComponent from "../../../tiptap";
export const AddCourseContent = () => {
    const [isProcessing, setIsProcessing] = useState(false);
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
        const uniqueFileName = `${currentDate.getTime()}_${courseContentFile?.name}`;
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

    const uploadDocument = (documentFile) => {
        if (!documentFile) return;
        const currentDate = new Date();
        const uniqueFileName = `${currentDate.getTime()}_${documentFile?.name}`;
        const documentRef = ref(storage, `courseDocuments/${uniqueFileName}`);
        uploadBytes(documentRef, documentFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setDocFile(url);
            });
        });
    };

    const handleDocumentChange = (event) => {
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

    const handleCKEditor = (event, editor) => {
        const data = editor.getData();
        setDescription(data);
    };

    const editorConfig = {
        // Your CKEditor configuration options here
        toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "ckfinder", // Add CKFinder plugin for file management
            "|",
            "mediaEmbed",
            "insertTable",
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "|",
            "undo",
            "redo",
            "|",
            "uploadFile", // Custom option for uploading files
        ],
        ckfinder: {
            // CKFinder configuration options
            uploadUrl: "/your-upload-endpoint", // Replace with your server endpoint for file uploads
        },
    };
    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: "1px 5px",
            borderRadius: "8px",
            borderColor: "#ced4da",
            boxShadow: "none",
            "&:hover": {
                borderColor: "#ced4da",
            },
        }),
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
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = ckdata;
        const imgElement = tempDiv.querySelector('img');
        if (imgElement) {
            imgElement.setAttribute('style', 'width: auto; height: 500px;');
            const imgHtml = imgElement.outerHTML;
            tempDiv.querySelector('img').outerHTML = imgHtml;
        }
        const formData = {
            category: categoryId,
            title: title,
            thumbnail: courseImage,
            courses_des: tempDiv.innerHTML,
            course_doc: docFile,
        };
        console.log(formData);
        // return
        if (!formData?.category || !formData?.title || !formData.courses_des) {
            message.error(`please fill form first`);
            setIsProcessing(false);
        }
        else {
            try {
                const res = await axiosInstance.post(
                    `api/courses/create`,
                    formData,
                );
                console.log(res);
                if (res?.data) {
                    message.success("Course added successfully");
                    navigate("/course-content");
                }
            } catch (error) {
                setIsProcessing(false);
                console.log(error);
            }
        }
        // No empty keys found
    };

    const handleFetchCategory = async () => {
        try {
            const res = await axiosInstance.get(
                `api/categories/admin/all/1/${category}`,
            );
            setCategories(res?.data?.categories);
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(ckdata);
    useEffect(() => {
        handleFetchCategory();
    }, [category, categoryId]);

    console.log(categoryId);

    return (
        <main className="min-h-screen lg:container py-4 px-4 ">
            <div className="flex flex-col mb-3 w-full">
                <h3 className="plusJakara_semibold text_black">
                    Create Course Content
                </h3>
                <h6 className="text_secondary plusJakara_regular">
                    Information about your current plan and usages
                </h6>
            </div>
            <Form
                onSubmit={handleSubmit}
                className="w-full bg_white rounded-3 shadow-md p-4"
            >
                {/* <div className="flex flex-col px-3 mb-3 gap-2">
                        <Form.Label className="plusJakara_semibold text_dark">Upload File</Form.Label>
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
                                // required
                                id="fileInput"
                                className="visually-hidden"
                                onChange={handleCourseFile}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col px-3 mb-3 gap-2">
                        <Form.Label className="plusJakara_semibold text_dark">Upload Intro Video</Form.Label>
                        <div>
                            <label style={{ cursor: 'pointer' }} htmlFor="videoInput" className="cursor-pointer">
                                {videoLoading ? (
                                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'contain', }} className='border d-flex justify-content-center align-items-center'>
                                        <CircularProgress size={20} />
                                    </div>
                                ) : selectedVideo ? (
                                    <video controls style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'contain', }}>
                                        <source src={URL.createObjectURL(selectedVideo)} type={selectedVideo.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'contain' }} className="border flex justify-center items-center">
                                        <Video size={30} />
                                    </div>
                                )}
                            </label>
                            <Input
                                type="file"
                                accept="video/*"
                                id="videoInput"
                                className="visually-hidden"
                                onChange={handleVideoChange}
                            />
                        </div>
                    </div>*/}
                <div className="flex flex-col px-3 mb-3 gap-2">
                    <Form.Label className="plusJakara_semibold text_dark">Upload File</Form.Label>
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
                            required
                            id="fileInput"
                            className="visually-hidden"
                            onChange={handleCourseFile} />
                    </div>
                </div>
                <Form.Group className="shadow_def px-3 mb-3">
                    <Form.Label className="plusJakara_semibold text_dark">
                        Category Type
                    </Form.Label>
                    <Form.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ width: '100%' }}
                        size="large"
                        required
                        className="custom_control rounded-4 plusJakara_regular text_secondarydark bg_white shadow-sm border"
                        placeholder="Select Category Type"
                        allowClear
                    >
                        {options.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="shadow_def px-3 mb-3">
                    <Form.Label className="plusJakara_semibold text_dark">
                        Choose Course category
                    </Form.Label>
                    <Select
                        showSearch
                        style={{
                            width: "100%",
                        }}
                        size="large"
                        className="custom_control rounded-4 plusJakara_regular text_secondarydark bg_white shadow-sm border"
                        placeholder="Select Course category"
                        // value={categoryId}
                        required
                        allowClear
                        onChange={(e) => setCategoryId(e)}
                    >
                        {categories.map((item, i) => (
                            <option key={i} value={item?._id}>
                                {item?.name}
                            </option>
                        ))}
                    </Select>
                </Form.Group>
                <Form.Group className="shadow_def px-3 mb-3">
                    <Form.Label className="plusJakara_semibold text_dark">
                        Enter Course Title
                    </Form.Label>
                    <Input
                        placeholder="enter course title"
                        type="text"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title} />
                </Form.Group>
                {/* <div className="flex flex-col px-3 mb-3 gap-2">
                        <Form.Label className="plusJakara_semibold text_dark">Upload Document</Form.Label>
                        <Input
                            type="file"
                            accept=".pdf"
                            id="docInput"
                            onChange={handleDocumentChange}
                        />
                    </div>  */}
                {/* <div className="d-flex flex-wrap flex-md-nowrap px-3 gap-3 justify-between w-full mb-4">
                        <Form.Group className='shadow_def w-full'>
                            <Form.Label className="plusJakara_semibold text_dark">Course Title</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                value={title}
                                onChange={(e) => setTitle(e?.target?.value)}
                                style={{ padding: '10px 20px', }}
                                className='custom_control rounded-4 plusJakara_regular text_secondarydark bg_white shadow-sm border'
                                placeholder='Title'
                            />
                        </Form.Group>
              
                    </div> */}
                {/* <Form.Group className='shadow_def px-3 w-full'>
                        <Form.Label className="plusJakara_semibold text_dark">Course Detail</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={4}
                            required
                            value={description}
                            onChange={(e) => setDescription(e?.target?.value)}
                            style={{ padding: '10px 20px', }}
                            className='custom_control rounded-4 plusJakara_regular text_secondarydark bg_white shadow-sm border'
                            placeholder='Course Detail'
                        />
                    </Form.Group> */}
                <Form.Label className="plusJakara_semibold text_dark px-3">
                    More Information
                </Form.Label>
                <CKEditorComponent setckData={setckData} />
                <div className="d-flex justify-content-end my-4 w-100">
                    {!isProcessing ? (
                        <button
                            type="submit"
                            disabled={fileLoading}
                            className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
                        >
                            <span className="plusJakara_semibold text_white">Add Course</span>
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
