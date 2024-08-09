import React from 'react'
import { Table } from 'react-bootstrap'

const CompanyTable = () => {
  return (
    <div className='table-responsive'>

      <Table  bordered hover >
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
          <th style={{ width: "125px" }}>23.75%</th>
          <th style={{ width: "150px" }}>Yes</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr key={index}>
            <td>Text 1</td>
            <td>Text 2</td>
            <td>Text 3</td>
            <td>E-mail</td>
            <td>Date of Birth</td>
            <td>yes</td>
            
            {/* <td>
              <button variant="link">+</button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </Table>
      </div>
  )
}

export default CompanyTable