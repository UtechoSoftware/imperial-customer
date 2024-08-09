import React from 'react'
import { Table } from 'react-bootstrap'

const NewTable = () => {
    const employeeData = [
        {
          employeeType: "New Hire",
          identifier: "12345",
          newHiring: "01/01/2023",
          dob: "01/01/1990",
          iefp: "Yes",
          iefpDate: "02/02/2023",
          employmentContractType: "open-ended contract",
          startDate: "03/03/2023",
          salary: "$3000",
          currentSSCRate: "23,75%",
          workHistory: "No"
        },
       
      ];
  return (
    <div className='table-responsive'>
    <Table bordered hover>
    <thead>
      <tr>
        <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Type of Employee</th>
        <th colSpan="3" style={{ whiteSpace: "nowrap", textAlign: "center" }}>Personal Data</th>
        <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>IEFP Status</th>
        <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>IEFP Registration Date</th>
        <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Contract Type</th>
        <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Contract Start Date</th>
        <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Salary</th>
        <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Social Security Contribution Rate</th>
        <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Employee's Work History</th>
      </tr>
      <tr>
        <th></th>
        <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Unique Identifier</th>
        <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Hiring Date</th>
        <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Date of Birth</th>
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
      {employeeData?.map((employee, index) => (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{employee.employeeType}</td>
          <td style={{ textAlign: "center" }}>{employee.identifier}</td>
          <td style={{ textAlign: "center" }}>{employee.newHiring}</td>
          <td style={{ textAlign: "center" }}>{employee.dob}</td>
          <td style={{ textAlign: "center" }}>{employee.iefp}</td>
          <td style={{ textAlign: "center" }}>{employee.iefpDate}</td>
          <td style={{ textAlign: "center" }}>{employee.employmentContractType}</td>
          <td style={{ textAlign: "center" }}>{employee.startDate}</td>
          <td style={{ textAlign: "center" }}>{employee.salary}</td>
          <td style={{ textAlign: "center" }}>{employee.currentSSCRate}</td>
          <td style={{ textAlign: "center" }}>{employee.workHistory}</td>
        </tr>
      ))}
    </tbody>
  </Table>
  </div>
  )
}

export default NewTable