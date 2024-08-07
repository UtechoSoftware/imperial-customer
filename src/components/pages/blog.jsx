/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { avatarman, finabeelight } from "../icons/icon";
import { TextField } from "@mui/material";
const Blog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };
  const [lastId, setLastId] = useState(1);
  const [count, setcount] = useState(1);
  const [totalCount, setTotalCount] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [blogs, setBlogs] = useState([]);
  // const fetchData = async () => {
  //   setLoading(true)
  //   get_blog(lastId)
  //     .then((res) => {
  //       if (res?.data) {
  //         setBlogs(res?.data?.blogs);
  //         setTotalCount(res?.data?.count?.totalPage || 0);
  //   setLoading(false)

  //       }
  //     })
  //     .catch((er) => {
  //   setLoading(false)

  //     });

  // };
  const cardsData = [
    {
      type: "Visitors",
      number: "1.234",
      percentage: "+18%",
      perMonth: "+2.8k this month",
    },
    {
      type: "Support requests",
      number: "50",
      percentage: "+7%",
      perMonth: "+5 this month",
    },
    {
      type: "Contacted Leads",
      number: "25",
      percentage: "-5%",
      perMonth: "-2 this month",
    },
    {
      type: "Conversions",
      number: "5",
      percentage: "+20%",
      perMonth: "+1 this month",
    },
  ];
  const handleShowMore = async () => {
    setLoading2(true);
    setcount(count + 1);
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": `${global.TOKEN}`,
    };
    try {
      const res = await axios.get(
        `${global.BASEURL}api/blog/admin/${lastId + 1}`,
        { headers }
      );
      if (res?.data) {
        setBlogs((prevblogs) => [...blogs, ...res?.data?.blogs]);
        setTotalCount(res?.data?.count?.totalPage || 0);
      }
      setLoading2(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };

  // useEffect(() => {
  //   fetchData();
  //   setcount(1);
  // }, [lastId]);

  return (
    <>
      <div className="pt-5">
        <main className="min-h-screen lg:container  px-5 pt-4 mx-auto ">
          <div className="flex gap-2 w-full">
            <div>
              <img src={finabeelight} width="50px" alt="logo" />
            </div>
            <div className="flex flex-col mb-3 w-full">
              <h6
                className="plusJakara_bold text_black text-md "
                style={{ fontWeight: "bold" }}
              >
                Imperial Age
              </h6>
              <h6
                className="text_para  plusJakara_regular"
                style={{ fontSize: "14px" }}
              >
                Customer profile
              </h6>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="text_primary  " style={{ fontWeight: "bolder" }}>
              Edit Profile
            </h5>


          </div>
          <div className="d-flex flex-column flex-md-row gap-3 w-100 align-items-center">
            <Form.Group
              className="rounded-lg py-3 text-center"
              controlId="exampleForm.ControlInput1"
            >
              <label htmlFor="fileInput" className="cursor-pointer">
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    alt=""
                    className="rounded-circle"
                    style={{
                      width: "4.5rem",
                      height: "4.5rem",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={avatarman}
                      alt=""
                      className="rounded-circle"
                      style={{ width: "4.5rem", height: "4.5rem" }}
                    />
                  </div>
                )}
              </label>
              <Form.Control
                type="file"
                id="fileInput"
                className="d-none"
                onChange={handleFileChange}
                ref={inputRef}
              />
            </Form.Group>
            <Button
              onClick={handleButtonClick}
              className="fw-bold text-white bg-dark btn-sm btn-md rounded-lg px-3 px-md-4 py-2"
            >
              Upload new
            </Button>
            <Button
              onClick={() => setSelectedFile(null)}
              variant="outline-dark"
              className="fw-bold text-dark bg-white btn-sm btn-md rounded-lg px-3 px-md-4 py-2"
            >
              Delete
            </Button>
          </div>

          <Form
            className="d-flex flex-wrap justify-content-between"
            // onSubmit={handleSubmit} // Uncomment and define handleSubmit if you have a form submit handler
          >
            <Form.Group className="w-100 mb-3">
              <Form.Label>Name</Form.Label>
              <div className="modal_form">
                <Form.Control type="text" placeholder="Insert your name" />
              </div>
            </Form.Group>

            <Form.Group className="w-100 mb-3">
              <Form.Label>Company Name</Form.Label>
              <div className="modal_form">
                <Form.Control
                  type="text"
                  placeholder="Insert the company’s name"
                />
              </div>
            </Form.Group>

            <Form.Group className="w-100 mb-3">
              <Form.Label>Position</Form.Label>
              <div className="modal_form">
                <Form.Control
                  type="text"
                  placeholder="Insert your position in the company"
                />
              </div>
            </Form.Group>

            <Form.Group className="w-100 mb-3">
              <Form.Label>Password</Form.Label>
              <div className="modal_form">
                <Form.Control
                  type="password"
                  placeholder="Insert your password"
                />
              </div>
            </Form.Group>

            <Form.Group className="w-100 mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <div className="modal_form">
                <Form.Control type="password" placeholder="Confirm password" />
              </div>
            </Form.Group>

            <div className=" mb-4 mt-3 ms-auto">
              <button
                style={{ borderRadius: "15px", width: "12rem" }}
                type="submit"
                className="bg_primary text-white px-5 py-2 text-lg inter_regular d-flex justify-content-center align-items-center"
              >
                Edit Profile
              </button>
            </div>
          </Form>
        </main>
      </div>
    </>
  );
};

export default Blog;
