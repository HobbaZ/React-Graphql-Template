import { Container, Button, Form } from "react-bootstrap";

export const UpdateProfile = (...props) => {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <Container className="fluid mx-auto">
      <Form onSubmit={props.submitForm} className="">
        <h1 className="text-center">Update Your Details</h1>

        <Form.Group className="mb-3">
          <Form.Label>Update First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            value={props.formInput.firstname || props.userData.firstname}
            placeholder={props.userData.firstname}
            onChange={props.handleChange}
            minLength={2}
            disabled={props.submittingForm}
          />
          {props.formInput.firstname !== "" &&
            props.formInput.firstname.length < 2 && (
              <div className="text-center text-danger">
                First name must be minimum 2 characters
              </div>
            )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Update Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={props.formInput.lastname || props.userData.lastname}
            placeholder={props.userData.lastname}
            onChange={props.handleChange}
            minLength={2}
            disabled={props.submittingForm}
          />
          {props.formInput.lastname !== "" &&
            props.formInput.lastname.length < 2 && (
              <div className="text-center text-danger">
                Last name must be minimum 2 characters
              </div>
            )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Update Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={props.formInput.username || props.userData.username}
            placeholder={props.userData.username}
            onChange={props.handleChange}
            minLength={2}
            disabled={props.submittingForm}
          />
          {props.formInput.username !== "" &&
            props.formInput.username.length < 2 && (
              <div className="text-center text-danger">
                Username must be minimum 2 characters
              </div>
            )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Update Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={props.formInput.email || props.userData.email}
            placeholder={props.userData.email}
            onChange={props.handleChange}
            minLength={2}
            disabled={props.submittingForm}
          />
          {props.formInput.email !== "" &&
            !emailRegex.test(props.formInput.email) && (
              <div className="text-center text-danger">
                Invalid email entered
              </div>
            )}
        </Form.Group>

        {props.infoMessage && (
          <div className="text-center text-danger">{props.infoMessage}</div>
        )}

        <div className="text-center">
          <Button
            type="submit"
            className="btn form-btn col-sm-12 col-md-8 col-lg-4 my-2"
            disabled={props.submittingForm}
          >
            Update
          </Button>
        </div>
      </Form>
    </Container>
  );
};

// Default props in case userData or formInput are undefined
UpdateProfile.defaultProps = {
  formInput: {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  },
  userData: {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  },
};
