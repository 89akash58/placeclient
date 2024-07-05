import React, { useState } from "react";
import axios from "axios";
import "./SignupForm.css";
import { IoMdLock, IoMdPerson } from "react-icons/io";
import { SiAmazonsimpleemailservice } from "react-icons/si";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { username, email, password, confirmPassword } = formData; // Only send relevant data
        const response = await axios.post(
          "https://placeserver.onrender.com/register",
          { username, email, password, confirmPassword },
          {
            headers: {
              "Content-Type": "application/json", // Ensure Content-Type is set
            },
          }
        );
        console.log(response.data);

        // Clear form fields and set success message
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setMessage("User registered successfully!");
        setErrors({});
      } catch (error) {
        console.error("Signup error:", error);
        setMessage(
          error.response?.data?.message || "An error occurred during signup."
        );
      }
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-triangles">
        {[...Array(11)].map((_, index) => (
          <div key={index} className={`triangle triangle-${index + 1}`}></div>
        ))}
      </div>

      <div className="signup-container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="formdesign">
          <div className="signup">
            <IoMdPerson className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="signup">
            <SiAmazonsimpleemailservice className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="signup">
            <IoMdLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Create a Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="signup">
            <IoMdLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit">Signup</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p>
          Already have an Account?{" "}
          <a href="/login" style={{ color: "red" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
