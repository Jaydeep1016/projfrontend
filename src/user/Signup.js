import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(() => {});
  };
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="from-group">
              <label htmlFor="" className="text-light">
                Name
              </label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                value={name}
                type="text"
              />
            </div>
            <div className="from-group">
              <label htmlFor="" className="text-light">
                Email
              </label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                value={email}
                type="Email"
              />
            </div>
            <div className="from-group">
              <label htmlFor="" className="text-light">
                Password
              </label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                value={password}
                type="Password"
              />
            </div>
            <br />
            <div className="row">
              <button
                className="btn-success btn-block col-10 offset-1"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New account has been successfully,Please
        <Link to="/signin">Login here</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  return (
    <Base title="Sing up page" description="Page For user to sign up!">
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {successMessage()}
          {errorMessage()}
        </div>
      </div>
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
