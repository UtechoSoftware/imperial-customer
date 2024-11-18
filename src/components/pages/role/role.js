/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { Edit, Key, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import ProductTable from "../../DataTable/productTable";
import { ErrorHandler } from "../errorHandler";
import { eye, eyeoff } from "../../icons/icon";
import { axiosInstance } from "../../api/axiosIntance";
// import { del_Role, EditPassword, EditRoles } from "../../api/info";

const Role = () => {
  const [search, setSearch] = useState("");
  const [emailError, setEmailError] = useState("");
  const [editLoader, setEditLoader] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [email, setEmail] = useState("");
  const [delLoader, setDelLoader] = useState(false);

  const [password, setPassword] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [selectedItem2, setSelectedItem2] = useState("");
  const [Description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem3, setSelectedItem3] = useState(null);
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setCount] = useState(0);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleShow = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const handleShow2 = (item) => {
    setSelectedItem2(item);
    setShowModal2(true);
  };
  const handleShow3 = (item) => {
    setSelectedItem3(item);
    setShowModal3(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const data = [
    {
      name: "Email",
      sortable: true,
      cell: (row) => row?.email,
    },

    {
      name: "Password",
      sortable: true,
      maxWidth: "200px",
      cell: (row) => row?.unhashpassword,
    },
    {
      name: "Roles",
      maxWidth: "700px",
      sortable: true,
      selector: (row) => (
        <div className=" flex flex-wrap py-3 gap-2 m-0 fw-bolder items-center ">
          {row?.roles?.map((item, index) => (
            <div
              className=" m-0 bg-[#473E6F] px-3 py-1 w-auto rounded-md text-white"
              key={index}
            >
              {item.toUpperCase()}
            </div>
          ))}
        </div>
      ),
    },

    {
      name: "Action",
      allowoverflow: true,
      cell: (row) => {
        return (
          <div className="flex gap-1">
            <button
              onClick={() => handleShow(row)}
              style={{ backgroundColor: "#06d6a0" }}
              className="blex justify-center inter_medium text-xs text_white rounded-3 p-2 items-center"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleShow2(row)}
              style={{ backgroundColor: "#261E58" }}
              className="flex justify-center inter_medium text-xs text_white rounded-3 p-2 items-center"
            >
              <Key size={16} />
            </button>
            <button
              onClick={() => handleShow3(row)}
              style={{ backgroundColor: "#CA5863" }}
              className="flex justify-center inter_medium text-xs text_white rounded-3 p-2 items-center"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": `${global.TOKEN}`,
    };
    try {
      const res = await axiosInstance.get(`api/info/alladmins/1`, {
        headers,
      });
      if (res) {
        setAdmins(res?.data?.users);
        setCount(res?.data?.count?.totalPage);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      ErrorHandler(error);
      setLoading(false);
    }
  };
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Please Input your E-mail!");
      setEditLoader(false);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("The Input is not valid E-mail!");
      setEditLoader(false);
    }

    if (email) {
      const data = {
        email: email,
        password: "",
        roles: selectedCategories,
      };
      if (data?.roles?.length <= 0) {
        setEditLoader(false);
        message.error("please fill up all the fields first");
      } else {
        setEditLoader(true);

        // EditRoles(data, selectedItem?._id)
        //   .then((res) => {
        //     if (res) {
        //       setEditLoader(false);
        //       message.success("Role edited successfully");
        //       navigate("/role");
        //       setEmail([""]);
        //       setShowModal(false);
        //       fetchData();
        //       setPassword("");
        //     let array = [...admins]
        //     const index = array?.findIndex((item=>item?._id===selectedItem?._id))
        //     if(index!==-1){
        //       array[index]= res?.data?.user
        //       setAdmins(array)
        //     }

        //     } else {
        //       setEditLoader(false);
        //     }
        //   })
        //   .catch((err) => {
        //     ErrorHandler(err);
        //     setEditLoader(false);
        //   });
      }
    }
  };
  const handleChangePassword = (e) => {
    setEditPassword(true);
    e.preventDefault();
    const data = {
      password: password,
    };
    if (!data?.password) {
      setPasswordError("please enter password first");
      setEditPassword(false);
    } else {
      // EditPassword(data, selectedItem2?._id)
      //   .then((res) => {
      //     if (res) {
      //       setEditPassword(false);
      //       message.success("Password Changes successfully");
      //       setShowModal2(false);
      //     } else {
      //       setEditPassword(false);
      //     }
      //   })
      //   .catch((err) => {
      //     setEditPassword(false);
      //   });
    }
  };
  useEffect(() => {
    setSelectedCategories(selectedItem?.roles);
    setEmail(selectedItem?.email);
  }, [showModal, selectedItem]);
  useEffect(() => {
    setShowSearch(true);
    setLoading(true);
    fetchData();
  }, []);
  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["sortActive"].includes(prop)}
    >
      <main className="min-h-screen lg:container py-4 px-4 mx-auto">
        <div className="flex justify-between flex-wrap gap-3 items-center w-full">
          <div className="flex flex-col mb-3">
            <h2 className="plusJakara_bold text_black">Users Roles</h2>
            <h6 className="text_secondary plusJakara_regular">
              Information about your current plan and usages
            </h6>
          </div>
        </div>

        <div className="my-4 w-full">
          <ProductTable
            count={count}
            setSearch={setSearch}
            search={search}
            setCurrentPage={setLastId2}
            loading={loading}
            currentPage={lastId2}
            navigation={"/add-role"}
            buttontext="Assign Role"
            showSearch={showSearch}
            columns={data}
            data={admins}
            setLastId={setLastId}
          />
        </div>
      </main>
      {selectedItem && (
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Body>
            <div className="d-flex justify-end">
              <Button
                onClick={() => setShowModal(false)}
                className="btn btn-close bg-white"
              ></Button>
            </div>
            <h4 className="mb-0 mt-4 px-3">Edit Role</h4>
            <Form
              onSubmit={handleSubmit}
              className="w-full bg_white rounded-3  p-4"
            >
              <div>
                <Form.Group className="mb-3">
                  <Form.Label className="plusJakara_medium text-black text-lg">
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    className="plusJakara_medium"
                    isInvalid={!!emailError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {emailError}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <Form.Group className="shadow_def px-1 mb-3">
                <Form.Label className="plusJakara_semibold text_dark">
                  Select Roles
                </Form.Label>
                <div className="">
                  <div className="custom-control custom-checkbox d-flex gap-3">
                    <Form.Check
                      type="checkbox"
                      id="question"
                      label="Question"
                      value="question"
                      checked={selectedCategories?.includes("question") || ""}
                      onChange={(e) => handleCheckboxChange(e)}
                      className="custom-control-input"
                    />
                  </div>
                  <div className="custom-control custom-checkbox">
                    <Form.Check
                      type="checkbox"
                      id="exam"
                      label="Exam"
                      value="exam"
                      checked={selectedCategories?.includes("exam") || ""}
                      onChange={(e) => handleCheckboxChange(e)}
                      className="custom-control-input"
                    />
                  </div>
                  <div className="custom-control custom-checkbox">
                    <Form.Check
                      type="checkbox"
                      id="blogs"
                      label="Blog"
                      checked={selectedCategories?.includes("blog") || ""}
                      value="blog"
                      onChange={(e) => handleCheckboxChange(e)}
                      className="custom-control-input"
                    />
                  </div>
                  <div className="custom-control custom-checkbox">
                    <Form.Check
                      type="checkbox"
                      id="faq"
                      label="FAQ"
                      value="faq"
                      onChange={(e) => handleCheckboxChange(e)}
                      checked={selectedCategories?.includes("faq") || ""}
                      className="custom-control-input"
                    />
                  </div>
                  <div className="custom-control custom-checkbox">
                    <Form.Check
                      type="checkbox"
                      id="help"
                      label="Help"
                      value="help"
                      onChange={(e) => handleCheckboxChange(e)}
                      checked={selectedCategories?.includes("help") || ""}
                      className="custom-control-input"
                    />
                  </div>
                </div>
              </Form.Group>

              <div className="flex justify-content-end my-4 pe-3 w-100">
                {!editLoader ? (
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
                    disabled={editLoader}
                    className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center"
                  >
                    <CircularProgress size={18} className="text_white" />
                  </button>
                )}
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
      <Modal
        show={showModal2}
        onHide={() => {
          setShowModal2(false);
        }}
        centered
      >
        <Modal.Header className="border-0   px-3" closeButton>
          <h4 className="mb-0  px-3">Change Password</h4>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleChangePassword}
            className="w-full bg_white rounded-3  px-3"
          >
            <div>
              <Form.Group className="">
                <Form.Label className="plusJakara_medium text-black text-lg">
                  Enter New Password
                </Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    className="plusJakara_medium"
                    isInvalid={!!passwordError}
                  />
                  <img
                    src={showPassword ? eye : eyeoff}
                    style={{ top: "0px", right: "20px" }}
                    className="position-absolute m-2 cursor-pointer"
                    alt="Toggle Password Visibility"
                    onClick={togglePasswordVisibility}
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
            </div>

            <div className="flex justify-content-end my-4  w-100">
              {!editPassword ? (
                <button
                  type="submit"
                  className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
                >
                  <span className="plusJakara_semibold text_white">Submit</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={editPassword}
                  className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center"
                >
                  <CircularProgress size={18} className="text_white" />
                </button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showModal3} onHide={() => setShowModal3(false)} centered>
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
                let rowArray = [...admins];
                const index = rowArray.findIndex(
                  (value) => value?._id === selectedItem3?._id
                );
                setDelLoader(true)
                // del_Role(selectedItem3?._id)
                //     fetchData()
                //   .then((res) => {
                //     setDelLoader(false)
                //     setShowModal3(false);
                //     if (index !== -1) {
                //   rowArray?.splice(index, 1);
                //   setAdmins(rowArray);
                // }

                //     message.success("Admin deleted successfully");
                //   })
                //   .catch((er) => {
                //     setShowModal3(false);
                //     setDelLoader(false)
                //   });
              }}
            >
              {delLoader ? <Spinner size="sm" /> : "Delete"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal2(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </StyleSheetManager>
  );
};

export default Role;
