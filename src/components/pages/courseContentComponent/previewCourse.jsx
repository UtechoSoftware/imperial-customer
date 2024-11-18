/* eslint-disable no-useless-concat */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Check,
  Code,
  Download,
  Phone,
  PhoneCall,
  Trash,
  Trash2,
} from "react-feather";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, message } from "antd";
import { MdDiscount, MdPets } from "react-icons/md";
import { news1, pdflogo } from "../../icons/icon";
import ProductTable from "../../DataTable/productTable";
import axios from "axios";
import { axiosInstance } from "../../api/axiosIntance";

const PreviewCourse = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [feedback, setFeedback] = useState([])
  const [lastId, setLastId] = useState(1);
  const [lastId2, setLastId2] = useState(0);
  const [count, setCount] = useState(0);
  const courseDetail = state?.courseDetail || null;
  console.log(courseDetail, 'cc')

  const handleDocumentClick = () => {
    window.open(courseDetail.course_doc, "_blank");
  };
  const emojies = [
    { title: 'sad', icon: '😔' },
    { title: 'happy', icon: '😄' },
    { title: 'cheer', icon: '😮' },
    { title: 'angry', icon: '😡' },
  ]

  const handleUpdate = () => {
    navigate(`/course-content/update-course/${courseDetail?._id}`, {
      state: { courseDetail: courseDetail },
    });
  };
  const applyCustomStyles = (htmlString) => {
    // Create a temporary DOM element to parse the HTML string
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;

    // Select and style specific HTML elements as needed
    const images = tempElement.querySelectorAll("img");
    images.forEach((image) => {
      // Apply custom styles to image elements
      image.style.width = "100%"; // Example custom width
      image.style.height = "auto"; // Example custom height
      // Add any other styles you need
    });

    // Return the updated HTML string with custom styles applied
    return tempElement.innerHTML;
  };

  const toCapitalized = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  const columns = [
    {
      name: "User name",
      minWidth: '150px',
      sortable: true,
      selector: row => !row?.user?.username ? 'User Not found' : row?.user?.username
    },
    {
      name: "Email",
      sortable: true,
      minWidth: '200px',
      selector: row => row?.user?.email
    },
    {
      name: "Comment",
      sortable: true,
      minWidth: '200px',
      cell: (row) => {
        return (
          <div className="plusJakara_regular">{row?.comment}</div>
        )
      },
    },
    {
      name: 'Honeypots',
      sortable: true,
      selector: (row) => row?.user?.honey_pot + ' ' + 'Honeypots',
    },
    {
      name: 'Status',
      sortable: true,
      cell: (row) => {
        const emoji = emojies.find((emoji) => emoji.title === row.status);
        return (
          <div className="d-flex align-items-center">
            {emoji && <span className="me-1">{emoji.icon}</span>}
            <span>{toCapitalized(row.status)}</span>
          </div>
        );
      },
    },
  ]

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`api/feedback/course/${courseDetail?._id}/${lastId}`);
      if (res?.data) {
        setFeedback(res?.data?.feedback);
        setCount(res?.data?.count?.totalPage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastId]);
  return (
    <main className="container m-auto min-h-screen py-4">
      <div className="flex justify-between flex-wrap gap-3 items-center mb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              navigate("/course-content");
            }}
            className="flex items-center justify-center p-2 bg_primary rounded-3"
          >
            <ArrowLeft className="text_white" />
          </button>
          <h5 className="plusJakara_semibold text_dark">Course Detail</h5>
        </div>
        <button onClick={() => handleUpdate(courseDetail)} type='button' className="flex justify-center bg_primary px-3 py-2 rounded-3 items-center">
          <span className="plusJakara_semibold text-sm text_white">Edit Course</span>
        </button>
      </div>
      <div className="bg_white rounded-3 shadow-md p-4">
        <div className="d-flex gap-2 align-items-baseline ">
          <h6 className=" m-0 plusJakara_medium text_black">Educational Pathway :</h6>
          <p className=" m-0 plusJakara_medium text_black">
            {courseDetail?.category?.name}
          </p>
        </div>
        <div className="d-flex gap-2 align-items-baseline ">
          <h6 className=" m-0 plusJakara_medium text_black">Course Name :</h6>

          <h5 className="text_dark plusJakara_medium">
            {courseDetail?.title || "not found"}
          </h5>
        </div>
        {courseDetail?.intro_video && (
          <div className="my-3 w-full">
            <video
              controls
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            >
              <source src={courseDetail?.intro_video} />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {/* <h6 className="plusJakara_regular my-3 text_dark max-md:text-sm">{courseDetail?.courses_des}</h6> */}
        <div className="ckStyling">
          <div
            dangerouslySetInnerHTML={{ __html: courseDetail?.courses_des }}
          />
        </div>
        <div className="my-4 w-full flex flex-col">
          <h4 className="text_dark plusJakara_semibold">FeedBack</h4>
          {!feedback || feedback.length === 0 ?
            <main className='my-5 d-flex w-100 justify-content-center align-items-center'>
              <span className="text_secondary plusJakara_medium">No Feedback Found</span>
            </main> :
            <ProductTable
              loading={loading}
              search={search}
              setSearch={setSearch}
              count={count}
              setCurrentPage={setLastId2}
              currentPage={lastId2}
              columns={columns}
              data={feedback}
              setLastId={setLastId}
            />
          }
        </div>
      </div>
    </main>
  );
};

export default PreviewCourse;
