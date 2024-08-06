/* eslint-disable no-useless-concat */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ProductTable from "../../DataTable/productTable";
import { dataTable } from "../../DataTable/productsData";
import { StyleSheetManager } from "styled-components";
import { getQuestions, getQuestionsById } from "../../api/questions";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { ErrorHandler } from "../errorHandler";

import { Eye } from "react-feather";
const Question = () => {
  const id = useParams();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [Questions, setQuestions] = useState([]);
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [findQustion, setFindQustion] = useState(null);
  const [count, setCount] = useState(0);
  const handleQuestions = (row) => {
    setShowModal(true);
    setFindQustion(Questions?.find((item) => item?._id === row?._id));
  };
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      maxWidth: "500px",

      sortable: "true",
    },
    {
      name: "Options",
      selector: (row) => row.options.join(" , "),
      maxWidth: "200px",

      sortable: "true",
    },
    {
      name: "Answers",
      selector: (row) => row.answers,
      maxWidth: "160px",
      sortable: "true",
    },

    {
      name: "View",
      allowoverflow: true,
      maxWidth: "80px",
      cell: (row) => {
        return (
          <div className="d-flex gap-1">
            <button
              data-toggle="tooltip"
              data-placement="top"
              title="Tooltip on top"
              className="rounded-2 p-1"
              style={{ backgroundColor: "#483F72", color: "white" }}
              onClick={() => handleQuestions(row)}
            >
              <Eye size={14} />
            </button>
            {/* <button
                data-toggle="tooltip" data-placement="top" title="Tooltip on top"
                    className='rounded-2 p-1'
                    style={{ backgroundColor: '#483F72', color: 'white' }}
                   onClick={()=>navigate(`/edit-questions/${row?._id}`)}
                >
                    <Edit size={14} />
                </button> */}
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    if (!search) {
      setLoading(true);
    }
    await getQuestions(lastId, search)
      .then((res) => {
        if (res?.data) {
          setQuestions(res?.data?.questions);
          setCount(res?.data?.count?.totalPage);
          setLoading(false);
        }
      })
      .catch((err) => {
        ErrorHandler(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [lastId, search]);

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["sortActive"].includes(prop)}
    >
      <main className="min-h-screen lg:container py-5 px-4 mx-auto">
        <div className="flex flex-col mb-3 w-full">
          <h2 className="plusJakara_bold text_black">Question</h2>
          <h6 className="text_secondary plusJakara_regular">
            Information about your current plan and usages
          </h6>
        </div>
        {/* {!Questions || Questions.length === 0 ? */}
        <main className=" d-flex w-100 justify-content-center align-items-center">
          {/* <span className="text_secondary plusJakara_medium">No Question Found</span> */}
          {/* <CircularProgress size={18} className='' style={{color:"black"}} /> */}
        </main>
        <ProductTable
          navigation={"/create-Question"}
          buttontext="Create Questions"
          loading={loading}
          setSearch={setSearch}
          search={search}
          count={count}
          setCurrentPage={setLastId2}
          currentPage={lastId2}
          columns={columns}
          data={Questions}
          setLastId={setLastId}
        />
        <Modal
          className="p-1"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Body>
            <Modal.Header className="border-0 p-0" closeButton>
              <p className="plusJakara_bold fs-5 m-0">Question Details</p>
            </Modal.Header>

            {findQustion && (
              <div className="d-flex flex-column pt-3">
                <h5 style={{ fontWeight: "bolder", fontSize: "16px" }}>
                  {"Q- " + findQustion?.title}
                </h5>
                {findQustion?.options?.map((option, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-lg-baseline  gap-2"
                  >
                    <input
                      type="radio"
                      className=" "
                      name={`option-${findQustion?.title}`}
                      checked={findQustion?.answers === option}
                    />
                    {option}
                    {/* <label style={{ marginLeft: "0.5rem" }}>{`${
                  index + 1
                } - ${option}`}</label> */}
                    <div
                      style={{ maxWidth: "20rem", width: "100%" }}
                      className="ps-2"
                    >
                      {/* <input  style={{borderBottom:"1px solid black", outline:"none", maxWidth:"18rem",width:"100%"}}   onChange={(e) => handleOptionChange(index, e.target.value)}  defaultValue={option} type="text"/> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Modal.Body>
        </Modal>
      </main>
    </StyleSheetManager>
  );
};

export default Question;
