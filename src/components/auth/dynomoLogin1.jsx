/* eslint-disable no-unused-vars */
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";
import { Form, message } from "antd";
import React, { useState } from "react";
import { } from "react-bootstrap";
import { Eye, EyeOff } from "react-feather";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import {
  finabeelight,
  left,
  linkedin_,
  questionMark,
  rightarrow
} from "../icons/icon";

// import { apiRequest } from '../../api/auth_api'
const DynomoLogin1 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (formData) => {
    setIsProcessing(true);
    const dataToSubmit = {
      email: formData.email,
      password: formData.password,
    };
    setIsProcessing(true);
    try {
      await login(dataToSubmit)
        .then((res) => {
          if(res){
            navigate("/list-hr", { state: { login: true } });
            message.success("login successfully");
            setIsProcessing(false);
          }
        })
        .catch((err) => {
          setIsProcessing(false);
        });
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      message.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="row w-100 ">
        <div
          className="bg_primary d-flex flex-column  p-5 col-md-6 col-sm-12 h-100  "
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
            <div className="d-flex flex-lg-row flex-column justify-content-between">
              <h5 className="poppins_semibold text-xl mb-0 md:mb-auto md:text-2xl lg:text-3xl text_darkprimary">
                Login
              </h5>
              <p className="text-sm text_para poppins_regular my-2">
                Do not have an account yet?{" "}
                <span className="text_darkprimary">
                  <Link
                    className="text_darkprimary poppins_semibold text-decoration-none"
                    to="/register"
                  >
                    Register
                  </Link>
                </span>
              </p>
            </div>
            <div className="d-flex flex-column gap-0">
              <p className="poppins_semibold m-0 text_darkprimary">
                Login with Linkedin
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
                name="password"
                className="w-full placeholder_color mt-4 relative inter_medium"
                hasFeedback
              >
                <div className="">
                  <div className="flex flex-column gap-0">
                    <TextField
                      id="password"
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
              <div className="ms-auto text_head fw-bold">
                <Link className="">Recover password</Link>
              </div>
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
                    "Login"
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
export default DynomoLogin1;
