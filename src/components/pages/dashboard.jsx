/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import { message, Tooltip } from "antd";
import {
  addYears,
  differenceInYears,
  isAfter,
  isBefore,
  subDays,
} from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { create_hr, update_hr } from "../api/hr";
import avatar from "../assets//png/avatar1.png";
const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector(state => state.data.data.user)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [editData, setEditData] = useState('')
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
  const [errors, setErrors] = useState({});
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
  const validateForm = () => {
    const newErrors = {};
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.iefp) newErrors.iefp = "IEFP status is required.";
    if (!formData.iefpDate && formData.iefp === 'yes') newErrors.iefpDate = "IEFP Date  is required.";
    if (formData.employmentContractType === "open-ended contract" && !formData.startDate) newErrors.startDate = "Predicted Start Date"
    if (formData.employmentContractType === "open-ended contract" && !formData.currentSSCRate) newErrors.currentSSCRate = "Company's current Social Security contribution rate is required"
    if (formData.employmentContractType === "open-ended contract" && !formData.salary) newErrors.salary = "Monthly Salary is required"
    if (formData.currentSSCRate === "23.75%" && formData.workHistory !== 'yes' && formData.workHistory !== 'no') {
      newErrors.workHistory = "Work History should be selected";
    }
    setErrors(newErrors);
    console.log(Object.keys(newErrors), "work")
    console.log("identifier:", formData.identifier);
    console.log("newHiring:", formData.newHiring);
    console.log("salary:", formData.salary);
    console.log("workHistory:", formData.workHistory);
    return Object.keys(newErrors).length === 0;
  };
  const validateForm2 = () => {
    const newErrors = {};
    if (!formData.identifier) newErrors.identifier = "Unique Identifier is required";
    if (!formData.newHiring) newErrors.newHiring = " Hiring Date is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.iefp) newErrors.iefp = "IEFP status is required.";
    if (!formData.iefpDate && formData.iefp === 'yes') newErrors.iefpDate = "IEFP Date  is required.";
    if (formData.employmentContractType === "open-ended contract" && !formData.startDate) newErrors.startDate = "Contract Start Date"
    if (formData.employmentContractType === "open-ended contract" && !formData.currentSSCRate) newErrors.currentSSCRate = "Company's current Social Security contribution rate is required"
    if (formData.employmentContractType === "open-ended contract" && !formData.salary) newErrors.salary = "Monthly Salary is required"
    if (formData.currentSSCRate === "23.75%" && formData.workHistory !== 'yes' && formData.workHistory !== 'no') {
      newErrors.workHistory = "Work History should be selected";
    }

    setErrors(newErrors);
    console.log(Object.keys(newErrors), "work")
    console.log("identifier:", formData.identifier);
    console.log("newHiring:", formData.newHiring);
    console.log("salary:", formData.salary);
    console.log("workHistory:", formData.workHistory);
    return Object.keys(newErrors).length === 0;
  };
  // const ans = validateForm()
  // console.log(ans)



  const handleChange = (event) => {
    setEmployeeType(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  // -------------------previous code for backup --------------- don't remove this -------------
  // const handleDateChange = (date, fieldName) => {
  //   const currentDate = new Date();
  //   const selectedDate = date;
  //   const age = differenceInYears(currentDate, selectedDate);
  //   if (fieldName === "dob") {
  //     setDob(age);
  //     setDOB(selectedDate);
  //   } else if (fieldName === "iefpDate") {
  //     setIefpDate(age);
  //     setIefpDate_(selectedDate);
  //   } else if (fieldName === "startDate") {
  //     setStartDate(age);
  //     setbtDate(selectedDate);
  //   }
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [fieldName]: selectedDate,
  //   }));
  //   setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  // };
  const handleDateChange = (date, fieldName) => {
    const currentDate = new Date();
    const selectedDate = date;
    const differenceInYears15 = (currentDate, selectedDate) => {
      const age = differenceInYears(currentDate, selectedDate);
      return age >= 15; // Returns true if age is 15 or more, false otherwise
    };
    if (fieldName === "dob" && !differenceInYears15(currentDate, selectedDate)) {
      // Show an error if the DOB is less than 15 years ago
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "Age must be 15 years or older." }));
      return;
    }

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
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };
  // const handleDateChange = (date, fieldName) => {
  //   const currentDate = new Date();
  //   const selectedDate = date;
  //   const age = differenceInYears(currentDate, selectedDate);

  //   if (fieldName === "dob") {
  //     setDob(age);
  //     setDOB(selectedDate);
  //   } else if (fieldName === "iefpDate") {
  //     if (formData.dob) {
  //       const dobDate = new Date(formData.dob);
  //       const minIefpDate = new Date(dobDate.setFullYear(dobDate.getFullYear() + 15));
  //       console.log(selectedDate < minIefpDate, "hello")
  //       if (selectedDate < minIefpDate) {
  //         setErrors((prevErrors) => ({
  //           ...prevErrors,
  //           iefpDate: "IEF date must be at least 15 years after Date of Birth.",
  //         }));
  //         return;
  //       }
  //     }
  //     setIefpDate(age);
  //     setIefpDate_(selectedDate);
  //   } else if (fieldName === "startDate") {
  //     setStartDate(age);
  //     setbtDate(selectedDate);
  //   }

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [fieldName]: selectedDate,
  //   }));
  //   setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  // };

  // const handleDateChange = (date, fieldName) => {
  //   const currentDate = new Date();
  //   const selectedDate = date;
  //   const age = differenceInYears(currentDate, selectedDate);

  //   if (fieldName === "dob") {
  //     setDob(age);
  //     setFormData((prevData) => ({ ...prevData, dob: selectedDate }));
  //     setErrors((prevErrors) => ({ ...prevErrors, dob: "" }));
  //   } else if (fieldName === "iefpDate") {
  //     if (formData.dob) {
  //       const dobDate = new Date(formData.dob);
  //       const minIefpDate = new Date(dobDate.setFullYear(dobDate.getFullYear() + 15));
  //       if (selectedDate < minIefpDate) {
  //         setErrors((prevErrors) => ({
  //           ...prevErrors,
  //           iefpDate: "IEF date must be at least 15 years after Date of Birth.",
  //         }));
  //         return;
  //       }
  //     }
  //     setIefpDate(age);
  //     setFormData((prevData) => ({ ...prevData, iefpDate: selectedDate }));
  //     setErrors((prevErrors) => ({ ...prevErrors, iefpDate: "" }));
  //   } else if (fieldName === "startDate") {
  //     setStartDate(age);
  //     setbtDate(selectedDate);
  //   }
  // };

  const handleSubmit = () => {
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
          // console.error("Salary is not a valid number");
          return null; // Early exit if salary is invalid
        } else {
          return saving * salary;
        }
      };
      const calculateSaving2 = (formData) => {
        let saving = 14 * (11.85 / 100);
        let salary = parseFloat(formData.salary);
        if (isNaN(salary)) {
          // console.error("Salary is not a valid number");
          return null;
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
          // message.error("Form data must be filled first.....");
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
        if (editData && validateForm()) {
          setLoading(true);

          update_hr(data, editData?._id)
            .then((res) => {
              setLoading(false);
              if (res) {
                message.success("Hr Updated successfully..");
                navigate("/list-hr");
              }

            })
            .catch((err) => {
              setLoading(false);
            });
        }
        else {
          if (validateForm()) {
            setLoading(true)

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
          } else {
            // message.error('Form data must be filled')
            setLoading(false);

          }
        }
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
          setLoading(false)
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
        // console.log(data, "data...");
        if (editData && validateForm2()) {
          update_hr(data, editData?._id)
            .then((res) => {
              setLoading(false);
              if (res) {
                message.success("Hr Updated successfully..");
                navigate("/list-hr");
              }
            }).catch((err) => {
              setLoading(false);

            })
        } else {
          if (validateForm2()) {
            setLoading(true)
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
          } else {
            // message.error('Form data must be filled')
            setLoading(false);
          }
        }
        // Your logic here for when the form data is complete
      } else {
        // message.error("Not eligible for saving...!");
        // navigate("/list-hr");
      }
    }
    if (!login) {
      const calculateSaving = (formData) => {
        let saving = 14 * (23.75 / 100);
        let salary = parseFloat(formData.salary);
        if (isNaN(salary)) {
          // console.error("Salary is not a valid number");
          return null; // Early exit if salary is invalid
        } else {
          return saving * salary;
        }
      };
      const calculateSaving2 = (formData) => {
        let saving = 14 * (11.85 / 100);
        let salary = parseFloat(formData.salary);
        if (isNaN(salary)) {
          // console.error("Salary is not a valid number");
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
        if (validateForm()) {
          existingData.push(data);
          sessionStorage.setItem("hrData", JSON.stringify(existingData));
          // console.log(existingData, "Updated hrData");
          navigate("/list-hr");
        }

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
          saving: saving,
        };
        if (validateForm2()) {
          existingData2.push(data);
          sessionStorage.setItem("hrData_company", JSON.stringify(existingData2));
          navigate("/list-hr");
        }
      }
    }
  };

  const handleIdentifierChange = (e) => {
    const value = e.target.value;
    if (identifiers.includes(value)) {
      setError(
        "This identifier has already been used.Please enter a unique identifier."
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
  const handleParamsData = () => {
    const params = new URLSearchParams(location.search);
    if (params.get("data")) {
      console.log(JSON.parse(params.get("data")));
      setEditData(JSON.parse(params.get("data")));
      setFormData(JSON.parse(params.get("data")))
      setEmployeeType(JSON.parse(params.get("data")).type)
    }
  };
  useEffect(() => {
    handleParamsData();
  }, []);
  // console.log(editData, "editData")
  return (
    <div>
      <>
        <main className="min-h-screen lg:container py-5 px-10 mx-auto">
          {
            login && (
              <div className="flex justify-between max-md:flex-col max-md:gap-3 mb-3 md:items-center w-full">
                <div className="flex flex-md-row flex-column">
                  <img
                    className="avatar_img"
                    width="60px"
                    src={user?.profilePicture || avatar}
                    alt="avatar"
                  />
                  <div className="flex flex-col">
                    <h4 className="manrope_bold max-md:text-xl text_black">
                      {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1).toLowerCase()}
                    </h4>
                    <p>{user?.position.charAt(0).toUpperCase() + user?.position?.slice(1).toLowerCase()}- {user?.comp_name.charAt(0).toUpperCase() + user?.comp_name?.slice(1).toLowerCase()}</p>
                  </div>
                </div>
              </div>
            )}
          <p className="manrope_bold  fs-5 text_black">
            {t('calculator_h1')}
          </p>
          <h4 className="manrope_bold max-md:text-xl text_secondary mt-3">
            {t('new_entry')}
          </h4>
          {employeeType === "newhire" ? (
            <div>
              <div className="">
                <div className="flex flex-row items-center flex-wrap gap-3">
                  <div className=" col-lg-4 col-md-6 col-12">
                    <label className="form-label w-fit manrope_semibold cursor-pointer">
                      {t('type_of_employee')}
                    </label>
                    <Tooltip title={t('new_hr')}>
                      <div className="">
                        <select
                          required
                          className="form-select cursor-pointer py-3 custom_radius text-center"
                          value={employeeType}
                          onChange={handleChange}
                        >
                          <option value="">{t('select')}</option>
                          <option value="newhire">{t('NewHire')}</option>
                          <option value="companystaff">{t('comp_staff')}</option>
                        </select>
                      </div>
                    </Tooltip>

                  </div>
                  <div className="my-2 d-flex flex-column  align-items-baseline flex-wrap">
                    <label className="form-label cursor-pointer manrope_semibold">
                      {t('table_head_1')}
                    </label>
                    <Tooltip title={t('indicate_birth')}>
                      <div className="">
                        <DatePicker
                          yearDropdownItemNumber={200}
                          selected={formData.dob}
                          onChange={(date) => handleDateChange(date, "dob")}
                          className="form-control cursor-pointer input_1 custom_radius text-center"
                          placeholderText={t('table_head_8')}
                          dateFormat="dd/MM/yyyy"
                          maxDate={new Date()}
                          required
                          showYearDropdown
                          isClearable
                          scrollableYearDropdown
                        />

                      </div>
                    </Tooltip>
                    {errors.dob && <div className="fs-small" style={{ color: "red" }}>{errors.dob}</div>}

                  </div>
                </div>
              </div>
              {/* </div> */}
              <div className=" ">
                <label className="form-label cursor-pointer manrope_semibold">
                  {t('reg_unemployee')}
                </label>

                <div className="d-flex gap-2 flex-wrap cursor-pointer">
                  <Tooltip title={t('indicate_join')}>
                    <div className="">
                      <select
                        className="form-select cursor-pointer custom_radius  text-center input_3 mr-2 mb-2"
                        name="iefp"
                        value={formData.iefp}
                        onChange={handleInputChange}
                      >
                        <option value="">
                          {t('reg_inst')}
                        </option>

                        <option value="yes">{t('yes')}</option>
                        <option value="no">{t('no')}</option>
                      </select>

                    </div>
                  </Tooltip>
                  {formData?.iefp === "yes" && (
                    <Tooltip title={t('indicate_hr_reg')}>
                      <div className="">
                        <DatePicker
                          yearDropdownItemNumber={200}
                          selected={formData.iefpDate}
                          onChange={(date) =>
                            handleDateChange(date, "iefpDate")
                          }
                          className="form-control  input_1 cursor-pointer custom_radius text-center "
                          placeholderText={t('table_2-head_3')}
                          dateFormat="dd/MM/yyyy"
                          // maxDate={new Date()}
                          showYearDropdown
                          scrollableYearDropdown
                          isClearable
                        />
                      </div>
                      {errors.iefpDate && <div className="fs-small" style={{ color: "red" }}>{errors.iefpDate}</div>}
                    </Tooltip>
                  )}
                </div>

                {/* {formData?.iefp === "yes" && ( */}
                <div className="my-2">
                  <label className="form-label cursor-pointer manrope_semibold">
                    {t('emp_contract_detail')}
                  </label>

                  <div className="d-flex gap-2 flex-wrap">
                    <Tooltip title={t('fixed_between')}>
                      <div className="">
                        <select
                          className="form-select custom_radius cursor-pointer text-center py-3  input_3 mr-2 mb-2"
                          name="employmentContractType"
                          // style={{padding:"1.4rem 1rem"}}
                          value={formData.employmentContractType}
                          onChange={handleInputChange}
                        >
                          <option value="">{t('t_empl_contract')}</option>

                          <option value="open-ended contract">
                            {t('table_2-head_16')}
                          </option>
                          <option value="Non-permanent contract">
                            {t('non_perm_contract')}
                          </option>
                        </select>
                      </div>
                    </Tooltip>
                    {formData.employmentContractType ===
                      "open-ended contract" && (
                        <>
                          <Tooltip title={t('indicate_date')}>
                            {/* <h5 className="">
                          Predicted Start Date
                          </h5> */}
                            <div>
                              <DatePicker
                                yearDropdownItemNumber={200}
                                selected={formData.startDate}
                                onChange={(date) =>
                                  handleDateChange(date, "startDate")
                                }
                                className="form-control input_1 cursor-pointer custom_radius text-center mr-2 "
                                placeholderText={t('table_head_10')}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                showYearDropdown
                                scrollableYearDropdown
                                isClearable
                              />
                              {errors.startDate && <div className="fs-small" style={{ color: "red" }}>{errors.startDate}</div>}

                            </div>
                          </Tooltip>

                          <Tooltip title={t('indicate_salery')}>
                            <div className="">
                              <input
                                type="text"
                                className="form-control cursor-pointer input_1 custom_radius text-center mr-2"
                                name="salary"
                                placeholder={t('monthly_sallery')}
                                value={formData.salary}
                                onChange={handleInputChange}
                              />
                            </div>
                            {errors.salary && <div className="fs-small" style={{ color: "red" }}>{errors.salary}</div>}

                          </Tooltip>


                          <div className=" col-md-12 col-12">
                            <div className="col-md-5">

                              <label className="form-label cursor-pointer w-fit manrope_semibold">
                                {t('table_head_4')}
                              </label>
                              <Tooltip title={t('indicate_salary_paid')}>
                                <div className="">
                                  <select
                                    className="form-select custom_radius cursor-pointer text-center w-100 mr-2 mb-2"
                                    name="currentSSCRate"
                                    value={formData.currentSSCRate}
                                    onChange={handleInputChange}
                                  >
                                    <option value="">
                                      {t('current_rate')}
                                    </option>
                                    <option value="23.75%">23.75%</option>
                                    <option value="Other">Other</option>
                                  </select>
                                  {errors.currentSSCRate && <div className="fs-small" style={{ color: "red" }}>{errors.currentSSCRate}</div>}

                                </div>
                              </Tooltip>
                            </div>
                          </div>
                          {formData.currentSSCRate === "23.75%" && (
                            <div className=" col-lg-4 col-md-6 col-12 ms-md-2">
                              <label className="form-label cursor-pointer w-fit manrope_semibold">
                                {t('work_history')}
                              </label>
                              <div className="col-12">
                                <Tooltip title={t('indicate_employee_contract')}>
                                  <div className="">
                                    <select
                                      className="form-select cursor-pointer custom_radius text-center w-100 mr-2 "
                                      name="workHistory"
                                      value={formData.workHistory}
                                      onChange={handleInputChange}
                                    >
                                      <option value="">
                                        {t('is_this')}
                                      </option>

                                      <option value="no">{t('no')}</option>

                                      <option value="yes">{t('yes')}</option>
                                    </select>
                                    {errors.workHistory && <div className="fs-small" style={{ color: "red" }}>{errors.workHistory}</div>}

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
                <label className="form-label manrope_semibold">
                  {t('type_of_employee')}
                </label>
                <div className=" col-lg-4 col-md-6  col-12">
                  <Tooltip title={t('new_hr_company')}>
                    <div className="">
                      <select
                        className="form-select cursor-pointer py-3 custom_radius text-center"
                        value={employeeType}
                        onChange={handleChange}
                      >
                        <option value="">{t('select')}</option>
                        <option value="newhire">{t('NewHire')}</option>
                        <option value="companystaff">{t('tab_2')}</option>
                      </select>
                    </div>
                  </Tooltip>

                </div>
              </div>

              <div className="my-2">
                <label className="form-label  manrope_semibold">
                  {t('table_head_1')}
                </label>

                <div className="flex  flex-wrap">
                  <Tooltip
                    title={t('unique_identifier_desc')}
                  >
                    <div className="">
                      <input
                        type="text"
                        id="identifier"
                        name="identifier"
                        placeholder={t('unique_identifier')}
                        value={formData.identifier}
                        onChange={handleIdentifierChange}
                        className="form-control cursor-pointer input_1 custom_radius text-center mr-2 "

                      // className="form-control"
                      />
                      {errors.identifier && <div className="fs-small" style={{ color: "red" }}>{errors.identifier}</div>}

                    </div>
                  </Tooltip>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <Tooltip title={t('indicate_birth_com')}>
                    <div className="">
                      <DatePicker
                        yearDropdownItemNumber={200}
                        selected={formData.newHiring}
                        onChange={(date) => handleDateChange(date, "newHiring")}
                        className="form-control input_1 cursor-pointer custom_radius me-md-2 text-center"
                        placeholderText={t('hiring_date')}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        isClearable // Allows users to clear the date if they need to reselect
                      />
                      {errors.newHiring && <div className="fs-small" style={{ color: "red" }}>{errors.newHiring}</div>}
                    </div>
                  </Tooltip>
                  <Tooltip title={t('indicate_birth')}>
                    <div>
                      <DatePicker
                        yearDropdownItemNumber={200}
                        selected={formData.dob}
                        onChange={(date) => handleDateChange(date, "dob")}
                        className="form-control cursor-pointer input_1 custom_radius text-center"
                        placeholderText={t('table_head_8')}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        isClearable
                      />
                    </div>
                    {errors.dob && <div className="fs-small" style={{ color: "red" }}>{errors.dob}</div>}

                  </Tooltip>
                </div>
              </div>
              <div className="my-4 ">
                <label className="form-label cursor-pointer manrope_semibold">
                  {t('reg_unemployee')}
                </label>

                <div className="d-flex gap-2 flex-wrap cursor-pointer">
                  <Tooltip title={t('indicate_join')}>
                    <select
                      className="form-select cursor-pointer custom_radius  text-center input_3 mr-2 mb-2"
                      name="iefp"
                      value={formData.iefp}
                      onChange={handleInputChange}
                    >
                      <option>
                        {t('reg_inst')}
                      </option>
                      <option value="yes">{t('yes')}</option>
                      <option value="no">{t('no')}</option>
                    </select>
                  </Tooltip>
                  {formData?.iefp === "yes" && (
                    <Tooltip title={t('indicate_hr_reg')}>
                      <div
                        style={{ width: "300px" }}

                        className="w-full">
                        <DatePicker
                          yearDropdownItemNumber={200}
                          selected={formData.iefpDate}
                          onChange={(date) =>
                            handleDateChange(date, "iefpDate")
                          }
                          className="form-control input_1 cursor-pointer custom_radius text-center  "
                          placeholderText={t('IEFP_reg_date')}
                          dateFormat="dd/MM/yyyy"
                          maxDate={new Date()}
                          showYearDropdown
                          scrollableYearDropdown
                          isClearable
                        />
                      </div>
                      {errors.iefpDate && <div className="fs-small" style={{ color: "red" }}>{errors.iefpDate}</div>}

                    </Tooltip>
                  )}
                </div>
                {/* {formData?.iefp === "yes" && ( */}
                {/* {errors.iefpDate && <div className="fs-small" style={{ color: "red" }}>{errors.iefpDate}</div>} */}


                {/* )} */}
              </div>
              <div className="my-2 ">
                <label className="form-label cursor-pointer manrope_semibold">
                  {t('emp_contract_detail')}
                </label>
                {/* <button
                  className="btn ms-3 my-3 px-2 py-1 btn-sm bg-success  rounded-4 text-white "
                  onClick={handleFillingDate}
                >
                  Random Date
                </button> */}
                <div className="d-flex gap-2 col-12 flex-wrap">
                  <Tooltip
                    title={t('indicate_fixed_term')}
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
                          {t('sign_last')}
                        </option>
                        <option value="Non-permanent contract">
                          {t('non_perm_contract')}
                        </option>
                        <option value="open-ended contract">
                          {t('table_2-head_16')}
                        </option>
                      </select>
                    </div>
                  </Tooltip>

                  {formData.employmentContractType ===
                    "open-ended contract" && (
                      <>
                        <Tooltip title={t('indicate_date_com')}>
                          <div>
                            <DatePicker
                              yearDropdownItemNumber={200}
                              selected={formData.startDate}
                              onChange={(date) =>
                                handleDateChange(date, "startDate")
                              }
                              className="form-control input_1 cursor-pointer custom_radius  text-center  "
                              placeholderText={t('contract_start_date')}
                              dateFormat="dd/MM/yyyy"
                              maxDate={new Date()}
                              showYearDropdown
                              scrollableYearDropdown
                              isClearable
                            />
                            {errors.startDate && <div className="fs-small" style={{ color: "red" }}>{errors.startDate}</div>}
                          </div>
                        </Tooltip>
                        <Tooltip title={t('indicate_salery_com')}>
                          <div className="">
                            <input
                              type="text"
                              className="form-control cursor-pointer input_1 custom_radius text-center mr-2"
                              name="salary"
                              placeholder={t('monthly_sallery')}
                              value={formData.salary}
                              onChange={handleInputChange}
                            />
                            {errors.salary && <div className="fs-small" style={{ color: "red" }}>{errors.salary}</div>}

                          </div>
                        </Tooltip>
                        <div className="  my-2 col-md-6 col-12">
                          <label className="form-label cursor-pointer w-fit manrope_semibold">
                            {t('table_head_4')}
                          </label>
                          <Tooltip
                            title={t('indicate_salary_paid_com')}
                          >
                            <div className="">
                              <select
                                className="form-select cursor-pointer custom_radius text-center w-100 mr-2 mb-2"
                                name="currentSSCRate"
                                value={formData.currentSSCRate}
                                onChange={handleInputChange}
                              >
                                <option value="">
                                  {t('current_rate')}
                                </option>
                                <option value="23.75%">23.75%</option>
                                {/* <option value="Other">Other</option> */}
                              </select>
                            </div>
                          </Tooltip>
                        </div>
                        {formData.currentSSCRate === "23.75%" && (
                          <div className="my-1 col-lg-4 col-md-6 col-12 ms-md-2">
                            <label className="form-label cursor-pointer w-fit manrope_semibold">
                              {t('work_history')}
                            </label>
                            <div className="col-12">
                              <Tooltip title={t('indicate_employee_contract_com')}>
                                <div className="">
                                  <select
                                    className="form-select cursor-pointer custom_radius text-center w-100 mr-2 mb-2"
                                    name="workHistory"
                                    value={formData.workHistory}
                                    onChange={handleInputChange}
                                  >
                                    <option value="">
                                      {t('is_this')}
                                    </option>
                                    <option value="yes">{t('yes')}</option>
                                    <option value="no">{t('no')}</option>
                                  </select>
                                  {errors.workHistory && <div className="fs-small" style={{ color: "red" }}>{errors.workHistory}</div>}

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
            <div className="my-2">
              <label className="form-label w-fit manrope_semibold cursor-pointer">
                {t('type_of_employee')}
              </label>

              <div className=" col-lg-4 col-md-6  col-12">
                <Tooltip
                  title={t('new_hr')}
                >
                  <div className="">
                    <select
                      required
                      className="form-select cursor-pointer py-3 custom_radius text-center"
                      value={employeeType} // Bind the value to state
                      onChange={handleChange}
                    >
                      <option value="">{t('select')}</option>{" "}
                      {/* Default placeholder option */}
                      <option value="newhire">{t('NewHire')}</option>
                      <option value="companystaff">{t('tab_2')}</option>
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
              <button disabled={loading} className="btn_" type="button" onClick={handleSubmit}>
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
    </div >
  );
};

export default Dashboard;
