import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import { Form, FormField, Label, FormGroup, FormButton } from '../styles/FormStyle';

import { Container } from '../styles/GenericStyles';

const Login = () => {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [validated] = useState(false);

  // update state based on form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState, [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Container>
          <h4>Login</h4>
            {data ? (
              <p>
                Success! Logging you in
              </p>
            ) : (
              <Form validated={validated} onSubmit={handleFormSubmit}>

                <FormGroup>
                  <Label>Email</Label>
                  <FormField
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  required
                  onChange={handleInputChange}>
                  </FormField>
                  </FormGroup>

                  <FormGroup>
                  <Label>Password</Label>
                  <FormField
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  required
                  onChange={handleInputChange}>
                  
                  </FormField>
                  </FormGroup>
                
                <div style={{"textAlign": "center"}}>
                <FormButton
                disabled={!(formState.email && formState.password)}
                type="submit">Login</FormButton>
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
