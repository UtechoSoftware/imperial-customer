/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { CircularProgress } from "@mui/material";
import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ArrowLeft } from "react-feather";
import { useNavigate } from "react-router-dom";
import { create_faq } from "../../api/faqs";
import { axiosInstance } from "../../api/axiosIntance";

const AddVoucher = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true);
    const dataToSubmit = {
      title: title,
      subtitle: description,
    };
    setIsProcessing(true);
    try {
      await create_faq(dataToSubmit)
        .then((res) => {
          if (res) {
            navigate("/faqs");
            console.log(res, "res");
            message.success("faq added successfully");
            setIsProcessing(false);
          }
        })
        .catch((err) => {
          setIsProcessing(false);
        });
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      message.error(error?.response?.data?.message);
    }
  };

  const handleFetchCategory = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": global.TOKEN,
    };
    try {
      const res = await axiosInstance.get(`api/faq_cat/admin/all/1`, {
        headers,
      });
      setCategories(res?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchCategory();
  }, [categoryId]);
  return (
    <main className="min-h-screen lg:container py-4 px-4 ">
      <div className="d-flex gap-4 align-items-start w-full">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              navigate("/faqs");
            }}
            className="flex items-center justify-center p-2 bg_primary rounded-3"
          >
            <ArrowLeft className="text_white" />
          </button>
        </div>
        <div className="flex flex-col mb-3 w-full">
          <h4 className="plusJakara_semibold text_black">Add Faq</h4>
          <p className="text_secondary plusJakara_regular">
            Information about your current plan and usages
          </p>
        </div>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="w-full bg_white rounded-3 shadow-md p-4"
      >
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
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 200))}
            style={{ padding: "10px 20px" }}
            className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
            placeholder="Enter Description"
            rows={5} // Adjust the number of rows as needed
          />
          <div className="text-end">{description.length}/200</div>
        </Form.Group>

        <div className="flex justify-content-end my-4 w-100">
          <button
            style={{ borderRadius: "15px", width: "12rem" }}
            type="submit"
            className="  bg_primary  text-white px-5 py-2 text-lg inter_regular flex justify-center items-center"
          >
            {isProcessing ? (
              <CircularProgress
                style={{ color: "white" }}
                size={24}
                className="text_white"
              />
            ) : (
              "Add Faq"
            )}
          </button>
        </div>
      </Form>
    </main>
  );
};

export default AddVoucher;
