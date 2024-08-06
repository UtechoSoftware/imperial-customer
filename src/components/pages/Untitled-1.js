import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Col, Form, Spinner } from "react-bootstrap";
import { ArrowLeft, Plus, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { storage } from "../../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imagecloud } from "../../icons/icon";
import { createExam } from "../../api/examApi";
import { ErrorHandler } from "../errorHandler";
import { message } from "antd";
import { Card } from "reactstrap";
import { Button } from "bootstrap/dist/js/bootstrap.bundle";
const CreateExam = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState('');
  const [noOfQues, setnoOfQues] = useState("");
  const [totalMarks, settotalMarks] = useState("");
  const [resourcetitle, setresourceTitle] = useState("");
const [pages,setPages]=useState('')
  const [time, setTime] = useState("");
  const [imageloading, setImageLoading] = useState(false);
  const [image, setImage] = useState("");
  const [selectOptions, setselectOptions] = useState(null);
  const [selectCountryOptions, setselectCountryOptions] = useState(null);
  const [selectRtype, setselectRtype] = useState(null);

  const [selectCatOptions, setSelectCatOptions] = useState(null);
  const [resources, setResources] = useState([{ title: "", type: '', url: '', pages: '' }])
  const [loader, setLoader] = useState(false);
  const handleSubmit = (e) => {
    setLoader(true)
    e.preventDefault();
    if (!image) {
      message.error('wait file is uploading..!')
      setLoader(false)
    } else {

      const data = {
        title: title,
        category: selectCatOptions?.value || 'pharma',
        type: selectOptions?.value,
        description: description,
        country: selectCountryOptions?.value,
        numb_question: noOfQues,
        // thumbnail: image,
        has_quiz: true,
        time: time,
        total_marks: totalMarks,
        resources: resources,
      };
      console.log(data)
      createExam(data)
        .then((res) => {
          setLoader(false)
          message.success('Exam created successfully')
          navigate('/exam')
          setDescription('')
          setImage('')
          setselectCountryOptions(null)
          setSelectCatOptions(null)
          setselectOptions(null)
          setnoOfQues('')
          setTitle('')
          setTime('')
          settotalMarks('')


        })
        .catch((err) => {
          ErrorHandler(err);
          setLoader(false)

        });
    }
  };
  const navigate = useNavigate();
  const categoryOptions = [
    { value: "pharma", label: "Pharma" },
    { value: "nonpharma", label: "Non-Pharma" },
    { value: "structure", label: "Structure" },
    { value: "calculation", label: "Calculation" },
  ];

  const countryOptions = [
    { value: 1, label: "Saudi Arabia (SA)" },
    { value: 2, label: "United Arab Emirates (UAE)" },
    { value: 3, label: "Kuwait (KU)" },
    { value: 4, label: "Qatar (QA)" },
    { value: 5, label: "Bahrain (Behr)" },
    { value: 6, label: "Oman" },
  ];
  const resourcesOption = [
    { value: 'notes', label: "Notes" },
    { value: 'video', label: "Video" },

  ];
  const Options = [
    { value: "free", label: "Free" },
    { value: "paid", label: "Paid" },
  ];
  const handleChange = (selectedOption) => {
    setselectCountryOptions(selectedOption);
  };
  const handleChangeRtype = (selectedOption) => {
    setselectRtype(selectedOption);
  };
  const handleUserChange = (selectedOption) => {
    setselectOptions(selectedOption);
  };
  const handleCategoryChange = (selectedOption) => {
    setSelectCatOptions(selectedOption);
  };
  const uploadFile = (examFile) => {
    setImageLoading(true);
    if (!examFile) return;
    const currentDate = new Date();
    const uniqueFileName = `${currentDate.getTime()}_${examFile?.name}`;
    const imageRef = ref(storage, `examFile/files/${uniqueFileName}`);
    uploadBytes(imageRef, examFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageLoading(false);
        setImage(url);
      });
    });
  };
  const handleFileChange = (e) => {
    setImageLoading(true);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      //   setSelectedFile(null);
    }
    if (file) {
      uploadFile(file);
    }
  };
  const handleAddResources = () => {
    setResources((prev) => [...prev, { title: "", type: '', url: '', pages: '' }])
  }
  const delResources = (index) => {
    const filteredData = [...resources];
    filteredData?.splice(index, 1);
    setResources(filteredData);

  }
