import React from "react";
import hand from "../assets/png/select.png";
import avatar from "../assets//png/avatar1.png";
import img1 from "../assets/png/youth.png";
import img2 from "../assets/png/long_term_unemployed.png";
import img3 from '../assets/png/very_long_term_unemployed.png'
const Users = () => {
  
  return (
    <div>
      <>
        <main className="min-h-screen lg:container py-5 px-10 ">
          <div className="flex justify-between max-md:flex-col max-md:gap-3 mb-4 md:items-center w-full">
            <div className="flex flex-md-row flex-column">
              <img className="avatar_img" width="60px" src={avatar} alt="avatar" />
              <div className="flex flex-col">
                <h4 className="manrope_bold max-md:text-xl text_black">
                  John Doe
                </h4>
                <p>Hr Director - Tesla Corp.</p>
              </div>
            </div>
          </div>
          <h4 className="manrope_bold max-md:text-xl text_black w-auto">
            Social Security contributions partial or total exemption
          </h4>
          <h6 className="manrope_bold max-md:text-xl text_secondary mt-16">
            Information regarding the incentive regime
          </h6>
          <p className="py-2">
            Incentives for Open-EndedContracts (Indefinite Term)through a
            partial or total exemption from Social Security contributions, on
            the employer's share (23.75% ofthe monthly base salary),for a period
            of 3 to 5 years
          </p>
          <p className="pt-4">
            These incentives apply to workers who are part of one ofthe
            following groups
          </p>
          <div className="flex flex-wrap  align-center justify-center lg:justify-between ">
            <img src={img1} alt="img1" />
            <img src={img2} alt="img2" />
            <img src={img3} alt="img3" />
          </div>
          <p className="py-3">
            Itis possible to benefitfrom this incentive for human resources who
            are already employed by the company but are still within the benefit
            period (3 or 5 years, depending on the case).
          </p>
          <p className="py-3">
            Use this toolto verify the potential benefitfor your company,
            indicating HR who are current employees and/or new hires
          </p>

          <div className="flex justify-end ">
            <div className="  q_card flex manrope_bold max-md:text-xl text_black justify-center items-center border-solid	border-1 rounded py-3 px-3  bg-white  ">
              <h6>I wish to calculate the potencial savings for my company</h6>
              <img className="h-10 d-md-block d-none" src={hand}  alt="email" />
            </div>
          </div>
          {/* <Helptable
          loading={loading}
          data={data}
          columns={columns}
          setSearch={setSearch}
          search={search}
          count={lastId}
          setLastId={(e) => {
            setLastId(e);
            getPagData(e);
          }}
        /> */}
        </main>
      </>
    </div>
  );
};

export default Users;
