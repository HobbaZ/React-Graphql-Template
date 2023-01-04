import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_USER } from '../utils/mutations';

import { Container, Button, Form} from 'react-bootstrap';

import Auth from '../utils/auth';

let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function login() {
  window.location.replace("/login");
};

function SignupForm () {

  // set initial form state
  const [formInput, setFormInput] = useState({firstname: '', lastname: '', username: '', email: '', password: ''});
  // set state for form validation
  const [validated] = useState(false);

  // set mutation at submit event
  const [addUser, { data } ] = useMutation(ADD_USER);

  // state for messages
  const [infoMessage, setInfoMessage] = useState('');

  // sets and resets the data variable to whatever you are typing in the textbox
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  //Submits the data from the form to the endpoint
  const handleSubmit = async (event) => {
    event.preventDefault();

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

      setInfoMessage('Creating your account!')
      Auth.login(data.addUser.token);
      setFormInput('');
    } catch (e) {
            
      setInfoMessage(e.message)
      console.log("Error creating your account: ",e.message);
    }
  };

  return (
    <Container>
      
      
        {data ? (
              <p className='text-center'>
                Success! Creating your account
              </p>
            ) : (

      <Form validated={validated} onSubmit={handleSubmit} className='mx-auto col-sm-12 col-md-9 col-lg-6'>

      <h1 className='text-center'>Sign Up</h1>

    <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name ="firstname" value={formInput.firstname || ''} placeholder="First Name" onChange={handleChange} required minLength={2}/>
    </Form.Group>

    {formInput.firstname!== '' && formInput.firstname.length < 2 ? 
                  <div className="text-center text-danger">{"First name must be minimum 2 characters"}</div> : ''}

    <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text"name ="lastname" value={formInput.lastname || ''} placeholder="Last Name" onChange={handleChange} required minLength={2}/>
    </Form.Group>

    {formInput.lastname!== '' && formInput.lastname.length < 2 ? 
                  <div className="text-center text-danger">{"Last name must be minimum 2 characters"}</div> : ''}

    <Form.Group>
        <Form.Label>Create a username</Form.Label>
        <Form.Control type="text" name ="username" value={formInput.username || ''} placeholder="username" onChange={handleChange} required minLength={2} formNoValidate={true}/>
    </Form.Group>

    {formInput.username!== '' && formInput.username.length < 2 ? 
                  <div className="text-center text-danger">{"Username must be minimum 2 characters"}</div> : ''}
    
    <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name ="email" value={formInput.email || ''} placeholder="Enter email" onChange={handleChange} required minLength={2}/>
    </Form.Group>

    {formInput.email!== '' && !emailRegex.test(formInput.email) ? 
                  <div className="text-center text-danger">{"Invalid email entered"}</div> : ''}

    <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={formInput.password || ''} placeholder="Password" onChange={handleChange} required minLength={8}/>
    </Form.Group>

    {formInput.password!== '' && formInput.password.length < 8 ? 
                  <div className="text-center text-danger">{"Password must be minimum 8 characters"}</div> : ''}

    {infoMessage && (
            <div className='text-center text-danger'>{infoMessage}</div>
            )}

    <div className='text-center'>
        <Button type="submit" 
        className='btn form-btn col-sm-12 col-md-8 col-lg-4 my-3'
        disabled={!(formInput.firstname && formInput.lastname && formInput.username && formInput.email && formInput.password)}>
            Sign Up
        </Button>
        </div>

        <div className='text-center'>
        <Button className='btn form-btn col-sm-12 col-md-8 col-lg-4 mb-2'
        onClick={login}>
            login instead
        </Button>
    </div>
    </Form>
        )}

    </Container>
  );
};

export default SignupForm;
