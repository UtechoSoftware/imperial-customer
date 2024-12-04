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
import { useTranslation } from "react-i18next";

const NewTable = ({ updating, currentPage, setCurrentPage, totalPages, setTotalPages, setLoading, setTableData2, loading, tableData2 }) => {
  const [showModal2, setShowModal2] = useState(false);
  const [rowData, setRowData] = useState("");
  const login = useSelector((state) => state.data.data.isLogin_);
  const [delLoader, setDelLoader] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation()

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

  const deleteRow = (data, index) => {
    if (login) {
      setRowData(data?._id);
    } else {
      setRowData(data?.id)
    }
    setShowModal2(true)
  };


  const handleDelete = () => {
    const existingData = JSON.parse(sessionStorage.getItem("hrData_company")) || [];
    const updatedData = existingData.filter((item) => item.id !== rowData);
    sessionStorage.setItem("hrData_company", JSON.stringify(updatedData));
    setTableData2(updatedData);
    setShowModal2(false);
    message.success("Data deleted successfully");
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
                <th>{t('table_comp_1')}</th>
                <th>{t('table_comp_2')}</th>
                <th>{t('table_comp_3')}</th>
                <th>{t('table_comp_4')}</th>
                <th>{t('table_comp_11')}</th>
                <th>{t('table_comp_5')}</th>
                {/* <th>{t('table_comp_6')}</th> */}
                <th>{t('table_comp_7')}</th>
                <th>{t('table_comp_8')}</th>
                <th>{t('table_comp_9')}</th>
                <th>{t('table_comp_10')}</th>
                <th>{t('table_comp_12')}</th>
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
                  {/* <td>
                    {employee.startDate
                      ? new Date(employee.startDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      : "N/A"}
                  </td> */}
                  <td style={{ textAlign: "center" }}>{employee.salary}</td>
                  <td style={{ textAlign: "center" }}>
                    {employee.currentSSCRate}
                  </td>
                  <td style={{ textAlign: "center" }}>{employee.workHistory}</td>
                  <td style={{ textAlign: "center" }}>
                    {employee.saving !== null && employee.saving !== undefined ? employee?.saving.toFixed(2) : "N/A"}

                  </td>
                  {/* {
                    login && ( */}
                  <td>
                    <div className="d-flex flex-row  justify-content-center">
                      <Edit2 size={18} style={{ cursor: "pointer", color: "#b39d70", marginRight: "10px" }} onClick={() => editRow(employee, index)} />
                      <Trash2 size={18} style={{ cursor: "pointer", color: "black" }} onClick={() => deleteRow(employee, index)} />
                    </div>
                    {/* hello are */}
                  </td>
                  {/* )
                  } */}
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
            {login ? <Button
              onClick={() => {
                setDelLoader(true);
                del_hr_by_id(rowData)
                  .then(() => {
                    setTableData2((prevData) => prevData.filter((item) => item._id !== rowData));
                    message.success("Data deleted successfully");
                    setDelLoader(false);
                    setShowModal2(false);
                    fetchPageData(currentPage);
                  })
                  .catch(() => {
                    setDelLoader(false);
                    setShowModal2(false);
                  });
              }}
            >
              {delLoader ? <Spinner size="sm" /> : "Delete"}
            </Button> : <Button
              onClick={handleDelete}
              style={{ backgroundColor: "#161920" }}
              className="me-2"
            >
              Delete
            </Button>}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewTable;
