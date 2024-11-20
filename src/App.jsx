/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import { CircularProgress } from "@mui/material";
import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Courses from "./components/pages/courses";
import "./components/styles/main.css";

import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./components/api/axiosIntance.js";
import LinkedInPage from "./components/auth/linkedinPage.js";
import Register from "./components/auth/register.js";
import Language from "./components/extension/language.js";
import AlotQuestions from "./components/pages/alotQuestions";
import Blog from "./components/pages/blog";
import BlogCategories from "./components/pages/blogCategories";
import AddBlogCategory from "./components/pages/blogComponents/abbBlogCategory";
import AddBlog from "./components/pages/blogComponents/addBlog";
import AddBlogHoneypots from "./components/pages/blogComponents/addBlogHoneypots";
import PreviewBlog from "./components/pages/blogComponents/previewBlog";
import UpdateBlog from "./components/pages/blogComponents/updateBlog";
import BlogSetting from "./components/pages/blogSetting";
import AddCourse from "./components/pages/courseComponents/addCourse";
import CourseContent from "./components/pages/courseContent";
import AddCourseContent from "./components/pages/courseContentComponent/addCourseContent";
import PreviewCourse from "./components/pages/courseContentComponent/previewCourse";
import UpdateCourse from "./components/pages/courseContentComponent/updateCourse";
import CustomerSupport from "./components/pages/customerSupport";
import AddDigitalCategory from "./components/pages/digitalProductComp/addDigitalCategory";
import AddProduct from "./components/pages/digitalProductComp/addProduct";
import AddProductChild from "./components/pages/digitalProductComp/addProductChild";
import DigitalCategory from "./components/pages/digitalProductComp/digitalCategory";
import DigitalProducts from "./components/pages/digitalProducts";
import DigitalProductsChild from "./components/pages/digitalProductsChild";
import CreateExam from "./components/pages/exam/createExam";
import EditQuestion from "./components/pages/exam/editQuestion";
import Exam from "./components/pages/exam/exam";
import PreviewQuestions from "./components/pages/exam/previewQuestions.js";
import Faq from "./components/pages/faq";
import GeneralExam from "./components/pages/generalExam/general";
import Help from "./components/pages/help";
import ListHr2 from "./components/pages/listHr2.js";
import ListHrs from "./components/pages/listHrs.js";
import ParentsChild from "./components/pages/parentsChild";
import CreateQuestion from "./components/pages/question/createQuestion";
import Question from "./components/pages/question/question";
import Quiz from "./components/pages/quiz";
import AddQuestion from "./components/pages/quizComponents/addQuestions";
import QuizDetail from "./components/pages/quizComponents/quizDetail";
import AddRole from "./components/pages/role/addRole.js";
import Role from "./components/pages/role/role.js";
import Users from "./components/pages/users.js";
import AddVoucher from "./components/pages/vouchers/addVoucher";
import AddVoucherCat from "./components/pages/vouchers/addVoucherCat";
import Voucher from "./components/pages/vouchers/voucher";
import VoucherCategories from "./components/pages/vouchers/voucherCategories";
import { setUserData } from "./components/store/reducer/imperialAuth.js";
import RichTextEditor from "./tiptap";
const NavHeader = lazy(() => import("./components/header/navHeader"));
const SidebarMenu = lazy(() => import("./components/pages/sidebar"));
const LoginPage1 = lazy(() => import("./components/auth/dynomoLogin1"));
const Dashboard = lazy(() => import("./components/pages/dashboard.jsx"));
const Parents = lazy(() => import("./components/pages/parents"));



const generateRandomId = () => {
  const randomNumbers = Math.floor(Math.random() * 90 + 10).toString();
  let randomAlphanumeric = "";
  while (randomAlphanumeric.length < 22) {
    randomAlphanumeric += Math.random().toString(36).substring(2);
  }
  randomAlphanumeric = randomAlphanumeric.substring(0, 22);
  return randomNumbers + randomAlphanumeric;
};