const handleResourcesChange=(value,name,index)=>{
const gatheredData=[...resources]
gatheredData[index][name]=value
setResources(gatheredData)
console.log(gatheredData,"rr")
}
  return (
    <main className="min-h-screen lg:container py-4 px-4 ">
      <div className="d-flex gap-4 align-items-start w-full">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              navigate("/exam");
            }}
            className="flex items-center justify-center p-2 bg_primary rounded-3"
          >
            <ArrowLeft className="text_white" />
          </button>
        </div>
        <div className="flex flex-col mb-3 w-full">
          <h4 className="plusJakara_semibold text_black">Add Exam</h4>
          <p className="text_secondary plusJakara_regular">
            Information about your current plan and usages
          </p>
        </div>
      </div>
      <Form
        onSubmit={handleSubmit}
        className="w-full bg_white rounded-3 shadow-md p-4"
      >
        {/* <Col className="px-3" xs={12}>
          <Form.Label className="plusJakara_semibold text_dark">
            Cover Photo
          </Form.Label>

          <Form.Group className="pb-3 pt-2">
            <Form.Control
              type="file"
              id="fileInput"
              className="visually-hidden"
              onChange={handleFileChange}
              required
            />
            <div className="flex justify-center">

            <div
              style={{ border: "2px dashed grey" }}
              className="d-flex justify-center bg-gray-100 py-5 rounded-lg w-[20rem] relative "
            >
              <label htmlFor="fileInput" className="cursor-pointer">
                {imageloading ? (
                  <Spinner animation="border" size="sm" />
                ) : image ? (
                  <div>
                    <img
                      src={image}
                      alt="Preview"
                      style={{ maxWidth: "200px" }}
                      className=" rounded-full  object-cover mx-auto mb-2"
                    />
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-center gap-3 w-full">
                    <div className="border-5 bg-light p-2 d-flex align-items-center justify-content-center rounded-full">
                      <img
                        src={imagecloud}
                        alt="Camera Icon"
                        className="w-100"
                      />
                    </div>
                    <div className="d-flex flex-column gap-1 align-items-center">
                      <span className="inter-regular text-sm text-muted">
                        Add Cover Image
                      </span>
                    </div>
                  </div>
                )}
              </label>
              {image ? (
                <p
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    right: "-10px",
                    top: "-10px",
                  }}
                  onClick={() => {
                    setImage("");
                  }}
                >
                  ❌
                </p>
              ) : (
                ""
              )}
            </div>
            </div>
          </Form.Group>
        </Col> */}
        <Form.Group className="shadow_def px-3 w-full mb-3">
          <Form.Label className="plusJakara_semibold text_dark">
            Select Country
          </Form.Label>
          <Select
            options={countryOptions}
            onChange={handleChange}
            value={selectCountryOptions}

            placeholder="Select a country"
          />
        </Form.Group>
        <Form.Group className="shadow_def px-3 w-full mb-3">
          <Form.Label className="plusJakara_semibold text_dark">
            Type
          </Form.Label>
          <Select
            options={Options}
            value={selectOptions}
            onChange={handleUserChange}
            placeholder="Select type"
          />
        </Form.Group>
        {selectOptions?.value === "paid" ? (
          <Form.Group className="shadow_def px-3 w-full mb-3">
            <Form.Label className="plusJakara_semibold text_dark">
              Category
            </Form.Label>
            <Select
              options={categoryOptions}
              value={selectCatOptions}
              onChange={handleCategoryChange}
              placeholder="Select a category"
            />
          </Form.Group>
        ) : (
          ""
        )}
        <Form.Group className="shadow_def px-3 w-full mb-3">
          <Form.Label className="plusJakara_semibold text_dark">
            Exam Title
          </Form.Label>
          <Form.Control
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "10px 20px" }}
            className="custom_control rounded-4 plusJakara_regular text_secondarydark bg_white shadow-sm border"
            placeholder="Enter Exam title"
          />
        </Form.Group>
        <Form.Group className="shadow_def px-3 mb-3">
          <Form.Label className="plusJakara_semibold text_dark">
            Total Number of Questions
          </Form.Label>
          <Form.Control
            rows={5}
            required
            type="number"
            value={noOfQues}
            onChange={(e) => setnoOfQues(e.target.value)}
            style={{ padding: "10px 20px" }}
            className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
            placeholder="Enter no of questions"
          />
        </Form.Group>
        <Form.Group className="shadow_def px-3 mb-3">
          <Form.Label className="plusJakara_semibold text_dark">
            Total Marks
          </Form.Label>
          <Form.Control
            rows={5}
            required
            type="number"
            value={totalMarks}
            onChange={(e) => settotalMarks(e.target.value)}
            style={{ padding: "10px 20px" }}
            className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
            placeholder="Enter total marks"
          />
        </Form.Group>
        {selectOptions?.value === "paid" ? (
          <Form.Group className="shadow_def px-3 w-full mb-3">
            <Form.Label className="plusJakara_semibold text_dark">
              Resources
            </Form.Label>
            <button type="button" style={{ backgroundColor: "#504A78", borderRadius: "3px" }} className="btn d-flex gap-2 mb-4 mt-2  text-white " onClick={handleAddResources}><Plus />{""} Add Resources</button>
            <div className="d-flex flex-wrap justify-center gap-9">
              {
                resources?.map((item, index) => {
                  return (
                    <Card className="position-relative shadow-md p-2 0 " style={{ width: "25rem" }}>
                      <div className="flex flex-col gap-3 ">
                        <Form.Group className="shadow_def px-3 ">
                          <Form.Label className="plusJakara_semibold text_dark">
                            Enter title
                          </Form.Label>
                          <Form.Control
                            rows={5}
                            required
                            type="text"
                            name="title"
                            value={item?.title}
                          onChange={(e)=>handleResourcesChange(e.target.value,"title",index)}
                            style={{ padding: "10px 20px" }}
                            className="custom_control p-2  rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
                            placeholder="Enter title"
                          />
                        </Form.Group>
                        <Form.Group className="shadow_def px-3 w-full mb-1">
                          <Form.Label className="plusJakara_semibold text_dark">
                            Select Type
                          </Form.Label>
                          <Select
                            options={resourcesOption}
                            onChange={(e)=>handleResourcesChange(e,"type",index)}

                            name="type"
                            value={item?.type}
                            placeholder="Select type"
                          />
                        </Form.Group>
                        {
                              item?.type?.label==='Notes'
                                ?                <Form.Group className="shadow_def px-3 w-full mb-1">
                          <Form.Label className="plusJakara_semibold text_dark">
                            Enter Pages
                          </Form.Label>
                          <Form.Control
                            rows={5}
                            name="pages"
                            required
                            type="text"
                            value={item?.pages}
                            onChange={(e)=>handleResourcesChange(e.target.value,"pages",index)}

                            style={{ padding: "10px 20px" }}
                            className="custom_control p-2  rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
                            placeholder="Enter title"
                          />
                        </Form.Group>: ''}
                        <Col className="px-3" xs={12}>
                          <Form.Label className="plusJakara_semibold text_dark">
                            {
                              item?.type
                                ? `Upload ${item.type.label}`
                                : 'Upload File'
                            }

                          </Form.Label>
                      
                          <Form.Group className="pb-3 pt-2">
                            <Form.Control
                              type="file"
                              id={`fileInput_${index}`}
                              name="file"
                              className="visually-hidden"
                              onChange={(e)=>handleResourcesChange(e.target.files[0],"url",index)}
                              required
                            />
                            <div className="flex justify-center">

                              <div
                                style={{ border: "2px dashed grey" }}
                                className="d-flex justify-center bg-gray-100 py-5 rounded-lg w-[20rem] relative "
                              >
                                <label htmlFor="fileInput" className="cursor-pointer">
                                  {imageloading ? (
                                    <Spinner animation="border" size="sm" />
                                  ) : image ? (
                                    <div>
                                      <img
                                        src={image}
                                        alt="Preview"
                                        style={{ maxWidth: "200px" }}
                                        className=" rounded-full  object-cover mx-auto mb-2"
                                      />
                                    </div>
                                  ) : (
                                    <div className="d-flex flex-column align-items-center gap-3 w-full">
                                      <div className="border-5 bg-light p-2 d-flex align-items-center justify-content-center rounded-full">
                                        <img
                                          src={imagecloud}
                                          alt="Camera Icon"
                                          className="w-100"
                                        />
                                      </div>
                                      <div className="d-flex flex-column gap-1 align-items-center">
                                        <span className="inter-regular text-sm text-muted">
                                          Add File
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </label>
                                {image ? (
                                  <p
                                    style={{
                                      position: "absolute",
                                      cursor: "pointer",
                                      right: "-10px",
                                      top: "-10px",
                                    }}
                                    onClick={() => {
                                      setImage("");
                                    }}
                                  >
                                    ❌
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </Form.Group>
                        </Col>
                      </div>
                      <div className="position-absolute -top-4 -right-3  ">
                        <button
                          type="button"
                          onClick={() => delResources(index)}
                          className=" bg-danger text-white d-flex justify-content-center align-items-center rounded-circle"
                          style={{ height: "2rem", width: "2rem" }}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </Card>
                  )
                })
              }
            </div>
          </Form.Group>
        ) : (
          ""
        )}
        <Form.Group className="shadow_def px-3 mb-3">
          <Form.Label className="plusJakara_semibold text_dark">
            Time(mins)
          </Form.Label>
          <Form.Control
            rows={5}
            required
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ padding: "10px 20px" }}
            className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
            placeholder="Enter time"
          />
        </Form.Group>
        {/* <Form.Group className="shadow_def px-3 mb-3">
          <Form.Label className="plusJakara_semibold text_dark">
            Description
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "10px 20px" }}
            className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
            placeholder="Enter  Description"
          />
        </Form.Group> */}

        <hr style={{ color: "#f4f4f4" }} />

        <div className="flex justify-content-end my-4 w-100">
          {!loader ? (
            <button
              type="submit"
              className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
            >
              <span className="plusJakara_semibold text_white">Submit</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={loader}
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

export default CreateExam;
