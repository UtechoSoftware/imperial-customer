import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { del_hr, del_hr_by_id, get_hr } from "../api/hr";
import { CircularProgress } from "@mui/material";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Edit2, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useTranslation } from "react-i18next";
const CompanyTable = ({ updating, setTableData, tableData, newHire, tableloading }) => {
  const { t, i18n } = useTranslation();
  // const [tableData, setTableData] = useState([]);
  const [showModal2, setShowModal2] = useState(false);
  const [delLoader, setDelLoader] = useState(false);
  const [rowData, setRowData] = useState("");
  const [loading, setLoading] = useState(false);
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
  const deleteRow = (data, index) => {
    setRowData(data?._id)
    setShowModal2(true)
  };
  const login = useSelector((state) => state.data.data.isLogin_);
  useEffect(() => {
    if (!login) {
      setLoading(false);
      const storedData = JSON.parse(sessionStorage.getItem("hrData")) || [];
      if (storedData?.length > 0 && storedData[0].type === "newhire") {
        setTableData(storedData);
      } else {
        setTableData([]);
      }
    }
  }, [!login, tableloading]);
  console.log(tableData, "loading")
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
  }, [login, updating, delLoading,]);
  return (
    <div className="table-responsive">
      {(loading && login) || tableloading ? (
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
                login && (

                  <th colSpan="1" style={{ width: "175px" }}>
                    {t('table_head_7')}
                  </th>
                )
              }
            </tr>
            <tr className="text-nowrap">
              <th style={{ width: "175px" }}>{t('table_head_8')}</th>
              <th style={{ width: "175px" }}>{t('table_head_9')}</th>
              <th style={{ width: "125px" }}>{t('table_head_10')}</th>
              <th style={{ width: "125px" }}>{t('table_head_11')}</th>
              <th style={{ width: "125px" }}>{t('table_head_12')}</th>
              <th style={{ width: "150px" }}>{t('table_head_13')}</th>
              <th style={{ width: "150px" }}>______</th>
              {
                login && (

                  <th style={{ width: "150px" }}>{t('table_head_14')}</th>
                )
              }

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
                  {
                    login && (
                      <td>
                        {/* hello are */}
                        <div className="d-flex flex-row  justify-content-center">
                          <Edit2 size={18} style={{ cursor: "pointer", color: "#b39d70", marginRight: "10px" }} onClick={() => editRow(data, index)} />
                          <Trash2 size={18} style={{ cursor: "pointer", color: "black" }} onClick={() => deleteRow(data, index)} />
                        </div>
                      </td>
                    )
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
            <Button
              style={{ backgroundColor: "#161920" }}
              className="me-2"
              onClick={() => {
                setDelLoader(true);
                setDelLoading(true)
                del_hr_by_id(rowData)
                  .then((res) => {
                    if (res) {
                      setDelLoader(false);
                      setDelLoading(false)
                      message.success("Data deleted successfully");
                      setShowModal2(false);
                    }
                  })
                  .catch(() => {
                    setDelLoader(false);
                    setDelLoading(false)
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

export default CompanyTable;
