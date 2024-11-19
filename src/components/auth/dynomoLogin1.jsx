/* eslint-disable no-unused-vars */
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";
import { Form, message } from "antd";
import React, { useState } from "react";
import { } from "react-bootstrap";
import { Eye, EyeOff } from "react-feather";
import { useTranslation } from 'react-i18next';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import {
  finabeelight,
  left,
  questionMark,
  rightarrow
} from "../icons/icon";
import { setIsLogin_, setUserData } from "../store/reducer/imperialAuth";

// import { apiRequest } from '../../api/auth_api'
const DynomoLogin1 = () => {
  const languages = window.localStorage.getItem('imperial_language').replace(/"/g, '');

  const data = languages === 'en'
    ? [
      {
        content:
          'Entities that hire young people looking for their first job (open-ended contract) can benefit from a 50% reduction in Social Security contributions for five years.',
      },
      {

        content:
          'Entities that hire long-term unemployed individuals can enjoy a temporary 50% reduction in Social Security contributions for a period of three years, and in the case of very long-term unemployed, a total exemption of Social Security contributions (100%).',
      },
      {

        content:
          'Fixed-term contracts, when converted into open-ended contracts, can still benefit from the benefit, depending on the age and situation of the worker at the time of conversion.',
      },
      {

        content:
          'Under certain circumstances, it is possible to transfer the benefit associated with a worker to a new entity.',
      },
      {

        content:
          'The termination of  an open-ended contract during the experimental period is not relevant in qualifying for the benefit.',
      },
      {

        content:
          'Termination of an employment contract by mutual agreement between the employer and the worker, or by the decision of the worker, does not require any reimbursement of the benefit obtained up to that date.',
      },
      {

        content:
          'Fixed-term contracts in certain circumstances automatically convert to open-ended contracts, even without a formal written contract, making them potentially eligible for this benefit.',
      },
    ]
    : [
      {

        content:
          'As entidades que contratem jovens à procura do primeiro emprego podem beneficiar de uma redução de 50% nas contribuições para a Segurança Social durante cinco anos.',
      },
      {

        content:
          'As entidades que contratem desempregados de longa duração podem usufruir de uma redução temporária de 50% nas contribuições para a Segurança Social por um período de três anos e no caso de desempregados de longa duração, uma isenção total (100%).',
      },
      {

        content:
          'Os contratos de trabalho a termo, convertidos em contratos sem termo, podem ainda beneficiar do benefício, dependendo da idade e situação do trabalhador no momento da conversão.',
      },
      {

        content:
          'É possível a portabilidade do benefício associado a um trabalhador para uma nova entidade, em determinadas circunstâncias.',
      },
      {

        content:
          'A rescisão de um contrato sem termo durante o período experimental não é considerada na qualificação para o benefício.',
      },
      {

        content:
          'A rescisão de contrato de trabalho por acordo entre a entidade empregadora e o trabalhador ou por decisão do trabalhador, não obriga a qualquer reembolso do benefício da dispensa de contribuições usufruído até essa data.',
      },
      {

        content:
          'Os contratos a termo em determinadas circunstâncias convertem-se automaticamente em contratos sem termo, mesmo que não exista contrato formal, tornando-os potencialmente elegíveis para este benefício.',
      },
    ];


  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (formData) => {
    setIsProcessing(true);
    const dataToSubmit = {
      email: formData.email,
      password: formData.password,
    };
    setIsProcessing(true);
    try {
      await login(dataToSubmit)
        .then((res) => {
          if (res) {
            navigate("/list-hr");
            console.log(res, "res")
            window.localStorage.setItem('imperial_token', res?.data?.token);
            dispatch(setIsLogin_(true));
            message.success("login successfully");
            window.sessionStorage.removeItem('hrData_company');
            window.sessionStorage.removeItem('hrData');
            dispatch(setUserData(res?.data?.user))

            setIsProcessing(false);
          } else {
            setIsProcessing(false);
          }
        })
        .catch((err) => {
          setIsProcessing(false);
        });
    } catch (error) {
      setIsProcessing(false);
      message.error(error?.response?.data?.message);
    }
  };
  // const handleLinkedInLogin = () => {
  //   const clientId = '77mw3n47spnyhx';
  //   const redirectUri = 'http://localhost:3000';
  //   const linkedInUrl = " https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77u3lce2scwzni&redirect_uri=http://localhost:3000/ ";
  //   window.open(linkedInUrl, "_blank", "width=600,height=600");
  // };
  const { linkedInLogin } = useLinkedIn({
    clientId: "77u3lce2scwzni",
    redirectUri: `http://localhost:3000/linkedinPage`,
    onSuccess: (code) => {
      console.log(code);
      // setCode(code);
      // setErrorMessage("");
    },
    scope: "openid profile email",
    onError: (error) => {
      console.log(error);
      // setCode("");
      // setErrorMessage(error.errorMessage);
    },
  });
  const handleLinkedInLogin = () => {
    linkedInLogin();
  }
  return (
    <>
      <div style={{ backgroundColor: "#f8f8f8 " }} className="row w-100 ">
        <div
          className="bg_primary d-flex flex-column justify-content-center align-items-center  p-5 col-md-6 col-sm-12 h-100  "
          style={{ minHeight: "100vh" }}
        >
          <div className="d-flex flex-column gap-2 pt-3 ">
            <img src={finabeelight} width="50px" alt="logo_" />
            <div className="d-flex flex-column gap-3 mt-4">
              <h5 className="text-secondary">{t('login_h1')}</h5>
              <p className="text_para">
                This is the first free digital tool to simulate the application
                of the Social Security contributions partial or total exemption,
                available to Portuguese entities
                {/* {t('login_p3')} */}
              </p>
            </div>

            <div className="d-flex flex-column gap-3 mt-4">
              <h5 className="text-secondary">{t('did_you_know')}</h5>
              <p className="text_para">
                {data[currentIndex].content}
                {/* {t('login_p4')} */}
              </p>
            </div>
            <div className="d-flex gap-2 mb-3">
              <img src={left} width="10px" alt="left" onClick={handlePrev} style={{ cursor: 'pointer' }} />
              <img src={rightarrow} width="10px" alt="right" onClick={handleNext} style={{ cursor: 'pointer' }} />
            </div>
            <div className="d-flex align-items-center gap-3">
              <img src={questionMark} width="20px" alt="question" />
              <a
                style={{ textDecoration: 'none', color: 'white' }}
                className="text_white"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=geral@imperialage.pt"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('help')}
              </a>

            </div>
          </div>
          {/* <div className="d-flex flex-column gap-2 pt-3 ">
            <img src={finabeelight} width="50px" alt="logo_" />
            <div className="d-flex flex-column gap-3 mt-4">
              <h5 className="text-secondary">{t('login_h1')}</h5>
              <p className="text_para">
                This is the first free digital tool to simulate the application
                of the Social Security contributions partial or total exemption,
                available to Portuguese entities
                {t('login_p3')}
              </p>
            </div>
            <div className="d-flex flex-column gap-3 mt-4">
              <h5 className="text-secondary">Did you know that...</h5>
              <p className="text_para">
                Fixed-term contracts in certain circumstances automatically
                convert to open-ended contracts, even without a formal written
                contract, making them potentially eligible for this benefit.
                {t('login_p4')}

              </p>
            </div>
            <div className="d-flex gap-2">
              <img src={left} width="20px" alt="left" />
              <img src={rightarrow} width="20px" alt="right" />
            </div>
            <div className="d-flex align-items-center gap-3">
              <img src={questionMark} width="20px" alt="question" />
              <p className="m-0 text-white">{t('help')}</p>
            </div>
          </div> */}
        </div>
        <div className="col-md-6 col-sm-12 justify-content-center p-4 d-flex flex-column ">
          <div className="border-0 p-4">
            <div className="d-flex flex-lg-row gap-lg-5 gap-1 align-items-center flex-column justify-content-between mb-md-4">
              <h5 className="poppins_semibold text-xl mb-0 md:mb-auto md:text-2xl lg:text-3xl text_darkprimary">
                {/* Login */}
                {t('Login')}
              </h5>
              <p className="text-sm text_para poppins_regular my-2" style={{ maxWidth: "480px" }}>
                {/* Do not have an account yet?{" "} */}
                {t('Login_p2')}

                { }
                <span className=" ms-2">
                  <Link
                    className="text_primary underline poppins_semibold"
                    to="/register"
                  >
                    {t('Register')}

                  </Link>
                </span>
              </p>
            </div>
            <div className=" py-2">
              {/* <p className="poppins_semibold m-0 text_darkprimary p-0 pb-1">
                {t('Login_p1')}
              </p> */}
              {/* <img className="cursor-pointer" onClick={handleLinkedInLogin} width="25px" src={linkedin_} alt="linkdin" /> */}

              {/* <Linkedin /> */}

            </div>
            {/* <div className="d-flex flex-row align-items-center gap-2">
              <div className="border_div"></div>
              <p>or</p>
              <div className="border_div"></div>
            </div> */}
            <Form
              layout="vertical"
              className="flex flex-wrap justify-between"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="email"
                required
                className="w-full mb-0 placeholder_color relative inter_medium"
              >
                <div className="">
                  <div className="flex flex-column gap-0">
                    {/* <p
                      style={{ zIndex: "999" }}
                      className="inter_medium mb-2 mt-2  text_darkprimary  text-md w-full"
                    >
                      Email
                    </p> */}

                    <TextField
                      id="email"
                      required
                      label={t('email')}
                      placeholder="insert your email"
                      variant="standard"
                    />
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                name="password"
                className="w-full placeholder_color mt-4 relative inter_medium"
                hasFeedback
              >
                <div className="">
                  <div className="flex flex-column gap-0">
                    <TextField
                      id="password"
                      label={t('password')}
                      variant="standard"
                      placeholder="Insert your password"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <Eye size={16} />
                              ) : (
                                <EyeOff size={16} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </div>
                </div>
              </Form.Item>
              {/* <div className="ms-auto text_head fw-bold">
                <Link className="">Recover password</Link>
              </div> */}
              <div className="w-full my-3">

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
                    t('Login')
                  )}
                </button>

              </div>
            </Form>
          </div>
        </div>
      </div >
    </>
  );
};
export default DynomoLogin1;
