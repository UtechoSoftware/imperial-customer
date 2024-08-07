// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useRef, useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { avatarman, finabeelight } from "../icons/icon";
// const Blog = () => {
//   const navigate = useNavigate();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const inputRef = useRef(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedFile(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleButtonClick = () => {
//     inputRef.current.click();
//   };
  
//   return (
//     <>
//       <div className="pt-5">
//         <main className="min-h-screen lg:container  px-5 pt-4 mx-auto ">
//           <div className="flex gap-2 w-full">
//             <div>
//               <img src={finabeelight} width="50px" alt="logo" />
//             </div>
//             <div className="flex flex-col mb-3 w-full">
//               <h6
//                 className="plusJakara_bold text_black text-md "
//                 style={{ fontWeight: "bold" }}
//               >
//                 Imperial Age
//               </h6>
//               <h6
//                 className="text_para  plusJakara_regular"
//                 style={{ fontSize: "14px" }}
//               >
//                 Customer profile
//               </h6>
//             </div>
//           </div>
//           <div className="mt-4">
//             <h5 className="text_primary  " style={{ fontWeight: "bolder" }}>
//               Edit Profile
//             </h5>


//           </div>
//           <div className="d-flex flex-column flex-md-row gap-3 w-100 align-items-center">
//             <Form.Group
//               className="rounded-lg py-3 text-center"
//               controlId="exampleForm.ControlInput1"
//             >
//               <label htmlFor="fileInput" className="cursor-pointer">
//                 {selectedFile ? (
//                   <img
//                     src={selectedFile}
//                     alt=""
//                     className="rounded-circle"
//                     style={{
//                       width: "4.5rem",
//                       height: "4.5rem",
//                       objectFit: "cover",
//                     }}
//                   />
//                 ) : (
//                   <div className="d-flex align-items-center gap-3">
//                     <img
//                       src={avatarman}
//                       alt=""
//                       className="rounded-circle"
//                       style={{ width: "4.5rem", height: "4.5rem" }}
//                     />
//                   </div>
//                 )}
//               </label>
//               <Form.Control
//                 type="file"
//                 id="fileInput"
//                 className="d-none"
//                 onChange={handleFileChange}
//                 ref={inputRef}
//               />
//             </Form.Group>
//             <Button
//               onClick={handleButtonClick}
//               className="fw-bold text-white bg-dark btn-sm btn-md rounded-lg px-3 px-md-4 py-2"
//             >
//               Upload new
//             </Button>
//             <Button
//               onClick={() => setSelectedFile(null)}
//               variant="outline-dark"
//               className="fw-bold text-dark bg-white btn-sm btn-md rounded-lg px-3 px-md-4 py-2"
//             >
//               Delete
//             </Button>
//           </div>

//           <Form
//             className="d-flex flex-wrap justify-content-between"
//             // onSubmit={handleSubmit} // Uncomment and define handleSubmit if you have a form submit handler
//           >
//             <Form.Group className="w-100 mb-3">
//               <Form.Label>Name</Form.Label>
//               <div className="modal_form">
//                 <Form.Control type="text" placeholder="Insert your name" />
//               </div>
//             </Form.Group>

//             <Form.Group className="w-100 mb-3">
//               <Form.Label>Company Name</Form.Label>
//               <div className="modal_form">
//                 <Form.Control
//                   type="text"
//                   placeholder="Insert the company’s name"
//                 />
//               </div>
//             </Form.Group>

//             <Form.Group className="w-100 mb-3">
//               <Form.Label>Position</Form.Label>
//               <div className="modal_form">
//                 <Form.Control
//                   type="text"
//                   placeholder="Insert your position in the company"
//                 />
//               </div>
//             </Form.Group>

//             <Form.Group className="w-100 mb-3">
//               <Form.Label>Password</Form.Label>
//               <div className="modal_form">
//                 <Form.Control
//                   type="password"
//                   placeholder="Insert your password"
//                 />
//               </div>
//             </Form.Group>

//             <div className=" mb-4 mt-3 ms-auto">
//               <button
//                 style={{ borderRadius: "15px", width: "12rem" }}
//                 type="submit"
//                 className="bg_primary text-white px-5 py-2 text-lg inter_regular d-flex justify-content-center align-items-center"
//               >
//                 Edit Profile
//               </button>
//             </div>
//           </Form>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Blog;
import React, { useRef, useState } from "react";
import { Accordion, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { avatarman, finabeelight } from "../icons/icon";

const Blog = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <div className="pt-5">
        <main className="min-h-screen lg:container px-5 pt-4 mx-auto">
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
                className="text_para plusJakara_regular"
                style={{ fontSize: "14px" }}
              >
                Customer profile
              </h6>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="text_primary" style={{ fontWeight: "bolder" }}>
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

          <Form className="d-flex flex-wrap justify-content-between">
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

            {/* <Accordion className="w-100 mb-3">
            <div className="modal_form">

              <Accordion.Item eventKey="0">

                <Accordion.Header className="text_head font-bold">
              <Form.Label>Change Password</Form.Label>

                </Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="w-100 mb-3">
                    <Form.Label>New Password</Form.Label>
                    <div className="modal_form">

                    <Form.Control type="password" placeholder="New Password" />
                    </div>
                  </Form.Group>

                  <Form.Group className="w-100 mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <div className="modal_form">

                    <Form.Control
                      type="password"
                      placeholder="Confirm New Password"
                    />
                    </div>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
</div>
            </Accordion> */}

            <div className="mb-4 mt-3 ms-auto">
              <Button
                style={{ borderRadius: "15px", width: "12rem" }}
                type="button"
                className="bg_primary text-white px-5 py-2 text-lg inter_regular d-flex justify-content-center align-items-center"
              >
                Edit Profile
              </Button>
            </div>
          </Form>
        </main>
      </div>
    </>
  );
};

export default Blog;
