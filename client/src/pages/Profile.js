import React, { useState } from 'react';
//import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { Container} from '../styles/GenericStyles';

import { Form, FormField, Label, FormGroup, FormButton } from '../styles/FormStyle';

import { QUERY_ME } from '../utils/queries';

import { UPDATE_ME, DELETE_ME } from '../utils/mutations'; 

import Auth from '../utils/auth';

function Greeting(props) {

  const date = new Date();
  let currentHour = date.getHours();
  let currentGreeting = '';
  
  if (currentHour >=0 && currentHour < 12) {
    currentGreeting = 'Good Morning';

  } else if (currentHour >= 12 && currentHour < 18 ) {
    currentGreeting = 'Good Afternoon';

  } else {
    currentGreeting = 'Good Evening';
  }
  return (
  <>
  <h1>{currentGreeting}, {props.name}</h1>
  <h4>Your current details are:</h4>
  <p>Username: {props.name}</p>
  <p>Email: {props.email}</p>
  </>
  )
}

const Profile = (props) => {
  const { loading, data } = useQuery(QUERY_ME);

  const [ updateUser ] = useMutation(UPDATE_ME);

  const [ deleteUser ] = useMutation(DELETE_ME);

  const [validated] = useState(false);

  // create state for holding returned user data
  const [newUserData, setNewUserData] = useState([]);

  // state for error messages
  const [infoMessage, setInfoMessage] = useState('');

  const userData = data?.me || [];

  const [userUpdateInput, setUpdateUserInput] = useState({ username: `${userData.username}`, email: `${userData.email}`});

  if (!userData) {
    window.location.replace("/login")
  }

  if (loading) {
    return <div>Loading...</div>;
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUpdateUserInput({ ...userUpdateInput, [name]: value });
  };

  const welcome = <Greeting name={userData.username} email={userData.email}/>

// create method to search for items and set state on form submit
const handleFormSubmit = async (event) => {
event.preventDefault();

const form = event.currentTarget;
if (form.checkValidity() === false) {
  event.preventDefault();
  event.stopPropagation();
}

try {
  const newData = () => ({
    username: userUpdateInput.username,
    email: userUpdateInput.email,
  })

  setNewUserData(newData)

  setUpdateUserInput({
  //Persist inputs until cleared by user
  username: userUpdateInput.username,
  email: userUpdateInput.email,

  
});
} catch (err) {
  console.error(err);
}
console.log("User details have been saved", userUpdateInput.username, userUpdateInput.email)
};

  const handleUpdateUser = async () => {

    const infoToSave = {...newUserData};

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await updateUser({
        variables: {username: infoToSave.username, email: infoToSave.email },
      });

      setInfoMessage("Your details have been updated")

      console.log('user details have been updated', infoToSave.username, infoToSave.email)
      window.location.replace("/profile");

    } catch (err) {
      console.error(err);
    };
  };

  const handleDeleteUser = async (_id) => {
    // delete user by user id

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteUser({
        variables: { ...userData },
      });

      setInfoMessage("Your account has been deleted")

      window.location.replace("/signup");
      console.log('Deleting account...')

    } catch (err) {
      console.error(err);
    };
  };

  function showMsg() {
    setInfoMessage("Details have been saved")
  }

  return (
    <>
    <Container>
      {Auth.loggedIn() && (
      <>
        <h2 style={{"textAlign": "center"}}>Your Profile</h2>

        <div>
          {welcome}
        </div>

      
      <Form validated={validated} onSubmit={handleFormSubmit}>
                <h3 style = {{"textAlign": "center"}}>Update Your details</h3>

                {infoMessage && (
                  <div>{infoMessage}</div>
                )}

                <FormGroup>
                <Label>Username</Label>
                <FormField
                  type='text'
                  placeholder= {props.name}
                  name='username'
                  onChange={handleInputChange}
                  minLength={2}
                  value={userUpdateInput.username}>
                  
                </FormField>
                </FormGroup>

                <FormGroup>
                <Label>Email</Label>
                <FormField 
                  type='email'
                  placeholder={props.email}
                  name='email'
                  onChange={handleInputChange}
                  minLength={1}
                  value={userUpdateInput.email}>
                </FormField>
                </FormGroup>

                <FormGroup>

                <div style={{"textAlign": "center"}}>
                <FormButton
                type='submit'
                onClick={showMsg}>
                Save Details
                </FormButton>
                </div>

                <div style={{"textAlign": "center"}}>
                <FormButton
                onClick={() => handleUpdateUser()}>
                Update Details
                </FormButton>
                </div>

                </FormGroup>
                </Form>

                <Form>
                <div style={{"textAlign": "center"}}>
                <FormButton
                style={{ "border" : "2px red solid", "color" : "red"}}
                onClick={() => handleDeleteUser()}>
                Delete Account
                </FormButton>
                </div>
                </Form>
      </>
      )};

    </Container>
    </>
  );
};

export default Profile;
