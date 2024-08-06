import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Col, Form, Spinner } from "react-bootstrap";
import { ArrowLeft, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { createQuestions } from "../../api/questions";
import { ErrorHandler } from "../errorHandler";
import { message } from "antd";
const CreateQuestion = () => {
    // states-------
    const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions_, setQuestions_] = useState([""]);
  const [correctAns, setCorrectAns] = useState("");
  const [addloader, setaddLoader] = useState(false);
  const [loader, setLoader] = useState(false);
//   functions--------
  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    const data = {
        title: title,
        options: questions_,
        answers: correctAns,
      };
      if(!data?.title || !data?.options || !data?.answers){
        setLoader(false)
        message.error('please fill up all the fields first')
      }
      else{
        createQuestions(data)
          .then((res) => {
            if (res?.data) {
              setaddLoader(false);
              message.success("Question created successfully");
              navigate("/Question");
              setQuestions_([""])
              setTitle('')
              setCorrectAns("")
            }
          })
          .catch((err) => {
            ErrorHandler(err);
            setaddLoader(false);
          });
      }
    
  };
 


  const addQuestions = () => {
    setQuestions_((prev) => [...prev, ""]);
  };
  const delQuestions = (index) => {
    const filteredData = [...questions_];
    filteredData?.splice(index, 1);
    setQuestions_(filteredData);

    console.log(questions_);
  };
  const handleQueries = (val, index) => {
    const newArray = [...questions_];
    newArray[index] = val.target.value;
    setQuestions_(newArray);
  };
// useEffects-----------

  return (
    <main className="min-h-screen lg:container py-4 px-4 ">
      <div className="d-flex gap-4 align-items-start w-full">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              navigate("/Question");
            }}
            className="flex items-center justify-center p-2 bg_primary rounded-3"
          >
            <ArrowLeft className="text_white" />
          </button>
        </div>
        <div className="flex flex-col mb-3 w-full">
          <h4 className="plusJakara_semibold text_black">Add Question</h4>
          <p className="text_secondary plusJakara_regular">
            Information about your current plan and usages
          </p>
        </div>
      </div>
  
          <Form onSubmit={handleSubmit} className="w-full bg_white rounded-3 shadow-md p-4">
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
            <div className="flex justify-content-end my-4 pe-3 w-100">
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

export default CreateQuestion;
