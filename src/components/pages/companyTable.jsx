/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import { message } from "antd";
import React, { useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import { Edit2, Trash2 } from "react-feather";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { del_hr_by_id } from "../api/hr";
const CompanyTable = ({ loading, setTableData, tableData, currentPage, totalPages, setTotalPages, setCurrentPage }) => {
  const { t, i18n } = useTranslation();
  const [showModal2, setShowModal2] = useState(false);
  const [delLoader, setDelLoader] = useState(false);
  const [rowData, setRowData] = useState("");
  const storedData = JSON.parse(sessionStorage.getItem("hrData_company")) || [];
  const storedData2 = JSON.parse(sessionStorage.getItem("hrData")) || [];
  const [delLoading, setDelLoading] = useState(false);
  const navigate = useNavigate();
  const editRow = (item, index) => {
    const params = new URLSearchParams();
    params.set('data', JSON.stringify(item))
    navigate({
      pathname: '/add-hr',
      search: params.toString()
    })
  };

  console.log(storedData2);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = () => {
    const existingData = JSON.parse(sessionStorage.getItem("hrData")) || [];
    const updatedData = existingData.filter((item) => item.id !== rowData);
    sessionStorage.setItem("hrData", JSON.stringify(updatedData));
    setTableData(updatedData);
    setShowModal2(false);
    message.success("Data deleted successfully");
  };

  const deleteRow = (data, index) => {
    if (login) {
      setRowData(data?._id)
    } else {
      setRowData(data?.id)
    }
    setShowModal2(true)
  };

  const login = useSelector((state) => state.data.data.isLogin_);
  return (
    <>
      <div className="table-responsive">
        {loading ? (
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
              <tr className="text-nowrap">
                <th>{t('table_comp_3')}</th>
                <th colSpan="1" style={{ width: "175px" }}>
                  {t('table_head_1')}
                </th>
                <th colSpan="1" style={{ width: "175px" }}>
                  {t('table_head_2')}

                </th>
                <th colSpan="2" style={{ width: "250px" }}>
                  {t('table_head_3')}
                </th>
                <th colSpan="1" style={{ width: "550px" }}>
                  {t('table_head_4')}
                </th>
                <th colSpan="1" style={{ width: "150px" }}>
                  {t('table_head_5')}
                </th>
                <th colSpan="1" style={{ width: "175px" }}>
                  {t('table_head_6')}
                </th>
                {
                  // login && (
                  <th colSpan="1" style={{ width: "175px" }}>
                    {t('table_head_7')}
                  </th>
                  // )
                }
              </tr>
              <tr className="text-nowrap">
                <th style={{ width: "175px" }}>______</th>
                <th style={{ width: "175px" }}>{t('table_head_8')}</th>
                <th style={{ width: "175px" }}>{t('table_head_9')}</th>
                <th style={{ width: "125px" }}>{t('table_head_10')}</th>
                <th style={{ width: "125px" }}>{t('table_head_11')}</th>
                <th style={{ width: "125px" }}>{t('table_head_12')}</th>
                <th style={{ width: "150px" }}>{t('table_head_13')}</th>
                <th style={{ width: "150px" }}>______</th>
                {
                  // login && (

                  <th style={{ width: "150px" }}>{t('table_head_14')}</th>
                  // )
                }

              </tr>
            </thead>
            <tbody>
              {tableData?.length > 0 ? (
                tableData.map((data, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{data.identifier || 'N/A'}</td>
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
                    {
                      // login && (
                      <td>
                        {/* hello are */}
                        <div className="d-flex flex-row  justify-content-center">
                          <Edit2 size={18} style={{ cursor: "pointer", color: "#b39d70", marginRight: "10px" }} onClick={() => editRow(data, index)} />
                          <Trash2 size={18} style={{ cursor: "pointer", color: "black" }} onClick={() => deleteRow(data, index)} />
                        </div>
                      </td>
                      // )
                    }
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    {t('not_found')}
                  </td>
                </tr>
              )}

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
      <Modal show={showModal2} onHide={() => setShowModal2(false)} centered>
        <Modal.Header
          className="border-0 mt-2 mr-2 p-0"
          closeButton
        ></Modal.Header>
        <Modal.Body className="text-center">
          <h5>{t('are_you_sure')}</h5>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button style={{ backgroundColor: "#B39D70" }}
              onClick={() => setShowModal2(false)}
            >
              {t('cancel_btn')}
            </Button>
            {login ?
              <Button
                style={{ backgroundColor: "#161920" }}
                className="me-2"
                onClick={() => {
                  setDelLoader(true);
                  setDelLoading(true);
                  del_hr_by_id(rowData)
                    .then((res) => {
                      if (res) {
                        setTableData((prevData) => prevData.filter((item) => item._id !== rowData));
                        message.success("Data deleted successfully");
                        setDelLoader(false);
                        setDelLoading(false);
                        setShowModal2(false);
                      }
                    })
                    .catch(() => {
                      message.error("Failed to delete the data");
                      setDelLoader(false);
                      setDelLoading(false);
                      setShowModal2(false);
                    });
                }}
              >
                {delLoader ? <Spinner size="sm" /> : "Delete"}
              </Button>
              : <Button
                onClick={handleDelete}
                style={{ backgroundColor: "#161920" }}
                className="me-2"
              >
                Delete
              </Button>}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CompanyTable;