function App() {
  const dispatch = useDispatch();
  const uuid = generateRandomId();
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const userData = useSelector((state) => state?.data?.data?.user)
  const [isLogin, setIsLogin] = useState(false);
  const pathname = useLocation();
  const roles = useSelector(
    (state) => state?.adminData?.adminData?.user?.roles
  );


  console.log(userData);

  useEffect(() => {
    if (!userData?._id) {
      axiosInstance.post(`api/users/view/${uuid}`, {})
        .then((res) => {
          if (res.status === 200) {
            dispatch(setUserData({ ...userData, _id: uuid }));
          }
        }).catch((err) => {
          console.log(err);
        })
    } else {
      axiosInstance.post(`api/users/view/${userData?._id}`, {})
        .then((res) => {
          if (res.status === 200) {
            dispatch(setUserData(...userData))
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  }, [userData?._id])

  console.log(userData);

  useEffect(() => {
    global.TOKEN = localStorage.getItem("imperial_token");
    const isLoginData = JSON.parse(
      localStorage.getItem("isLogin_qMed_admin") || false
    );
    global.BASEURL = "https://imperialbackend.onrender.com/";
    setIsLogin(isLoginData);
    window.scrollTo(0, 0);
  }, [pathname]);



  return (
    <>
      <SidebarMenu
        toggled={toggled}
        setBroken={setBroken}
        bro
        setToggled={setToggled}
      >
        {/* {isLogin && (
          <NavHeader
            toggled={toggled}
            setBroken={setBroken}
            broken={broken}
            setToggled={setToggled}
          />
        )} */}
        <Suspense
          fallback={
            <main className="vh-100 d-flex flex-column justify-content-center align-items-center">
              <CircularProgress
                className="text_darkprimary"
                size={40}
                thickness={2}
              />
              {/* <img style={{ width: '3rem', height: "auto" }} src={finabeelight} className='absolute' alt="" /> */}
            </main>
          }
        >
          <div className="parent">
            <div className="child">
              <Language />
            </div>

            <Routes>
              <Route path="/" element={<Navigate to="/list-hr" />}></Route>
              {/* <Route element={<PublicRoutes />}> */}
              {/* <Route index element={<LoginPage1 />}></Route> */}
              <Route path="/login" element={<LoginPage1 />}></Route>
              <Route path="/linkedinPage" element={<LinkedInPage />}></Route>

              <Route path="/register" element={<Register />}></Route>
              {/* </Route> */}
              {/* <Route element={<PrivateRoutes />}> */}
              <Route path="/help" element={<Help />} />
              <Route path="/add-hr" element={<Dashboard />}></Route>
              <Route path="/list-hr" element={<ListHrs />}></Route>
              <Route path="/list-hr2" element={<ListHr2 />}></Route>

              <Route path="/exam" element={<Exam />} />
              <Route
                path="/preview-questions/:id"
                element={<PreviewQuestions />}
              />
              <Route path="/question" element={<Question />} />
              <Route path="/info" element={<Users />} />
              <Route path="/role" element={<Role />} />
              <Route path="/add-role" element={<AddRole />} />
              <Route path="/general-exams" element={<GeneralExam />} />
              <Route path="/create-exam" element={<CreateExam />} />
              <Route path="/create-Question" element={<CreateQuestion />} />
              <Route path="/help" element={<Help />} />
              <Route path="/parents" element={<Parents />} />
              <Route path="/parents/:id" element={<ParentsChild />} />
              <Route path="/course-category" element={<Courses />} />
              <Route path="/course-category/add-course" element={<AddCourse />} />
              <Route path="/course-content" element={<CourseContent />} />
              <Route
                path="/course-content/add-content"
                element={<AddCourseContent />}
              />
              <Route path="/course-content/:id" element={<PreviewCourse />} />
              <Route
                path="/course-content/update-course/:id"
                element={<UpdateCourse />}
              />
              <Route path="/profile" element={<Blog />} />
              <Route path="/blog-categories" element={<BlogCategories />} />
              <Route path="/digital-categories" element={<DigitalCategory />} />
              <Route path="/faq-categories" element={<VoucherCategories />} />
              <Route path="/faqs" element={<Voucher />} />

              <Route
                path="/digital-categories/add-category"
                element={<AddDigitalCategory />}
              />
              <Route
                path="/faq-categories/add-category"
                element={<AddVoucherCat />}
              />

              <Route
                path="/blog-categories/add-category"
                element={<AddBlogCategory />}
              />

              <Route path="/blogs/add-blog" element={<AddBlog />} />
              <Route path="/blogs/blog-detail" element={<PreviewBlog />} />
              <Route path="/blogs/update-blog/:id" element={<UpdateBlog />} />
              <Route path="/blog-setting" element={<BlogSetting />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/faq/add-faq" element={<AddVoucher />} />
              <Route path="/ck" element={<RichTextEditor />} />
              <Route path="/customer-support" element={<CustomerSupport />} />
              <Route
                path="/blog-setting/add-blogs-honeypots"
                element={<AddBlogHoneypots />}
              />
              <Route
                path="/digital-products-parent"
                element={<DigitalProducts />}
              />
              <Route
                path="/digital-products-parent/add-product"
                element={<AddProduct />}
              />
              <Route path="/add-faq" element={<addFaq />} />

              <Route
                path="/digital-products-child"
                element={<DigitalProductsChild />}
              />
              <Route
                path="/digital-products-child/add-product"
                element={<AddProductChild />}
              />
              <Route path="/quiz" element={<Quiz />} />

              <Route path="/alot-questions/:id" element={<AlotQuestions />} />
              <Route path="/edit-questions/:id" element={<EditQuestion />} />

              <Route path="/quiz/quiz-detail" element={<QuizDetail />} />
              <Route
                path="/quiz/create-quiz/add-question"
                element={<AddQuestion />}
              />
              {/* </Route> */}
            </Routes>
          </div>
        </Suspense>
      </SidebarMenu>
    </>
  );
}
export default App;
