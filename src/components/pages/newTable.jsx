// import React, { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";

// const NewTable = () => {
//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     // Retrieve the data from sessionStorage
//     const storedData =
//       JSON.parse(sessionStorage.getItem("hrData_company")) || [];
//     setTableData(storedData);
//   }, []);
//   console.log(tableData,)
 
//   return (
//     <div className="table-responsive">
//       <Table bordered hover>
//         <thead>
//           <tr>
//             <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//               Type of Employee
//             </th>
//             <th
//               colSpan="3"
//               style={{ whiteSpace: "nowrap", textAlign: "center" }}
//             >
//               Personal Data
//             </th>
//             <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//               IEFP Status
//             </th>
//             <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//               IEFP Registration Date
//             </th>
//             <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//               Contract Type
//             </th>
//             <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//               Contract Start Date
//             </th>
//             <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//               Salary
//             </th>
//             <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//               Social Security Contribution Rate
//             </th>
//             <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//               Employee's Work History
//             </th>
//           </tr>
//           <tr>
//             <th></th>
//             <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//               Unique Identifier
//             </th>
//             <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//               Hiring Date
//             </th>
//             <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
//               Date of Birth
//             </th>
//             <th></th>
//             <th></th>
//             <th></th>
//             <th></th>
//             <th></th>
//             <th></th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData?.map((employee, index) => (
//             <tr key={index}>
//               <td style={{ textAlign: "center" }}>{employee.employeeType}</td>
//               <td style={{ textAlign: "center" }}>{employee.identifier}</td>
//               <td>
//                 {employee.newHiring
//                   ? new Date(employee.newHiring).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     })
//                   : "N/A"}
//               </td>
//               <td>
//                 {employee.dob
//                   ? new Date(employee.dob).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     })
//                   : "N/A"}
//               </td>

//               <td style={{ textAlign: "center" }}>{employee.iefp}</td>
//               <td>
//                 {employee.iefpDate
//                   ? new Date(employee.iefpDate).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     })
//                   : "N/A"}
//               </td>

//               <td style={{ textAlign: "center" }}>
//                 {employee.employmentContractType}
//               </td>
//               <td>
//                 {employee.startDate
//                   ? new Date(employee.startDate).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     })
//                   : "N/A"}
//               </td>

//               <td style={{ textAlign: "center" }}>{employee.salary}</td>
//               <td style={{ textAlign: "center" }}>{employee.currentSSCRate}</td>
//               <td style={{ textAlign: "center" }}>{employee.workHistory}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default NewTable;
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const NewTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Retrieve the data from sessionStorage
    const storedData =
      JSON.parse(sessionStorage.getItem("hrData_company")) || [];
    setTableData(storedData);
  }, []);

  return (
    <div className="table-responsive">
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
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
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
              <td style={{ textAlign: "center" }}>{employee.currentSSCRate}</td>
              <td style={{ textAlign: "center" }}>{employee.workHistory}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NewTable;

