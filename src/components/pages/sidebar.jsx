import React, { Fragment, useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import close from "../assets/png/hide.png";
import open from "../assets/png/open.png";
import Switch from 'react-switch';
import { Tooltip } from "antd";
import {
  BookOpen,
  FileText,
  Grid,
  HelpCircle,
  Info,
  LogIn,
  LogOut,
  User,
} from "react-feather";
import { finabeelight } from "../icons/icon";
import { setIsLogin_ } from "../store/reducer/imperialAuth";
import { useTranslation } from "react-i18next";
const SidebarMenu = ({ children, setToggled, toggled, setBroken }) => {
  const user = useSelector(state => state.data.data.user)
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const login = useSelector((state) => state.data.data.isLogin_);
  console.log(login, "login");
  const roles = useSelector(
    (state) => state?.adminData?.adminData?.user?.roles
  );
  const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const initialLanguage = JSON.parse(window.localStorage.getItem('imperial_language')) || 'pt';
    const [language, setLanguage] = useState(initialLanguage);
    const handleChangeLanguage = (lang) => {
      console.log(lang)
      i18n.changeLanguage(lang);
      window.localStorage.setItem('imperial_language', JSON.stringify(lang));
      setLanguage(lang);  // Update state with the selected language
    };
    // Ensure language is set on initial render based on localStorage
    useEffect(() => {
      handleChangeLanguage(initialLanguage);
    }, [initialLanguage]);


    return (
      <div >
        <select
          value={language}
          onChange={(e) => handleChangeLanguage(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="en">English</option>
          <option value="pt">Português</option>
        </select>
        <span style={{ marginLeft: '10px', color: language === 'pt' ? '#AA8555' : 'grey' }}>
          {language === 'pt' ? 'Português' : 'English'}
        </span>
      </div>
    );
  };
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLink, setSelectedLink] = useState("0");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 880) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLinkClick = (itemId, path) => {
    setSelectedLink(itemId);
    setToggled(false);
    setShow(false);
    if (path === "/login") {
      handleLogout();
    }
    navigate(path);
  };

  const isChildPath = (parentPath, childPath) => {
    return childPath.startsWith(parentPath);
  };
  const handleLogout = () => {
    dispatch(setIsLogin_(false));
    window.localStorage.removeItem('imperial_token');
  };
  const getParentPath = (path) => {
    const pathSegments = path.split("/");
    return pathSegments.slice(0, pathSegments.length - 1).join("/");
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
    });
  } else if (login) {

    allowedItems = [
      {
        icon: <Grid />,
        iconActive: <Grid />,
        items: t('Calculator'),
        path: "/list-hr",
      },
      {
        icon: <Info />,
        iconActive: <Info />,
        items: t('Information'),
        path: "/info",
      },

      {
        icon: <User />,
        iconActive: <User />,
        items: t('profile'),
        path: "/profile",
      },
      {
        icon: <HelpCircle />,
        iconActive: <HelpCircle />,
        items: t('help'),
        path: "/help",
      },
      // {
      //   icon: <LanguageSwitcher />,
      //   iconActive: <LanguageSwitcher />,
      //   items: "Language",  // Optional label, can also be omitted
      //   path: "#",  // Or an empty path if it doesn’t link to a new page
      // },
      login
        ? {
          icon: <LogOut />,
          iconActive: <LogOut />,
          items: t('logout'),
          path: "/login",
        }
        : {
          icon: <LogIn />,
          iconActive: <LogIn />,
          items: t('login'),
          path: "/login",
        },
    ]

  } else {
    allowedItems = [
      {
        icon: <Grid />,
        iconActive: <Grid />,
        items: t('Calculator'),
        path: "/list-hr",
      },
      {
        icon: <Info />,
        iconActive: <Info />,
        items: t('Information'),
        path: "/info",
      },

      {
        icon: <HelpCircle />,
        iconActive: <HelpCircle />,
        items: t('help'),
        path: "/help",
      },

      login
        ? {
          icon: <LogOut />,
          iconActive: <LogOut />,
          items: t('logout'),
          path: "/login",
        }
        : {
          icon: <LogIn />,
          iconActive: <LogIn />,
          items: t('login'),
          path: "/login",
        },

    ]
  }

  // Separate Profile and Help items
  const mainItems = allowedItems.slice(0, -2);  // Excludes the last two items
  const bottomItems = allowedItems.slice(-2);   // Includes only the last two items




  return (
    <>
      {window.location.pathname === "/login" ||
        window.location.pathname === "/register" ||
        window.location.pathname === "/" ? (
        children
      ) : login || !login ? (
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
                {collapsed ? (
                  <div className="mb-5 flex flex-col items-center justify-between px-4 py-3 w-fit">
                    <button
                      onClick={() => {
                        navigate("/list-hr");
                      }}
                      className=""
                    >
                      <img
                        style={{
                          height: "2rem",
                          width: "auto",
                          marginLeft: "auto",
                          borderRadius: "30px",
                          marginBottom: "2rem",
                        }}
                        src={user?.profilePicture || finabeelight}
                        className=""
                        alt=""
                      />
                    </button>
                    <button
                      style={{ width: "30px" }}
                      onClick={toggleSidebar}
                      className="text-white"
                    >
                      {collapsed ? (
                        <img
                          className="togle1"
                          src={open}
                          style={{ width: "30px" }}
                          alt="open"
                        />
                      ) : (
                        <img
                          className="togle"
                          style={{ width: "30px" }}
                          src={close}
                          alt="close"
                        />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="mb-5 flex items-center justify-between px-4 py-3">
                    <button
                      onClick={() => {
                        navigate("/list-hr");
                      }}
                      className=""
                    >
                      <img
                        style={{
                          height: "3.5rem",
                          borderRadius: "30px",
                          width: "auto",
                          marginLeft: "auto",
                        }}
                        src={user?.profilePicture || finabeelight}
                        className=""
                        alt=""
                      />
                    </button>
                    <button onClick={toggleSidebar} className="text-white">
                      {collapsed ? (
                        <img
                          className="togle1"
                          style={{ width: "30px" }}
                          src={open}
                          alt="open"
                        />
                      ) : (
                        <img
                          className="togle"
                          style={{ width: "30px" }}
                          src={close}
                          alt="close"
                        />
                      )}
                    </button>
                  </div>
                )}
                <Menu className="container mx-auto flex flex-col justify-between text_white h-full">
                  <div style={{ flexGrow: 1 }}>
                    {mainItems.map((item, i) => (
                      <Fragment key={i}>
                        {console.log(item.items, "ii")}
                        {item.subItems ? (
                          <SubMenu
                            icon={item.icon}
                            label={item.items}
                            className={`w-full plusJakara_semibold rounded-3 mb-2 mx-auto  `}
                          >
                            {item.subItems.map((subItem, j) => (
                              <MenuItem
                                key={`${i}-${j}`}
                                onClick={() =>
                                  handleLinkClick(`${i}-${j}`, subItem.path)
                                }
                                component={<Link to={subItem.path} />}
                                className={`w-full pb-2 sub_m  ${isChildPath(subItem.path, location.pathname)
                                  ? "text_secondary plusJakara_semibold"
                                  : "text_white"
                                  }`}
                              >
                                <div className="flex items-center gap-4">
                                  {isChildPath(subItem.path, location.pathname)
                                    ? item.iconActive
                                    : item.icon}
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
                            className={`w-full rounded-3 mb-2 ${isChildPath(item.path, location.pathname)
                              ? "text_secondary plusJakara_semibold"
                              : "text-white"
                              }`}
                          >
                            <div className="flex items-center gap-4">
                              {isChildPath(item.path, location.pathname)
                                ? item.iconActive
                                : item.icon}
                              {!collapsed && (
                                <>
                                  {item.items === t('Calculator') && (
                                    <Tooltip title="Calculate the annual potential savings for your company">
                                      <div className="plusJakara_semibold">
                                        {item.items}
                                      </div>
                                    </Tooltip>
                                  )}
                                  {item.items === t('Information') && (
                                    <Tooltip title="Get to know how the Social Security exemption works">
                                      <div className="plusJakara_semibold">
                                        {item.items}
                                      </div>
                                    </Tooltip>
                                  )}
                                  {item.items === t('profile') && (
                                    <Tooltip title="Review your profile and check your previous simulations">
                                      <div className="plusJakara_semibold">
                                        {item.items}
                                      </div>
                                    </Tooltip>
                                  )}
                                  {item.items === "Help" && (
                                    <Tooltip title="Check the most frequently asked questions">
                                      <div className="plusJakara_semibold">
                                        {item.items}
                                      </div>
                                    </Tooltip>
                                  )}
                                </>
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
                        className={`w-full rounded-3 mb-2 ${isChildPath(item.path, location.pathname)
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
          <main className="w-full overflow-auto">{children}</main>
        </div>
      ) : (
        children
      )}

      {/* {(
        window.location.pathname ==="/login" &&
        window.location.pathname ==="/register" &&
        window.location.pathname ==="/") ? children  : 
      login || !login ? (
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
                {collapsed ? (
                  <div className="mb-5 flex flex-col items-center justify-between px-4 py-3 w-fit">
                    <button
                      onClick={() => {
                        navigate("/list-hr");
                      }}
                      className=""
                    >
                      <img
                        style={{
                          height: "2.5rem",
                          width: "auto",
                          marginLeft: "auto",
                          marginBottom: "2rem",
                        }}
                        src={user?.profilePicture || finabeelight}
                        className=""
                        alt=""
                      />
                    </button>
                    <button
                      style={{ width: "30px" }}
                      onClick={toggleSidebar}
                      className="text-white"
                    >
                      {collapsed ? (
                        <img
                          className="togle1"
                          src={open}
                          style={{ width: "30px" }}
                          alt="open"
                        />
                      ) : (
                        <img
                          className="togle"
                          style={{ width: "30px" }}
                          src={close}
                          alt="close"
                        />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="mb-5 flex items-center justify-between px-4 py-3">
                    <button
                      onClick={() => {
                        navigate("/list-hr");
                      }}
                      className=""
                    >
                      <img
                        style={{
                          height: "4rem",
                          width: "auto",
                          marginLeft: "auto",
                        }}
                        src={user?.profilePicture || finabeelight}
                        className=""
                        alt=""
                      />
                    </button>
                    <button onClick={toggleSidebar} className="text-white">
                      {collapsed ? (
                        <img
                          className="togle1"
                          style={{ width: "30px" }}
                          src={open}
                          alt="open"
                        />
                      ) : (
                        <img
                          className="togle"
                          style={{ width: "30px" }}
                          src={close}
                          alt="close"
                        />
                      )}
                    </button>
                  </div>
                )}
                <Menu className="container mx-auto flex flex-col justify-between text_white h-full">
                  <div style={{ flexGrow: 1 }}>
                    {mainItems.map((item, i) => (
                      <Fragment key={i}>
                        {console.log(item.items, "ii")}
                        {item.subItems ? (
                          <SubMenu
                            icon={item.icon}
                            label={item.items}
                            className={`w-full plusJakara_semibold rounded-3 mb-2 mx-auto  `}
                          >
                            {item.subItems.map((subItem, j) => (
                              <MenuItem
                                key={`${i}-${j}`}
                                onClick={() =>
                                  handleLinkClick(`${i}-${j}`, subItem.path)
                                }
                                component={<Link to={subItem.path} />}
                                className={`w-full pb-2 sub_m  ${
                                  isChildPath(subItem.path, location.pathname)
                                    ? "text_secondary plusJakara_semibold"
                                    : "text_white"
                                }`}
                              >
                                <div className="flex items-center gap-4">
                                  {isChildPath(subItem.path, location.pathname)
                                    ? item.iconActive
                                    : item.icon}
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
                                <>
                                  {item.items === "Calculator" && (
                                    <Tooltip title="Calculate the annual potential savings for your company">
                                      <div className="plusJakara_semibold">
                                        {item.items}
                                      </div>
                                    </Tooltip>
                                  )}
                                  {item.items === t('Information') && (
                                    <Tooltip title="Get to know how the Social Security exemption works">
                                      <div className="plusJakara_semibold">
                                        {item.items}
                                      </div>
                                    </Tooltip>
                                  )}
                                  {item.items === "Profile" && (
                                    <Tooltip title="Review your profile and check your previous simulations">
                                      <div className="plusJakara_semibold">
                                        {item.items}
                                      </div>
                                    </Tooltip>
                                  )}
                                  {item.items === "Help" && (
                                    <Tooltip title="Check the most frequently asked questions">
                                      <div className="plusJakara_semibold">
                                        {item.items}
                                      </div>
                                    </Tooltip>
                                  )}
                                </>
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
          <main className="w-full overflow-auto">{children}</main>
        </div>
      ) :  (
        children
      )} */}
    </>
  );
};

export default SidebarMenu;
