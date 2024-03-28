import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "typeface-roboto";
import FadeIn from "react-fade-in";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp() {
  //Initialize the username and password variables
  const initialValues = {
    username: "",
    password: "",
    email: "",
    confirm_password: "",
  };
  //create states for the form values, form errors, and submittion
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //set the state of values to the users input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //need more explanation
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError(validate(formValues));
    setIsSubmit(true);
  };

  //checks the form error if their are updates
  useEffect(() => {
    if (Object.keys(formError).length == 0 && isSubmit) {
      setIsSuccess(true);
      axios
        .post("http://localhost:8080/signUp", formValues)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }
  }, [formError]);

  //create errors variable and checks if there are missing requirements
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "*Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "*Invalid Email";
    }
    if (!values.username) {
      errors.username = "*Username is required";
    }
    if (!values.password) {
      errors.password = "*Password is required";
    } else if (values.password.length < 4) {
      errors.password = "*Password must be larger than 4 characters";
    } else if (values.password.length > 12) {
      errors.password = "*Password must be smaller than 12 characters";
    }
    if (values.password != values.confirm_password) {
      errors.confirm_password = "*Passwords do not match";
    }
    return errors;
  };

  return (
    <div className="container">
      <div className="input-form">
        {isSuccess ? (
          <div className="isSuccess">
            <h2>Account created successfully</h2>
          </div>
        ) : (
          <></>
        )}
        <form action="POST" onSubmit={handleSubmit}>
          <FadeIn transitionDuration={400} delay={200}>
            <h1>REELEYES.</h1>
            <p className="sub-header">Create Account</p>
            <div className="input-box">
              <input
                type="text"
                name="email"
                placeholder="example@email.com"
                value={formValues.email}
                onChange={handleChange}
              />
              <i className="icon-container">
                <MdEmail className="icon" />
              </i>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
              <i className="icon-container">
                <FaUser className="icon" />
              </i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
              <i className="icon-container">
                <FaLock className="icon" />
              </i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={formValues.confirm_password}
                onChange={handleChange}
              />
              <i className="icon-container">
                <FaLock className="icon" />
              </i>
            </div>
            <button type="submit">Sign Up</button>
            <div className="register-link">
              <p>
                Already have an account?<Link to="/">Sign In</Link>
              </p>
            </div>
          </FadeIn>
          <p className="error-message">{formError.email}</p>
          <p className="error-message">{formError.username}</p>
          <p className="error-message">{formError.password}</p>
          <p className="error-message">{formError.confirm_password}</p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
