/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import {
  applelogo,
  banner_main,
  eye,
  eyeoff,
  finabeelight,
  finabeeoutline,
  finabeewithline,
  google,
  left,
  linkedin,
  linkedin_,
  logoDynomo,
  questionMark,
  rightarrow,
  techLogin,
} from "../icons/icon";
import {} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from "@mui/material";
import axios from "axios";
import { ErrorHandler } from "../pages/errorHandler";
import { getUser } from "../store/reducer/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff } from "react-feather";
import { checkEmail, register } from "../api/auth";
import { setIsLogin, setIsLogin_ } from "../store/reducer/imperialAuth";

// import { apiRequest } from '../../api/auth_api'
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [already, setAlready] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleSubmit = async (formData) => {
    setIsProcessing(true);
    if (formData.confirmPassword !== formData.password) {
      setIsProcessing(false);
      message.error("Password should match with confirm password");
    } else if (already === true) {
      setIsProcessing(false);
      message.error("Email should be unique");
    } else {
      const dataToSubmit = {
        email: formData.email,
        name: formData.name,
        position: formData.position,
        comp_name: formData.companyName,
        password: formData.password,
      };
      setIsProcessing(true);
      try {
        await register(dataToSubmit)
          .then((res) => {
            navigate("/list-hr");
            dispatch(setIsLogin_(true));
            window.localStorage.setItem('imperial_token', res?.data?.token);
            message.success("Account created successfully");
            setIsProcessing(false);
          })
          .catch((err) => {
            setIsProcessing(false);
          });
        setIsProcessing(false);
      } catch (error) {
        setIsProcessing(false);
        message.error(error?.response?.data?.message);
      }
    }
  };
  const handleEmailCheck = (e) => {
    const data = {
      email: e.target.value,
    };
    checkEmail(data)
      .then((res) => {
        console.log(res, "res...");
        if (res) {
          setAlready(false);
        } else {
          setAlready(true);
          message.error("Email already exist");
        }
      })
      .catch((er) => {});
  };
  return (
    <>
      <div className="row w-100">
        <div
          className="bg_primary d-flex flex-column p-5 col-md-6 col-sm-12   "
          style={{ minHeight: "100vh" }}
        >
          <div className="d-flex flex-column gap-4 pt-3 ">
            <img src={finabeelight} width="50px" alt="logo_" />
            <div className="d-flex flex-column gap-3 mt-4">
              <h5 className="text-secondary">Welcome</h5>
              <p className="text_para">
                This is the first free digital tool to simulate the application
                of the Social Security contributions partial or total exemption,
                available to Portuguese entities
              </p>
            </div>
            <div className="d-flex flex-column gap-3 mt-4">
              <h5 className="text-secondary">Did you know that...</h5>
              <p className="text_para">
                Fixed-term contracts in certain circumstances automatically
                convert to open-ended contracts, even without a formal written
                contract, making them potentially eligible for this benefit.
              </p>
            </div>
            <div className="d-flex gap-2">
              <img src={left} width="20px" alt="left" />
              <img src={rightarrow} width="20px" alt="right" />
            </div>
            <div className="d-flex align-items-center gap-3">
              <img src={questionMark} width="20px" alt="question" />
              <p className="m-0 text-white">Help</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12  p-4 d-flex flex-column ">
          <div className="border border-white p-4">
            <div className="d-flex flex-lg-row flex-column justify-content-between ">
              <h5 className="poppins_semibold text-xl mb-0 md:mb-auto md:text-2xl lg:text-3xl text_darkprimary">
                Registeration
              </h5>
              <p className="text-sm text_para poppins_regular my-2">
                ALready have an account ?{" "}
                <span className="text_darkprimary">
                  <Link
                    className="text_darkprimary poppins_semibold text-decoration-none"
                    to="/login"
                  >
                    Login
                  </Link>
                </span>
              </p>
            </div>
            <div className="d-flex flex-column gap-0">
              <p className="poppins_semibold mt-4 text_darkprimary">
                Create an account with Linkedin
              </p>
              <img width="70px" src={linkedin_} alt="linkdin" />
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <div className="border_div"></div>
              <p>or</p>
              <div className="border_div"></div>
            </div>
            <Form
              layout="vertical"
              className="flex flex-wrap justify-between"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="name"
                required
                className="w-full mb-0 placeholder_color relative inter_medium"
              >
                <div className="">
                  <div className="flex flex-column gap-0">
                    {/* <p
                      style={{ zIndex: "999" }}
                      className="inter_medium mb-2 mt-2  text_darkprimary  text-md w-full"
                    >
                      Email
                    </p> */}

                    <TextField
                      id="name"
                      required
                      label="Name"
                      placeholder="insert your name"
                      variant="standard"
                    />
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                required
                name="companyName"
                className="w-full  placeholder_color mt-4 relative inter_medium"
                hasFeedback
              >
                <div className="">
                  <div className="flex flex-column gap-0">
                    {/* <p
                      style={{ zIndex: "999" }}
                      className="inter_medium mb-2 mt-2  text_darkprimary  text-md w-full"
                    >
                      Password
                    </p> */}

                    <TextField
                      required
                      id="companyName"
                      label="Company Name"
                      variant="standard"
                      placeholder="insert the company’s name"
                      InputLabelProps={{}}
                    />
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                required
                name="position"
                className="w-full placeholder_color mt-4 relative inter_medium"
                hasFeedback
              >
                <div className="">
                  <div className="flex flex-column gap-0">
                    <TextField
                      required
                      id="position"
                      label="Position"
                      variant="standard"
                      placeholder="Insert your position in the company"
                      fullWidth
                    />
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                name="email"
                required
                className="w-full mb-0 placeholder_color relative inter_medium"
              >
                <div className="">
                  <div className="flex flex-column gap-0">
                    {/* <p
                      style={{ zIndex: "999" }}
                      className="inter_medium mb-2 mt-2  text_darkprimary  text-md w-full"
                    >
                      Email
                    </p> */}

                    <TextField
                      onChange={(e) => handleEmailCheck(e)}
                      id="email"
                      required
                      label="Email"
                      placeholder="insert your email"
                      variant="standard"
                    />
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                required
                name="password"
                className="w-full placeholder_color mt-4 relative inter_medium"
                hasFeedback
              >
                <div className="">
                  <div className="flex flex-column gap-0">
                    <TextField
                      id="password"
                      required
                      label="Password"
                      variant="standard"
                      placeholder="Insert your password"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <Eye size={16} />
                              ) : (
                                <EyeOff size={16} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                required
                name="confirmPassword"
                className="w-full placeholder_color mt-4 relative inter_medium"
                hasFeedback
              >
                <div className="">
                  <div className="flex flex-column gap-0">
                    <TextField
                      required
                      id="confirmPassword"
                      label="Confirm Password"
                      variant="standard"
                      placeholder="confirm your password"
                      type={showPassword2 ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility2}
                              edge="end"
                            >
                              {showPassword2 ? (
                                <Eye size={16} />
                              ) : (
                                <EyeOff size={16} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </div>
                </div>
              </Form.Item>
              <p className="pe-md-5 pe-0">
                By continuing, you agree to our{" "}
                <span className=" text_head fw-bold">
                  <Link className="">Terms and Conditions</Link>
                </span>{" "}
                Terms and Conditions and{" "}
                <span className=" text_head fw-bold">
                  <Link className="">Privacy Policy</Link>
                </span>
              </p>
              <div className=" text_head fw-bold"></div>
              <div className="w-full my-3">
                <button
                  style={{ borderRadius: "15px", width: "12rem" }}
                  type="submit"
                  className="  bg_primary  text-white px-5 py-2 text-lg inter_regular flex justify-center items-center"
                >
                  {isProcessing ? (
                    <CircularProgress
                      style={{ color: "white" }}
                      size={24}
                      className="text_white"
                    />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
