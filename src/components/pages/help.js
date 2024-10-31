import React, { useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import { post_help, updateHelp } from "../api/help";

import { CircularProgress } from "@mui/material";
import { message } from "antd";
import avatar from "../assets/png/avatar1.png";
import email from "../assets/png/email.png";
import { useTranslation } from "react-i18next";
const Help = () => {
  const { t, i18n } = useTranslation();

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

  const [Id, setId] = useState("");
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

  return (
    <div>
      <>
        <main className="min-h-screen lg:container py-5 px-10 mx-auto">
          <div className="flex justify-between max-md:flex-col max-md:gap-3 mb-3 md:items-center w-full">
            <div className="flex flex-md-row flex-column">
              <img
                className="avatar_img"
                width="60px"
                src={avatar}
                alt="avatar"
              />
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
            {t('faq_h1')}
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
    </div>
  );
};

export default Help;
