/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Edit } from "react-feather";
import { MdPreview } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FreeMode, Navigation, Pagination } from "swiper";
import "swiper/css";
import { Table, Modal, Button, Select } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "../styles/swiper.css";
import ProductTable from "../DataTable/productTable";
const CourseContent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setCount] = useState(0);
  const [categoryId, setCategoryId] = useState('all')
  const [categories, setCategories] = useState([])
  const [courseCategories, setCourseCategories] = useState([]);

  const fetchCourses = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': `${global.TOKEN}`,
    };
    setLoading(true);
    try {
      const res = await axios.get(`${global.BASEURL}api/courses/admin/${categoryId}/${lastId}`, { headers });
      if (res?.data) {
        setCategories(res?.data?.courses);
        setCount(res?.data?.count?.totalPage);
        setLoading(false);
      } else {
        setCategories([]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [lastId, categoryId]);

  const handleCoursesDetail = (item) => {
    console.log(item);
    navigate(`${"/course-content"}/${item?._id}`, {
      state: { courseDetail: item },
    });
  };

  const fetchData = async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": `${global.TOKEN}`,
    };
    try {
      const res = await axios.get(
        `${global.BASEURL}api/categories/admin/all`,
        { headers }
      );
      if (res?.data) {
        setCourseCategories(res?.data?.categories);
      }
      else {
        setCourseCategories([]);
        setCategoryId('all')
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      name: "Educational Pathway",
      sortable: true,
      minWidth: '200px',
      selector: row => row?.category?.name
    },
    {
      name: "Course Name",
      sortable: true,
      selector: (row) => row?.title
    },
    {
      name: 'Action',
      sortable: true,
      cell: (row) => (
        <div className="flex gap-1">
          <Button
            style={{ backgroundColor: '#ff6f61', color: 'white' }}
            icon={<EyeOutlined />}
            onClick={() => handleCoursesDetail(row)}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="min-h-screen lg:container py-4 px-4 mx-auto">
      <div className="flex justify-between gap-3 items-center w-full">
        <div className="flex flex-col mb-3 w-full">
          <h2 className="plusJakara_bold text_black">All Courses</h2>
          <h6 className="text_secondary plusJakara_regular">
            Information about your current plan and usages
          </h6>
        </div>
        <button
          onClick={() => {
            navigate("/course-content/add-content");
          }}
          style={{ width: "150px" }}
          className="bg_primary py-3 rounded-3 text_white plusKajara_semibold"
        >
          Add New
        </button>
      </div>
      <div className="my-4 flex">
        <div className="flex flex-col gap-2 items-start w-full">
          <h5 className="text_dark plusJakara_medium">Educational Pathway</h5>
          <Select
            // showSearch
            style={{
              width: '350px'
            }}
            size="large"
            className="custom_control rounded-2 plusJakara_regular text_secondarydark bg_white"
            placeholder="Select Educational Pathway"
            required
            allowClear
            onChange={(e) => setCategoryId(e || 'all')}
          >
            {courseCategories?.map((item, i) => (
              <Select.Option key={i} value={item?._id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      {loading ? <div className="flex items-center justify-center my-5">
        <CircularProgress size={18} color="inherit" />
      </div> :
        !categories || categories.length === 0 ?
          <main className='my-5 d-flex w-100 justify-content-center align-items-center'>
            <span className="text_secondary plusJakara_medium">No Course Found</span>
          </main> :
          <ProductTable
            loading={loading}
            count={count}
            setCurrentPage={setLastId2}
            currentPage={lastId2}
            columns={columns}
            data={categories}
            setLastId={setLastId}
          />
      }
    </main>
  );
};

export default CourseContent;
