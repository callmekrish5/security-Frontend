import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "./zlogo.jpg";

function Register() {
  const location = "localhost";
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const navigate = useNavigate();

  const clearState = () => {
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setMobile("");
    setFnameError("");
    setLnameError("");
    setEmailError("");
    setPasswordError("");
    setMobileError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!fname || !lname || !email || !password || !mobile) {
      alert("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    if (!validateMobile(mobile)) {
      setMobileError("Please enter a valid mobile number");
      return;
    } else {
      setMobileError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else {
      setPasswordError("");
    }

    const data = {
      first_name: fname,
      last_name: lname,
      email: email,
      password: password,
      mobile: mobile,
    };

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(`https://${location}:3000/users/register/`, settings);
      const responseData = await response.json();
      if (response.ok) {
        navigate("/");
        window.confirm(responseData.message);
      } else {
        throw new Error(responseData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    // Basic mobile number validation (10 digits)
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const validatePassword = (password) => {
    // Password should be at least 8 characters long
    return password.length >= 8;
  };

  return (
    <>
      <Navbar />
      <div className="contact-form2">
        <img className="avatar" src={logo} alt="Logo" />
        <h2>REGISTER</h2>
        <form onSubmit={handleSubmit}>
          <p>First Name</p>
          <input
            placeholder="Enter First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            type="text"
          />
          {fnameError && <div className="error-message"  style={{ color: 'red' }}>{fnameError}</div>}
          <p>Last Name</p>
          <input
            placeholder="Enter Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            type="text"
          />
          {lnameError && <div className="error-message"  style={{ color: 'red' }}>{lnameError}</div>}
          <p>Email</p>
          <input
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          {emailError && <div className="error-message"  style={{ color: 'red' }}>{emailError}</div>}
          <p>Mobile no.</p>
          <input
            placeholder="Enter Mobile no."
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="tel"
          />
          {mobileError && <div className="error-message"  style={{ color: 'red' }}>{mobileError}</div>}
          <p>Password</p>
          <input
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {passwordError && <div className="error-message"  style={{ color: 'red' }}>{passwordError}</div>}
          <div className="btn-group">
            <button type="button" className="btn signup_btn" onClick={clearState}>
              Cancel
            </button>{" "}
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
