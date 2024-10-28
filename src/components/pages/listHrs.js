/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { message, Tabs, Tooltip } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import plane from "../assets/png/paper-plane.png";
import hand from "../assets/png/select.png";
import { fileavatar, pdf } from "../icons/icon";
import CompanyTable from "./companyTable";
import NewTable from "./newTable";
import { useSelector } from "react-redux";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { del_hr, getPotential } from "../api/hr";
import { CircularProgress } from "@mui/material";
const ListHrs = () => {
  const [tableloading, setTableLoading] = useState(false);
  const location = useLocation();
  const [showModal2, setShowModal2] = useState(false);
  const formatDate = (date) => date?.toLocaleDateString();
  const login = useSelector((state) => state.data.data.isLogin_);
  const [newHire, setNewhire] = useState(true);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [delLoader, setDelLoader] = useState(false);
  const [show2, setShow2] = useState(false);
  const [files, setFiles] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [potential, setPotential] = useState("");
  const [loading, setLoading] = useState(false);
  const nodata = false;
  const [employeeType, setEmployeeType] = useState("New Hire");
  const onChange = (key) => {
    setLoading(true);
    setTableLoading(true);
    console.log(key, "key");
    let value;
    if (key === "1") {
      value = "newhire";
      setNewhire(true);
    } else if (key === "2") {
      value = "companystaff";
      setNewhire(false);

    }
    if (global.BASEURL) {
      getPotential(value)
        .then((res) => {
          setPotential(res?.data?.totalSums);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setTableLoading(true);
      setLoading(true);
    }
  };
  useEffect(() => {
    setLoading(true);
    if (global.BASEURL) {
      getPotential("newhire")
        .then((res) => {
          setPotential(res?.data?.totalSums);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(true);

    }
  }, []);

  console.log(potential, "pp");
  const items = [
    {
      key: "1",
      label: "New Hire",
      children: (
        <CompanyTable
          tableloading={tableloading}
          setTableLoading={setTableLoading}
        />
      ),
    },
    {
      key: "2",
      label: "Company Staff",
      children: (
        <NewTable
          tableloading={tableloading}
          setTableLoading={setTableLoading}
        />
      ),
    },
  ];
  const [formData, setFormData] = useState({
    identifier: "",
    dob: null,
    iefpDate: null,
    startDate: null,
    employmentContractType: "",
    salary: "",
    workHistory: "",
    currentSalary: "",
    currentSSCRate: "",
  });

  const handleDelete = () => setShowModal2(true);
  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <>
        <main className="min-h-screen lg:container py-5 px-10 mx-auto">
          <p className="manrope_bold  fs-5 text_black">
            Social Security contributions partial or total exemption
          </p>
          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-baseline mt-5">
            <h4 className="manrope_bold max-md:text-xl  text_secondary ">
              Savings Calculator
            </h4>
            <div className="d-flex gap-2 flex-wrap flex-row align-items-center">
              {login && (
                <button
                  className="btn2 px-3   border-black"
                  onClick={() => handleShow2()}
                  style={{
                    width: "9rem",
                    paddingTop: ".7rem",
                    paddingBottom: ".7rem",
                  }}
                >
                  <div className="d-flex gap-2 align-items-center justify-content-center">
                    <img src={pdf} width="20px" alt="pdf" />
                    <p className="m-0 text-white " style={{ fontSize: "14px" }}>
                      Import Excel
                    </p>
                  </div>
                </button>
              )}
              <button
                className="btn2 px-3 py-1  border-black"
                onClick={() => navigate("/add-hr")}
                style={{ width: "9rem" }}
              >
                <div className="d-flex gap-3 align-items-center justify-content-center">
                  <p className="fs-4 m-0 text-white">+</p>
                  <p className="m-0 text-white">Add HR</p>
                </div>
              </button>
            </div>
          </div>

          <div className="pb-5">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>

          {/* <button className="border-black"   > 
              <div className="d-flex align-items-center gap-3 bg_secondary px-4  py-2 "  style={{borderRadius:"50px", border:"1px solid black "}}>
              <img width="20px" src={pdf} alt="pdf"/>
              <p className="m-0 text-white">Export</p>
              </div>
            </button> */}

          {login && (
            <div className="d-flex gap-2 justify-content-between align-items-center flex-wrap mb-4">
              <button
                onClick={handleDelete}
                type="button"
                className="btn2 px-4 py-3 text-nowrap  border-black bg-danger "
              >
                {"Delete all rows"}
              </button>
              <button
                onClick={handleShow}
                type="button"
                className="btn2 px-3 py-3 text-nowrap   border-black "
              >
                Calculate Savings
              </button>
            </div>
          )}
          <div className="cal_lower d-flex gap-4 flex-column align-items-end justify-content-center">
            {!login && (
              <>
                <button
                  onClick={handleShow}
                  type="button"
                  className="btn2 px-3 py-3  border-black "
                >
                  Calculate Savings
                </button>
              </>
            )}
            <div className="flex justify-content-center w-full">

              <div className="d-flex gap-4 flex-wrap justify-content-between">
                {login && (
                  <>
                    <div
                      className="q_card_4 flex manrope_bold max-md:text-xl text_black justify-center items-center border-solid border-1 rounded py-3 px-3 bg-white"
                      style={{ borderRadius: "60px" }}
                    >
                      <h6>Export Savings report</h6>
                      <img className="h-10" src={plane} alt="email" />
                    </div>
                    <div
                      className="q_card_3 flex cursor-pointer flx-col manrope_bold max-md:text-xl text_black justify-center items-center border-solid border-1 rounded py-3 px-3 bg-white"
                      style={{ borderRadius: "60px" }}
                    >
                      <h6>Potential annual saving</h6>
                      {loading ? (
                        <CircularProgress
                          style={{ color: "black" }}
                          size={24}
                          className="text_white"
                        />
                      ) : (
                        <h4 className="text_secondary">
                          {Number.isNaN(Number(potential)) ? 0 : (Number.isInteger(Number(potential)) ? Number(potential) : parseFloat(Number(potential).toFixed(2)))}


                          €</h4>
                      )}
                    </div>
                  </>
                )}
                <Tooltip
                  style={{ backgroundColor: "yellow" }}
                  title="We only charge in the scenario of
application approval and only a small
fraction of the savings"
                  className="cursor-pointer "
                >
                  {!login ? (
                    <div
                      onClick={handleShow}
                      className="q_card_2 cursor-pointer flex manrope_bold max-md:text-xl text_black justify-center items-center border-solid border-1 rounded py-3 px-3 bg-white"
                      style={{ borderRadius: "60px" }}
                    >
                      <h6>I want support with the application</h6>
                      <img
                        className="h-10 d-md-block d-none"
                        src={hand}
                        alt="email"
                      />
                    </div>
                  ) : (
                    <div
                      className="q_card_2 cursor-pointer flex manrope_bold max-md:text-xl text_black justify-center items-center border-solid border-1 rounded py-3 px-3 bg-white"
                      style={{ borderRadius: "60px" }}
                    >
                      <h6>I want support with the application</h6>
                      <img
                        className="h-10 d-md-block d-none"
                        src={hand}
                        alt="email"
                      />
                    </div>
                  )}
                </Tooltip>
              </div>
            </div>
            <div className="">
              <span className="text_head fw-bold"> Disclaimer:</span> The
              completion of the diagnosis and savings computation requires the
              verification of additional criteria for each employee and company.
              Therefore, the potential estimate should be reviewed by
              specialists before submitting the application.
            </div>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName="custom-modal"
          >
            <Modal.Body
              style={{ position: "relative" }}

            >
              <div className="d-flex justify-content-between ">

                <div className="modal-title mb-3 ">
                  Fill in your details to receive
                  the
                  <br />
                  calculation
                </div>
              </div>
              <button
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-3px",
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
              <Form>
                <Form.Group className="mb-2" controlId="formName">
                  <Form.Label className="m-0">Name</Form.Label>

                  <div className="modal_form">
                    <Form.Control type="text" placeholder="insert your name" />
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
                </Form.Group>
                <Form.Group className="mb-2" controlId="formCompanyName">
                  <Form.Label className="m-0">Company Name</Form.Label>
                  <div className="modal_form">
                    <Form.Control
                      type="text"
                      placeholder="insert the company's name"
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formPosition">
                  <Form.Label className="m-0">Company Position</Form.Label>
                  <div className="modal_form">
                    <Form.Control
                      type="text"
                      placeholder="insert your position in the company"
                    />
                  </div>
                </Form.Group>

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
          <Modal
            show={show2}
            onHide={handleClose2}
            centered
            dialogClassName="custom-modal"
          >
            <Modal.Body>
              <h4 className="modal-title">Import excel</h4>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {/* <UploadIcon className="upload-icon" /> */}
                <div
                  className="d-flex flex-column gap-2 cursor-pointer align-items-center p-5 bg-white "
                  style={{ border: "1px solid black", borderRadius: "20px" }}
                >
                  <img src={fileavatar} alt="upload here" />
                  <p>
                    Drag and drop the file into this pane (or click to import)
                  </p>
                </div>
              </div>
              <div
                className="mt-3"
                onClick={() => message.success("user can download file soon")}
              >
                <a href="#" className="download-link ">
                  Download excel template
                </a>
              </div>
              <div className="d-flex justify-content-end pt-3">
                <button
                  className="btn2 px-3 py-2  border-black"
                  onClick={handleClose2}
                  style={{ width: "9rem" }}
                >
                  Done
                </button>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={showModal2} onHide={() => setShowModal2(false)} centered>
            <Modal.Header
              className="border-0 mt-2 mr-2 p-0"
              closeButton
            ></Modal.Header>
            <Modal.Body className="text-center">
              <h5>Are you sure?</h5>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button
                  style={{ backgroundColor: "#B39D70" }}
                  onClick={() => setShowModal2(false)}
                >
                  Cancel
                </Button>
                <Button
                  style={{ backgroundColor: "#161920" }}
                  className="me-2"
                  onClick={() => {
                    setDelLoader(true);
                    del_hr(newHire === true ? "newhire" : "companystaff")
                      .then((res) => {
                        if (res) {
                          setDelLoader(false);
                          message.success("Data deleted successfully");
                          setShowModal2(false);
                        }
                      })
                      .catch(() => {
                        setDelLoader(false);
                        setShowModal2(false);
                      });
                  }}
                >
                  {delLoader ? <Spinner size="sm" /> : "Delete"}
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </main>
      </>
    </div>
  );
};

export default ListHrs;
