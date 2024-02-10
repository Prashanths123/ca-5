import React, { useState } from 'react';
import "./Register.css";
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const showToastMessage = () => {
    toast.success("Signed up!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const FormSubmitHandler = (data) => {
    console.log("data:", data);
  };

  const submitted = isSubmitSuccessful;
  if (submitted) {
    showToastMessage();
  }

  localStorage.setItem("submitstatus", submitted);
  console.log("errors:", errors);

  return (
    <div className='container'>
      {submitted && (
        <div className='success'>
          <div className='success2'>
            <h2 style={{ margin: "20px" }}>Registration Successful ✅</h2>
          </div>
        </div>
      )}
      <fieldset
        style={{
          display: submitted ? 'none' : 'block',
          padding: "10px",
          overflowY: "hidden",
        }}
      >
        <form onSubmit={handleSubmit(FormSubmitHandler)}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            {...register("name", {
              required: "Fill name",
              minLength: {
                value: 3,
                message: "Minimum 3 characters required",
              },
              maxLength: {
                value: 30,
                message: "Maximum 30 characters only required",
              },
            })}
          />
          <p className='err'>{errors.name?.message}</p>

          <label>Email:</label>
          <input
            type="text"
            name='email'
            {...register("email", {
              required: "Fill email",
              minLength: {
                value: 4,
                message: "Minimum 4 characters required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email not valid",
              },
            })}
          />
          <p className='err'>{errors.email?.message}</p>

          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            name='password'
            {...register("password", {
              required: "Fill password",
              minLength: {
                value: 4,
                message: "Minimum 4 characters required",
              },
              maxLength: {
                value: 8,
                message: "Maximum 8 characters only allowed",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z]).{8,}$/,
                message: "Password not valid",
              },
            })}
          />
          <p className='err'>{errors.password?.message}</p>

          <label>Repeat Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            name="repeatPassword"
            {...register('repeatPassword', {
              required: 'Passwords do not match',
              validate: (value) =>
                value === watch('password') ||
                'Passwords do not match',
            })}
          />
          <p className="err">{errors.repeatPassword?.message}</p>

          <div style={{ display: "flex", textAlign: "center" }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={handleShowPasswordToggle}
              style={{ height: "20px", marginLeft: "110px" }}
            />{" "}
            <h4>Show password</h4>
          </div>

          <input type='submit' value={"Sign Up"} style={{ margin: "10px" }} />
        </form>
      </fieldset>
      <Link to={"/"} style={{ margin: "10px" }}>
        <button style={{ backgroundColor: "green", color: "white" }}>
          Back to Home
        </button>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Form;
