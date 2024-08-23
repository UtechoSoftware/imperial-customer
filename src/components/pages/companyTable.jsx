import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const CompanyTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Retrieve the data from sessionStorage
    const storedData = JSON.parse(sessionStorage.getItem("hrData")) || [];
    setTableData(storedData);
  }, []);
  return (
    <div className="table-responsive">
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
          </tr>
          <tr>
            <th style={{ width: "175px" }}>DOB</th>
            <th style={{ width: "175px" }}>IEFP Reg Date</th>
            <th style={{ width: "125px" }}>Predicted Start Date</th>
            <th style={{ width: "125px" }}>Monthly Salary</th>
            <th style={{ width: "125px" }}>23.75% Or Other</th>
            <th style={{ width: "150px" }}>Yes</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
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
    </div>
  );
};

export default CompanyTable;
