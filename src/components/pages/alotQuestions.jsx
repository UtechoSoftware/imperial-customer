/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, formHelperTextClasses } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {  message, Tooltip, Spin } from "antd";
import axios from "axios";
import Select, { components } from 'react-select';
import { ArrowLeft, Trash2 } from "react-feather";
import { alotQuestions, editQuestion, getQuestions } from "../api/questions";
import { ErrorHandler } from "./errorHandler";
import { question } from "../icons/icon";
import { Button, Form, Modal } from "react-bootstrap";
const AlotQuestions = () => {
  const [findQustion, setFindQustion] = useState(null);
  const examId = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [editLoader, setEditLoader] = useState(false);
  const [loading, setLoading] = useState(null);
  const [alotLoader, setalotLoader] = useState(false);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [questions_, setQuestions_] = useState([""]);
  const [correctAns, setCorrectAns] = useState("");
  const [questions, setquestions] = useState([]);
  const [questionsId, setQuestionsId] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search,setSearch]=useState('')
  const scrollPositionRef = useRef(0);
  const handleQuestionsChange = (value) => {
    setFindQustion(questions?.find((item) => item?._id === value?.value));
    setQuestionsId(value);
    console.log(value,"ii")
  };
  const exId = useParams()
  console.log(exId?.id,"ex")
  const [options, setOptions] = useState(findQustion);
  const qId = findQustion?._id;
  const newId = encodeURIComponent(qId);
  console.log(newId);

  const hanldeEditQuestion = () => {
    setShowModal(true);
    setTitle(findQustion?.title);
    setQuestions_(findQustion?.options);
    setCorrectAns(findQustion?.answers);
  };

  // };

  const handleFetchQuestions = async (page,search) => {
    setLoading(true);
    try {
      const res = await getQuestions(page,search);
      if(search){
        setquestions(res?.data?.questions);

      }else if (page === 1) {
        setquestions(res?.data?.questions);
      } else {
        setquestions((prevQuestions) => [
          ...prevQuestions,
          ...res?.data?.questions,
        ]);
      }
      setHasMore(res.count.totalPage > page);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

 
  const handlePopupScroll = (e) => {
    const { target } = e;
    scrollPositionRef.current = target.scrollTop;
    if (
      Math.ceil(target.scrollHeight) - Math.ceil(target.scrollTop) ===
      Math.ceil(target.clientHeight)
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };
  useEffect(() => {
    handleFetchQuestions(page ,search);
  }, [page,search])
  const addQuestions = () => {
    setQuestions_((prev) => [...prev, ""]);
  };
  const delQuestions = (index) => {
    const filteredData = [...questions_];
    filteredData?.splice(index, 1);
    setQuestions_(filteredData);

    console.log(questions_);
  };
  const handleUpdate = () => {
    setEditLoader(true);
    
    const data = {
      options: questions_,
      title: title,
      answers: correctAns,
    };
    if (qId) {
      editQuestion(data, newId)
        .then((res) => {
          if (res?.data) {
            message.success("Question Updated successfully ");
            setEditLoader(false);
            setFindQustion(res?.data?.question);
            setShowModal(false)
          }
        })
        .catch((err) => {
          ErrorHandler(err);
          setEditLoader(false);
        });
    } else {
      alert("id not found");
    }
  };
  const handleQueries = (val, index) => {
    const newArray = [...questions_];
    newArray[index] = val.target.value;
    setQuestions_(newArray);
  };
  useEffect(() => {
    if (scrollPositionRef.current !== 0) {
      const menuList = document.querySelector('.react-select__menu-list');
      if (menuList) {
        menuList.scrollTop = scrollPositionRef.current;
      }
    }
  }, [questions]);
  const handleSubmit=(e)=>{
    e.preventDefault()
    setalotLoader(true)
    alotQuestions(exId?.id,qId).then((res)=>{
      message.success('Question aloted successfully')
      setQuestionsId("")
    setalotLoader(false)
    setFindQustion(null);


    }).catch((err)=>{
      ErrorHandler(err)
    setalotLoader(false)

    })
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
          <h2 className="plusJakara_semibold text_black">Alot Question</h2>
          <h6 className="text_secondary plusJakara_regular">
            Information about your current plan and usages
          </h6>
        </div>
      </div>
      <Form onSubmit={handleSubmit} className="w-full bg_white rounded-3 shadow-md p-4">
        <Form.Group className="shadow_def mb-4">
          <Form.Label className="plusJakara_semibold text_dark">
            Select Question
          </Form.Label>
         
          <div>

          <Select
        onInputChange={(value)=>setSearch(value)}
        isLoading={loading}
        value={questionsId}
        onChange={(value)=>handleQuestionsChange(value)}
        onMenuScrollToBottom={handlePopupScroll}
        options={questions?.map((item) => ({ label: item?.title, value: item?._id }))}
       
      />
          </div>
        </Form.Group>
        {
          findQustion  &&
          <div className="d-flex flex-column">
            <p className="text-success">
              You can edit the selected question before aloting it{" "}
            </p>
            <h5 style={{ fontWeight: "bolder", fontSize: "20px" }}>
              {"Q- " + findQustion?.title}
            </h5>
            {findQustion?.options?.map((option, index) => (
              <div key={index} className="d-flex align-items-center">
                <input
                  type="radio"
                  name={`option-${findQustion?.title}`}
                  checked={findQustion?.answers === option}
                />
                <label style={{ marginLeft: "0.5rem" }}>{`${
                  index + 1
                } - ${option}`}</label>
                <div
                  style={{ maxWidth: "20rem", width: "100%" }}
                  className="ps-2"
                >
                  {/* <input  style={{borderBottom:"1px solid black", outline:"none", maxWidth:"18rem",width:"100%"}}   onChange={(e) => handleOptionChange(index, e.target.value)}  defaultValue={option} type="text"/> */}
                </div>
              </div>
            ))}
          </div>
        }
        {findQustion && (
          <button
            onClick={hanldeEditQuestion}
            type="button"
            className="flex justify-center  bg_primary py-2 mt-3 px-2 rounded-3 items-center"
          >
      
              <span className="plusJakara_semibold text_white text-sm">
                Edit Question
              </span>
          
          </button>
        )}
        {/* {courseCategories.length > 0 && ( */}

        <div className="flex justify-end my-4 w-full">
          {!alotLoader ? (
            <button
              type="submit"
              className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
            >
              <span className="plusJakara_semibold text_white">
                Alot Question
              </span>
            </button>
          ) : (
            <button
              type="button"
              disabled={alotLoader}
              className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center"
            >
              <CircularProgress size={18} className="text_white" />
            </button>
          )}
        </div>
      </Form>
      <Modal
        scrollable
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Body>
          <Modal.Header className="border-0" closeButton />
          <Form onSubmit={hanldeEditQuestion}>
            <Form.Group className="shadow_def px-3 mb-3">
              <Form.Label className="plusJakara_semibold text_dark">
                Question Title
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: "10px 20px" }}
                className="custom_control rounded-3 plusJakara_regular text_secondarydark bg_white shadow-sm border"
                placeholder="Enter Name"
              />
            </Form.Group>

            <Form.Group className="shadow_def px-3 mb-3">
              <Form.Label className="plusJakara_semibold text_dark">
                Options
              </Form.Label>
              <div className="d-flex flex-column w-100 gap-3">
                {questions_?.map((val, index) => {
                  return (
                    <div
                      className="d-flex align-items-center w-100 gap-2"
                      key={index}
                    >
                      <input
                        placeholder={`Add option ${index + 1}`}
                        className="bg-white shadow_def p-2 w-100 form-control"
                        type="text"
                        value={val}
                        onChange={(e) => handleQueries(e, index)}
                      />
                      {questions_?.length > 1 && (
                        <div className="">
                          <button
                            type="button"
                            onClick={() => delQuestions(index)}
                            className=" bg-danger text-white d-flex justify-content-center align-items-center rounded-circle"
                            style={{ height: "2rem", width: "2rem" }}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                className="btn btn-sm mt-3 px-3 rounded-4 bg-success text-white"
                onClick={addQuestions}
              >
                Add Options
              </button>
            </Form.Group>
            <Form.Group className="shadow_def px-3 mb-3">
              <Form.Label className="plusJakara_semibold text_dark">
                Select Answer
              </Form.Label>
              <div className="flex w-100 gap-2 items-center">
                <Form.Select
                  value={correctAns}
                  onChange={(e) => setCorrectAns(e.target.value)}
                  className="w-100 rounded-3 text_secondarydark plusJakara_medium bg_white shadow-sm border"
                  style={{ padding: "10px 20px" }}
                >
                  <option className="plusJakara_medium text_dark" value="">
                    Select answer
                  </option>
                  {questions_?.map((item, index) => {
                    return (
                      item && (
                        <option
                          className="plusJakara_medium text_dark"
                          key={index}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    );
                  })}
                </Form.Select>
              </div>
            </Form.Group>
            <div className="flex justify-content-end my-4 w-100">
              <Button type="button" onClick={handleUpdate}>
                {editLoader ? (
                  <CircularProgress size={18} className="text_white" />
                ) : (
                  <span className="plusJakara_semibold text_white text-sm">
                    Update
                  </span>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default AlotQuestions;
