/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  course1,
  course2,
  course3,
  course4,
  course5,
  fileavatar,
  testpdf,
} from "../../icons/icon";
import { Link, useNavigate } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import ProductTable from "../../DataTable/productTable";
import { Edit, Trash2 } from "react-feather";
import axios from "axios";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { Select, message } from "antd";
import { CircularProgress } from "@mui/material";
import { Input } from "reactstrap";
import CKEditorComponent from "../../../newCk";
import { ErrorHandler } from "../errorHandler";
import { del_faq } from "../../api/faqs";
import { axiosInstance } from "../../api/axiosIntance";

const Voucher = () => {
  const [ckdata, setckData] = useState(null);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [delLoader, setDelLoader] = useState(false)
  const [showModal2, setShowModal2] = useState(false)

  const [Description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState("");
  const [productdata, setProductData] = useState([]);
  const [honeypots, setHoneypots] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setCount] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleFetchCategory = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": global.TOKEN,
    };
    try {
      const res = await axiosInstance.get(`api/faq_cat/admin/all/`, {
        headers,
      });
      setCategories(res?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(category, "rrr");
  useEffect(() => {
    handleFetchCategory();
    setDescription(selectedItem?.description);
    setTitle(selectedItem?.title);
    setCategory(selectedItem?.category?.name);
  }, [showModal, selectedItem]);

  const handleShow = (item) => {
    setSelectedItem(item);
    console.log(item?._id, "rr");
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const data = [
    {
      name: "Category",
      sortable: true,
      cell: (row) => row?.category?.name,
    },
    {
      name: "Name",
      sortable: true,
      cell: (row) => row?.title,
    },
    {
      name: "Description",
      maxWidth: "200px",
      sortable: true,
      selector: (row) => row?.description,
    },
    {
      name: "Action",
      allowoverflow: true,
      cell: (row) => {
        return (
          <div className="flex gap-1">
            <button
              onClick={() => handleShow(row)}
              style={{ backgroundColor: "#06d6a0" }}
              className="blex justify-center inter_medium text-xs text_white rounded-3 p-2 items-center"
            >
              <Edit size={16} />
            </button>
            <button onClick={() => {
              setShowModal2(true)
              setSelectedItem(row?._id)
            }} style={{ backgroundColor: '#ff6f61' }} className="flex justify-center inter_medium text-xs text_white rounded-2 p-1 items-center"><Trash2 size={16} /></button>
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": `${global.TOKEN}`,
    };
    try {
      const res = await axiosInstance.get(
        `api/faq/admin/${lastId}/${search}`,
        { headers }
      );
      if (res?.data) {
        setProductData(res?.data?.Faqs);
        setCount(res?.data?.count?.totalPage);
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": global.TOKEN,
    };
    const formData = {
      category: category,
      title: title,
      description: Description,
    };
    try {
      const res = await axiosInstance.put(
        `api/faq/edit/${selectedItem?._id}`,
        formData,
        { headers }
      );
      console.log(res);
      if (res?.data) {
        message.success("Faqs Updated successfully");
        navigate("/faqs");
        setShowModal(false);
        fetchData();
        let array = [...productdata]
        const index = array?.findIndex((item => item?._id === selectedItem?._id))
        if (index !== -1) {
          array[index] = res?.data?.Faqs
          setProductData(array)
        }
      }
    } catch (error) {
      setIsProcessing(false);
      ErrorHandler(error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    setShowSearch(true);
    setloading(true);
    fetchData();
  }, [lastId, search]);
  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["sortActive"].includes(prop)}
    >
      <main className="min-h-screen lg:container py-4 px-4 mx-auto">
        <div className="flex justify-between flex-wrap gap-3 items-center w-full">
          <div className="flex flex-col mb-3">
            <h2 className="plusJakara_bold text_black">Faqs</h2>
            <h6 className="text_secondary plusJakara_regular">
              Information about your current plan and usages
            </h6>
          </div>
        </div>
        <div className="my-4 w-full">
          <ProductTable
            loading={loading}
            count={count}
            setSearch={setSearch}
            search={search}
            setCurrentPage={setLastId2}
            currentPage={lastId2}
            navigation={"/faq/add-faq"}
            buttontext="Add Faq"
            showSearch={showSearch}
            columns={data}
            data={productdata}
            setLastId={setLastId}
          />
        </div>
      </main>
      {selectedItem && (
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Body>
            <div className="d-flex justify-end">
              <Button
                onClick={() => setShowModal(false)}
                className="btn btn-close bg-white"
              ></Button>
            </div>
            <h4 className="mb-0 mt-4 px-3">Edit Faq</h4>
            <Form
              onSubmit={handleSubmit}
              className="w-full bg_white rounded-3  py-4"
            >
              <Form.Group className="shadow_def px-3 mb-3">
                <Form.Label className="plusJakara_semibold text_dark">
                  Choose Category
                </Form.Label>
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  size="large"
                  className="custom_control rounded-2 plusJakara_regular text_secondarydark bg_white"
                  placeholder="Select..."
                  value={category}
                  required
                  allowClear
                  onChange={(e) => setCategory(e)}
                >
                  {categories?.map((item, i) => (
                    <Select.Option key={i} value={item?._id}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Group>
              <Form.Group className="shadow_def px-3 mb-3">
                <Form.Label className="plusJakara_semibold text_dark">
                  Faq Name
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ padding: "10px 20px" }}
                  className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
                  placeholder="Enter Name"
                />
              </Form.Group>
              <Form.Group className="shadow_def px-3 mb-3">
                <Form.Label className="plusJakara_semibold text_dark">
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  required
                  value={Description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                  style={{ padding: "10px 20px" }}
                  className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
                  placeholder="Enter Description"
                  rows={5} // Adjust the number of rows as needed
                />
                <div className="text-end">{Description?.length}/200</div>
              </Form.Group>

              <div className="flex justify-content-end my-4 w-100">
                {!isProcessing ? (
                  <button
                    type="submit"
                    disabled={fileLoading}
                    className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
                  >
                    <span className="plusJakara_semibold text_white">
                      Edit Faq
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isProcessing}
                    className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center"
                  >
                    <CircularProgress size={18} className="text_white" />
                  </button>
                )}
              </div>
            </Form>
          </Modal.Body>
        </Modal>

      )}
      <Modal show={showModal2} onHide={() => setShowModal2(false)} centered>
        <Modal.Header className='border-0 mt-2 mr-2 p-0' closeButton>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <h5>Are you sure?</h5>
          <div className='d-flex justify-content-center mt-4'>
            <Button
              variant="danger"
              className='me-2'
              onClick={() => {
                let rowArray = [...categories];
                const index = rowArray.findIndex(
                  (value) => value?._id === selectedItem?._id
                );
                setDelLoader(true)
                del_faq(selectedItem).then((res) => {
                  fetchData()
                  setShowModal2(false)
                  setDelLoader(false)
                  if (index !== -1) {
                    rowArray?.splice(index, 1);
                    setCategories(rowArray);
                    message.success('category deleted successfully')
                  }

                }).catch((er) => {
                  setShowModal2(false)
                  setDelLoader(false)

                })
              }}
            >
              {delLoader ?
                <Spinner size='sm' /> :
                "Delete"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowModal2(false)}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </StyleSheetManager>
  );
};

export default Voucher;
