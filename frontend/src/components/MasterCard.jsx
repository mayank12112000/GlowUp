import React, { useContext } from "react";
import "./masterCard.css";
import { ThemeContext } from "../context/ThemeProvider";
import { Link } from "react-router-dom";

export default function MasterCard({ text,link="" }) {
    const {theme} = useContext(ThemeContext)
    const cardStyles = {
        pastel: "master-card-pastel",
        gradient: "master-card-gradient",
        vibrant: "master-card-vibrant",
      };
  return (
    <Link className={`m-3 master-card ${cardStyles[theme==="dark"?"vibrant":"gradient"]}`} to={`/masters/${link}`}>
    <p style={{color:theme==="dark"?"white":"black"}}>{text}</p>
     </Link>
  );
}
