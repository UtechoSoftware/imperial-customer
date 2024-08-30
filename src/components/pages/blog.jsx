import { message, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Eye, EyeOff, Lock } from "react-feather";
import { avatarman, finabeelight } from "../icons/icon";
import { uploadAndGetUrl } from "../api/uploadFile";
import { CircularProgress } from "@mui/material";
import { updateUsers } from "../api/users";
import { changePassword } from "../api/auth";

const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [changeloader, setChangeLoader] = useState(false);
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = async (event) => {
    setFileLoading(true);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Call the upload function
      const url = await uploadAndGetUrl(selectedFile);
      console.log(url, "url");
      if (url) {
        setImageUrl(url); // Save the returned image URL
        setFileLoading(false);
      }
    }
  };
  const handleChangePassword = (e) => {
    setChangeLoader(true);
    e.preventDefault();
    const data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
    changePassword(data)
      .then((res) => {
        if (res) {
          setChangeLoader(false);

          setFormData({
            oldPassword: "",
            newPassword: "",
          });
          setShow(false);
          message.success("Password updated successfully");
        } else {
          setChangeLoader(false);
        }
      })
      .catch((er) => {
        setChangeLoader(false);
      });
  };
  const handleButtonClick = () => {
    inputRef.current.click();
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!imageUrl) {
      setLoading(false);
      message.error("Profile Picture is required");
    } else {
      const data = {
        name: name,
        position: position,
        comp_name: companyName,
        profilePicture: imageUrl,
      };
      updateUsers(data)
        .then((res) => {
          setLoading(false);

          message.success("user updated successfully");
          setName("");
          setPosition("");
          setCompanyName("");
          setImageUrl(null);
        })
        .catch((er) => {
          setLoading(false);
        });
    }
  };
  return (
    <>
      <div className="pt-5">
        <main className="min-h-screen lg:container px-5 pt-4 mx-auto">
          <div className="flex gap-2 w-full">
            <div>
              <img src={finabeelight} width="50px" alt="logo" />
            </div>
            <div className="flex flex-col mb-3 w-full">
              <h6
                className="plusJakara_bold text_black text-md "
                style={{ fontWeight: "bold" }}
              >
                Imperial Age
              </h6>
              <h6
                className="text_para plusJakara_regular"
                style={{ fontSize: "14px" }}
              >
                Customer profile
              </h6>
            </div>
          </div>
          <div className="mt-4 d-flex gap-2 flex-md-row flex-column  justify-content-between align-items-baseline">
            <h5 className="text_primary" style={{ fontWeight: "bolder" }}>
              Edit Profile
            </h5>
            <div className="change-password">
              <Button
                onClick={() => handleShow()}
                variant="outline-dark"
                style={{ borderRadius: "20px" }}
                className="fw-bold text-dark bg-white btn-sm btn-md  px-2 px-md-4 py-2"
              >
                <div className="d-flex gap-1 align-items-center ">
                  <Lock
                    className="icon-small-yellow d-md-block d-none"
                    color="grey"
                    size={16}
                  />
                  <p className="m-0">Change Password</p>
                </div>
              </Button>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row gap-3 w-100 align-items-center">
            <Form.Group
              className="rounded-lg py-3 text-center"
              controlId="exampleForm.ControlInput1"
            >
              {fileLoading ? (
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "4.5rem", height: "4.5rem" }}
                >
                  <CircularProgress style={{ color: "black" }} size={20} />
                </div>
              ) : (
                <label htmlFor="fileInput" className="cursor-pointer">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt=""
                      className="rounded-circle"
                      style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={avatarman}
                        alt=""
                        className="rounded-circle"
                        style={{ width: "4.5rem", height: "4.5rem" }}
                      />
                    </div>
                  )}
                </label>
              )}
              <Form.Control
                type="file"
                required
                id="fileInput"
                className="d-none"
                onChange={handleFileChange}
                ref={inputRef}
              />
            </Form.Group>

            <Button
              onClick={handleButtonClick}
              className="fw-bold text-white bg-dark btn-sm btn-md rounded-lg px-3 px-md-4 py-2"
            >
              Upload new
            </Button>
            <Button
              onClick={() => setImageUrl(null)}
              variant="outline-dark"
              className="fw-bold text-dark bg-white btn-sm btn-md rounded-lg px-3 px-md-4 py-2"
            >
              Delete
            </Button>
          </div>

          <Form
            onSubmit={handleEdit}
            className="d-flex flex-wrap justify-content-between"
          >
            <Form.Group className="w-100 mb-3">
              <Form.Label>Name</Form.Label>
              <div className="modal_form">
                <Form.Control
                  type="text"
                  required
                  placeholder="Insert your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Form.Group>

            <Form.Group className="w-100 mb-3">
              <Form.Label>Company Name</Form.Label>
              <div className="modal_form">
                <Form.Control
                  type="text"
                  required
                  placeholder="Insert the company’s name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </Form.Group>

            <Form.Group className="w-100 mb-3">
              <Form.Label>Position</Form.Label>
              <div className="modal_form">
                <Form.Control
                  type="text"
                  required
                  placeholder="Insert your position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            </Form.Group>

            <div className="mb-4 mt-3 ms-auto">
              <Button
                // onClick={handleEdit}
                style={{ borderRadius: "15px" }}
                type="submit"
                className="bg_primary text-white text-nowrap px-5 py-2 text-lg inter_regular d-flex justify-content-center align-items-center"
              >
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <CircularProgress size={20} />
                  </div>
                ) : (
                  "Edit Profile"
                )}
              </Button>
            </div>
          </Form>
          <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName="px-3"
          >
            <Modal.Body>
              <h6 className="modal-title mb-4">Change Password</h6>
              <Form onSubmit={handleChangePassword}>
                {/* <Form.Group className="mb-2" controlId="formName">
                  <Form.Label className="m-0">Old Password</Form.Label>

                  <div className="modal_form">
                    <Form.Control type="password" placeholder="insert your old password" />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formCompanyName">
                  <Form.Label className="m-0">New Password</Form.Label>
                  <div className="modal_form">
                    <Form.Control
                      type="password"
                      placeholder="insert new password"
                    />
                  </div>
                </Form.Group> */}

                <Form.Group className="mb-2" controlId="oldPassword">
                  <Form.Label className="m-0">Old Password</Form.Label>
                  <div className="modal_form" style={{ position: "relative" }}>
                    <Form.Control
                      required
                      type={showOldPassword ? "text" : "password"}
                      placeholder="Insert your old password"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={toggleOldPasswordVisibility}
                    >
                      {showOldPassword ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="mb-2" controlId="newPassword">
                  <Form.Label className="m-0">New Password</Form.Label>
                  <div className="modal_form" style={{ position: "relative" }}>
                    <Form.Control
                      required
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Insert new password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={toggleNewPasswordVisibility}
                    >
                      {showNewPassword ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </div>
                  </div>
                </Form.Group>
                <div className="d-flex justify-content-end pt-3">
                  <button
                    type="submit"
                    className="btn2 px-3 py-2  border-black"
                    // onClick={handleClose}
                    style={{ width: "9rem" }}
                  >
                    {changeloader ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <CircularProgress
                          style={{ color: "white" }}
                          size={20}
                        />
                      </div>
                    ) : (
                      "Done"
                    )}
                  </button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </main>
      </div>
    </>
  );
};

export default Blog;
