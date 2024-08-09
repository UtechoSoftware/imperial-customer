/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { message, Tooltip } from "antd";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import avatar from "../assets//png/avatar1.png";
import { format } from "date-fns";
const Dashboard = () => {
  const [error, setError] = useState("");
  const [identifiers, setIdentifiers] = useState([]);
  const navigate = useNavigate();
  const [employeeType, setEmployeeType] = useState("");
  const [formData, setFormData] = useState({
    identifier: "",
    dob: null,
    newHiring: "",
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
    if (!formData?.salary.includes("€")) {
      message.error("Monthly based sallery should be in euros(€)");
    } else {
      navigate("/list-hr");
    }
  };
  const handleIdentifierChange = (e) => {
    const value = e.target.value;
    if (identifiers.includes(value)) {
      setError(
        "This identifier has already been used. Please enter a unique identifier."
      );
    } else {
      setError("");
      setFormData({ ...formData, identifier: value });
    }
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
                <label className="form-label w-fit manrope_semibold cursor-pointer">
                  Type of Employee
                </label>

                <div className=" col-lg-4 col-md-6  col-12">
                  <Tooltip title="prompt text">
                    <div className="">
                      <select
                        className="form-select cursor-pointer py-3 custom_radius text-center"
                        value={employeeType} // Bind the value to state
                        onChange={handleChange}
                      >
                        <option value="">Select</option>{" "}
                        {/* Default placeholder option */}
                        <option value="New Hire">New Hire</option>
                        <option value="Company's Staff">Company's Staff</option>
                      </select>
                    </div>
                  </Tooltip>
                </div>
              </div>

              <div className="my-4 d-flex gap-md-3 gap-sm-2 gap-1 align-items-baseline flex-wrap">
                <label className="form-label cursor-pointer manrope_semibold">
                  Personal Data
                </label>
                <Tooltip title="prompt text">
                  <div className="">
                    <DatePicker
                      selected={formData.dob}
                      onChange={(date) => handleDateChange(date, "dob")}
                      className="form-control cursor-pointer input_1 custom_radius text-center"
                      placeholderText="Date of Birth"
                      dateFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      showYearDropdown
                      scrollableYearDropdown
                    />
                  </div>
                </Tooltip>
              </div>
              {/* </div> */}
              <div className="my-4 ">
                <label className="form-label cursor-pointer manrope_semibold">
                  Registration as unemployed
                </label>

                <div className="d-flex gap-2 flex-wrap cursor-pointer">
                  <Tooltip title="prompt text">
                    <div className="">
                      <select
                        className="form-select cursor-pointer custom_radius  text-center input_3 mr-2 mb-2"
                        name="iefp"
                        value={formData.iefp}
                        onChange={handleInputChange}
                      >
                        <option>
                          Registered on the Portuguese Employment Institut
                          (IEFP)
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </Tooltip>
                  {formData?.iefp === "yes" && (
                    <Tooltip title="prompt text">
                      <div className="">
                        <DatePicker
                          selected={formData.iefpDate}
                          onChange={(date) =>
                            handleDateChange(date, "iefpDate")
                          }
                          className="form-control  input_1 cursor-pointer custom_radius text-center "
                          placeholderText="IEFP registration date"
                          dateFormat="dd/MM/yyyy"
                          maxDate={new Date()}
                          showYearDropdown
                          scrollableYearDropdown
                        />
                      </div>
                    </Tooltip>
                  )}
                </div>
                {/* {formData?.iefp === "yes" && ( */}
                <div className="my-2">
                  <label className="form-label cursor-pointer manrope_semibold">
                    Employment Contract Detail
                  </label>

                  <div className="d-flex gap-2 flex-wrap">
                    <Tooltip title="prompt text">
                      <div className="">
                        <select
                          className="form-select custom_radius cursor-pointer text-center py-3  input_3 mr-2 mb-2"
                          name="employmentContractType"
                          // style={{padding:"1.4rem 1rem"}}
                          value={formData.employmentContractType}
                          onChange={handleInputChange}
                        >
                          <option value="">Type of employment contract</option>
                          <option value="Non-permanent contract">
                            Non-permanent contract
                          </option>
                          <option value="open-ended contract">
                            open-ended contract
                          </option>
                        </select>
                      </div>
                    </Tooltip>
                    {formData.employmentContractType ===
                      "open-ended contract" && (
                      <>
                        <Tooltip title="prompt text">
                          <div className="">
                            <DatePicker
                              selected={formData.startDate}
                              onChange={(date) =>
                                handleDateChange(date, "startDate")
                              }
                              className="form-control input_1 cursor-pointer custom_radius text-center mr-2 mb-2"
                              placeholderText="Predicted start date"
                              dateFormat="dd/MM/yyyy"
                              minDate={new Date()}
                              showYearDropdown
                              scrollableYearDropdown
                            />
                          </div>
                        </Tooltip>
                        <Tooltip title="prompt text">
                          <div className="">
                            <input
                              type="text"
                              className="form-control cursor-pointer input_1 custom_radius text-center mr-2"
                              name="salary"
                              placeholder="Monthly base salary"
                              value={formData.salary}
                              onChange={handleInputChange}
                            />
                          </div>
                        </Tooltip>

                        <div className="  my-2 col-md-6 col-12">
                          <label className="form-label cursor-pointer w-fit manrope_semibold">
                            Company's current Social Security contribution rate
                          </label>
                          <Tooltip title="prompt text">
                            <div className="">
                              <select
                                className="form-select custom_radius cursor-pointer text-center w-100 mr-2 mb-2"
                                name="currentSSCRate"
                                value={formData.currentSSCRate}
                                onChange={handleInputChange}
                              >
                                <option value="">
                                  Current Social Security contributions rate
                                </option>
                                <option value="23,75%">23,75%</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </Tooltip>
                        </div>
                        {formData.currentSSCRate === "23,75%" && (
                          <div className="my-2 col-lg-4 col-md-6 col-12 ms-md-2">
                            <label className="form-label cursor-pointer w-fit manrope_semibold">
                              Employees’s work history
                            </label>

                            <div className="col-12">
                              <Tooltip title="prompt text">
                                <div className="">
                                  <select
                                    className="form-select cursor-pointer custom_radius text-center w-100 mr-2 mb-2"
                                    name="workHistory"
                                    value={formData.workHistory}
                                    onChange={handleInputChange}
                                  >
                                    <option value="">
                                      Is this the employee's first open-ended
                                      contract?
                                    </option>
                                    <option value="yes">yes</option>
                                    <option value="no">No</option>
                                  </select>
                                </div>
                              </Tooltip>
                              {/* <input
                              type="text"
                              className="form-control w-100 custom_radius text-center mr-2"
                              name="workHistory"
                              placeholder="Is it his/hers first open-ended contract?"
                              value={formData.workHistory}
                              onChange={handleInputChange}
                            /> */}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
          ) : employeeType === "Company's Staff" ? (
            <div>
              <div className="my-3  ">
                <label className="form-label  manrope_semibold">
                  Type of Employee
                </label>

                <div className=" col-lg-4 col-md-6  col-12 ">
                  <Tooltip title="prompt text">
                    <div className="">
                      <select
                        className="form-select cursor-pointer py-3 custom_radius  text-center"
                        value={employeeType}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>

                        <option value="New Hire">New Hire</option>
                        <option value="Company's Staff">Company's Staff</option>
                      </select>
                    </div>
                  </Tooltip>
                </div>
              </div>

              <div className="my-4">
                <label className="form-label  manrope_semibold">
                  Personal Data
                </label>

                <div className="flex  flex-wrap">
                  <Tooltip title="prompt text">
                    <div className="">
                      <input
                        type="text"
                        id="identifier"
                        name="identifier"
                        placeholder="Unique identifier"
                        value={formData.identifier}
                        onChange={handleIdentifierChange}
                        className="form-control cursor-pointer input_1 custom_radius text-center mr-2 mb-2"

                        // className="form-control"
                      />
                    </div>
                  </Tooltip>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <Tooltip title="prompt text">
                    <div className="">
                      <DatePicker
                        selected={formData.newHiring}
                        onChange={(date) => handleDateChange(date, "newHiring")}
                        className="form-control input_1 cursor-pointer custom_radius me-md-2 text-center"
                        placeholderText="Hiring date"
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="prompt text">
                    <div>
                      <DatePicker
                        selected={formData.dob}
                        onChange={(date) => handleDateChange(date, "dob")}
                        className="form-control cursor-pointer input_1 custom_radius text-center"
                        placeholderText="Date of Birth"
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="my-4 ">
                <label className="form-label cursor-pointer manrope_semibold">
                  Registration as unemployed
                </label>

                <div className="d-flex gap-2 flex-wrap cursor-pointer">
                  <Tooltip title="prompt text">
                    <select
                      className="form-select cursor-pointer custom_radius  text-center input_3 mr-2 mb-2"
                      name="iefp"
                      value={formData.iefp}
                      onChange={handleInputChange}
                    >
                      <option>
                        Registered on the Portuguese Employment Institut (IEFP)
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </Tooltip>
                  {formData?.iefp === "yes" && (
                    <Tooltip title="prompt text">
                      <div className="">
                        <DatePicker
                          selected={formData.iefpDate}
                          onChange={(date) =>
                            handleDateChange(date, "iefpDate")
                          }
                          className="form-control input_1 cursor-pointer custom_radius text-center "
                          placeholderText="IEFP registration date"
                          dateFormat="dd/MM/yyyy"
                          maxDate={new Date()}
                          showYearDropdown
                          scrollableYearDropdown
                        />
                      </div>
                    </Tooltip>
                  )}
                </div>
                {/* {formData?.iefp === "yes" && ( */}

                {/* )} */}
              </div>
              <div className="my-2 ">
                <label className="form-label cursor-pointer manrope_semibold">
                  Employment Contract Detail
                </label>

                <div className="d-flex gap-2 col-12 flex-wrap">
                  <Tooltip title="prompt text">
                    <div className="">
                      <select
                        className="form-select custom_radius cursor-pointer text-center py-3  input_3 mr-2 mb-2"
                        name="employmentContractType"
                        // style={{padding:"1.4rem 1rem"}}
                        value={formData.employmentContractType}
                        onChange={handleInputChange}
                      >
                        <option value="">
                          Type of the last employment contract signed
                        </option>
                        <option value="Non-permanent contract">
                          Non-permanent contract
                        </option>
                        <option value="open-ended contract">
                          open-ended contract
                        </option>
                      </select>
                    </div>
                  </Tooltip>
                  {formData.employmentContractType ===
                    "open-ended contract" && (
                    <>
                      <Tooltip title="prompt text">
                        <div>
                          <DatePicker
                            selected={formData.startDate}
                            onChange={(date) =>
                              handleDateChange(date, "startDate")
                            }
                            className="form-control input_1 cursor-pointer custom_radius  text-center mr-2 mb-2"
                            placeholderText="contract start date"
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()}
                            showYearDropdown
                            scrollableYearDropdown
                          />
                        </div>
                      </Tooltip>
                      <Tooltip title="prompt text">
                        <div className="">
                          <input
                            type="text"
                            className="form-control cursor-pointer input_1 custom_radius text-center mr-2"
                            name="salary"
                            placeholder="Monthly base salary"
                            value={formData.salary}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Tooltip>
                      <div className="  my-2 col-md-6 col-12">
                        <label className="form-label cursor-pointer w-fit manrope_semibold">
                          Company's current Social Security contribution rate
                        </label>
                        <Tooltip title="prompt text">
                          <div className="">
                            <select
                              className="form-select cursor-pointer custom_radius text-center w-100 mr-2 mb-2"
                              name="currentSSCRate"
                              value={formData.currentSSCRate}
                              onChange={handleInputChange}
                            >
                              <option value="">
                                Current Social Security contributions rate
                              </option>
                              <option value="23,75%">23,75%</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </Tooltip>
                      </div>
                      {formData.currentSSCRate === "23,75%" && (
                        <div className="my-2 col-lg-4 col-md-6 col-12 ms-md-2">
                          <label className="form-label cursor-pointer w-fit manrope_semibold">
                            Employees’s work history
                          </label>

                          <div className="col-12">
                            <Tooltip title="prompt text">
                              <div className="">
                                <select
                                  className="form-select cursor-pointer custom_radius text-center w-100 mr-2 mb-2"
                                  name="workHistory"
                                  value={formData.workHistory}
                                  onChange={handleInputChange}
                                >
                                  <option value="">
                                    Is this the employee's first open-ended
                                    contract?
                                  </option>
                                  <option value="yes">yes</option>
                                  <option value="no">No</option>
                                </select>
                              </div>
                            </Tooltip>
                            {/* <input
                              type="text"
                              className="form-control w-100 custom_radius text-center mr-2"
                              name="workHistory"
                              placeholder="Is it his/hers first open-ended contract?"
                              value={formData.workHistory}
                              onChange={handleInputChange}
                            /> */}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="my-3">
              <label className="form-label w-fit manrope_semibold cursor-pointer">
                Type of Employee
              </label>

              <div className=" col-lg-4 col-md-6  col-12">
                <Tooltip title="prompt text">
                  <div className="">
                    <select
                      className="form-select cursor-pointer py-3 custom_radius text-center"
                      value={employeeType} // Bind the value to state
                      onChange={handleChange}
                    >
                      <option value="">Select</option>{" "}
                      {/* Default placeholder option */}
                      <option value="New Hire">New Hire</option>
                      <option value="Company's Staff">Company's Staff</option>
                    </select>
                  </div>
                </Tooltip>
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
