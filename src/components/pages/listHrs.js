/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { message, Tabs, Tooltip } from "antd";
import Skeleton from "@mui/material/Skeleton"
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
import { del_hr, get_hr, getPotential } from "../api/hr";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../api/axiosIntance";
import moment from "moment";

const ListHrs = () => {
  const [loader, setLoader] = useState(false)
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [totalPages2, setTotalPages2] = useState(0);
  const [tableData2, setTableData2] = useState([]);
  const [type, setType] = useState('1');
  const [loading3, setLoading3] = useState(false);
  const { t, i18n } = useTranslation();
  const [tableloading, setTableLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const location = useLocation();
  const [showModal2, setShowModal2] = useState(false);
  const formatDate = (date) => date?.toLocaleDateString();
  const login = useSelector((state) => state.data.data.isLogin_);
  const user = useSelector(state => state.data.data.user)

  const [newHire, setNewhire] = useState(true);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show3, setShow3] = useState(false);

  const [showsaving, setShowSaving] = useState(false);

  const [delLoader, setDelLoader] = useState(false);
  const [show2, setShow2] = useState(false);
  const [files, setFiles] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow3 = () => setShow3(true);

  const handleShowsaving = () => setShowSaving(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [potential, setPotential] = useState("");
  const [loading, setLoading] = useState(true);
  const nodata = false;
  const [employeeType, setEmployeeType] = useState("New Hire");

  const onChange = (key) => {
    setType(key)
    setLoading(true);
    setLoading3(true)
    let value;
    // setTableLoading(true);
    if (key === "1") {
      value = "newhire";
      const storedData = JSON.parse(sessionStorage.getItem("hrData")) || [];
      if (storedData?.length > 0) {
        setLoading(false);
        setTableData(storedData);
      } else {
        setLoading(false);
        // setTableData([]);\
      }


    } else if (key === "2") {
      value = "companystaff";
      // setNewhire(false);
      const storedData = JSON.parse(sessionStorage.getItem("hrData_company")) || [];
      if (storedData?.length > 0) {
        console.log(storedData);
        setTableData2(storedData);
        setLoading(false);
      } else {
        setTableData2(storedData);
        // setTableData([]);
        setLoading(false);
      }
    }
    if (login) {
      get_hr("newhire", currentPage)
        .then((res) => {
          setLoading(false)
          setLoading3(false)
          setTableData(res?.data?.data);
          setTotalPages(res?.data?.count?.totalPage || 0);
          setTableLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
      get_hr("companystaff", currentPage2)
        .then((res) => {
          setLoading(false)
          setLoading3(false)
          setTableData2(res?.data?.data);
          setTotalPages2(res.data.count?.totalPage || 0)
          setTableLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
    }
    if (login) {
      getPotential('all')
        .then((res) => {
          setPotential(res?.data?.totalSums);
          setLoading3(false);
        })
        .catch((err) => {
          setLoading3(false);
        });
    } else {
      // setTableLoading(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (login) {
      get_hr("newhire", currentPage)
        .then((res) => {
          setLoading(false)
          setLoading3(false)
          setTotalPages(res.data.count?.totalPage || 0)
          setTableData(res?.data?.data);
          setTableLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
    getPotential('all')
      .then((res) => {
        setPotential(res?.data?.totalSums);
        setLoading(false);
        setUpdating(false)
        setTableLoading(false);

      })
      .catch((err) => {
        setLoading(false);
        setUpdating(false)
        setTableLoading(false);
      });
  }, [login, currentPage, currentPage2]);

  useEffect(() => {
    setLoading(true);

    const storedData = JSON.parse(sessionStorage.getItem("hrData")) || [];
    if (storedData?.length > 0 && storedData[0].type === "newhire") {
      setTableData(storedData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [!login])

  const handleCalculate = (event) => {
    // alert('logout scenerio')
    event.preventDefault();
    let roundedTotalSaving;
    if (type === '1') {
      const storedData = JSON.parse(sessionStorage.getItem("hrData")) || [];
      const totalSaving = storedData?.reduce((sum, item) => sum + (item?.saving || 0), 0);
      roundedTotalSaving = parseFloat(totalSaving.toFixed(3));
    } else {
      const storedData = JSON.parse(sessionStorage.getItem("hrData_company")) || [];
      const totalSaving = storedData?.reduce((sum, item) => sum + (item?.saving || 0), 0);
      roundedTotalSaving = parseFloat(totalSaving.toFixed(3));
    }
    if (roundedTotalSaving === undefined || isNaN(roundedTotalSaving)) {
      message.error("Failed to calculate savings. Please try again.");
      return;
    }
    setLoader(true)
    const formData = new FormData(event.target);

    const name = formData.get('formName');
    const email = formData.get('formEmail');
    const companyName = formData.get('formCompanyName');
    const position = formData.get('formPosition');
    const payload = {
      name,
      email,
      comp_name: companyName,
      position,
      date: moment(new Date()).format('MM-DD-YYYY'),
      saving: roundedTotalSaving
    };
    const validateForm = (payload) => {
      for (const key in payload) {
        if (!payload[key]) {
          setLoader(false)
          setShow(true)
          return "Please fill out the form first";
        }
      }
      return null;
    };
    const errorMessage = validateForm(payload);
    if (errorMessage) {
      message.error('please fill the form first')
    } else {
      if (payload) {
        axiosInstance.get('api/users/support', { params: payload })
          .then((response) => {
            console.log(response, 'rs');
            if (response.status === 200) {
              message.success(t('message_success_email'))
              setLoader(false)
              setShow(false)
            }
          }).catch((error) => {
            setLoader(false)
          })
      };
    }
  }

  const handleCalculate2 = () => {
    setLoader(true)
    const { name, comp_name, email, position } = user;
    const payload = {
      name,
      comp_name,
      saving: potential,
      email,
      date: moment(new Date()).format('MM-DD-YYYY'),
      position,
    };

    const validateForm = (payload) => {
      for (const key in payload) {
        if (!payload[key]) {
          setLoader(false)
          setShow(true)
          return "your submitted data is missing ";
        }
      }
      return null;
    };

    // Usage
    const errorMessage = validateForm(payload);
    if (errorMessage) {
      message.error('please fill the form first')
    } else {
      if (payload) {
        axiosInstance.get('api/users/support', { params: payload })
          .then((response) => {
            if (response.status === 200) {
              message.success(t('message_success_email'))
              setLoader(false)
              setShow(false)
            }
          }).catch((error) => {
            setLoader(false)

          })

      }
    }
  }
  const handleCalculateSaving = (e) => {
    e.preventDefault()
    setLoader(true)
    const { name, comp_name, email, position } = user;
    const payload = {
      name,
      comp_name,
      email,
      position,
      saving: potential,
      arrayData: type === '1' ? tableData : [],
      arrayData2: type === '2' ? tableData2 : []
    };

    const validateForm = (payload) => {
      for (const key in payload) {
        if (key !== 'saving' && !payload[key]) {
          return "Please fill out the form first";
        }
      }
      return null;
    };

    const errorMessage = validateForm(payload);
    if (errorMessage) {
    } else {
      if (payload) {
        axiosInstance.post('api/users/calcSaving', payload)
          .then((response) => {
            if (response?.data.success) {
              message.success(response?.data?.message)
              setLoader(false)
              setShow(false)
            }
          }).catch((error) => {
            setLoader(false)

          })

      };
    }

  }
  const handleCalculateSaving2 = (e) => {
    e.preventDefault();
    let roundedTotalSaving;
    if (type === '1') {
      const totalSaving = tableData?.reduce((sum, item) => sum + (item?.saving || 0), 0);
      roundedTotalSaving = parseFloat(totalSaving.toFixed(3));
    } else {
      const totalSaving = tableData2?.reduce((sum, item) => sum + (item?.saving || 0), 0);
      roundedTotalSaving = parseFloat(totalSaving.toFixed(3));
    }
    if (roundedTotalSaving === undefined || isNaN(roundedTotalSaving)) {
      message.error("Failed to calculate savings. Please try again.");
      return;
    }
    setLoader(true);
    const { name, comp_name, email, position } = user;
    // if (!formElement) {
    //   message.error("Form element not found. Ensure the button is inside a form.");
    //   return;
    // }
    const payload = {
      name,
      email,
      comp_name,
      position,
      saving: potential,
      arrayData: type === '1' ? tableData : [],
      arrayData2: type === '2' ? tableData2 : []
    };
    const validateForm = (payload) => {
      for (const key in payload) {
        if (key !== 'saving' && !payload[key]) {
          return "Please fill out the form first";
        }
      }
      return null;
    };

    const errorMessage = validateForm(payload);
    if (errorMessage) {
      message.error(errorMessage);
      setLoader(false);
    } else {
      axiosInstance.post('api/users/calcSaving', payload)
        .then((response) => {
          if (response?.data.success) {
            message.success(response?.data?.message);
            setLoader(false);
            setShow(false);
          }
        })
        .catch((error) => {
          setLoader(false);
          message.error("Failed to submit data. Please try again.");
        });
    }
  };

  const items = [
    {
      key: "1",
      label: "New Hire",
      children: (
        <CompanyTable
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          updating={updating}
          setTableData={setTableData}
          tableData={tableData}
          loading={loading}
        />
      ),
    },
    {
      key: "2",
      label: "Company Staff",
      children: (
        <NewTable
          updating={updating}
          setTableData2={setTableData2}
          tableData2={tableData2}
          loading={loading}
          setCurrentPage={setCurrentPage2}
          currentPage={currentPage2}
          totalPages={totalPages2}
          setTotalPages={setTotalPages2}
          setLoading={setLoading}
        // tableloading={tableloading}
        // setTableLoading={setTableLoading}
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
    <div style={{ backgroundColor: "#f8f8f8 " }} >
      <>
        <main style={{ backgroundColor: "#f8f8f8 " }} className="min-h-screen lg:container py-5 px-10 mx-auto">
          <p className="manrope_bold  fs-5 text_black">
            {t('calculator_h1')}
            {/* Social Security contributions partial or total exemption */}
          </p>
          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-baseline mt-5">
            <h4 className="manrope_bold max-md:text-xl  text_secondary ">
              {/* Savings Calculator */}
              {t('calculator_h2')}
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
                    <p className="m-0 text-white  text-nowrap " style={{ fontSize: "14px" }}>
                      {/* Import Excel */}
                      {t('imp_excel')}
                    </p>
                  </div>
                </button>
              )}
              <button
                className="btn2 px-3 py-1  border-black"
                onClick={() => navigate("/add-hr")}
                style={{ width: "10rem" }}
              >
                <Tooltip
                  style={{ backgroundColor: "yellow" }}
                  title={t('popup_missing_1')}
                  className="cursor-pointer "
                >
                  <div className="d-flex gap-3 align-items-center justify-content-center  text-nowrap">
                    <p className="fs-4 m-0 text-white">+</p>
                    <p className="m-0 text-white  text-nowrap">{t('add_hr')}</p>
                  </div>
                </Tooltip>
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

          <div className="cal_lower d-flex gap-4 flex-column align-items-end justify-content-center">
            {!login && (
              <>
                <div className="d-flex justify-content-between w-full items-center">
                  <div>

                    <button
                      onClick={handleDelete}
                      type="button"
                      className="btn2 px-4 py-3 text-nowrap  border-black bg-danger "
                    >
                      {t('del_all')}
                    </button>
                  </div>
                  <div>
                    <Tooltip
                      style={{ backgroundColor: "yellow" }}
                      title={t('popup_missing_2')}
                      className="cursor-pointer "
                    >

                      <button
                        onClick={handleShow3}
                        type="button"
                        className="btn2 px-3 py-3  border-black "
                      >
                        {/* Calculate Savings
                   */}
                        {t('calculate_saving')}
                      </button>
                    </Tooltip>
                  </div>

                </div>
              </>
            )}
            <div className={login ? 'flex justify-content-center w-full' : 'flex justify-content-end w-full'}>

              <div className="d-flex gap-4 flex-wrap justify-content-between">
                {login && (
                  <>
                    <div
                      className="q_card_4 flex manrope_bold max-md:text-xl text_black justify-center items-center border-solid border-1 rounded py-3 px-3 bg-white"
                      style={{ borderRadius: "60px" }}
                    >
                      <h6>
                        {/* Export Savings report */}
                        {t('card_1')}


                      </h6>
                      <img className="h-10" src={plane} alt="email" />
                    </div>
                    <div
                      className="q_card_3 flex cursor-pointer flex-col manrope_bold max-md:text-xl text_black justify-center items-center border-solid border-1 rounded py-3 px-3 bg-white"
                      style={{ borderRadius: "60px" }}
                    >
                      <h6>
                        {/* Potential annual saving */}
                        {t('card_2')}
                      </h6>
                      {loading ? (
                        <div style={{ width: "100%", padding: "0rem" }}>
                          <Skeleton variant="text" width="100%" height={20} animation="wave" />
                          {/* <Skeleton variant="text" width="90%" height={18} animation="wave" style={{ marginTop: 1 }} />
                          <Skeleton variant="text" width="80%" height={18} animation="wave" style={{ marginTop: 1 }} /> */}
                        </div>
                      ) : (
                        <h4 className="text_secondary">
                          {Number.isNaN(Number(potential))
                            ? 0
                            : Number.isInteger(Number(potential))
                              ? Number(potential)
                              : parseFloat(Number(potential).toFixed(2))}
                          €
                        </h4>
                      )}
                    </div>
                  </>
                )}
                <Tooltip
                  style={{ backgroundColor: "yellow" }}
                  title={t('popup_missing_3')}
                  className="cursor-pointer "
                >
                  {!login ? (
                    <>
                      <div className="d-flex justify-content-end w-100">

                        <div
                          onClick={handleShow}
                          className="q_card_2_ cursor-pointer d-flex  manrope_bold max-md:text-xl text_black justify-content-end items-center border-solid border-1 rounded py-3 px-3 bg-white"
                          style={{ borderRadius: "60px" }}
                        >
                          <h6>{t('card_3')}</h6>
                          <img
                            className="h-10 d-md-block d-none"
                            src={hand}
                            alt="email"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      onClick={handleCalculate2}
                      className="q_card_2 cursor-pointer flex manrope_bold max-md:text-xl text_black justify-center items-center border-solid border-1 rounded py-3 px-3 bg-white"
                      style={{ borderRadius: "60px" }}
                    >
                      <h6>{t('card_3')}</h6>
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
          </div>


          <div className="d-flex gap-2 mt-4 justify-content-between align-items-center flex-wrap mb-4">
            {
              login && (

                <button
                  onClick={handleDelete}
                  type="button"
                  className="btn2 px-4 py-3 text-nowrap  border-black bg-danger "
                >
                  {t('del_all')}
                </button>
              )
            }
            {login && (
              <>
                <Tooltip
                  style={{ backgroundColor: "yellow" }}
                  title={t('popup_missing_2')}
                  className="cursor-pointer "
                >
                  <button
                    onClick={handleCalculateSaving2}
                    type="button"
                    className="btn2 px-3 py-3 text-nowrap   border-black "
                  >
                    {/* Calculate Savings */}
                    {t('calculate_saving')}
                  </button>
                </Tooltip>
              </>
            )}
          </div>
          <div className="mb-4">
            <span className="text_head fw-bold"> {t('des')}:</span> {t('description')}
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
              <div className="d-flex justify-content-between">
                <div className="modal-title mb-3 ">
                  {t('fill_in')}
                  <br />
                  {t('calculation')}
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
              <Form onSubmit={handleCalculate}>
                <Form.Group className="mb-2" controlId="formName">
                  <Form.Label className="m-0">{t('Register_h1')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="text" name="formName" placeholder="insert your name" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formEmail">
                  <Form.Label className="m-0">{t('email')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="email" name="formEmail" placeholder="example@email.com" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formCompanyName">
                  <Form.Label className="m-0">{t('Register_h2')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="text" name="formCompanyName" placeholder="insert the company's name" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formPosition">
                  <Form.Label className="m-0">{t('Register_h3')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="text" name="formPosition" placeholder="insert your position in the company" />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-end pt-3">
                  <button
                    type="submit"
                    className="btn2 px-3 py-2 border-black"
                    // onClick={handleClose}
                    style={{ width: "9rem" }}
                  >
                    {
                      loader ? (
                        <div className="d-flex justify-content-center align-items-center">
                          <CircularProgress
                            style={{ color: "white" }}
                            size={20}
                          />
                        </div>
                      ) :
                        t('done_btn')
                    }

                  </button>
                </div>
              </Form>

            </Modal.Body>
          </Modal>
          <Modal
            show={show3}
            onHide={() => setShow3(false)}
            centered
            dialogClassName="custom-modal"
          >
            <Modal.Body
              style={{ position: "relative" }}

            >
              <div className="d-flex justify-content-between ">
                <div className="modal-title mb-3 ">
                  {t('fill_in')}
                  <br />
                  {t('calculation')}
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
                onClick={() => setShow3(false)}
              >
                ❌
              </button>
              <Form onSubmit={handleCalculateSaving2}>
                <Form.Group className="mb-2" controlId="formName">
                  <Form.Label className="m-0">{t('Register_h1')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="text" name="formName" placeholder="insert your name" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formEmail">
                  <Form.Label className="m-0">{t('email')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="email" name="formEmail" placeholder="example@email.com" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formCompanyName">
                  <Form.Label className="m-0">{t('Register_h2')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="text" name="formCompanyName" placeholder="insert the company's name" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formPosition">
                  <Form.Label className="m-0">{t('Register_h3')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="text" name="formPosition" placeholder="insert your position in the company" />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-end pt-3">
                  <button
                    type="submit"
                    className="btn2 px-3 py-2 border-black"
                    onClick={() => setShow3(false)}
                    style={{ width: "9rem" }}
                  >
                    {
                      loader ? (
                        <div className="d-flex justify-content-center align-items-center">
                          <CircularProgress
                            style={{ color: "white" }}
                            size={20}
                          />
                        </div>
                      ) :
                        t('done_btn')
                    }

                  </button>
                </div>
              </Form>

            </Modal.Body>
          </Modal>
          <Modal
            show={showsaving}
            onHide={() => setShowSaving(false)}
            centered
            dialogClassName="custom-modal"
          >
            <Modal.Body
              style={{ position: "relative" }}

            >
              <div className="d-flex justify-content-between ">
                <div className="modal-title mb-3 ">
                  {t('fill_in')}
                  <br />
                  {t('calculation')}
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
                onClick={() => setShowSaving(false)}
              >
                ❌
              </button>
              <Form onSubmit={handleCalculateSaving}>
                <Form.Group className="mb-2" controlId="formName">
                  <Form.Label className="m-0">{t('Register_h1')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="text" name="formName" placeholder="insert your name" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formEmail">
                  <Form.Label className="m-0">{t('email')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="email" name="formEmail" placeholder="example@email.com" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formCompanyName">
                  <Form.Label className="m-0">{t('Register_h2')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="text" name="formCompanyName" placeholder="insert the company's name" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formPosition">
                  <Form.Label className="m-0">{t('Register_h3')}</Form.Label>
                  <div className="modal_form">
                    <Form.Control type="text" name="formPosition" placeholder="insert your position in the company" />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-end pt-3">
                  <button
                    type="submit"
                    className="btn2 px-3 py-2 border-black"
                    onClick={() => setShowSaving(false)}
                    style={{ width: "9rem" }}
                  >
                    {
                      loader ? (
                        <div className="d-flex justify-content-center align-items-center">
                          <CircularProgress
                            style={{ color: "white" }}
                            size={20}
                          />
                        </div>
                      ) :
                        t('done_btn')
                    }

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
              <h4 className="modal-title">{t('imp_excel')}</h4>
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
                <a href="#" className="download-link " >
                  {t('download')}
                </a>
              </div>
              <div className="d-flex justify-content-end pt-3">
                <button
                  className="btn2 px-3 py-2  border-black"
                  onClick={handleClose2}
                  style={{ width: "9rem" }}
                >
                  {t('done_btn')}
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
              <h5>{t('are_you_sure')}</h5>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button
                  style={{ backgroundColor: "#B39D70" }}
                  onClick={() => setShowModal2(false)}
                >
                  {t('cancel_btn')}
                </Button>
                <Button
                  style={{ backgroundColor: "#161920" }}
                  className="me-2"
                  onClick={() => {
                    if (login) {
                      setDelLoader(true);
                      del_hr(newHire === true ? "newhire" : "companystaff")
                        .then((res) => {
                          if (res) {
                            setUpdating(true);
                            setDelLoader(false);
                            message.success("Data deleted successfully");
                            // fetchData()

                            setShowModal2(false);
                          }
                        })
                        .catch(() => {
                          setDelLoader(false);
                          setUpdating(false);

                          setShowModal2(false);
                        });
                    } else {
                      newHire === true ? sessionStorage.removeItem("hrData") : sessionStorage.removeItem("hrData_company")
                      message.success("Data deleted successfully");
                      setShowModal2(false);

                      // setTableData([]);



                    }
                  }}
                >
                  {delLoader ? <Spinner size="sm" /> : t('del_btn')}
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