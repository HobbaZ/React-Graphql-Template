import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_ME, DELETE_ME } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

function Greeting(props) {
  const date = new Date();
  let currentHour = date.getHours();
  let currentGreeting = "";

  if (currentHour >= 0 && currentHour < 12) {
    currentGreeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    currentGreeting = "Good Afternoon";
  } else {
    currentGreeting = "Good Evening";
  }

  return (
    <>
      <h1>
        {currentGreeting}, {props.firstname || "User"}
      </h1>
      <h4>Your current details are:</h4>
      <p>First Name: {props.firstname || ""}</p>
      <p>Last Name: {props.lastname || ""}</p>
      <p>Username: {props.username || ""}</p>
      <p>Email: {props.email || ""}</p>
    </>
  );
}

const Profile = () => {
  const { data, loading } = useQuery(QUERY_ME);

  const userData = data?.me || {};

  const [formInput, setFormInput] = useState({
    firstname: userData.firstname || "",
    lastname: userData.lastname || "",
    username: userData.username || "",
    email: userData.email || "",
  });

  const [submittingForm, setSubmittingForm] = useState(false);
  const [updateUser] = useMutation(UPDATE_ME);
  const [deleteUser] = useMutation(DELETE_ME);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setFormInput({
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        username: userData.username || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  const deleteAccount = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      setInfoMessage("Need to be logged in to do this");
      window.location.replace("/login");
      return;
    }

    try {
      await deleteUser({
        variables: { _id: userData._id },
      });

      setInfoMessage("Account deleted!");
      Auth.logout();
      window.location.replace("/signup");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setSubmittingForm(true);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      setInfoMessage("Need to be logged in to do this");
      window.location.replace("/login");
      return;
    }

    try {
      const { data } = await updateUser({
        variables: { ...formInput },
        refetchQueries: [{ query: QUERY_ME }],
      });

      if (data) {
        setInfoMessage("Details updated!");
        setFormInput({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
        });
        setSubmittingForm(false);
        window.location.replace("/profile");
      }
    } catch (err) {
      console.error(err);
      setSubmittingForm(false);
    }
  };

  return (
    <Container className="profileContainer">
      {Auth.loggedIn() && (
        <>
          <h2 className="text-center">Your Profile</h2>

          <div>
            <Greeting
              lastname={userData.lastname || "Loading..."}
              firstname={userData.firstname || "Loading..."}
              username={userData.username || "Loading..."}
              email={userData.email || "Loading..."}
            />
          </div>

          {loading && <p>Loading your profile...</p>}

          {infoMessage && <div className="errMsg">{infoMessage}</div>}

          <Button
            type="button"
            className="btn btn-outline-light"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Update Profile
          </Button>

          <Button
            className="btn btn-outline-danger my-3"
            onClick={deleteAccount}
          >
            Delete Account
          </Button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update Profile
                  </h5>
                  <button
                    type="button"
                    className="close"
                    id="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&#9587;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Form onSubmit={submitForm} className="w-100">
                    <Form.Group className="">
                      <Form.Label>Update First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={formInput.firstname || ""}
                        placeholder={userData.firstname || "First Name"}
                        onChange={handleChange}
                        minLength={2}
                        disabled={submittingForm}
                      />
                    </Form.Group>

                    <div
                      className="errMsg"
                      style={{
                        visibility:
                          formInput.firstname !== "" &&
                          formInput.firstname?.length < 2
                            ? "visible"
                            : "hidden",
                      }}
                    >
                      First name must be a minimum of 2 characters
                    </div>

                    <Form.Group className="mb-3">
                      <Form.Label>Update Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={formInput.lastname || ""}
                        placeholder={userData.lastname || "Last Name"}
                        onChange={handleChange}
                        minLength={2}
                        disabled={submittingForm}
                      />
                    </Form.Group>

                    <div
                      className="errMsg"
                      style={{
                        visibility:
                          formInput.lastname !== "" &&
                          formInput.lastname?.length < 2
                            ? "visible"
                            : "hidden",
                      }}
                    >
                      Last name must be a minimum of 2 characters
                    </div>

                    <Form.Group className="mb-3">
                      <Form.Label>Update Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formInput.username || ""}
                        placeholder={userData.username || "Username"}
                        onChange={handleChange}
                        minLength={2}
                        disabled={submittingForm}
                      />
                    </Form.Group>

                    <div
                      className="errMsg"
                      style={{
                        visibility:
                          formInput.username !== "" &&
                          formInput.username?.length < 2
                            ? "visible"
                            : "hidden",
                      }}
                    >
                      Username must be a minimum of 2 characters
                    </div>

                    <Form.Group className="mb-3">
                      <Form.Label>Update Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formInput.email || ""}
                        placeholder={userData.email || "Email"}
                        onChange={handleChange}
                        disabled={submittingForm}
                      />
                    </Form.Group>

                    <div
                      className="errMsg"
                      style={{
                        visibility:
                          formInput.email !== "" &&
                          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formInput.email)
                            ? "visible"
                            : "hidden",
                      }}
                    >
                      Invalid email entered
                    </div>

                    {infoMessage && <div className="errMsg">{infoMessage}</div>}

                    {!infoMessage && (
                      <div className="text-center">
                        <Button
                          type="submit"
                          className="btn btn-outline-light mt-2 mb-0"
                          disabled={submittingForm}
                        >
                          Update
                        </Button>
                      </div>
                    )}
                  </Form>
                </div>
                <div className="modal-footer">
                  <Button
                    type="button"
                    className="btn btn-outline-light mt-2"
                    data-dismiss="modal"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Profile;
