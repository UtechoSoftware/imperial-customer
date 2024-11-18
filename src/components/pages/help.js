/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { post_help } from "../api/help";
import { CircularProgress } from "@mui/material";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import avatar from "../assets/png/avatar1.png";
import email from "../assets/png/email.png";
import { axiosInstance } from "../api/axiosIntance";
import { Pagination } from 'antd';
const Help = () => {
  const [lastId, setLastId] = useState(1);
  const { t, i18n } = useTranslation();
  const login = useSelector((state) => state.data.data.isLogin_);
  const [data, setData] = useState([]);
  const [type, setType] = useState(i18n.language);
  const user = useSelector(state => state.data.data.user)
  const [count, setcount] = useState(0);
  const [faqTitle, setFaqTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => { };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      title: faqTitle,
      description: description,
    };
    post_help(data)
      .then((res) => {
        setLoading(false);
        setShow(false);
        setDescription("");
        setFaqTitle("");
        message.success("Request submitted..We will review your query shortly");
      })
      .catch((er) => {
        setLoading(false);
      });
  };
  const fetchData = async (lastId) => {
    setLoading(true);
    axiosInstance.get(`api/users/faqs/${type === 'pt' ? 'pr' : 'en'}/${lastId}`).then((res) => {
      if (res?.data) {
        setData(res?.data?.faqs);
        setcount(res?.data?.count?.totalPage);
        setLoading(false);
      }
    })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(lastId);
  }, [lastId, type]);

  useEffect(() => {
    setType(i18n.language)
  }, [i18n.language, type]);

  const handlePageChange = (page) => {
    setLoading(true);
    setLastId(page);
  };

  return (
    <div style={{ backgroundColor: "#f8f8f8 " }}>
      <>
        <main className="min-h-screen lg:container py-5 px-10 mx-auto">
          {
            login && (
              <div className="flex justify-between max-md:flex-col max-md:gap-3 mb-3 md:items-center w-full">
                <div className="flex flex-md-row  flex-column">
                  <img
                    className="avatar_img"
                    style={{ width: "70px", height: "70px" }} // Ensures aspect ratio is maintained
                    src={user?.profilePicture || avatar}
                    alt="avatar"
                  />
                  <div className="flex flex-col mt-2">
                    <h4 className="manrope_bold max-md:text-xl text_black">
                      {user?.name
                        ?.split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(" ")}
                    </h4>
                    <p>
                      {user?.position?.toUpperCase()} – {" "}
                      {user?.comp_name
                        ?.split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(" ")}
                    </p>

                  </div>
                </div>
              </div>
            )
          }
          {/* <h4 className="manrope_bold max-md:text-xl text_black">Help</h4> */}
          <h4 className="manrope_bold max-md:text-xl text_secondary mt-3">
            {t('faq_h1')}
          </h4>
          <div className="felx flex-col py-2 " style={{ minHeight: "500px" }}>
            {
              loading ? (
                <>
                  <div className="d-flex justify-content-center">
                    <CircularProgress
                      size={24}
                      style={{ color: "black" }}
                    />
                  </div>
                </>
              ) :
                data?.map((item, index) => (
                  <>
                    <div key={index} className="flex flex-col py-2">
                      <div className="d-flex gap-3 align-items-center ">
                        <p className="m-0 p-0">
                          {`${(lastId - 1) * 10 + index + 1} -`}
                        </p>
                        <h6 className="manrope_bold max-md:text-xl text_black">
                          {item.title}
                        </h6>
                      </div>
                      <div style={{ paddingLeft: "36px" }} className="">
                        <p className="">
                          {item?.subtitle}
                        </p>
                      </div>
                    </div>

                  </>
                ))

            }
          </div>
          {
            data?.length > 1 && (

              <div className="d-flex justify-content-center">
                <Pagination
                  current={lastId}
                  total={count * 10}
                  onChange={handlePageChange}
                  defaultPageSize={10}

                />
              </div>
            )
          }
          <div className="flex justify-end ">
            <div
              onClick={() => handleShow()}
              className="cursor-pointer  q_card flex manrope_bold max-md:text-xl text_black justify-center items-center border-solid	border-1 rounded py-3 bg-white  "
            >
              <h6>{t('faq_btn')}</h6>
              <img className="h-10 d-md-block d-none" src={email} alt="email" />
            </div>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName="custom-modal pt-0"
          >
            <Modal.Body
              style={{ position: "relative" }}

            >
              <h6 className="modal-title mb-3 mt-0 ">{t('faq_m_h')}</h6>
              <button
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  background: "transparent",
                  border: "none",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                type="button"
                onClick={() => setShow(false)}
              >
                ❌
              </button>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2" controlId="formFaqTitle">
                  <Form.Label className="m-0">{t('faq_m_h1')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control
                      type="text"
                      required
                      placeholder="Insert title"
                      value={faqTitle}
                      onChange={(e) => setFaqTitle(e.target.value)}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formDescription">
                  <Form.Label className="m-0">{t('faq_m_h2')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control
                      required
                      as="textarea"
                      placeholder="Insert description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-end pt-3">
                  <button
                    type="submit"
                    className="btn2 px-3 py-2  border-black"
                    style={{ width: "9rem" }}
                  >
                    {loading ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <CircularProgress
                          style={{ color: "white" }}
                          size={20}
                        />
                      </div>
                    ) : (
                      t('done_btn')
                    )}
                  </button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </main>
      </>
    </div >
  );
};

export default Help;
