/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { finabeelight, pdf } from "../icons/icon";
const Blog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
          <div className="flex gap-3 w-full">
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
                Admin profile
              </h6>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="text_primary  " style={{ fontWeight: "bolder" }}>
              Admin Portal
            </h5>
          </div>
          <div className="flex flex-wrap gap-3 ">
            {cardsData?.map((item, index) => {
              return (
                <>
                  <Card className="px-3 pt-3 bg_secondary border-black mt-3" style={{minWidth:"14rem",borderRadius:"13px"}}>
                    <div className="flex flex-col  ">
                      <p className="fw-bold fs-6"> {item?.type}</p>
                      <h5 className="fs-1 fw-bolder">{item.number}</h5>
                      <div className="d-flex gap-3">
                        <p className="text-success">{item?.percentage}</p>
                        <p className="fw-bold">{item?.perMonth}</p>
                      </div>
                    </div>
                  </Card>
                </>
              );
            })}
          </div>
          <div className="mt-4">
            <p className="text_secondary fw-bold">Calculations history</p>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company Name</th>
                  <th>Position</th>
                  <th>E-mail</th>
                  <th>Calculation Date</th>
                  <th>Savings Amount</th>
                  <th>Contacted Lead</th>
                  <th>Contact Date</th>
                  <th>Conversion</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(3)].map((_, index) => (
                  <tr key={index}>
                    <td>Text 1</td>
                    <td>Text 2</td>
                    <td>Text 3</td>
                    <td>E-mail</td>
                    <td>Date</td>
                    <td>Value</td>
                    <td>Yes/No</td>
                    <td>Date</td>
                    <td>
                      <button variant="link">+</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end pb-5">
            <button className="border-black"   > 
              <div className="d-flex align-items-center gap-3 bg_secondary px-4  py-2 "  style={{borderRadius:"50px", border:"1px solid black "}}>
              <img width="20px" src={pdf} alt="pdf"/>
              <p className="m-0 text-white">Export</p>
              </div>
            </button>

            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Blog;
