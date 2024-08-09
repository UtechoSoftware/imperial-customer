import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Col, Form, Spinner } from "react-bootstrap";
import { ArrowLeft, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { createQuestions } from "../../api/questions";
import { ErrorHandler } from "../errorHandler";
import { message } from "antd";
import { eye, eyeoff } from "../../icons/icon";
const AddRole = () => {
    // states-------
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [questions_, setQuestions_] = useState([""]);
  const [correctAns, setCorrectAns] = useState("");
  const [addloader, setaddLoader] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loader, setLoader] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //   functions--------
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!email) {
  //       setEmailError('Please Input your E-mail!');
  //       setLoader(false)
  //     } else if (!/\S+@\S+\.\S+/.test(email)) {
  //       setEmailError('The Input is not valid E-mail!');
  //       setLoader(false)

  //     }
  
  //     if (!password) {
  //       setPasswordError('Please Enter a strong Password');
  //       setLoader(false)

  //     } else if (password.length < 6) {
  //       setPasswordError('Password must be at least 6 characters');
  //       setLoader(false)

  //     }
  
  //     if (email && password && password.length >= 6) {
  //       const data = {
  //           email: email,
  //           password: password,
  //           roles: selectedCategories,
  //         };
  //         if( data?.roles?.length<=0){
  //           setLoader(false)
  //           message.error('please fill up all the fields first')
  //         }
  //         else{
  //   setLoader(true);

  //           AssignRoles(data)
  //             .then((res) => {
  //               if (res) {
  //                   setLoader(false);
  //                 message.success("Role assigned successfully");
  //                 navigate("/role");
  //                 setEmail([""])
  //                 setPassword('')
  //               }
  //               else{
  //                   setLoader(false);
  //               }
  //             })
  //             .catch((err) => {
  //               ErrorHandler(err);
  //               setLoader(false);
  //             });
  //         }
  //     }
    
  // };
 

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    }
  };

// useEffects-----------

  return (
    <main className="min-h-screen lg:container py-4 px-4 ">
      <div className="d-flex gap-4 align-items-start w-full">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              navigate("/Question");
            }}
            className="flex items-center justify-center p-2 bg_primary rounded-3"
          >
            <ArrowLeft className="text_white" />
          </button>
        </div>
        <div className="flex flex-col mb-3 w-full">
          <h4 className="plusJakara_semibold text_black">Add User Role</h4>
          <p className="text_secondary plusJakara_regular">
            Information about your current plan and usages
          </p>
        </div>
      </div>
  
          <Form  className="w-full bg_white rounded-3 shadow-md p-4">
          <div>
          <Form.Group className="mb-3">
        <Form.Label className="plusJakara_medium text-black text-lg">Email Address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={email}
          onChange={(e)=>  {
            setEmail(e.target.value);
            setEmailError('');
          }}
          className="plusJakara_medium"
          isInvalid={!!emailError}
        />
        <Form.Control.Feedback type="invalid">
          {emailError}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="plusJakara_medium text-black text-lg">Password</Form.Label>
        <div className="position-relative">
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
                setPasswordError('')
            }}
            className="plusJakara_medium"
            isInvalid={!!passwordError}
          />
          <img
            src={showPassword ? eye : eyeoff}
            style={{top:"0px", right:"20px"}}
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
      onChange={(e) => handleCheckboxChange(e)}
      className="custom-control-input"
    />
  </div>
  <div className="custom-control custom-checkbox">
    <Form.Check 
      type="checkbox"
      id="blogs"
      label="Blog"
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
      className="custom-control-input"
    />
  </div>
  </div>
</Form.Group>

            <div className="flex justify-content-end my-4 pe-3 w-100">
          {!loader ? (
            <button
              type="submit"
              className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
            >
              <span className="plusJakara_semibold text_white">Submit</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={loader}
              className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center"
            >
              <CircularProgress size={18} className="text_white" />
            </button>
          )}
        </div>
          </Form>
    </main>
  );
};

export default AddRole;
