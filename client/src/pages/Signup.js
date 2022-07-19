import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_USER } from '../utils/mutations'

import Auth from '../utils/auth';

import { Form, FormField, Label, FormGroup, FormButton } from '../styles/FormStyle';

import { Container } from '../styles/GenericStyles';

const SignupForm = () => {

  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', firstname: '', llastname: '' });
  // set state for form validation
  const [validated] = useState(false);

  const [addUser, { error, data } ] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });

  };

  return (
    <>
    <Container>
    <h4>Sign Up</h4>
      {data ? (
              <p>
                Success! Creating your account...
              </p>
            ) : (
      <Form validated={validated} onSubmit={handleFormSubmit}>

        <FormGroup>
            <Label>First Name</Label>
            <FormField
            placeholder="Your first name"
            name="firstname"
            type="text"
            value={userFormData.firstname}
            onChange={handleInputChange}>
            </FormField>
        </FormGroup>

        <FormGroup>
            <Label>Last Name</Label>
            <FormField
            placeholder="Your last name"
            name="lastname"
            type="text"
            value={userFormData.lastname}
            onChange={handleInputChange}>
            </FormField>
        </FormGroup>

        <FormGroup>
            <Label>Username</Label>
            <FormField
            placeholder="Your username"
            name="username"
            type="text"
            value={userFormData.username}
            onChange={handleInputChange}>
            </FormField>
        </FormGroup>

        <FormGroup>
            <Label>Email</Label>
            <FormField
            placeholder="Your email"
            name="email"
            type="email"
            value={userFormData.email}
            onChange={handleInputChange}>
            </FormField>
        </FormGroup>

        <FormGroup>
            <Label>Password</Label>
            <FormField
            placeholder="Create a password"
            name="password"
            type="password"
            value={userFormData.password}
            onChange={handleInputChange}>
            </FormField>
        </FormGroup>

        <div style={{"textAlign": "center"}}>
        <FormButton
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'>
          Sign Up
        </FormButton>
        </div>
      </Form>
      )}

            {error && (
              <div>
                {error.message}
              </div>
            )}
      </Container>
    </>
  );
};

export default SignupForm;
