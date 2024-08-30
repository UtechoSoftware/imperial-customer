import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { get_hr } from "../api/hr";
import { CircularProgress } from "@mui/material";

const NewTable = () => {
  const [loading,setLoading]=useState(false)
  const [tableData, setTableData] = useState([]);
  const login = useSelector((state) => state.data.data.isLogin_);
  useEffect(() => {
    if (!login) {
      setLoading(false)
      const storedData =
        JSON.parse(sessionStorage.getItem("hrData_company")) || [];
      setTableData(storedData);
    }
  }, [!login]);
  useEffect(() => {
    setLoading(true)
    if (login) {
      get_hr("companystaff")
        .then((res) => {
    setLoading(false)

          setTableData(res?.data?.data);
        })
        .catch((er) => {
    setLoading(false)

        });
    }
  }, [login]);
  console.log(tableData,"ttt")
  return (
    <div className="table-responsive">
      {loading && login ? (
        <div style={{height:"200px"}} className="d-flex justify-content-center  align-items-center">
          <CircularProgress
            style={{ color: "black" }}
            size={24}
            className="text_white"
          />
        </div>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th
                colSpan="3"
                style={{ whiteSpace: "nowrap", textAlign: "center" }}
              >
                Personal Data
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                IEFP Status
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                IEFP Registration Date
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                Contract Type
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                Contract Start Date
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                Salary
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                Social Security Contribution Rate
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                Employee's Work History
              </th>
              <th
                colSpan="1"
                style={{ whiteSpace: "nowrap", textAlign: "center" }}
              >
                Saving Calculation
              </th>
            </tr>
            <tr>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                Unique Identifier
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                Hiring Date
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                Date of Birth
              </th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
            </tr>
          </thead>

          <tbody>
            {tableData?.map((employee, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{employee.identifier}</td>
                <td>
                  {employee.newHiring
                    ? new Date(employee.newHiring).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "N/A"}
                </td>
                <td>
                  {employee.dob
                    ? new Date(employee.dob).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "N/A"}
                </td>

                <td style={{ textAlign: "center" }}>{employee.iefp}</td>
                <td>
                  {employee.iefpDate
                    ? new Date(employee.iefpDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "N/A"}
                </td>

                <td style={{ textAlign: "center" }}>
                  {employee.employmentContractType}
                </td>
                <td>
                  {employee.startDate
                    ? new Date(employee.startDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "N/A"}
                </td>

                <td style={{ textAlign: "center" }}>{employee.salary}</td>
                <td style={{ textAlign: "center" }}>
                  {employee.currentSSCRate}
                </td>
                <td style={{ textAlign: "center" }}>{employee.workHistory}</td>
                <td style={{ textAlign: "center" }}>
                {employee.saving !== null && employee.saving !== undefined ? employee?.saving.toFixed(2) : "N/A"}

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default NewTable;
