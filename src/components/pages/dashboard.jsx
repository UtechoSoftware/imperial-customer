/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { message, Tooltip } from "antd";
import {
  addYears,
  differenceInYears,
  isAfter,
  isBefore,
  subDays,
} from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from "../assets//png/avatar1.png";
import { useDispatch, useSelector } from "react-redux";
import { create_hr } from "../api/hr";
import { CircularProgress } from "@mui/material";
import { setSaving } from "../store/reducer/imperialAuth";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const login = useSelector((state) => state.data.data.isLogin_);
  const [error, setError] = useState("");
  const [dob, setDob] = useState("");
  const [DOB, setDOB] = useState("");
  const [fillingdate, setFillingDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [iefpDate, setIefpDate] = useState("");
  const [iefpDate_, setIefpDate_] = useState("");
  const [btDate, setbtDate] = useState("");
  const [identifiers, setIdentifiers] = useState([]);
  const navigate = useNavigate();
  const [employeeType, setEmployeeType] = useState("");
  const [formData, setFormData] = useState({
    identifier: "",
    dob: null,
    newHiring: "",
    iefpDate: null,
    iefp: "",
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
  // const handleDateChange = (date, name) => {
  //   setFormData({ ...formData, [name]: date });
  // };
  const handleDateChange = (date, fieldName) => {
    const currentDate = new Date();
    const selectedDate = date;
    const age = differenceInYears(currentDate, selectedDate);
    if (fieldName === "dob") {
      setDob(age);
      setDOB(selectedDate);
    } else if (fieldName === "iefpDate") {
      setIefpDate(age);
      setIefpDate_(selectedDate);
    } else if (fieldName === "startDate") {
      setStartDate(age);
      setbtDate(selectedDate);
    }
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: selectedDate,
    }));
  };
  const handleSubmit = () => {
    setLoading(true);
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    sessionStorage.setItem("todaysDate", formattedDate);
    const btDatePlus31Years = addYears(btDate, 31);
    const finalDate = subDays(btDatePlus31Years, 1);
    const isBetween_ = isAfter(DOB, btDate) && isBefore(DOB, finalDate);
    const isDiff64 = Math.abs(differenceInYears(btDate, iefpDate_));
    const isDiff48 = Math.abs(differenceInYears(btDate, DOB));
    const isDiff8filling = Math.abs(differenceInYears(btDate, today));
    if (login) {
      const calculateSaving = (formData) => {
        let saving = 14 * (23.75 / 100);
        let salary = parseFloat(formData.salary);
        if (isNaN(salary)) {
          console.error("Salary is not a valid number");
          return null; // Early exit if salary is invalid
        } else {
          return saving * salary;
        }
      };
      const calculateSaving2 = (formData) => {
        let saving = 14 * (11.85 / 100);
        let salary = parseFloat(formData.salary);
        if (isNaN(salary)) {
          console.error("Salary is not a valid number");
          return null; // Early exit if salary is invalid
        } else {
          return saving * salary;
        }
      };

      let saving = null;
      if (employeeType === "newhire") {
        if (
          !formData.dob ||
          // !formData.iefpDate ||
          // !formData.iefp ||
          !formData.employmentContractType ||
          (formData.employmentContractType === "open-ended contract" &&
            (!formData.salary ||
              !formData.workHistory ||
              !formData.startDate ||
              !formData.currentSSCRate))
        ) {
          message.error("Form data must be filled first.....");
        } else {
          if (
            dob >= 45 &&
            isDiff48 >= 45 &&
            formData.iefp === "yes" &&
            iefpDate >= 2 &&
            isDiff64 >= 2 &&
            formData.salary &&
            formData.employmentContractType === "open-ended contract" &&
            formData.currentSSCRate === "23.75%" &&
            formData.workHistory === "no"
          ) {
            message.success("Eligible for saving 1 ");
            saving = calculateSaving(formData);
          } else if (
            dob <= 31 &&
            isDiff48 <= 31 &&
            formData.iefp === "no" &&
            !iefpDate &&
            formData.salary &&
            formData.employmentContractType === "open-ended contract" &&
            formData.currentSSCRate === "23.75%" &&
            formData.workHistory === "yes"
          ) {
            message.success("Eligible for saving 2");
            saving = calculateSaving2(formData);
          } else if (
            dob &&
            formData.iefp === "yes" &&
            iefpDate >= 1 &&
            isDiff64 >= 1 &&
            formData.salary &&
            formData.employmentContractType === "open-ended contract" &&
            formData.currentSSCRate === "23.75%" &&
            formData.workHistory === "no"
          ) {
            message.success("Eligible for saving..3 ");
            saving = calculateSaving(formData);
          } else {
            // message.error("Not eligible for saving...!");
          }
          // Your logic here for when the form data is complete
        }
        const data = {
          type: employeeType,
          currentSSCRate: formData.currentSSCRate,
          // currentSalary:formData.currentSalary,
          workHistory: formData.workHistory,
          salary: formData.salary,
          employmentContractType: formData.employmentContractType,
          startDate: formData.startDate,
          iefp: formData.iefp,
          iefpDate: formData.iefpDate,
          newHiring: formData.newHiring,
          saving: saving,
          dob: formData.dob,
          identifier: formData.identifier,
        };
        console.log(data, "data...");
        create_hr(data)
          .then((res) => {
            setLoading(false);
            if (res) {
              message.success("Hr Added successfully..");

              navigate("/list-hr");
            }

          })
          .catch((err) => {
            setLoading(false);
          });
      } else if (employeeType === "companystaff") {
        if (
          !formData.dob ||
          !formData.identifier ||
          !formData.newHiring ||
          !formData.iefp ||
          (formData.iefp === "yes" && !formData.iefpDate) ||
          !formData.employmentContractType ||
          (formData.employmentContractType === "open-ended contract" &&
            (!formData.salary ||
              !formData.workHistory ||
              !formData.startDate ||
              !formData.currentSSCRate))
        ) {
          message.error("Form data must be filled first");
        } else {
          if (
            dob >= 45 &&
            isDiff48 >= 45 &&
            formData.iefp === "yes" &&
            iefpDate >= 2 &&
            isDiff64 >= 2 &&
            formData.newHiring !== "" &&
            formData.identifier !== "" &&
            formData.salary &&
            formData.employmentContractType === "open-ended contract" &&
            isDiff8filling <= 2 &&
            formData.currentSSCRate === "23.75%" &&
            formData.workHistory === "no"
          ) {
            // message.success("Eligible for saving ");
            saving = calculateSaving(formData);
          } else if (
            dob <= 31 &&
            isDiff48 <= 31 &&
            formData.iefp !== "" &&
            iefpDate >= 2 &&
            isDiff64 >= 2 &&
            formData.newHiring !== "" &&
            formData.identifier !== "" &&
            formData.salary &&
            formData.employmentContractType === "open-ended contract" &&
            isDiff8filling < 5 &&
            formData.currentSSCRate === "23.75%" &&
            formData.workHistory === "yes"
          ) {
            // message.success("Eligible for saving ");
            saving = calculateSaving(formData);
          } else if (
            dob &&
            formData.iefp === "yes" &&
            iefpDate >= 1 &&
            isDiff64 >= 1 &&
            formData.newHiring !== "" &&
            formData.identifier !== "" &&
            formData.salary &&
            formData.employmentContractType === "open-ended contract" &&
            isDiff8filling < 3 &&
            formData.currentSSCRate === "23.75%" &&
            formData.workHistory === "no"
          ) {
            // message.success("Eligible for saving ");
            saving = calculateSaving(formData);
          } else if (
            dob <= 31 &&
            isDiff48 <= 31 &&
            formData.iefp === "yes" &&
            iefpDate !== "" &&
            formData.newHiring !== "" &&
            formData.identifier !== "" &&
            formData.salary &&
            formData.employmentContractType === "open-ended contract" &&
            isDiff8filling < 5 &&
            formData.currentSSCRate === "23.75%" &&
            formData.workHistory === "yes"
          ) {
            // message.success("Eligible for saving ");
            saving = calculateSaving(formData);
          } else {
            // message.error("Not eligible for saving...!");
          }
        }
        const data = {
          type: employeeType,
          currentSSCRate: formData.currentSSCRate,
          // currentSalary:formData.currentSalary,
          workHistory: formData.workHistory,
          salary: formData.salary,
          employmentContractType: formData.employmentContractType,
          startDate: formData.startDate,
          iefp: formData.iefp,
          iefpDate: formData.iefpDate,
          newHiring: formData.newHiring,
          saving: saving,
          dob: formData.dob,
          identifier: formData.identifier,
        };
        console.log(data, "data...");
        create_hr(data)
          .then((res) => {
            setLoading(false);
            if (res) {
              message.success("Hr Added successfully..");
             
              navigate("/list-hr");
            }

          })
          .catch((err) => {
            setLoading(false);
          });
        // Your logic here for when the form data is complete
      } else {
        // message.error("Not eligible for saving...!");
        // navigate("/list-hr");
      }
    }
    console.log(typeof formData, "formData");
    if (!login) {
      const calculateSaving = (formData) => {
        let saving = 14 * (23.75 / 100);
        let salary = parseFloat(formData.salary);
        if (isNaN(salary)) {
          console.error("Salary is not a valid number");
          return null; // Early exit if salary is invalid
        } else {
          return saving * salary;
        }
      };
      const calculateSaving2 = (formData) => {
        let saving = 14 * (11.85 / 100);
        let salary = parseFloat(formData.salary);
        if (isNaN(salary)) {
          console.error("Salary is not a valid number");
          return null; // Early exit if salary is invalid
        } else {
          return saving * salary;
        }
      };

      let saving = null;

      if (employeeType === "newhire") {
        if (
          dob >= 45 &&
          isDiff48 >= 45 &&
          formData.iefp === "yes" &&
          iefpDate >= 2 &&
          isDiff64 >= 2 &&
          formData.salary &&
          formData.employmentContractType === "open-ended contract" &&
          formData.currentSSCRate === "23.75%" &&
          formData.workHistory === "no"
        ) {
          saving = calculateSaving(formData);
          // message.success("Eligible for saving ");
        } else if (
          dob <= 31 &&
          isDiff48 <= 31 &&
          formData.iefp === "no" &&
          !iefpDate &&
          formData.salary &&
          formData.employmentContractType === "open-ended contract" &&
          formData.currentSSCRate === "23.75%" &&
          formData.workHistory === "yes"
        ) {
          saving = calculateSaving2(formData);
          // message.success("Eligible for saving ");
        } else if (
          dob &&
          formData.iefp === "yes" &&
          iefpDate >= 1 &&
          isDiff64 >= 1 &&
          formData.salary &&
          formData.employmentContractType === "open-ended contract" &&
          formData.currentSSCRate === "23.75%" &&
          formData.workHistory === "no"
        ) {
          saving = calculateSaving(formData);
          // message.success("Eligible for saving ");
        } else {
          // message.error("Not eligible for saving...!");
        }

        const existingData = JSON.parse(sessionStorage.getItem("hrData")) || [];
        const data = {
          type: employeeType,
          currentSSCRate: formData.currentSSCRate,
          workHistory: formData.workHistory,
          salary: formData.salary,
          employmentContractType: formData.employmentContractType,
          startDate: formData.startDate,
          iefp: formData.iefp,
          iefpDate: formData.iefpDate,
          newHiring: formData.newHiring,
          dob: formData.dob,
          identifier: formData.identifier,
          saving: saving, // Store the calculated saving
        };
        existingData.push(data);
        sessionStorage.setItem("hrData", JSON.stringify(existingData));
        console.log(existingData, "Updated hrData");
        navigate("/list-hr");
      } else if (employeeType === "companystaff") {
        if (
          dob >= 45 &&
          isDiff48 >= 45 &&
          formData.iefp === "yes" &&
          iefpDate >= 2 &&
          isDiff64 >= 2 &&
          formData.newHiring !== "" &&
          formData.identifier !== "" &&
          formData.salary &&
          formData.employmentContractType === "open-ended contract" &&
          isDiff8filling <= 2 &&
          formData.currentSSCRate === "23.75%" &&
          formData.workHistory === "no"
        ) {
          saving = calculateSaving(formData);
          // message.success("Eligible for saving ");
        } else if (
          dob <= 31 &&
          isDiff48 <= 31 &&
          formData.iefp !== "" &&
          iefpDate >= 2 &&
          isDiff64 >= 2 &&
          formData.newHiring !== "" &&
          formData.identifier !== "" &&
          formData.salary &&
          formData.employmentContractType === "open-ended contract" &&
          isDiff8filling < 5 &&
          formData.currentSSCRate === "23.75%" &&
          formData.workHistory === "yes"
        ) {
          saving = calculateSaving2(formData);
          // message.success("Eligible for saving ");
        } else if (
          dob &&
          formData.iefp === "yes" &&
          iefpDate >= 1 &&
          isDiff64 >= 1 &&
          formData.newHiring !== "" &&
          formData.identifier !== "" &&
          formData.salary &&
          formData.employmentContractType === "open-ended contract" &&
          isDiff8filling < 3 &&
          formData.currentSSCRate === "23.75%" &&
          formData.workHistory === "no"
        ) {
          saving = calculateSaving(formData);
          // message.success("Eligible for saving ");
        } else if (
          dob <= 31 &&
          isDiff48 <= 31 &&
          formData.iefp === "yes" &&
          iefpDate !== "" &&
          formData.newHiring !== "" &&
          formData.identifier !== "" &&
          formData.salary &&
          formData.employmentContractType === "open-ended contract" &&
          isDiff8filling < 5 &&
          formData.currentSSCRate === "23.75%" &&
          formData.workHistory === "yes"
        ) {
          saving = calculateSaving2(formData);
          // message.success("Eligible for saving ");
        } else {
          // message.error("Not eligible for saving...!");
        }
        const existingData2 =
          JSON.parse(sessionStorage.getItem("hrData_company")) || [];
        const data = {
          type: employeeType,
          currentSSCRate: formData.currentSSCRate,
          workHistory: formData.workHistory,
          salary: formData.salary,
          employmentContractType: formData.employmentContractType,
          startDate: formData.startDate,
          iefp: formData.iefp,
          iefpDate: formData.iefpDate,
          newHiring: formData.newHiring,
          dob: formData.dob,
          identifier: formData.identifier,
          saving: saving, // Store the calculated saving
        };
        existingData2.push(data);
        sessionStorage.setItem("hrData_company", JSON.stringify(existingData2));
        navigate("/list-hr");
        console.log(existingData2, "Updated hrData");
      }
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
  const fillingDateArray = [
    "23/08/2022",
    "05/01/2021",
    "23/06/2020",
    "23/08/2024",
  ];
  const handleFillingDate = () => {
    // Convert the string dates to Date objects
    const dateObjects = fillingDateArray.map((dateStr) => {
      const [day, month, year] = dateStr.split("/");
      return new Date(`${month}/${day}/${year}`);
    });
    const randomIndex = Math.floor(Math.random() * dateObjects.length);
    const randomDate = dateObjects[randomIndex];
    setFillingDate(randomDate.toString());
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
          {employeeType === "newhire" ? (
            <div>
              <div className="my-3">
                <label className="form-label w-fit manrope_semibold cursor-pointer">
                  Type of Employee
                </label>

                <div className=" col-lg-4 col-md-6  col-12">
                  <Tooltip title=" New hire - HR to be hired in the near future by the company Company's staff - HR already in the company">
                    <div className="">
                      <select
                        required
                        className="form-select cursor-pointer py-3 custom_radius text-center"
                        value={employeeType} // Bind the value to state
                        onChange={handleChange}
                      >
                        <option value="">Select</option>{" "}
                        {/* Default placeholder option */}
                        <option value="newhire">New Hire</option>
                        <option value="companystaff">Company's Staff</option>
                      </select>
                    </div>
                  </Tooltip>
                </div>
              </div>

              <div className="my-4 d-flex gap-md-3 gap-sm-2 gap-1 align-items-baseline flex-wrap">
                <label className="form-label cursor-pointer manrope_semibold">
                  Personal Data
                </label>
                <Tooltip title="Indicate the HR date of birth (dd/mm/yyyy)">
                  <div className="">
                    <DatePicker
                      selected={formData.dob}
                      onChange={(date) => handleDateChange(date, "dob")}
                      className="form-control cursor-pointer input_1 custom_radius text-center"
                      placeholderText="Date of Birth"
                      dateFormat="dd/MM/yyyy"
                      // maxDate={new Date()}
                      required
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
                  <Tooltip title="Indicate whether, before joining the company, the HR was registered with IEFP as unemployed">
                    <div className="">
                      <select
                        className="form-select cursor-pointer custom_radius  text-center input_3 mr-2 mb-2"
                        name="iefp"
                        value={formData.iefp}
                        onChange={handleInputChange}
                      >
                        <option value="">
                          Registered on the Portuguese Employment Institut
                          (IEFP)
                        </option>

                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </Tooltip>
                  {formData?.iefp === "yes" && (
                    <Tooltip title="Indicate the date of the HR's registration with IEFP as unemployed (dd/mm/yyyy)">
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
                    <Tooltip title="Fixed-term employment contract (Article 141 of the Portuguese Labor Code), either certain or uncertain, must be in writing. If not written, please select the option Permanent employment contract or indefinite-term.Permanent employment contract (Article 147 of the Portuguese Labor Code) or indefinite-term, associated with a permanent employee/on-staff employee. This contract does not need to be in writing.">
                      <div className="">
                        <select
                          className="form-select custom_radius cursor-pointer text-center py-3  input_3 mr-2 mb-2"
                          name="employmentContractType"
                          // style={{padding:"1.4rem 1rem"}}
                          value={formData.employmentContractType}
                          onChange={handleInputChange}
                        >
                          <option value="">Type of employment contract</option>

                          <option value="open-ended contract">
                            open-ended contract
                          </option>
                          <option value="Non-permanent contract">
                            Non-permanent contract
                          </option>
                        </select>
                      </div>
                    </Tooltip>
                    {formData.employmentContractType ===
                      "open-ended contract" && (
                      <>
                        <Tooltip title="Indicate the expected hiring date for the new HR (dd/mm/yyyy)">
                          {/* <h5 className="">
                          Predicted Start Date
                          </h5> */}
                        </Tooltip>
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
                        <Tooltip title="Indicate the expected gross monthly salary for the HR">
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
                          <Tooltip title="Indicate whether the salary to be paid to the HR will be subject to the standard Portuguese Social Security contribution rate of 23.75% usually applicable to the employer (resulting in a total rate of 34.75%) or another rate">
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
                                <option value="23.75%">23.75%</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </Tooltip>
                        </div>
                        {formData.currentSSCRate === "23.75%" && (
                          <div className="my-2 col-lg-4 col-md-6 col-12 ms-md-2">
                            <label className="form-label cursor-pointer w-fit manrope_semibold">
                              Employees’s work history
                            </label>

                            <div className="col-12">
                              <Tooltip title="Indicate whether the employment contract to be signed will be the first permanent employment contract ever entered into by the new HR">
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

                                    <option value="no">No</option>

                                    <option value="yes">yes</option>
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
          ) : employeeType === "companystaff" ? (
            <div>
              <div className="my-3  ">
                <label className="form-label  manrope_semibold">
                  Type of Employee
                </label>
                <div className=" col-lg-4 col-md-6  col-12 ">
                  <Tooltip title="New hire - HR to be hired in the near future by the company Company's staff - HR already in the company">
                    <div className="">
                      <select
                        className="form-select cursor-pointer py-3 custom_radius  text-center"
                        value={employeeType}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>

                        <option value="newhire">New Hire</option>
                        <option value="companystaff">Company's Staff</option>
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
                  <Tooltip
                    title="Please provide a unique identifier for this HR record, which must be different from all other HR records being entered. We suggest using, for example, the employee's, Tax, Social Security or Identification card numbers
"
                  >
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
                  <Tooltip title="Indicate the date when the HR joined the company (dd/mm/yyyy)">
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
                  <Tooltip title="Indicate the HR date of birth (dd/mm/yyyy)">
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
                  <Tooltip title="Indicate whether, before joining the company, the HR was registered with IEFP as unemployed">
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
                    <Tooltip title="Indicate the date of the HR's registration with IEFP as unemployed (dd/mm/yyyy)">
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
                <button
                  className="btn ms-3 my-3 px-2 py-1 btn-sm bg-success  rounded-4 text-white "
                  onClick={handleFillingDate}
                >
                  Random Date
                </button>
                <div className="d-flex gap-2 col-12 flex-wrap">
                  <Tooltip
                    title="Fixed-term employment contract (Article 141 of the Portuguese Labor Code), either certain or uncertain, must be in writing. If not written, please select the option Permanent employment contract or indefinite-term.
Permanent employment contract (Article 147 of the Portuguese Labor Code) or indefinite-term, associated with a permanent employee/on-staff employee. This contract does not need to be in writing."
                  >
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
                      <Tooltip title="Indicate the date of the (most recent) employment contract with the HR (dd/mm/yyyy)">
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
                      <Tooltip title="Indicate the current gross monthly salary of the HR">
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
                        <Tooltip
                          title="Indicate whether the salary paid to the HR  is subject to the standard Portuguese Social Security contribution rate of 23.75% usually applicable to the employer (resulting in a total rate of 34,75%) or another rate
"
                        >
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
                              <option value="23.75%">23.75%</option>
                              {/* <option value="Other">Other</option> */}
                            </select>
                          </div>
                        </Tooltip>
                      </div>
                      {formData.currentSSCRate === "23.75%" && (
                        <div className="my-2 col-lg-4 col-md-6 col-12 ms-md-2">
                          <label className="form-label cursor-pointer w-fit manrope_semibold">
                            Employees’s work history
                          </label>

                          <div className="col-12">
                            <Tooltip title="Indicate whether the current employment contract is the first open-ended employment contract ever entered into by the HR">
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
                <Tooltip
                  title="New hire - HR to be hired in the near future by the company
Company's staff - HR already in the company"
                >
                  <div className="">
                    <select
                      required
                      className="form-select cursor-pointer py-3 custom_radius text-center"
                      value={employeeType} // Bind the value to state
                      onChange={handleChange}
                    >
                      <option value="">Select</option>{" "}
                      {/* Default placeholder option */}
                      <option value="newhire">New Hire</option>
                      <option value="companystaff">Company's Staff</option>
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
              <button className="btn_" type="button" onClick={handleSubmit}>
                {loading && login ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <CircularProgress style={{ color: "white" }} size={20} />
                  </div>
                ) : (
                  "Done"
                )}
              </button>
            </div>
          </div>
        </main>
      </>
    </div>
  );
};

export default Dashboard;
