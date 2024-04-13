import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { images } from "../../constant";
import "../../style/btn2.scss";
import style from "./NavBar.module.scss";
import axios from "axios";

const NavBar = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/protected/isLoggedIn", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.response.status == 200) {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setLoggedIn(true);
        }

        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={style.nav}>
        <div className={style.nav__menu}>
          <Link to="/">
            <img src={images.logo_dark} alt="" />
          </Link>
          <div className={style.nav__list}>
            <div className={style.new_file}>
              <div className="app__flex btn-2">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="plus"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                  ></path>
                </svg>
                <span>New file</span>
              </div>
            </div>
            {isLoggedIn ? (
              <Link to="/dashboard" style={{textDecoration: "none"}}>
                <div className={style.dashboard}>
                  <div className="app__flex">
                    <svg
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"
                      />
                    </svg>
                    <span>Dashboard</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className={style.signin}>
                <Link to="/login">
                  <span className="app__flex">
                    Sign in <img src={images.rightArrow} alt="" />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
