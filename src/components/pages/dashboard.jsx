/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Tooltip } from "antd";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import avatar from "../assets//png/avatar1.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [employeeType, setEmployeeType] = useState("New Hire");
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
    navigate("/list-hr");
  };

  return (
    <div>
      <>
        <main className="min-h-screen lg:container py-5 px-10 mx-auto">
          <div className="flex justify-between max-md:flex-col max-md:gap-3 mb-4 md:items-center w-full">
            <div className="flex">
              <img className="avatar_img" src={avatar} alt="avatar" />
              <div className="flex flex-col">
                <h4 className="manrope_bold max-md:text-xl text_black">
                  John Doe
                </h4>
                <p>Hr Director - Tesla Corp.</p>
              </div>
            </div>
          </div>
          <p className="manrope_bold  fs-5 text_black">
            Social Security contributions partial or total exemption
          </p>
          <h4 className="manrope_bold max-md:text-xl text_secondary mt-3">
            New Entry
          </h4>

          {employeeType === "New Hire" ? (
            <div>
              <div className="my-3">
                <label className="form-label manrope_semibold">
                  Type of Employee
                </label>
                <Tooltip title="prompt text">
                  <div className="cursor-pointe col-lg-4 col-md-6  col-12">
                    <select
                      className="form-select py-3 custom_radius text-center"
                      value={employeeType}
                      onChange={handleChange}
                    >
                      <option value="New Hire">New Hire</option>
                      <option value="Company's Staff">Company's Staff</option>
                    </select>
                  </div>
                </Tooltip>
              </div>

              <div className="my-4">
                <label className="form-label manrope_semibold">
                  Personal Data
                </label>
                <div className="flex flex-wrap">
                  <Tooltip title="prompt text">
                    <div className="cursor-pointer">
                      <input
                        type="text"
                        className="form-control input_1 custom_radius text-center mr-2 mb-2"
                        name="identifier"
                        placeholder="Identifier"
                        value={formData.identifier}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="prompt text">
                    <div className="cursor-pointer">
                      <DatePicker
                        selected={formData.dob}
                        onChange={(date) => handleDateChange(date, "dob")}
                        className="form-control input_1 custom_radius text-center"
                        placeholderText="Date of Birth"
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="my-4 cursor-pointer">
                <label className="form-label manrope_semibold">
                  Registration as unemployed
                </label>
                <div className="d-flex  flex-wrap cursor-pointer">
                  <Tooltip title="prompt text">
                    <select
                      className="form-select custom_radius cursor-pointer text-center input_3 mr-2 mb-2"
                      name="iefp"
                      value={formData.iefp}
                      onChange={handleInputChange}
                    >
                      <option>
                        Registered on the Portuguese Employment Institut (IEFP)
                      </option>
                      <option>123456</option>
                    </select>
                  </Tooltip>
                  <Tooltip title="prompt text">
                    <div className="cursor-pointer">
                      <Tooltip title="prompt text">
                        <div className="cursor-pointer">
                          <DatePicker
                            selected={formData.iefpDate}
                            onChange={(date) =>
                              handleDateChange(date, "iefpDate")
                            }
                            className="form-control input_1 cursor-pointer custom_radius text-center"
                            placeholderText="IEFP registration date"
                          />
                        </div>
                      </Tooltip>
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="my-4">
                <label className="form-label manrope_semibold">
                  Registration as unemployed
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  <Tooltip title="prompt text">
                    <div className="cursor-pointer">
                      <DatePicker
                        selected={formData.startDate}
                        onChange={(date) => handleDateChange(date, "startDate")}
                        className="form-control input_1 custom_radius text-center mr-2 mb-2"
                        placeholderText="Predicted start date"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="prompt text">
                    <div className="cursor-pointer">
                      <select
                        className="form-select custom_radius text-center py-3  input_3 mr-2 mb-2"
                        name="employmentContractType"
                        // style={{padding:"1.4rem 1rem"}}
                        value={formData.employmentContractType}
                        onChange={handleInputChange}
                      >
                        <option>Type of employment contract</option>
                        <option>Regular</option>
                      </select>
                    </div>
                  </Tooltip>
                  <Tooltip title="prompt text">
                    <div className="cursor-pointer">
                      <input
                        type="text"
                        className="form-control input_1 custom_radius text-center mr-2"
                        name="salary"
                        placeholder="Monthly base salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Tooltip>
                </div>
                <div className="my-4  col-lg-4 col-md-6 col-12">
                  <label className="form-label manrope_semibold">
                    Employees’s work history
                  </label>
                  <Tooltip title="prompt text">
                    <div className="cursor-pointer  col-12">
                      <input
                        type="text"
                        className="form-control w-100 custom_radius text-center mr-2"
                        name="workHistory"
                        placeholder="Is it his/hers first open-ended contract?"
                        value={formData.workHistory}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="my-3  ">
                <label className="form-label manrope_semibold">
                  Type of Employee
                </label>
                <Tooltip title="prompt text">
                  <div className="cursor-pointer col-lg-4 col-md-6  col-12 " >
                    <select
                      className="form-select py-3 custom_radius  text-center"
                      value={employeeType}
                      onChange={handleChange}
                    >
                      <option value="New Hire">New Hire</option>
                      <option value="Company's Staff">Company's Staff</option>
                    </select>
                  </div>
                </Tooltip>
                </div>

              <div className="my-4">
                <label className="form-label manrope_semibold">
                  Personal Data
                </label>
                <div className="flex flex-wrap">
                  <Tooltip title="prompt text">
                    <div className="cursor-pointer">
                      <input
                        type="text"
                        className="form-control input_1 custom_radius text-center mr-2 mb-2"
                        name="identifier"
                        placeholder="Identifier"
                        value={formData.identifier}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="prompt text">
                    <div className="cursor-pointer">
                      <DatePicker
                        selected={formData.dob}
                        onChange={(date) => handleDateChange(date, "dob")}
                        className="form-control input_1 custom_radius text-center"
                        placeholderText="Date of Birth"
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="my-4">
                <label className="form-label manrope_semibold">
                  Registration as unemployed
                </label>
                <div className="flex flex-wrap">
                  <select
                    className="form-select custom_radius text-center input_3 mr-2 mb-2"
                    name="iefp"
                    value={formData.iefp}
                    onChange={handleInputChange}
                  >
                    <option>
                      Registered on the Portuguese Employment Institut (IEFP)
                    </option>
                    <option>234556</option>
                  </select>
                  <DatePicker
                    selected={formData.iefpDate}
                    onChange={(date) => handleDateChange(date, "iefpDate")}
                    className="form-control input_1 custom_radius text-center"
                    placeholderText="IEFP registration date"
                  />
                </div>
              </div>
              <div className="my-4">
                <label className="form-label manrope_semibold">
                  Employment contract details
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  <div>
                    <DatePicker
                      selected={formData.startDate}
                      onChange={(date) => handleDateChange(date, "startDate")}
                      className="form-control input_1 custom_radius text-center mr-2 mb-2"
                      placeholderText="Predicted start date"
                    />
                  </div>
                  <div>
                    <select
                      className="form-select custom_radius text-center input_3 mr-2 mb-2"
                      name="employmentContractType"
                      value={formData.employmentContractType}
                      onChange={handleInputChange}
                    >
                      <option>Type of employment contract</option>
                      <option>intern</option>
                    </select>
                  </div>
                  <div>
                    <select
                      className="form-select custom_radius text-center input_3 mr-2 mb-2"
                      name="employmentContractConversion"
                      value={formData.employmentContractConversion}
                      onChange={handleInputChange}
                    >
                      <option>
                        Conversion of previous fixed-term employment contract
                      </option>
                      <option>HHHHHHHHHH</option>
                    </select>
                  </div>
                  <div>
                    <DatePicker
                      selected={formData.openContractStartDate}
                      onChange={(date) =>
                        handleDateChange(date, "openContractStartDate")
                      }
                      className="form-select custom_radius text-center date_picker mr-2 mb-2"
                      placeholderText=" Open-ended employment contract start date"
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control input_1 custom_radius text-center mr-2 mb-2"
                    name="currentSalary"
                    placeholder="Current monthly base salary"
                    value={formData.currentSalary}
                    onChange={handleInputChange}
                  />
                  <select
                    className="form-select custom_radius text-center input_3 mr-2 mb-2"
                    name="currentSSCRate"
                    value={formData.currentSSCRate}
                    onChange={handleInputChange}
                  >
                    <option>Current Social Security contributions rate</option>
                    <option>45</option>
                  </select>
                </div>
                <div className="my-4 col-lg-4 col-md-6 col-12 ">
                  <label className="form-label manrope_semibold">
                    Employees’s work history
                  </label>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control w-100  custom_radius text-center mr-2"
                      name="workHistory"
                      placeholder="Is it his/hers first open-ended contract?"
                      value={formData.workHistory}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="cal_lower d-flex justify-content-end">
            {/* <div className="q_card_2 flex manrope_bold max-md:text-xl text_black justify-center items-center border-solid border-1 rounded py-3 px-3 bg-white">
              <h6>Send mandatory questionnaire to employees</h6>
              <img className="h-10" src={plane} alt="email" />
            </div> */}
            <div className="my-4">
              <button className="btn_" onClick={handleSubmit}>
                Done
              </button>
            </div>
          </div>
        </main>
      </>
    </div>
  );
};

export default Dashboard;
