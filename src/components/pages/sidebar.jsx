// // /* eslint-disable no-unused-vars */
// // import React, { Fragment, useEffect, useState } from "react";
// // import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import {
// //   childdark,
// //   childlight,
// //   coursedark,
// //   courselight,
// //   dashboarddark,
// //   dashboardlight,
// //   exam,
// //   examLight,
// //   finabeelight,
// //   parentdark,
// //   parentlight,
// //   quizdark,
// //   quizlight,
// // } from "../icons/icon";
// // import { useAuth } from "../authRoutes/useAuth";
// // import {
// //   MdArticle,
// //   MdOutlineArticle,
// //   MdProductionQuantityLimits,
// // } from "react-icons/md";
// // import {
// //   Dashboard,
// //   Users,
// //   FileText,
// //   HelpCircle,
// //   BookOpen,
// //   Layers,
// //   Folder,
// //   Award,
// //   Clipboard,
// // } from "react-feather";
// // import { useSelector } from "react-redux";

// // const SidebarMenu = ({ children, setToggled, toggled, setBroken }) => {
// //   const roles = useSelector(
// //     (state) => state?.adminData?.adminData?.user?.roles
// //   );
// //   console.log(roles, "rr");
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [selectedLink, setSelectedLink] = useState("0");
// //   const [show, setShow] = useState(false);
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const isLogin = useAuth();

// //   const handleLinkClick = (itemId, path) => {
// //     setSelectedLink(itemId);
// //     setToggled(false);
// //     setShow(false);
// //     navigate(path);
// //   };

// //   const isChildPath = (parentPath, childPath) => {
// //     return childPath.startsWith(parentPath);
// //   };

// //   const getParentPath = (path) => {
// //     const pathSegments = path.split("/");
// //     return pathSegments.slice(0, pathSegments.length - 1).join("/");
// //   };

// //   // const findParentPath = (childPath) => {
// //   //     for (let i = 0; i < menuItems.length; i++) {
// //   //         const parentPath = getParentPath(menuItems[i].path);
// //   //         if (isChildPath(parentPath, childPath)) {
// //   //             return parentPath;
// //   //         }
// //   //     }
// //   //     return childPath;
// //   // };

// //   let allowedItems = [];

// //   if (roles?.length > 0) {
// //     roles?.forEach((role) => {
// //       switch (role) {
// //         case "question":
// //           allowedItems?.push({
// //             icon: <FileText />,
// //             iconActive: <FileText />,
// //             items: "Question",
// //             path: "/question",
// //           });
// //           break;
// //         case "exam":
// //           allowedItems?.push({
// //             icon: <FileText />,
// //             iconActive: <FileText />,
// //             items: "Exam",
// //             path: "/exam",
// //           });
// //           break;
// //         case "blog":
// //           allowedItems?.push({
// //             icon: <BookOpen />,
// //             iconActive: <BookOpen />,
// //             items: "Blogs",
// //             path: "/blogs",
// //           });

// //           break;
// //         case "help":
// //           allowedItems?.push({
// //             icon: <HelpCircle />,
// //             iconActive: <HelpCircle style={{ color: "#B39D70" }} />,
// //             items: "Help",
// //             path: "/help",
// //           });
// //           break;
// //         default:
// //           break;
// //       }
// //     });
// //   } else {
// //     allowedItems = [
// //       {
// //         icon: <Layers />,
// //         iconActive: <Layers />,
// //         items: "Calculator",
// //         path: "/add-hr",
// //       },
// //       {
// //         icon: <Users />,
// //         iconActive: <Users />,
// //         items: "Information",
// //         path: "/info",
// //       },
// //       {
// //         icon: <Award />,
// //         iconActive: <Award />,
// //         items: "Logout",
// //         path: "/role",
// //       },
// //       {
// //         icon: <BookOpen />,
// //         iconActive: <BookOpen />,
// //         items: "Profile",
// //         path: "/blogs",
// //       },
// //       {
// //         icon: <HelpCircle />,
// //         iconActive: <HelpCircle />,
// //         items: "Help",
// //         path: "/help",
// //       },
// //     ];
// //   }

