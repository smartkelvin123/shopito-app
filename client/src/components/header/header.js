import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { RESET_AUTH, logout } from "../../redux/features/auth/authslice";
import { ShowOnLogOut, ShowOnLogin } from "../hiddenLink/hiddenlinks";
import { getLoginStatus } from "../../redux/features/auth/authslice";
import { UserName } from "../../pages/profile/profile";
import { FaUserCircle } from "react-icons/fa";

export const activeLink = ({ isActive }) => {
  return isActive ? `${styles.active}` : "";
};

export const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Shop<span>ito</span>
      </h2>
    </Link>
  </div>
);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScollPage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fixNavbar = () => {
    if (window.scrollY >= 100) {
      setScollPage(true);
    } else {
      setScollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    // Dispatch getLoginStatus on initial render
    dispatch(getLoginStatus());
  }, [dispatch]);

  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH);
    navigate("/login");
  };

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );
  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.Header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]}  ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={25} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink className={activeLink} to="/shop">
                Shop
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]}>
            <span className={styles.links}>
              <ShowOnLogin>
                <NavLink className={activeLink} to="/login">
                  <FaUserCircle size={16} color="#ff7722" />
                  <UserName />
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogOut>
                <NavLink className={activeLink} to="/login">
                  login
                </NavLink>
              </ShowOnLogOut>

              <ShowOnLogOut>
                <NavLink className={activeLink} to="/register">
                  Register
                </NavLink>
              </ShowOnLogOut>

              <ShowOnLogin>
                <NavLink className={activeLink} to="/order-history">
                  My-order
                </NavLink>
              </ShowOnLogin>

              <ShowOnLogin>
                <Link to={"/"} onClick={logoutUser}>
                  Logout
                </Link>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <CgMenuGridR size={30} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
