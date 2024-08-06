/* eslint-disable no-useless-concat */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ProductTable from "../../DataTable/productTable";
import { dataTable } from "../../DataTable/productsData";
import { avatarman, edit2, imagecloud, preview, trash } from "../../icons/icon";
import { StyleSheetManager } from "styled-components";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { del_Exams, getExams, updateExams } from "../../api/examApi";
import { useNavigate } from "react-router-dom";
import { Col, Form, Spinner, Modal, Button } from "react-bootstrap";
import { ErrorHandler } from "../errorHandler";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase";
import Select from "react-select";
import { message } from "antd";
import { Edit, Edit2, Eye, Trash2 } from "react-feather";
import { getExams_ } from "../../store/reducer/examSlice";
import { useDispatch, useSelector } from "react-redux";
const Exam = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [delLoader, setDelLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [noOfQues, setnoOfQues] = useState("");
  const [totalMarks, settotalMarks] = useState("");
  const [time, setTime] = useState("");
  const [imageloading, setImageLoading] = useState(false);
  const [image, setImage] = useState("");
  const [selectOptions, setselectOptions] = useState(null);
  const [selectCountryOptions, setselectCountryOptions] = useState(null);
  const [selectCatOptions, setSelectCatOptions] = useState(null);
  const [Exams, setExams] = useState([]);
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [showModal2, setShowModal2] = useState(false);
  const dispatch = useDispatch();
  const reduxExams = useSelector((state) => state.examData.exam);
  console.log(reduxExams, "reduxExams");
  const [count, setCount] = useState(0);
  const handleShow = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const columns = [
    // {
    //     name: 'No',
    //     sortable: true,
    //     maxwidth: '25px',
    //     selector: row => row.no
    // },
    // {
    //     name: "Parents",
    //     sortable: true,
    //     selector: row => row.order_quantity
    // },
    {
      name: "Category",
      sortable: true,
      minWidth: "120px",

      selector: (row) => (row?.type === "free" ? "-" : row?.category),
    },
    {
      name: "Title",
      sortable: true,
      maxWidth: "250px",
      selector: (row) => row?.title,
    },
    {
      name: "No. of Questions",
      sortable: true,
      minWidth: "200px",
      selector: (row) => row?.numb_question,
    },
    {
      name: "Total Marks",
      minWidth: "170px",

      sortable: true,
      selector: (row) => row?.total_marks,
    },
    {
      name: "Time",
      sortable: true,
      selector: (row) => `${row?.time} mins`,
    },
    {
      name: "Type",
      sortable: true,
      selector: (row) => {
        return (
          <button
            type="button"
            style={{
              backgroundColor:
                row?.type === "paid"
                  ? "rgba(0, 179, 93, 1)"
                  : "rgba(235, 67, 53, 1)",
              borderRadius: "20px",
              fontSize: "12px",
              color: "#261E58",
            }}
            className="py-1 px-3 text-white"
          >
            {row?.type.charAt(0).toUpperCase() + row?.type.slice(1)}
          </button>
        );
      },
    },
    {
      name: "Add Question",
      sortable: true,
      minWidth: "170px",
      selector: (row) => {
        return (
          <button
            onClick={() => navigate(`/alot-questions/${row?._id}`)}
            type="button"
            style={{
              backgroundColor: "#261E58",
              borderRadius: "20px",
              width: "fit-content",
              fontSize: "12px",
            }}
            className="py-1 px-3 text-white"
          >
            Add Question
          </button>
        );
      },
    },
    {
      name: "View Question",
      sortable: true,
      minWidth: "170px",
      selector: (row) => {
        return (
          <button
            onClick={() =>
              navigate(`/preview-questions/${row?._id}`, { state: { row } })
            }
            type="button"
            style={{
              backgroundColor: "#261E58",
              borderRadius: "20px",
              width: "fit-content",
              fontSize: "12px",
            }}
            className="py-1 px-3 text-white"
          >
            View Question
          </button>
        );
      },
    },
    {
      name: "Action",
      sortable: true,
      cell: (row) => (
        <div className="flex gap-1">
          <button
            className="rounded-2 p-1"
            style={{ backgroundColor: "#483F72", color: "white" }}
            onClick={() => handleShow(row)}
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => {
              setShowModal2(true);
              setSelectedItem(row?._id);
            }}
            style={{ backgroundColor: "#ff6f61" }}
            className="flex justify-center inter_medium text-xs text_white rounded-2 p-1 items-center"
          >
            <Trash2 size={16} />
          </button>

          {/* <button
                    data-toggle="tooltip" data-placement="top" title="Tooltip on top"
                        className='rounded-2 p-1'
                        style={{ backgroundColor: '#483F72', color: 'white' }}
                        onClick={() => navigate(`/preview-questions/${row?._id}`)}
                    >
                        <Eye size={14} />
                    </button> */}
        </div>
      ),
    },
  ];
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
  const Options = [
    { value: "free", label: "Free" },
    { value: "paid", label: "Paid" },
  ];
  const handleUpdate = (e) => {
    setLoader(true);
    e.preventDefault();
    const data = {
      title: title,
      category: selectCatOptions?.value || "pharma",
      type: selectOptions?.value,
      description: description,
      country: selectCountryOptions?.value,
      numb_question: noOfQues,
      thumbnail: image,
      has_quiz: "false",
      time: time,
      total_marks: totalMarks,
    };
    updateExams(data, selectedItem?._id)
      .then((res) => {
        setLoader(false);
        setShowModal(false);
        message.success("Exam Updated successfully");
        navigate("/exam");
        fetchData();
        let array = [...Exams];
        const index = array?.findIndex(
          (item) => item?._id === selectedItem?._id
        );
        if (index !== -1) {
          array[index] = res?.data?.exam;
          setExams(array);
        }
      })
      .catch((err) => {
        ErrorHandler(err);
        setLoader(false);
      });
  };
  const handleChange = (selectedOption) => {
    setselectCountryOptions(selectedOption);
  };
  const handleUserChange = (selectedOption) => {
    setselectOptions(selectedOption);
  };
  const handleCategoryChange = (selectedOption) => {
    setSelectCatOptions(selectedOption);
  };
  // const uploadFile = (examFile) => {
  //   setImageLoading(true);
  //   if (!examFile) return;
  //   const currentDate = new Date();
  //   const uniqueFileName = `${currentDate.getTime()}_${examFile?.name}`;
  //   const imageRef = ref(storage, `examFile/files/${uniqueFileName}`);
  //   uploadBytes(imageRef, examFile).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageLoading(false);
  //       setImage(url);
  //     });
  //   });
  // };

  const fetchData = async () => {
    await getExams(lastId, search)
      .then((res) => {
        if (res?.data) {
          setLoading(false);
          setExams(res?.data?.exams);
          setLoading(false);
          dispatch(getExams_(res?.data));
          setCount(res?.data?.count?.totalPage);
        }
      })
      .catch((err) => {
        ErrorHandler(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [lastId, search]);
  useEffect(() => {
    setTitle(selectedItem?.title);
    setDescription(selectedItem?.description);
    settotalMarks(selectedItem?.total_marks);
    setTime(selectedItem?.time);
    setImage(selectedItem?.thumbnail);
    setnoOfQues(selectedItem?.numb_question);
    setselectCountryOptions({
      label:
        selectedItem?.country === 1
          ? "Saudi Arabia (SA)"
          : selectedItem?.country === 2
          ? "United Arab Emirates (UAE)"
          : selectedItem?.country === 3
          ? "Kuwait (KU)"
          : selectedItem?.country === 4
          ? "Qatar (QA)"
          : selectedItem?.country === 5
          ? "Bahrain (Behr)"
          : 'Oman"',
      value: selectedItem?.country,
    });
    setSelectCatOptions(selectedItem?.category);
    setselectOptions({
      label: selectedItem?.type === "paid" ? "Paid" : "Free",
    });
  }, [selectedItem]);
  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["sortActive"].includes(prop)}
    >
      <main className="min-h-screen lg:container py-5 px-4 mx-auto">
        <div className="flex flex-col mb-3 w-full">
          <h2 className="plusJakara_bold text_black">Exam</h2>
          <h6 className="text_secondary plusJakara_regular">
            Information about your current plan and usages
          </h6>
        </div>
        {/* {!loading ?
                    <main className='my-5 d-flex w-100 justify-content-center align-items-center'>
                        {/* <span className="text_secondary plusJakara_medium">No Exam Found</span> */}
        {/* <CircularProgress size={18} className='' style={{color:"black"}} /> */}

        {/* </main>  */}
        <ProductTable
          navigation={"/create-exam"}
          buttontext="Create Exams"
          loading={loading}
          setSearch={setSearch}
          search={search}
          count={count}
          setCurrentPage={setLastId2}
          currentPage={lastId2}
          columns={columns}
          data={Exams}
          setLastId={setLastId}
        />
        {/* } */}
        <Modal
          scrollable
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
        >
          <Modal.Body>
            <Modal.Header className="border-0" closeButton />
            <Form
              onSubmit={handleUpdate}
              className="w-full bg_white rounded-3 p-4"
            >
              {/* <Col className="px-3" xs={12}>
          <Form.Label className="plusJakara_semibold text_dark">
            Cover Photo
          </Form.Label>

          <Form.Group className="pb-3 pt-2" style={{ position: "relative" }}>
            <Form.Control
              type="file"
              id="fileInput"
              className="visually-hidden"
              onChange={handleFileChange}
              required={!image}
            />
            <div
              style={{ border: "2px dashed grey" }}
              className="d-flex justify-center bg-gray-100 py-5 rounded-lg"
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
                      className=" rounded-full object-cover mx-auto mb-2"
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
                    right: "-5px",
                    top: "-2px",
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
                    <span className="plusJakara_semibold text_white">
                      Submit
                    </span>
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
          </Modal.Body>
        </Modal>
        <Modal show={showModal2} onHide={() => setShowModal2(false)} centered>
          <Modal.Header
            className="border-0 mt-2 mr-2 p-0"
            closeButton
          ></Modal.Header>
          <Modal.Body className="text-center">
            <h5>Are you sure?</h5>
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="danger"
                className="me-2"
                onClick={() => {
                  let rowArray = [...Exams];
                  const index = rowArray.findIndex(
                    (value) => value?._id === selectedItem?._id
                  );
                  setDelLoader(true);
                  del_Exams(selectedItem)
                    .then((res) => {
                      fetchData();
                      setDelLoader(false);
                      setShowModal2(false);
                      if (index !== -1) {
                        rowArray?.splice(index, 1);
                        setExams(rowArray);
                      }
                      message.success("exam deleted successfully");
                    })
                    .catch((er) => {
                      setDelLoader(false);

                      setShowModal2(false);
                    });
                }}
              >
                {delLoader ? <Spinner size="sm" /> : "Delete"}
              </Button>
              <Button variant="secondary" onClick={() => setShowModal2(false)}>
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </main>
    </StyleSheetManager>
  );
};

export default Exam;