// //   return (
// //     <>
// //       {isLogin ? (
// //         <div className="flex h-screen min-h-screen">
// //           <div className="h-screen relative" style={{ zIndex: 1050 }}>
// //             <Sidebar
// //               width="280px"
// //               style={{ height: "100%", zIndex: 1050 }}
// //               collapsed={collapsed}
// //               toggled={toggled}
// //               backgroundColor="#161920"
// //               onBackdropClick={() => {
// //                 setToggled(false);
// //                 setShow(false);
// //               }}
// //               onBreakPoint={setBroken}
// //               breakPoint="xl"
// //             >
// //               <div
// //                 className="scrolbar"
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   overflowY: "auto",
// //                   height: "100%",
// //                   paddingTop: "1rem",
// //                 }}
// //               >
// //                 <div className="mb-5 flex items-center justify-start">
// //                   <button
// //                     onClick={() => {
// //                       navigate("/add-hr");
// //                     }}
// //                     className=""
// //                   >
// //                     <img
// //                       style={{
// //                         height: "4rem",
// //                         width: "auto",
// //                         marginLeft: "3rem",
// //                         marginTop:"2rem"
// //                       }}
// //                       src={finabeelight}
// //                       className=""
// //                       alt=""
// //                     />
// //                   </button>
// //                 </div>

// //                 <Menu className="container mx-auto flex flex-col justify-between h-full">
// //                   <div>
// //                     {allowedItems.map((item, i) => (
// //                       <Fragment key={i}>
// //                         {item.subItems ? (
// //                           <SubMenu
// //                             icon={
// //                               <MdProductionQuantityLimits
// //                                 style={{
// //                                   height: "auto",
// //                                   width: "25px",
// //                                   marginRight: "10px",
// //                                 }}
// //                               />
// //                             }
// //                             label={item.items}
// //                             className={`w-full plusJakara_semibold  rounded-3 mb-2`}
// //                           >
// //                             {item.subItems.map((subItem, j) => (
// //                               <MenuItem
// //                                 key={`${i}-${j}`}
// //                                 onClick={() =>
// //                                   handleLinkClick(`${i}-${j}`, subItem.path)
// //                                 }
// //                                 component={<Link to={subItem.path} />}
// //                                 className={`w-full rounded-3 mb-2 ${
// //                                   isChildPath(subItem.path, location.pathname)
// //                                     ? "bg_darkprimary text_white plusJakara_semibold"
// //                                     : "text_secondary"
// //                                 }`}
// //                               >
// //                                 <div className="flex items-center gap-4">
// //                                   {isChildPath(subItem.path, location.pathname)
// //                                     ? subItem.iconActive
// //                                     : subItem.icon}
// //                                   <div className="plusJakara_semibold">
// //                                     {subItem.label}
// //                                   </div>
// //                                 </div>
// //                               </MenuItem>
// //                             ))}
// //                           </SubMenu>
// //                         ) : (
// //                           <MenuItem
// //                             key={i}
// //                             onClick={() =>
// //                               handleLinkClick(i.toString(), item.path)
// //                             }
// //                             component={<Link to={item.path} />}
// //                             className={`w-full rounded-3 mb-2 ${
// //                               isChildPath(item.path, location.pathname)
// //                                 ? "text_secondary  plusJakara_semibold"
// //                                 : "text-white"
// //                             }`}
// //                           >
// //                             <div className="flex items-center gap-4">
// //                               {isChildPath(item.path, location.pathname)
// //                                 ? item.iconActive
// //                                 : item.icon}
// //                               <div className="plusJakara_semibold">
// //                                 {item.items}
// //                               </div>
// //                             </div>
// //                           </MenuItem>
// //                         )}
// //                       </Fragment>
// //                     ))}
// //                   </div>
// //                 </Menu>
// //               </div>
// //             </Sidebar>
// //           </div>
// //           <main
// //             className="w-full overflow-auto"
// //             style={{ backgroundColor: "#f6f6f6" }}
// //           >
// //             {children}
// //           </main>
// //         </div>
// //       ) : (
// //         children
// //       )}
// //     </>
// //   );
// // };

// // export default SidebarMenu;
// import React, { Fragment, useEffect, useState } from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useAuth } from "../authRoutes/useAuth";
// import {
//   MdProductionQuantityLimits,
// } from "react-icons/md";
// import {
//   Dashboard,
//   Users,
//   FileText,
//   HelpCircle,
//   BookOpen,
//   Layers,
//   Folder,
//   Award,
//   Clipboard,
// } from "react-feather";
// import { finabeelight } from "../icons/icon";

