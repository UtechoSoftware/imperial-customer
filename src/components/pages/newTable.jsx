import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { del_hr_by_id, get_hr } from "../api/hr";
import { CircularProgress } from "@mui/material";
import { Edit2, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useTranslation } from "react-i18next";

const NewTable = ({ updating }) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false)
  const [showModal2, setShowModal2] = useState(false);
  const [delLoader, setDelLoader] = useState(false);
  const [rowData, setRowData] = useState("");
  const [delLoading, setDelLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
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
  }, [login, updating, delLoading]);
  const editRow = (item, index) => {
    console.log(item, "hello")
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
  console.log(tableData, "ttt")
  return (
    <div className="table-responsive">
      {loading && login ? (
        <div style={{ height: "200px" }} className="d-flex justify-content-center  align-items-center">
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
                {t('table_2-head_1')}
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {t('table_2-head_2')}
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {t('table_2-head_3')}
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {t('table_2-head_4')}
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {t('table_2-head_5')}
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {t('table_2-head_6')}
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {t('table_2-head_7')}
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {t('table_2-head_8')}
              </th>
              <th
                colSpan="1"
                style={{ whiteSpace: "nowrap", textAlign: "center" }}
              >
                {t('table_head_6')}
              </th>
              {
                login && (

                  <th
                    colSpan="1"
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                  >
                    {t('table_head_7')}
                  </th>
                )
              }
            </tr>
            <tr>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {t('table_2-head_10')}
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {t('table_2-head_11')}
              </th>
              <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                {t('table_2-head_12')}
              </th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
              <th>____</th>
              {
                login && (

                  <th>{t('table_head_14')}</th>
                )
              }

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
                <td>
                  {
                    login && (

                      <div className="d-flex flex-row  justify-content-center">

                        <Edit2 size={18} style={{ cursor: "pointer", color: "#b39d70", marginRight: "10px" }} onClick={() => editRow(employee, index)} />
                        <Trash2 size={18} style={{ cursor: "pointer", color: "black" }} onClick={() => deleteRow(employee, index)} />
                      </div>
                    )
                  }
                  {/* hello are */}
                </td>
              </tr>
            ))}
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
              {delLoader ? <Spinner size="sm" /> : t('del_btn')}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewTable;
