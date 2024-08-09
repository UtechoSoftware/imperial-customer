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
import { CircularProgress, IconButton, InputAdornment, makeStyles, TextField } from "@mui/material";
import axios from "axios";
import { ErrorHandler } from "../pages/errorHandler";
import { getUser } from "../store/reducer/userAuthSlice";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "react-feather";

// import { apiRequest } from '../../api/auth_api'
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleSubmit = async (data) => {
    setIsProcessing(true);
    navigate('/list-hr', { state: { login: true } });
    // try {
    //   const res = await axios.post(
    //     `${global.BASEURL}api/auth/admin`,
    //     {
    //       email: data?.email,
    //       password: data?.password,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   if (res?.data) {
    //     navigate("/add-hr");
    //     console.log(res?.data,)
    //     localStorage.setItem("login_admin_token", res?.data?.token);
    //     localStorage.setItem(
    //       "login_admin_data",
    //       JSON.stringify(res?.data?.user)
    //     );
    //    dispatch(getUser(res?.data?.user))
    //     localStorage.setItem("isLogin_qMed_admin", true);
    //   }
    // } catch (error) {
    //   setIsProcessing(false);
    // //   ErrorHandler(error)
    // message.error(error?.response?.data?.message)
    // } finally {
    //   setIsProcessing(false);
    // }
  };

  return (
    <>
      <div className="row w-100 ">
        <div
          className="bg_primary d-flex flex-column  p-5 col-md-6 col-sm-12   "
          style={{ minHeight: "100vh" , height:"900px" }}
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
                      id="standard-basic"
                      label="Name"
                      placeholder="insert your name"

                      variant="standard"
                    />
                  </div>
                </div>
            </Form.Item>
              <Form.Item
                name="password"
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
                      id="standard-basic"
                      label="Company Name"
                      variant="standard"
                      placeholder="insert the company’s name"
                      InputLabelProps={{
        
      }}
                    />
                  </div>
                </div>
              </Form.Item>
              <Form.Item
        name="position"
        className="w-full placeholder_color mt-4 relative inter_medium"
        hasFeedback
      >
        <div className="">
          <div className="flex flex-column gap-0">
            <TextField
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
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
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
        name="Confirm password"
        className="w-full placeholder_color mt-4 relative inter_medium"
        hasFeedback
      >
        <div className="">
          <div className="flex flex-column gap-0">
            <TextField
              id="Confirm password"
              label="Confirm Password"
              variant="standard"
              placeholder="confirm your password"
              type={showPassword2 ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility2}
                      edge="end"
                    >
                      {showPassword2 ? <Eye size={16} /> : <EyeOff size={16} />}
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
              By continuing, you agree to our <span className=" text_head fw-bold">
              <Link className="">Terms and Conditions</Link>
              </span> Terms and Conditions and  {" "}
              <span className=" text_head fw-bold">
              <Link className="">Privacy Policy</Link>
              </span> 
              </p>
              <div className=" text_head fw-bold">
              </div>
              <div className="w-full my-3">
                {!isProcessing ? (
                  <button
                  style={{borderRadius:"15px" , width:"12rem"}}
                    type="submit"
                    className="  bg_primary  text-white px-5 py-2 text-lg inter_regular flex justify-center items-center"
                  >
                    Register
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full rounded-3 bg_darkprimary text_white p-2 flex justify-center items-center"
                    disabled
                  >
                    <CircularProgress
                      style={{ color: "white" }}
                      size={24}
                      className="text_white"
                    />
                  </button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
