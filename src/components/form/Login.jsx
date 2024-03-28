import "./form.css";
import { FaUser, FaLock } from "react-icons/fa";
import "typeface-roboto";
import FadeIn from "react-fade-in";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login() {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setItems(data));
  // }, []);

  //Initialize the username and password variables
  const initialValues = { username: "", password: "" };
  //create states for the form values, form errors, and submittion
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formError]);

  //create errors variable and checks if there are missing requirements
  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "*Username is required";
    }
    if (!values.password) {
      errors.password = "*Password is required";
    }
    return errors;
  };

  return (
    <div className="container">
      <div className="input-form">
        <form action="get" onSubmit={handleSubmit}>
          <FadeIn transitionDuration={400} delay={250}>
            <h1>REELEYES.</h1>
            <p className="sub-header">Where you&apos;re the critic.</p>
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
            <div className="remember-forgot">
              <Link href="#">Forgot Password?</Link>
            </div>
            <button type="submit">Sign In</button>
            <div className="register-link">
              <p>
                Don&apos;t have an account?<Link to="/signUp">Register</Link>
              </p>
            </div>
          </FadeIn>
          <p className="error-message">{formError.username}</p>
          <p className="error-message">{formError.password}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
