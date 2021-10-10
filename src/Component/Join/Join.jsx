import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Images/ChatBot.png";
import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="container">
      <div className="details">
        <div className="header">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <h2>Join Chat App</h2>
        </div>
        <hr></hr>
        <div className="section">
          <div className="name-section">
            <label id="name">Enter Your Name</label>
            <input
              type="text"
              id="name"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className="email-section">
            <label id="email">Enter Your Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="action">
          {email.length > 0 && name.length > 0 ? (
            <Link
              to={{ pathname: "/chat", state: { name: name, email: email } }}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <button style={{ opacity: 1 }} className="button">Join</button>
            </Link>
          ) : (
            <button style={{ opacity: 0.5 }} className="button">Join</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Join;
