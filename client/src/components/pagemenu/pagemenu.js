import React from "react";
import "./PageMenu.scss";
import { NavLink } from "react-router-dom";

const Pagemenu = () => {
  return (
    <div>
      <nav className="--bg-primary --p --mb">
        <ul className="home-links">
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/wallet">My wallet</NavLink>
          </li>
          <li>
            <NavLink to="/wishlist">Wishlist</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagemenu;
