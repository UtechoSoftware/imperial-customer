/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import { Edit2, Trash2 } from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { del_hr_by_id, get_hr } from "../api/hr";

const NewTable = ({ updating, currentPage, setCurrentPage, totalPages, setTotalPages, setLoading, setTableData2, loading, tableData2 }) => {
  const [showModal2, setShowModal2] = useState(false);
  const [rowData, setRowData] = useState("");
  const login = useSelector((state) => state.data.data.isLogin_);
  const [delLoader, setDelLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      const storedDataCompany = JSON.parse(sessionStorage.getItem("hrData_company")) || [];
      if (storedDataCompany?.length > 0) {
        console.log(storedDataCompany);
        setTableData2(storedDataCompany);
        setLoading(false);
      } else {
        setTableData2(storedDataCompany);
        setLoading(false);
      }
    } else {
      fetchPageData(currentPage);
    }
  }, [currentPage, !login]);

  const fetchPageData = (page) => {
    setLoading(true)
    get_hr("companystaff", page)
      .then((res) => {
        setTableData2(res?.data?.data);
        setLoading(false)
        setTotalPages(res?.data?.count?.totalPage || 0); // Update total pages if provided by API
      })
      .catch(() => {
        setLoading(false)
        message.error("Failed to fetch data.");
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const editRow = (item) => {
    const params = new URLSearchParams();
    params.set("data", JSON.stringify(item));
    navigate({
      pathname: "/add-hr",
      search: params.toString(),
    });
  };

  const deleteRow = (data) => {
    setRowData(data?._id);
    setShowModal2(true);
  };

  return (
    <div>
      {/* Table Section */}
      <div className="table-responsive">
        {loading ? (
          <div
            style={{ height: "200px" }}
            className="d-flex justify-content-center align-items-center"
          >
            <CircularProgress style={{ color: "black" }} size={24} />
          </div>
        ) : (
          <Table bordered hover>
            <thead>
              <tr>
                <th>Identifier</th>
                <th>New Hiring</th>
                <th>Date of Birth</th>
                <th>IEFP</th>
                <th>IEFP Date</th>
                <th>Contract Type</th>
                <th>Start Date</th>
                <th>Salary</th>
                <th>Current SSC Rate</th>
                <th>Work History</th>
                <th>Savings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {tableData2?.map((employee, index) => (
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
                  {
                    login && (
                      <td>
                        <div className="d-flex flex-row  justify-content-center">
                          <Edit2 size={18} style={{ cursor: "pointer", color: "#b39d70", marginRight: "10px" }} onClick={() => editRow(employee, index)} />
                          <Trash2 size={18} style={{ cursor: "pointer", color: "black" }} onClick={() => deleteRow(employee, index)} />
                        </div>
                        {/* hello are */}
                      </td>
                    )
                  }
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      <div className="d-flex justify-content-center mt-3">
        {[...Array(totalPages).keys()].map((page) => (
          <Button
            key={page}
            variant={currentPage === page + 1 ? "primary" : "light"}
            onClick={() => handlePageChange(page + 1)}
            className="mx-1"
          >
            {page + 1}
          </Button>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal2} onHide={() => setShowModal2(false)} centered>
        <Modal.Header closeButton />
        <Modal.Body className="text-center">
          <h5>Are you sure you want to delete this record?</h5>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button onClick={() => setShowModal2(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setDelLoader(true);
                del_hr_by_id(rowData)
                  .then(() => {
                    message.success("Data deleted successfully");
                    setDelLoader(false);
                    setShowModal2(false);
                    fetchPageData(currentPage); // Refresh current page data
                  })
                  .catch(() => {
                    setDelLoader(false);
                    setShowModal2(false);
                  });
              }}
            >
              {delLoader ? <Spinner size="sm" /> : "Delete"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewTable;
