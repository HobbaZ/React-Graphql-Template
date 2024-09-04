import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

import { ThreeJSBackground } from "../components/ThreeJSBackground";

const signup = () => {
  window.location.replace("/signup");
};

let emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Login() {
  const [formInput, setFormInput] = useState({ email: "", password: "" });
  const [login, { data }] = useMutation(LOGIN_USER);
  const [validated] = useState(false);

  // update state based on form input changes
  function inputChange(event) {
    const { name, value } = event.target;

    setFormInput({
      ...formInput,
      [name]: value,
    });
  }

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  // submit form
  const submitForm = async (event) => {
    event.preventDefault();

    if (!formInput) {
      return false;
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //Send data to login endpoint
    try {
      const { data } = await login({
        variables: { ...formInput },
      });

      setInfoMessage("Logging in!");
      Auth.login(data.login.token);
    } catch (e) {
      setInfoMessage("Incorrect password or email address entered!");
      console.error("Incorrect password or email address entered", e);
    }
  };

  return (
    <Container>
      {data ? (
        <p className="text-cennter">Success! Logging you in</p>
      ) : (
        <>
          <Form
            validated={validated}
            onSubmit={submitForm}
            className="col-sm-12 col-md-9 col-lg-6"
          >
            <h1 className="text-center">Login</h1>

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formInput.email || ""}
                placeholder="Enter email"
                onChange={inputChange}
                required
              />

              <div
                className="errMsg"
                style={{
                  visibility:
                    formInput.email !== "" && !emailRegex.test(formInput.email)
                      ? "visible"
                      : "hidden",
                }}
              >
                Invalid email entered
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formInput.password || ""}
                placeholder="Password"
                onChange={inputChange}
                required
              />
            </Form.Group>

            <div
              className="errMsg"
              style={{
                visibility:
                  formInput.password !== "" && formInput.password.length < 8
                    ? "visible"
                    : "hidden",
              }}
            >
              Password must be a minimum of 8 characters
            </div>

            {infoMessage && <div className="errMsg">{infoMessage}</div>}

            {/*<div className="text-center">
              <Button
                type="submit"
                className="form-btn col-sm-12 col-md-8 col-lg-4 my-3"
                disabled={!(formInput.email && formInput.password)}
              >
                Login
              </Button>
          </div>*/}

            <div className="text-center">
              <Button
                type="submit"
                className="form-btn col-sm-12 col-md-8 col-lg-4 my-3 loginButton loginBtn"
                disabled={!(formInput.email && formInput.password)}
              >
                <span>Login</span>
                <div className="slide"></div>
              </Button>
            </div>

            <div className="text-center">
              <Button
                className="form-btn col-sm-12 col-md-8 col-lg-4 my-3 loginButton loginBtn"
                onClick={signup}
              >
                <span>Sign Up instead</span>
                <div className="slide"></div>
              </Button>
            </div>

            {/*<div className="text-center">
              <Button
                className="form-btn col-sm-12 col-md-8 col-lg-4 mb-2"
                onClick={signup}
              >
                Sign Up instead
              </Button>
        </div>*/}
          </Form>
        </>
      )}
    </Container>
  );
}

export default Login;
