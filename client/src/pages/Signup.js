import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_USER } from '../utils/mutations';

import { Container, Button, Form} from 'react-bootstrap';

import Auth from '../utils/auth';

let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const login = () => {
  window.location.replace("/login");
};


const SignupForm = () => {

  // set initial form state
  const [formInput, setFormInput] = useState({ username: '', email: '', password: '', firstname: '', lastname: '' });
  // set state for form validation
  const [validated] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);

  const [addUser, { data } ] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittingForm(true);

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
      const { data } = await addUser({
        variables: { ...formInput },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    setFormInput({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    });

  };

  return (
    <>
    <Container>
      <div>
      <h1 className='text-center'>Sign Up</h1>
      {data ? (
              <p>
                Success! Creating your account...
              </p>
            ) : (
      <Form validated={validated} onSubmit={handleSubmit} className='mx-auto col-sm-12 col-md-9 col-lg-6'>

    <Form.Group disabled={submittingForm}>
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name ="firstname" value={formInput.firstname.trim() || ''} placeholder="First Name" onChange={handleChange} required minLength={2}/>
    </Form.Group>

    {formInput.firstname.length < 2 ? 
        <div className="text-center text-danger">{"First name must be at least 2 characters"}</div> : ''};

    <Form.Group disabled={submittingForm}>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text"name ="lastname" value={formInput.lastname.trim() || ''} placeholder="Last Name" onChange={handleChange} required minLength={2}/>
    </Form.Group>

    {formInput.lastname.length < 2 ? 
        <div className="text-center text-danger">{"Last name must be at least 2 characters"}</div> : ''};
    
    <Form.Group disabled={submittingForm}>
        <Form.Label>Create a username</Form.Label>
        <Form.Control type="text" name ="username" value={formInput.username.trim() || ''} placeholder="username" onChange={handleChange} required minLength={2} formNoValidate={true}/>
    </Form.Group>
    
    {formInput.username.length < 2 ? 
        <div className="text-center text-danger">{"Username must be at least 2 characters"}</div> : ''};

    <Form.Group disabled={submittingForm}>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name ="email" value={formInput.email.trim() || ''} placeholder="Enter email" onChange={handleChange} required minLength={2}/>
    </Form.Group>

    {!emailRegex.test(formInput.email) ? 
        <div className="text-center text-danger">{"Invalid email entered"}</div> : ''};

    <Form.Group disabled={submittingForm}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={formInput.password || ''} placeholder="Password" onChange={handleChange} required minLength={8}/>
    </Form.Group>

    {formInput.password.length < 8 ? 
        <div className="text-center text-danger">{"Password must be minimum 8 characters"}</div> : ''};

    <div className='text-center'>
        <Button type="submit" 
        className=' btn btn-dark col-sm-12 col-md-8 col-lg-4 m-2'
        disabled={!(formInput.username && formInput.firstname && formInput.lastname && formInput.email)}>
            Sign Up
        </Button>
        </div>

        <div className='text-center'>
        <Button className='btn btn-dark col-sm-12 col-md-8 col-lg-4 m-2 btn'
        onClick={login}>
            login instead
        </Button>
    </div>
    </Form>

            )}
              {submittingForm &&
                    <div>Submitting the form...</div>}
            </div>
        </Container>
    </>
  );
};

export default SignupForm;