// const SidebarMenu = ({ children, setToggled, toggled, setBroken }) => {
  
//   const getLoggedIn= useSelector((state)=> state.adminData.adminData.isLogin)
//   console.log(getLoggedIn,"tt")
//   const roles = useSelector(
//     (state) => state?.adminData?.adminData?.user?.roles
//   );
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedLink, setSelectedLink] = useState("0");
//   const [show, setShow] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = location.state || {};

//   const handleLinkClick = (itemId, path) => {
//     setSelectedLink(itemId);
//     setToggled(false);
//     setShow(false);
//     navigate(path);
//   };

//   const isChildPath = (parentPath, childPath) => {
//     return childPath.startsWith(parentPath);
//   };

//   const getParentPath = (path) => {
//     const pathSegments = path.split("/");
//     return pathSegments.slice(0, pathSegments.length - 1).join("/");
//   };

//   let allowedItems = [];

//   if (roles?.length > 0) {
//     roles?.forEach((role) => {
//       switch (role) {
//         case "question":
//           allowedItems?.push({
//             icon: <FileText />,
//             iconActive: <FileText />,
//             items: "Question",
//             path: "/question",
//           });
//           break;
//         case "exam":
//           allowedItems?.push({
//             icon: <FileText />,
//             iconActive: <FileText />,
//             items: "Exam",
//             path: "/exam",
//           });
//           break;
//         case "blog":
//           allowedItems?.push({
//             icon: <BookOpen />,
//             iconActive: <BookOpen />,
//             items: "Blogs",
//             path: "/blogs",
//           });

//           break;
//         case "help":
//           allowedItems?.push({
//             icon: <HelpCircle />,
//             iconActive: <HelpCircle style={{ color: "#B39D70" }} />,
//             items: "Help",
//             path: "/help",
//           });
//           break;
//         default:
//           break;
//       }
//     });
//   } else {
//     allowedItems = [
//       {
//         icon: <Layers />,
//         iconActive: <Layers />,
//         items: "Calculator",
//         path: "/list-hr",
//       },
//       {
//         icon: <Users />,
//         iconActive: <Users />,
//         items: "Information",
//         path: "/info",
//       },
//       getLoggedIn || login ? (

//         {
//           icon: <Award />,
//           iconActive: <Award />,
//           items: "Logout",
//           path: "/list-hr",
//         }) : 
//        ( {
//           icon: <Award />,
//           iconActive: <Award />,
//           items: "Login",
//           path: "/login",
//         }
//       ),
//       {
//         icon: <BookOpen />,
//         iconActive: <BookOpen />,
//         items: "Profile",
//         path: "/blogs",
//       },
//       {
//         icon: <HelpCircle />,
//         iconActive: <HelpCircle />,
//         items: "Help",
//         path: "/help",
//       },
//     ];
//   }

//   // Separate Profile and Help items
//   const mainItems = allowedItems.slice(0, -2);
//   const bottomItems = allowedItems.slice(-2);

//   return (
//     <>
//       {!getLoggedIn && window.location.pathname!=='/login' && window.location.pathname!=='/register' ? (
//         <div className="flex h-screen min-h-screen">
//           <div className="h-screen relative" style={{ zIndex: 1050 }}>
//             <Sidebar
//               width="280px"
//               style={{ height: "100%", zIndex: 1050 }}
//               collapsed={collapsed}
//               toggled={toggled}
//               backgroundColor="#161920"
//               onBackdropClick={() => {
//                 setToggled(false);
//                 setShow(false);
//               }}
//               onBreakPoint={setBroken}
//               breakPoint="xl"
//             >
//               <div
//                 className="scrolbar"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   overflowY: "auto",
//                   height: "100%",
//                   paddingTop: "1rem",
//                 }}
//               >
//                 <div className="mb-5 flex items-center justify-start">
//                   <button
//                     onClick={() => {
//                       navigate("/add-hr");
//                     }}
//                     className=""
//                   >
//                     <img
//                       style={{
//                         height: "4rem",
//                         width: "auto",
//                         marginLeft: "3rem",
//                         marginTop: "2rem",
//                       }}
//                       src={finabeelight}
//                       className=""
//                       alt=""
//                     />
//                   </button>
//                 </div>

