/* eslint-disable no-unused-vars */
import { Tooltip } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatar from "../assets//png/avatar1.png";
import img1 from "../assets/png/EN-1.png";
import img2 from "../assets/png/EN-2.png";
import img3 from '../assets/png/EN-3.png';
import pt1 from "../assets/png/PT-1.png";
import pt2 from "../assets/png/PT-2.png";
import pt3 from '../assets/png/PT-3.png';
import hand from "../assets/png/select.png";
const Users = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();
  const login = useSelector((state) => state.data.data.isLogin_);
  const user = useSelector(state => state.data.data.user)
  const languages = window.localStorage.getItem('imperial_language').replace(/"/g, '');

  const images = languages === 'en'
    ? [img1, img2, img3]
    : [pt1, pt2, pt3];

  return (
    <div style={{ backgroundColor: "#f8f8f8 " }}>
      <>
        <main style={{ backgroundColor: "#f8f8f8 " }} className="min-h-screen lg:container py-5 px-10">
          {login && (
            <div className="flex justify-between max-md:flex-col max-md:gap-3 mb-3 md:items-center w-full">
              <div className="flex flex-md-row flex-column">
                <img
                  className="avatar_img"
                  style={{ width: "70px", height: "70px" }}
                  src={user?.profilePicture || avatar}
                  alt="avatar"
                />
                <div className="flex flex-col mt-2">
                  <h4 className="manrope_bold max-md:text-xl text_black">
                    {user?.name
                      ?.split(" ")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(" ")}
                  </h4>
                  <p>
                    {user?.position?.toUpperCase()} –{" "}
                    {user?.comp_name
                      ?.split(" ")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(" ")}
                  </p>
                </div>
              </div>
            </div>
          )}
          <h4 className="manrope_bold max-md:text-xl text_black w-auto">
            {t('calculator_h1')}
          </h4>
          <h6 className="manrope_bold max-md:text-xl text_secondary mt-16">
            {t('info_h1')}
          </h6>
          <p className="m-0">
            {t('info_p1')}.
          </p>
          <p className="m-0">
            {t('info_p2')}:
          </p>
          <div className="container py-4">
            <div className="row">
              {images.map((imgSrc, index) => (
                <div key={index} className="col-12 col-md-4 mb-4 d-flex justify-content-center">
                  <img src={imgSrc} alt={`img${index + 1}`} style={{ width: "100%", maxWidth: "350px", height: "auto" }} />
                </div>
              ))}
            </div>
          </div>

          <p className="m-0">
            {t('info_p3')}
          </p>
          <p className="m-0 font-bold text-lg">
            {t('info_p4')}
          </p>
          <div style={{ borderRadius: "40px" }} className="flex justify-end pt-3">
            <Tooltip
              style={{ backgroundColor: "yellow" }}
              title={t('popup_missing_4')}
              className="cursor-pointer "
            >
              <div onClick={() => navigate('/list-hr')} className="q_card flex w-fit manrope_bold cursor-pointer max-md:text-xl text_black justify-center items-center border-solid border-1 rounded py-3 px-3 bg-white">
                <h6>{t('info_btn')}</h6>
                <img className="h-10 d-md-block d-none" src={hand} alt="email" />
              </div>
            </Tooltip>
          </div>
        </main>
      </>
    </div>
  );

};

export default Users;
