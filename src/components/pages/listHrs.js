/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import plane from "../assets/png/paper-plane.png";
import hand from "../assets/png/select.png";
import { fileavatar, pdf } from "../icons/icon";
import { message, Tabs } from "antd";
import { Tooltip } from "antd";
const ListHrs = () => {
  const location = useLocation();
  const formatDate = (date) => date?.toLocaleDateString();
  const { login } = location.state || {};
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [files, setFiles] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const nodata = false;
  const [employeeType, setEmployeeType] = useState("New Hire");
  const employeeData = [
    {
      employeeType: "New Hire",
      identifier: "12345",
      newHiring: "01/01/2023",
      dob: "01/01/1990",
      iefp: "Yes",
      iefpDate: "02/02/2023",
      employmentContractType: "open-ended contract",
      startDate: "03/03/2023",
      salary: "$3000",
      currentSSCRate: "23,75%",
      workHistory: "No"
    },
    // Add more employee objects as needed
  ];
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: 'New Hire',
      children: <div style={{ overflowX: "auto" }}>
      <Table bordered hover>
        <thead>
          <tr>
            <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Type of Employee</th>
            <th colSpan="3" style={{ whiteSpace: "nowrap", textAlign: "center" }}>Personal Data</th>
            <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>IEFP Status</th>
            <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>IEFP Registration Date</th>
            <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Contract Type</th>
            <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Contract Start Date</th>
            <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Salary</th>
            <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Social Security Contribution Rate</th>
            <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Employee's Work History</th>
          </tr>
          <tr>
            <th></th>
            <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Unique Identifier</th>
            <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Hiring Date</th>
            <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Date of Birth</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employeeData?.map((employee, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>{employee.employeeType}</td>
              <td style={{ textAlign: "center" }}>{employee.identifier}</td>
              <td style={{ textAlign: "center" }}>{employee.newHiring}</td>
              <td style={{ textAlign: "center" }}>{employee.dob}</td>
              <td style={{ textAlign: "center" }}>{employee.iefp}</td>
              <td style={{ textAlign: "center" }}>{employee.iefpDate}</td>
              <td style={{ textAlign: "center" }}>{employee.employmentContractType}</td>
              <td style={{ textAlign: "center" }}>{employee.startDate}</td>
              <td style={{ textAlign: "center" }}>{employee.salary}</td>
              <td style={{ textAlign: "center" }}>{employee.currentSSCRate}</td>
              <td style={{ textAlign: "center" }}>{employee.workHistory}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>,
    },
    {
      key: '2',
      label: 'Company Staff',
      children: 
      <div style={{ overflowX: "auto" }}>

      <Table  bordered hover>
      <thead>
        <tr>
         
          <th colSpan="1" style={{ width: "175px" }}>
            Personal Data
          </th>
          <th colSpan="1" style={{ width: "175px" }}>
            Register as Unemployed
          </th>
          <th colSpan="2" style={{ width: "250px" }}>
            Contract Details
          </th>
          <th colSpan="1" style={{ width: "170px" }}>
            Company's Current Social Security Contribution Rate
          </th>
          <th colSpan="1" style={{ width: "150px" }}>
           Work History
          </th>
          
        </tr>
        <tr>
          <th style={{ width: "175px" }}>DOB</th>
          <th style={{ width: "175px" }}>IEFP Reg Date</th>
          <th style={{ width: "125px" }}>Predicted Start Date</th>
          <th style={{ width: "125px" }}>Monthly Salary</th>
          <th style={{ width: "125px" }}>23.75%</th>
          <th style={{ width: "150px" }}>Yes</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr key={index}>
            <td>Text 1</td>
            <td>Text 2</td>
            <td>Text 3</td>
            <td>E-mail</td>
            <td>Date of Birth</td>
            <td>yes</td>
            
            {/* <td>
              <button variant="link">+</button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </Table>
      </div>
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

  const handleChange = (event) => {
    setEmployeeType(event.target.value);
    console.log(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = () => {
    console.log(formData);
  };
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
       
            {/* <Table bordered hover responsive>
              {nodata ? (
                <div
                  className="text-center d-flex justify-center align-items-center "
                  style={{ minHeight: "170px" }}
                >
                  no data right now related to HRs....
                </div>
              ) : (
                <>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Company Name</th>
                      <th>Position</th>
                      <th>E-mail</th>
                      <th>Calculation Date</th>
                      <th>Savings Amount</th>
                      <th>Contacted Lead</th>
                      <th>Contact Date</th>
                      <th>Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, index) => (
                      <tr key={index}>
                        <td>Text 1</td>
                        <td>Text 2</td>
                        <td>Text 3</td>
                        <td>E-mail</td>
                        <td>Date</td>
                        <td>Value</td>
                        <td>Yes/No</td>
                        <td>Date</td>
                        <td>
                          <button variant="link">+</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </Table> */}
            {/* <Table
              bordered
              hover
              responsive
              style={{ overflowX: "auto", width: "1800px" }}
            >
              {nodata ? (
                <div className="text-center" style={{ minHeight: "170px" }}>
                  no data right now related to HRs....
                </div>
              ) : (
                <>
                  <thead>
                    <tr>
                      <th style={{ width: "350px" }}>Name</th>
                      <th style={{ width: "350px" }}>Company Name</th>
                      <th style={{ width: "250px" }}>Position</th>
                      <th style={{ width: "400px" }}>E-mail</th>
                      <th style={{ width: "250px" }}>Calculation Date</th>
                      <th style={{ width: "250px" }}>Savings Amount</th>
                      <th style={{ width: "250px" }}>Contacted Lead</th>
                      <th style={{ width: "250px" }}>Contact Date</th>
                      <th style={{ width: "200px" }}>Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, index) => (
                      <tr key={index}>
                        <td>Text 1</td>
                        <td>Text 2</td>
                        <td>Text 3</td>
                        <td>E-mail</td>
                        <td>Date</td>
                        <td>Value</td>
                        <td>Yes/No</td>
                        <td>Date</td>
                        <td>
                          <button variant="link">+</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </Table> */}
            <div>
            <Tabs style={{width:'fit-content'}} defaultActiveKey="1" items={items} onChange={onChange} />
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
                onClick={() =>
                  message.success("delete operation will available soon")
                }
                type="button"
                className="btn2 px-4 py-3 text-nowrap  border-black bg-danger "
              >
                Delete all rows
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
                    onClick={() => message.success("working")}
                    className="q_card_3 flex cursor-pointer flx-col manrope_bold max-md:text-xl text_black justify-center items-center border-solid border-1 rounded py-3 px-3 bg-white"
                    style={{ borderRadius: "60px" }}
                  >
                    <h6>Potential Savings</h6>
                    <h4 className="text_secondary">2500€</h4>
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
            <Modal.Body>
              <h6 className="modal-title">
                Fill in your details to receive the calculation
              </h6>
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
        </main>
      </>
    </div>
  );
};

export default ListHrs;
