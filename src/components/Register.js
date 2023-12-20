import React, { useState } from "react";
import "../css/register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const postFormData = async () => {
    try {
      const response = await fetch("https://karchu.onrender.com/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Registration Successful`);
        navigate("/login");
      } else {
        const errorMessage = await response.json();
        alert(`Error: ${errorMessage["error_message"]}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error}`);
    }
  };

  const validateForm = () => {
    let tempErrors = {};

    // Simple validations (you can expand upon these)
    if (!formData.name) tempErrors.name = "Name is required.";
    // if (!formData.lastName) tempErrors.lastName = "Last name is required.";
    if (!formData.email.includes("@")) tempErrors.email = "Email is invalid.";
    if (formData.password.length < 8)
      tempErrors.password = "Password should be at least 8 characters.";
    // if (formData.password !== formData.confirmPassword)
    //   tempErrors.confirmPassword = "Passwords do not match.";
    // if (formData.phone.length < 10)
    //   tempErrors.phone = "Please enter a valid phone number.";
    

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
      // Process your form data here (e.g., send to an API)
      postFormData(formData);
    }
  };

  return (
    <>
      <h1 style={{ color: "black" }}>Register!!!</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
        />
        {errors.name && <div>{errors.name}</div>}

        <input name="email" placeholder="Email ID" onChange={handleInputChange} />
        {errors.email && <div>{errors.email}</div>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        {errors.password && <div>{errors.password}</div>}

        {/* <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter Password"
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <div>{errors.confirmPassword}</div>} 
        <input
          type="phone"
          name="phone"
          placeholder="Phone number"
          onChange={handleInputChange}
        />
        {errors.phone && <div>{errors.phone}</div>}*/}
        
        <button type="submit" style={{ marginTop:"5px" }}>Submit</button>
      </form>
    </>
  );
}

export default Register;