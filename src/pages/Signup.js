import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Container, Button, Form } from "react-bootstrap";
import Auth from "../utils/auth";

let emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function login() {
  window.location.replace("/login");
}

function SignupForm() {
  const [formInput, setFormInput] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [validated, setValidated] = useState(false);
  const [addUser, { data }] = useMutation(ADD_USER);
  const [infoMessage, setInfoMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const { data } = await addUser({
          variables: { ...formInput },
        });

        setInfoMessage("Creating your account!");
        Auth.login(data.addUser.token);
        setFormInput({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
        });
      } catch (e) {
        setInfoMessage("Error creating your account: " + e.message);
      }
    }

    setValidated(true);
  };

  return (
    <Container>
      {data ? (
        <p className="text-center">Success! Creating your account</p>
      ) : (
        <Form
          validated={validated}
          onSubmit={handleSubmit}
          className="mx-auto col-sm-12 col-md-9 col-lg-6"
          noValidate
        >
          <h1 className="text-center">Sign Up</h1>

          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={formInput.firstname}
              placeholder="First Name"
              onChange={handleChange}
              required
              minLength={2}
            />

            <div
              className="text-center text-danger"
              style={{
                visibility:
                  formInput.firstname !== "" && formInput.firstname.length < 2
                    ? "visible"
                    : "hidden",
              }}
            >
              First name must be a minimum of 2 characters
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={formInput.lastname}
              placeholder="Last Name"
              onChange={handleChange}
              required
              minLength={2}
            />

            <div
              className="text-center text-danger"
              style={{
                visibility:
                  formInput.lastname !== "" && formInput.lastname.length < 2
                    ? "visible"
                    : "hidden",
              }}
            >
              Last name must be a minimum of 2 characters
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Create a username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formInput.username}
              placeholder="Username"
              onChange={handleChange}
              required
              minLength={2}
            />
            <div
              className="text-center text-danger"
              style={{
                visibility:
                  formInput.username !== "" && formInput.username.length < 2
                    ? "visible"
                    : "hidden",
              }}
            >
              Username must be a minimum of 2 characters
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formInput.email}
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
            <div
              className="text-center text-danger"
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
              value={formInput.password}
              placeholder="Password"
              onChange={handleChange}
              required
              minLength={8}
            />
            <div
              className="text-center text-danger"
              style={{
                visibility:
                  formInput.password !== "" && formInput.password.length < 8
                    ? "visible"
                    : "hidden",
              }}
            >
              Password must be a minimum of 8 characters
            </div>
          </Form.Group>

          {infoMessage && (
            <div className="text-center text-danger">{infoMessage}</div>
          )}

          <div className="text-center">
            <Button
              type="submit"
              className="btn form-btn col-sm-12 col-md-8 col-lg-4 my-3"
              disabled={
                !(
                  formInput.firstname &&
                  formInput.lastname &&
                  formInput.username &&
                  formInput.email &&
                  formInput.password
                )
              }
            >
              Sign Up
            </Button>
          </div>

          <div className="text-center">
            <Button
              className="btn form-btn col-sm-12 col-md-8 col-lg-4 mb-2"
              onClick={login}
            >
              Login instead
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
}

export default SignupForm;
