import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import { Container, Button, Form} from 'react-bootstrap';

import Auth from '../utils/auth';

const signup = () => {
  window.location.replace("/signup");
}

let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Login() {

  const [formInput, setFormInput] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [validated] = useState(false);

  // update state based on form input changes
  function handleChange (event) {
    const { name, value } = event.target;

    setFormInput({
      ...formInput, [name]: value,
    });
  };

  // state for messages
  const [infoMessage, setInfoMessage] = useState('');

  // submit form
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
      const { data } = await login({
        variables: { ...formInput },
      });

      if (!data) {
        setInfoMessage('Wrong email or password entered')
        throw new Error('something went wrong trying to log in!');
      }

      setInfoMessage('Logging in!')
      console.log('logging in', data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormInput('');
  };

  return (
    <Container>
          <h1 className='text-center'>Login</h1>
            {data ? (
              <p>
                Success! Logging you in
              </p>
            ) : (
              <Form validated={validated} onSubmit={handleSubmit}>

              <Form.Group disabled={submittingForm}>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name ="email" value={formInput.email.trim() || ''} placeholder="Enter email" onChange={handleChange} required/>
              </Form.Group>

              {!emailRegex.test(formInput.email) ? 
                  <div className="text-center text-danger">{"Invalid email entered"}</div> : ''};

              
              <Form.Group disabled={submittingForm}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={formInput.password || ''} placeholder="Password" onChange={handleChange} required/>
              </Form.Group>

              {formInput.password.length < 8 ? 
                  <div className="text-center text-danger">{"Password must be minimum 8 characters"}</div> : ''};

              {infoMessage && (
            <div className='text-center'>{infoMessage}</div>
          )}

              <div className='text-center'>
                  <Button type="submit" 
                  className='btn btn-dark col-sm-12 col-md-8 col-lg-4 m-2'
                  disabled={!(formInput.email && formInput.password)}>
                      Login
                  </Button>
              </div>

              <div className='text-center'>
              <Button className='btn btn-dark col-sm-12 col-md-8 col-lg-4 m-2'
              onClick={signup}>
                  Sign Up instead
              </Button>
              </div>
              </Form>
            )}

            {error && (
              <div>
                {error.message}
              </div>
            )}
    </Container>
  );
};

export default Login;
