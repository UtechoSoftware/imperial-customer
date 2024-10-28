import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { get_hr } from "../api/hr";
import { CircularProgress } from "@mui/material";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Edit2, Trash2 } from "react-feather";
const CompanyTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const editRow = (index) => {
    console.log("Editing row at index:", index);
  };
  const deleteRow = (index) => {
    const newData = tableData.filter((_, i) => i !== index);
    setTableData(newData);
  };
  const login = useSelector((state) => state.data.data.isLogin_);
  useEffect(() => {
    if (!login) {
      setLoading(false);
      const storedData = JSON.parse(sessionStorage.getItem("hrData")) || [];
      setTableData(storedData);
    }
  }, [!login]);
  useEffect(() => {
    setLoading(true);

    if (login) {
      if (global.BASEURL) {
        get_hr("newhire")
          .then((res) => {
            setTableData(res?.data?.data);
            setLoading(false);
          })
          .catch((er) => {
            setLoading(false);
          });
      } else {
        setLoading(true);

      }
    }
  }, [login]);
  console.log(tableData, "tt");
  return (
    <div className="table-responsive">
      {loading && login ? (
        <div
          style={{ height: "200px" }}
          className="d-flex justify-content-center  align-items-center"
        >
          <CircularProgress
            style={{ color: "black" }}
            size={24}
            className="text_white"
          />
        </div>
      ) : (
        <Table bordered hover style={{ width: "900px" }}>
          <thead>
            <tr>
              <th colSpan="1" style={{ width: "175px" }}>
                Personal Data
              </th>
              <th colSpan="1" style={{ width: "175px" }}>
                Register as Unemployed
              </th>
              <th colSpan="2" style={{ width: "250px" }}>
                Contract Details
              </th>
              <th colSpan="1" style={{ width: "550px" }}>
                Company's Current Social Security Contribution Rate
              </th>
              <th colSpan="1" style={{ width: "150px" }}>
                Work History
              </th>
              <th colSpan="1" style={{ width: "175px" }}>
                Saving Calculattion
              </th>
            </tr>
            <tr>
              <th style={{ width: "175px" }}>DOB</th>
              <th style={{ width: "175px" }}>IEFP Reg Date</th>
              <th style={{ width: "125px" }}>Predicted Start Date</th>
              <th style={{ width: "125px" }}>Monthly Salary</th>
              <th style={{ width: "125px" }}>23.75% Or Other</th>
              <th style={{ width: "150px" }}>Yes</th>
              <th style={{ width: "150px" }}>______</th>
              <th style={{ width: "150px" }}>Actions</th>

            </tr>
          </thead>
          <tbody>
            {tableData?.length > 0 ? (
              tableData.map((data, index) => (
                <tr key={index}>
                  <td>
                    {data.dob
                      ? new Date(data.dob).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      : "N/A"}
                  </td>
                  <td>
                    {data.iefpDate
                      ? new Date(data.iefpDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      : "N/A"}
                  </td>

                  <td>
                    {data.startDate
                      ? new Date(data.startDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      : "N/A"}
                  </td>
                  <td>{data.salary || "N/A"}</td>
                  <td>{data.currentSSCRate || "N/A"}</td>
                  <td>{data.workHistory || "N/A"}</td>
                  <td> {data.saving !== null && data.saving !== undefined ? data?.saving.toFixed(2) : "N/A"}</td>
                  <td>
                    {/* hello are */}
                    <div className="d-flex flex-row  justify-content-center">

                      <Edit2 size={18} style={{ cursor: "pointer", color: "#b39d70", marginRight: "10px" }} onClick={() => editRow(index)} />
                      <Trash2 size={18} style={{ cursor: "pointer", color: "black" }} onClick={() => deleteRow(index)} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default CompanyTable;
