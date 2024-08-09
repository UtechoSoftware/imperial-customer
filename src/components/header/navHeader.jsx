/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { arrowdown, arrowdownlight, avatar1, Avatar_, avatarman, cart, eye, eyeoff, favourite, notification, qmedUser, searchbar } from '../icons/icon';
import { Menu, Transition } from '@headlessui/react';
import { MdMenu } from 'react-icons/md';
import { Navbar, Nav, Container, Modal, Form } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Avatar, message } from 'antd';
import { getUser } from '../store/reducer/userAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
// import { EditPassword } from '../api/info';
import { CircularProgress } from '@mui/material';
const NavHeader = ({ broken, setToggled, toggled }) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState('');
  const [editPassword,setEditPassword]=useState(false)


    const navigate = useNavigate();
  const roles = useSelector((state=>state?.adminData?.adminData?.user?.roles))
  const adminID = useSelector((state=>state?.adminData?.adminData?.user?._id))
const dispatch=useDispatch()
const [selectedItem,setSelectedItem]=useState('')
const [showModal,setShowModal]=useState(false)
    const openModal = () => {
            setShowModal(true);
    }
    const closeModal = () => setIsModalOpen(false);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const handleLogout = () => {
        window.localStorage.removeItem("isLogin_imperial_admin");
        window.localStorage.removeItem("login_admin_token");
        message.success("Logout Successful!");
        console.log("Logging out ");
        dispatch(getUser(''))
        navigate('/login');
    };
    const handleChangePassword=(e)=>{
        setEditPassword(true)
        e.preventDefault()
        const data ={
          password:password
        }
        if(!data?.password){
            setPasswordError('please enter password first')
            setEditPassword(false)

        }else{

           
        }
    
      }
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    return (
        <>
            <Navbar bg="white" expand="lg" sticky="top" className='p-3 shadow-sm w-[100%]' id="navbar">
                <Container fluid="lg" className='w-full' >
                    <div className='flex items-center gap-3 md:w-1/2'>
                        {broken && (
                            <button className="sb-button" onClick={() => setToggled(!toggled)}>
                                <MdMenu size={28} />
                            </button>
                        )}
                        {/* {isSmallScreen && (
                            <div>
                                <img src={searchbar} className='cursor-pointer' alt="" onClick={openModal} />
                                <Modal show={isModalOpen} onHide={closeModal}>
                                    <Modal.Body className='p-0'>
                                        <div className="flex items-center">
                                            <img src={searchbar} className='absolute m-2' alt="" />
                                            <input type="text" className='w-full ps-10 py-[10px] border border-white rounded' placeholder='Search anything here' name="" id="" />
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        )}
                        {!isSmallScreen && (
                            <div className='hidden md:block w-full'>
                                <img src={searchbar} className='absolute m-2' alt="" />
                                <input type="text" className='ps-10 py-2 w-full' placeholder='Search anything here' name="" id="" />
                            </div>
                        )} */}
                        {/* <h3 className="d-none d-md-block poppins_semibold mb-0 text_dark">Dashboard</h3> */}
                    </div>
                    <Nav className="ms-auto flex">
            <div className='flex justify-center items-center'>
                {/* <Menu as="div" className="relative">
                    <Menu.Button className="relative flex items-center ms-2 no-underline gap-2">
                        <img width="35px" src={qmedUser} className='rounded-full' alt="" />
                        <img className='drop_' src={arrowdownlight} style={{ width: '20px', height: 'auto', color: "black" }} alt="" />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute z-10 mt-2 flex flex-col rounded-3 bg_white shadow py-2" style={{ minWidth: '10rem', right: '0px', position: 'absolute' }}>
                            <Link onClick={handleLogout} style={{ textDecoration: 'none' }} className='px-4 py-1 text_dark plusJakara_semibold text_white no-underline'>
                                Sign out
                            </Link>
                            {
                                roles?.length > 0 &&
                                <Menu.Items className="absolute z-10 mt-2 flex flex-col rounded-3 bg_white shadow py-2" style={{ minWidth: '10rem', right: '0px', position: 'absolute' }}>
                                    <Link onClick={handleLogout} style={{ textDecoration: 'none' }} className='px-4 py-1 text_dark plusJakara_semibold text_white no-underline'>
                                    Change Password
                                    </Link>
                                </Menu.Items>
                            }
                        </Menu.Items>
                    </Transition>
                </Menu> */}
                <Dropdown className="ms-auto flex">
            <Dropdown.Toggle style={{display:"contents" , width:"7rem"}} className="relative flex w-full flex-row items-center ms-2 no-underline gap-2 bg-transparent" id="dropdown-basic">
                <img width="35px" src={qmedUser} className='rounded-full' alt="" />
                <img className='drop_' src={arrowdownlight} style={{ width: '20px', height: 'auto', color: "black" }} alt="" />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="z-10 mt-2 flex flex-col rounded-3 bg_white shadow py-2" style={{ minWidth: '10rem' }}>
                {roles?.length > 0 && (
                    <Dropdown.Item onClick={openModal} className='px-4 py-1 text_dark plusJakara_semibold text_white no-underline'>
                        Change Password
                    </Dropdown.Item>
                )}
                <Dropdown.Item onClick={handleLogout} className='px-4 py-1 text_dark plusJakara_semibold text_white no-underline'>
                    Sign out
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
            </div>
        </Nav>
                </Container>
            </Navbar>
            <Modal show={showModal} onHide={()=>{setShowModal(false)}}   centered>
      <Modal.Header className='border-0   px-3' closeButton>
      <h4 className="mb-0  px-3">Change Password</h4>

      </Modal.Header>
          <Modal.Body>
    
 
                        <Form onSubmit={handleChangePassword} className="w-full bg_white rounded-3  px-3">
          <div>
    

      <Form.Group className="">
        <Form.Label className="plusJakara_medium text-black text-lg">Enter New Password</Form.Label>
        <div className="position-relative">
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
                setPasswordError('')
            }}
            className="plusJakara_medium"
            isInvalid={!!passwordError}
          />
          <img
            src={showPassword ? eye : eyeoff}
            style={{top:"0px", right:"20px"}}
            className="position-absolute m-2 cursor-pointer"
            alt="Toggle Password Visibility"
            onClick={togglePasswordVisibility}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </div>
      </Form.Group>
    </div>


            <div className="flex justify-content-end my-4  w-100">
          {!editPassword ? (
            <button
              type="submit"
              className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
            >
              <span className="plusJakara_semibold text_white">Submit</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={editPassword}
              className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center"
            >
              <CircularProgress size={18} className="text_white" />
            </button>
          )}
        </div>
          </Form>
          </Modal.Body>
        </Modal>
        </>

    )
}

export default NavHeader
