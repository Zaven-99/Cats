import React, { useState } from "react";
import styles from "./header.module.css";

import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  const toggleActive = (color) => {
    setActiveLink(color === activeLink ? "" : color);
  };

  return (
    <header className={styles.header}>
      <ul>
        <li
          className={`${styles.link} ${
            activeLink === "blue" ||
            (activeLink === "" && location.pathname === "/")
              ? styles.active
              : ""
          }`}
        >
          <NavLink onClick={() => toggleActive("blue")} to="/">
            Все котики
          </NavLink>
        </li>
        <li
          className={`${styles.link} ${
            activeLink === "red" ||
            (activeLink === "" && location.pathname === "/favourite")
              ? styles.active
              : ""
          }`}
        >
          <NavLink onClick={() => toggleActive("red")} to="/favourite">
            Любимые котики
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