//                 <Menu className="container mx-auto flex flex-col justify-between h-full">
//                   <div style={{ flexGrow: 1 }}>
//                     {mainItems.map((item, i) => (
//                       <Fragment key={i}>
//                         {item.subItems ? (
//                           <SubMenu
//                             icon={
//                               <MdProductionQuantityLimits
//                                 style={{
//                                   height: "auto",
//                                   width: "25px",
//                                   marginRight: "10px",
//                                 }}
//                               />
//                             }
//                             label={item.items}
//                             className={`w-full plusJakara_semibold rounded-3 mb-2`}
//                           >
//                             {item.subItems.map((subItem, j) => (
//                               <MenuItem
//                                 key={`${i}-${j}`}
//                                 onClick={() =>
//                                   handleLinkClick(`${i}-${j}`, subItem.path)
//                                 }
//                                 component={<Link to={subItem.path} />}
//                                 className={`w-full rounded-3 mb-2 ${
//                                   isChildPath(subItem.path, location.pathname)
//                                     ? "bg_darkprimary text_white plusJakara_semibold"
//                                     : "text_secondary"
//                                 }`}
//                               >
//                                 <div className="flex items-center gap-4">
//                                   {isChildPath(subItem.path, location.pathname)
//                                     ? subItem.iconActive
//                                     : subItem.icon}
//                                   <div className="plusJakara_semibold">
//                                     {subItem.label}
//                                   </div>
//                                 </div>
//                               </MenuItem>
//                             ))}
//                           </SubMenu>
//                         ) : (
//                           <MenuItem
//                             key={i}
//                             onClick={() =>
//                               handleLinkClick(i.toString(), item.path)
//                             }
//                             component={<Link to={item.path} />}
//                             className={`w-full rounded-3 mb-2 ${
//                               isChildPath(item.path, location.pathname)
//                                 ? "text_secondary plusJakara_semibold"
//                                 : "text-white"
//                             }`}
//                           >
//                             <div className="flex items-center gap-4">
//                               {isChildPath(item.path, location.pathname)
//                                 ? item.iconActive
//                                 : item.icon}
//                               <div className="plusJakara_semibold">
//                                 {item.items}
//                               </div>
//                             </div>
//                           </MenuItem>
//                         )}
//                       </Fragment>
//                     ))}
//                   </div>
//                   <div className="absolute bottom-0 w-full">
//                     {bottomItems.map((item, i) => (
//                       <MenuItem
//                         key={i}
//                         onClick={() => handleLinkClick(i.toString(), item.path)}
//                         component={<Link to={item.path} />}
//                         className={`w-full rounded-3 mb-2 ${
//                           isChildPath(item.path, location.pathname)
//                             ? "text_secondary plusJakara_semibold"
//                             : "text-white"
//                         }`}
//                       >
//                         <div className="flex items-center gap-4">
//                           {isChildPath(item.path, location.pathname)
//                             ? item.iconActive
//                             : item.icon}
//                           <div className="plusJakara_semibold">
//                             {item.items}
//                           </div>
//                         </div>
//                       </MenuItem>
//                     ))}
//                   </div>
//                 </Menu>
//               </div>
//             </Sidebar>
//           </div>
//           <main
//             className="w-full overflow-auto"
//             style={{ backgroundColor: "#f6f6f6" }}
//           >
//             {children}
//           </main>
//         </div>
//       ) : (
//         children
//       )}
//     </>
//   );
// };

