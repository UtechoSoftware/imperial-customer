import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { StyleSheetManager } from "styled-components";
import ProductTable from "../DataTable/productTable";
import { getHelp, updateHelp } from "../api/help";
import Helptable from "../DataTable/helptable";
import { Button, Form, Modal, Table } from "react-bootstrap";

import avatar from "../assets/png/avatar1.png";
import email from "../assets/png/email.png"
import { question } from "../icons/icon";
import { message } from "antd";
const Help = () => {
  const [show, setShow] = useState(false);
  const [lastId, setLastId] = useState(1);
  const handleShow = () => setShow(true);
  const handleClose = () =>{
     setShow(false)
     message.success('We will review your query shortly')

  };

  const [Id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [statusloading, setStatusloading] = useState(false);
  const [search, setSearch] = useState("");
  let dummy = [
    {
      faq: "FAQ 1 - Question",
      question: "Question",
      ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit velit sit amet neque tempus, pulvinar faucibus nulla facilisis. Suspendisse at ex vel justo commodo molestie. Donec ut sodales odio,tincidunt porta tortor. Fusce aliquet urna",
    },
    {
      faq: "FAQ 2 - Question",
      question: "Question",
      ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit velit sit amet neque tempus, pulvinar faucibus nulla facilisis. Suspendisse at ex vel justo commodo molestie. Donec ut sodales odio,tincidunt porta tortor. Fusce aliquet urna",
    },
    {
      faq: "FAQ 3 - Question",
      question: "Question",
      ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit velit sit amet neque tempus, pulvinar faucibus nulla facilisis. Suspendisse at ex vel justo commodo molestie. Donec ut sodales odio,tincidunt porta tortor. Fusce aliquet urna",
    },
    {
      faq: "FAQ 4 - Question",
      question: "Question",
      ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit velit sit amet neque tempus, pulvinar faucibus nulla facilisis. Suspendisse at ex vel justo commodo molestie. Donec ut sodales odio,tincidunt porta tortor. Fusce aliquet urna",
    },
  ];
  const handleClick = (row) => {
    setStatusloading(true);
    setId(row?._id);
    updateHelp(row?._id)
      .then((res) => {
        getPagData(lastId);
        setStatusloading(false);
      })
      .catch((err) => {
        setStatusloading(false);
      });
    // setIsOpen(true)
    // setSelectItem(row)
  };
  const getPagData = () => {
    setLoading(true);
    getHelp(lastId, search).then((data) => {
      setLastId(data?.count?.totalPage);
      setLoading(false);
      setData(data?.Messages);
    });
  };

  useEffect(() => {
    getPagData();
  }, [lastId, search]);
  const columns = [
    // {
    //     name: 'No',
    //     sortable: true,
    //     maxwidth: '25px',
    //     selector: row => row?.child
    // },
    {
      name: "User Name",
      sortable: true,
      minWidth: "250px",

      selector: (row) => row?.name,
    },
    {
      name: "Email",
      sortable: true,
      minWidth: "250px",
      selector: (row) => row?.email,
    },

    {
      name: "Message",
      sortable: true,
      minWidth: "250px",
      selector: (row) => row?.msg,
    },

    {
      name: "Action",
      allowoverflow: true,
      minwidth: "100px",
      cell: (row) => {
        return (
          <div className="d-flex align-items-center gap-1">
            {row?.attended === true ? (
              <button
                style={{
                  backgroundColor: "green",
                  whiteSpace: "nowrap",
                }}
                disabled
                className={`text_white btn btn-sm    text-light flex justify-center rounded-3 items-center relative`}
              >
                Attended
              </button>
            ) : (
              <button
                type="button"
                style={{
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  backgroundColor: "#261E58",
                  minWidth: "80px",
                }}
                // disabled={loading2}
                onClick={() => handleClick(row)}
                className={`text_white btn btn-sm    text-light flex justify-center rounded-3 items-center relative`}
              >
                {Id === row?._id && statusloading === true ? (
                  <Spinner size="sm" />
                ) : (
                  "Attend"
                )}
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <>
        <main className="min-h-screen lg:container py-5 px-10 mx-auto">
          <div className="flex justify-between max-md:flex-col max-md:gap-3 mb-3 md:items-center w-full">
            <div className="flex flex-md-row flex-column">
              <img className="avatar_img" width="60px" src={avatar} alt="avatar" />
              <div className="flex flex-col">
                <h4 className="manrope_bold max-md:text-xl text_black">
                  John Doe
                </h4>
                <p>Hr Director - Tesla Corp.</p>
              </div>
            </div>
          </div>
          {/* <h4 className="manrope_bold max-md:text-xl text_black">Help</h4> */}
          <h4 className="manrope_bold max-md:text-xl text_secondary mt-3">
            FAQs
          </h4>
          <div className="felx flex-col py-2">
            {dummy.map((item, index) => (
              <div key={index} className="flex flex-col py-2">
                <h6 className="manrope_bold max-md:text-xl text_black">
                  {item.faq}
                </h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  blandit velit sit amet neque tempus, pulvinar faucibus nulla
                  facilisis. Suspendisse at ex vel justo commodo molestie. Donec
                  ut sodales odio, tincidunt porta tortor. Fusce aliquet urna
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-end ">
            <div onClick={()=>handleShow()} className="cursor-pointer  q_card flex manrope_bold max-md:text-xl text_black justify-center items-center border-solid	border-1 rounded py-3 bg-white  ">
              <h6>Still have questions?
              </h6>
              <img className="h-10 d-md-block d-none" src={email} alt="email" />
            </div>
          </div>
          {/* <Helptable
            loading={loading}
            data={data}
            columns={columns}
            setSearch={setSearch}
            search={search}
            count={lastId}
            setLastId={(e) => {
              setLastId(e);
              getPagData(e);
            }}
          /> */}
          <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName="custom-modal pt-0"
          >
            <Modal.Body>
              <h6 className="modal-title mb-3 mt-0 ">
                Send your Faq to us
              </h6>
              <Form>
                <Form.Group className="mb-2" controlId="formName">
                  <Form.Label className="m-0">Faq title</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="text" placeholder="insert title" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formCompanyName">
                  <Form.Label className="m-0">Description </Form.Label>
                  <div className="modal_form">
                    <Form.Control
                      type="textarea"
                      placeholder="insert description"
                    />
                  </div>
                </Form.Group>
                {/* <Form.Group className="mb-2" controlId="formPosition">
                  <Form.Label className="m-0">Position</Form.Label>
                  <div className="modal_form">
                    <Form.Control
                      type="text"
                      placeholder="insert your position in the company"
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formEmail">
                  <Form.Label className="m-0">E-mail</Form.Label>
                  <div className="modal_form">
                    <Form.Control
                      type="email"
                      placeholder="example@email.com"
                    />
                  </div>
                </Form.Group> */}
                <div className="d-flex justify-content-end pt-3">
                  <button
                    type="button"

                    className="btn2 px-3 py-2  border-black"
                    onClick={handleClose}
                    style={{ width: "9rem" }}
                  >
                    Done
                  </button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </main>
      </>
    </div>
  );
};

export default Help;