// export default SidebarMenu;
import React, { Fragment, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../authRoutes/useAuth";
import open from '../assets/png/open.png';
import close from '../assets/png/hide.png'
import {
  MdProductionQuantityLimits,
} from "react-icons/md";
import {
  Dashboard,
  LogOut,
  Users,
  FileText,
  HelpCircle,
  BookOpen,
  Layers,
  Folder,
  Award,
  Clipboard,
  Grid,
  Info,
  User,
  LogIn,
} from "react-feather";
import { finabeelight } from "../icons/icon";

const SidebarMenu = ({ children, setToggled, toggled, setBroken }) => {
  const roles = useSelector(
    (state) => state?.adminData?.adminData?.user?.roles
  );
  const getLoggedIn= useSelector((state)=> state.adminData.adminData.isLogin)
  const location = useLocation();
  const { login } = location.state || {};
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLink, setSelectedLink] = useState("0");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (itemId, path) => {
    setSelectedLink(itemId);
    setToggled(false);
    setShow(false);
    navigate(path);
  };

  const isChildPath = (parentPath, childPath) => {
    return childPath.startsWith(parentPath);
  };

 

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  let allowedItems = [];

  if (roles?.length > 0) {
    roles?.forEach((role) => {
      switch (role) {
                case "question":
                  allowedItems?.push({
                    icon: <FileText />,
                    iconActive: <FileText />,
                    items: "Question",
                    path: "/question",
                  });
                  break;
                case "exam":
                  allowedItems?.push({
                    icon: <FileText />,
                    iconActive: <FileText />,
                    items: "Exam",
                    path: "/exam",
                  });
                  break;
                case "blog":
                  allowedItems?.push({
                    icon: <BookOpen />,
                    iconActive: <BookOpen />,
                    items: "Blogs",
                    path: "/blogs",
                  });
        
                  break;
                case "help":
                  allowedItems?.push({
                    icon: <HelpCircle />,
                    iconActive: <HelpCircle style={{ color: "#B39D70" }} />,
                    items: "Help",
                    path: "/help",
                  });
                  break;
                default:
                  break;
              }
      // switch (role) {
      //   case "question":
      //     allowedItems?.push({
      //       icon: <FileText />,
      //       iconActive: <FileText />,
      //       items: "Question",
      //       path: "/question",
      //     });
      //     break;
      //   case "exam":
      //     allowedItems?.push({
      //       icon: <FileText />,
      //       iconActive: <FileText />,
      //       items: "Exam",
      //       path: "/exam",
      //     });
      //     break;
      //   case "blog":
      //     allowedItems?.push({
      //       icon: <BookOpen />,
      //       iconActive: <BookOpen />,
      //       items: "Blogs",
      //       path: "/blogs",
      //     });

      //     break;
      //   case "help":
      //     allowedItems?.push({
      //       icon: <HelpCircle />,
      //       iconActive: <HelpCircle style={{ color: "#B39D70" }} />,
      //       items: "Help",
      //       path: "/help",
      //     });
      //     break;
      //   default:
      //     break;
      // }
    });
  } else {
    allowedItems = [
            {
              icon: <Grid />,
              iconActive: <Grid />,
              items: "Calculator",
              path: "/list-hr",
            },
            {
              icon: <Info/>,
              iconActive: <Info />,
              items: "Information",
              path: "/info",
            },
         
            {
              icon: <User />,
              iconActive: <User />,
              items: "Profile",
              path: "/profile",
            },
            {
              icon: <HelpCircle />,
              iconActive: <HelpCircle />,
              items: "Help",
              path: "/help",
            },
            getLoggedIn || login ? (
      
              {
                icon: <LogOut />,
                iconActive: <LogOut />,
                items: "Logout",
                path: "/list-hr",
              }) : 
             ( {
                icon: <LogIn />,
                iconActive: <LogIn />,
                items: "Login",
                path: "/login",
              }
            ),
          ];

  }

  // Separate Profile and Help items
  const mainItems = allowedItems.slice(0, -1);
  const bottomItems = allowedItems.slice(-1);

  return (
    <>
      {!getLoggedIn && window.location.pathname!=='/login' && window.location.pathname!=='/register' && window.location.pathname!=='/'  ? (
        <div className="flex h-screen min-h-screen">
          <div className="h-screen relative" style={{ zIndex: 1050 }}>
            <Sidebar
              width="280px"
              style={{ height: "100%", zIndex: 1050 }}
              collapsed={collapsed}
              toggled={toggled}
              backgroundColor="#161920"
              onBackdropClick={() => {
                setToggled(false);
                setShow(false);
              }}
             
            >
              <div
                className="scrolbar"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  height: "100%",
                  paddingTop: "1rem",
                }}
              >
                {collapsed ? <div className="mb-5 flex flex-col items-center justify-between px-4 py-3">
                  <button
                    onClick={() => {
                      navigate("/blogs");
                    }}
                    className=""
                  >
                    <img
                      style={{
                        height: "2.5rem",
                        width: "auto",
                        marginLeft: "auto",
                        marginBottom:"2rem"
                        
                      }}
                      src={finabeelight}
                      className=""
                      alt=""
                    />
                  </button>
                  <button
                    onClick={toggleSidebar}
                    style={{maxWidth:"20px"}}
                    className="text-white"
                  >
                    {collapsed ? <img className="togle1"  src={open} alt="open" /> : <img  className="togle" sty src={close} alt="close" />}
                  </button>
                </div> : <div className="mb-5 flex items-center justify-between px-4 py-3">
                  <button
                    onClick={() => {
                      navigate("/blogs");
                    }}
                    className=""
                  >
                    <img
                      style={{
                        height: "4rem",
                        width: "auto",
                        marginLeft: "auto",
                        
                      }}
                      src={finabeelight}
                      className=""
                      alt=""
                    />
                  </button>
                  <button
                  style={{width:"30px"}}
                    onClick={toggleSidebar}
                    className="text-white"
                  > 
                    {collapsed ? <img className="togle1" src={open} alt="open" /> : <img className="togle" style={{width:"30px"}} src={close} alt="close" />}
                  </button>
                </div>}
                <Menu className="container mx-auto flex flex-col justify-between h-full">
                  <div style={{ flexGrow: 1 }}>
                    {mainItems.map((item, i) => (
                      <Fragment key={i}>
                        {item.subItems ? (
                          <SubMenu
                            icon={
                              <MdProductionQuantityLimits
                                style={{
                                  height: "auto",
                                  width: "25px",
                                  marginRight: "10px",
                                }}
                              />
                            }
                            label={item.items}
                            className={`w-full plusJakara_semibold rounded-3 mb-2`}
                          >
                            {item.subItems.map((subItem, j) => (
                              <MenuItem
                                key={`${i}-${j}`}
                                onClick={() =>
                                  handleLinkClick(`${i}-${j}`, subItem.path)
                                }
                                component={<Link to={subItem.path} />}
                                className={`w-full rounded-3 mb-2 ${
                                  isChildPath(subItem.path, location.pathname)
                                    ? "bg_darkprimary text_white plusJakara_semibold"
                                    : "text_secondary"
                                }`}
                              >
                                <div className="flex items-center gap-4">
                                  {isChildPath(subItem.path, location.pathname)
                                    ? subItem.iconActive
                                    : subItem.icon}
                                  <div className="plusJakara_semibold">
                                    {subItem.label}
                                  </div>
                                </div>
                              </MenuItem>
                            ))}
                          </SubMenu>
                        ) : (
                          <MenuItem
                            key={i}
                            onClick={() =>
                              handleLinkClick(i.toString(), item.path)
                            }
                            component={<Link to={item.path} />}
                            className={`w-full rounded-3 mb-2 ${
                              isChildPath(item.path, location.pathname)
                                ? "text_secondary plusJakara_semibold"
                                : "text-white"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              {isChildPath(item.path, location.pathname)
                                ? item.iconActive
                                : item.icon}
                              {!collapsed && (
                                <div className="plusJakara_semibold">
                                  {item.items}
                                </div>
                              )}
                            </div>
                          </MenuItem>
                        )}
                      </Fragment>
                    ))}
                  </div>
                  <div className="absolute bottom-0 w-full">
                    {bottomItems.map((item, i) => (
                      <MenuItem
                        key={i}
                        onClick={() => handleLinkClick(i.toString(), item.path)}
                        component={<Link to={item.path} />}
                        className={`w-full rounded-3 mb-2 ${
                          isChildPath(item.path, location.pathname)
                            ? "text_secondary plusJakara_semibold"
                            : "text-white"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {isChildPath(item.path, location.pathname)
                            ? item.iconActive
                            : item.icon}
                          {!collapsed && (
                            <div className="plusJakara_semibold togle1">
                              {item.items}
                            </div>
                          )}
                        </div>
                      </MenuItem>
                    ))}
                  </div>
                </Menu>
              </div>
            </Sidebar>
          </div>
          <main
            className="w-full overflow-auto"
            style={{ backgroundColor: "#f6f6f6" }}
          >
            {children}
          </main>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default SidebarMenu;
