import React, { useEffect, useState } from 'react';

import { Container, Button, Form} from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ME, DELETE_ME } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

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
    <h1>{currentGreeting}, {props.firstname}</h1>
    <h4>Your current details are:</h4>
    <p>First Name: {props.firstname}</p>
    <p>Last Name: {props.lastname}</p>
    <p>Username: {props.username}</p>
    <p>Email: {props.email}</p>
    </>
    )
  }
  
  const Profile = () => {

    const [userData, setUserData] = useState({});

    const [formInput, setFormInput] = useState([]);
    
    const [submittingForm, setSubmittingForm] = useState(false);

    const [showEditForm, setShowEditForm] = useState(false);

    const [validated] = useState(false);

    const { data } = useQuery(QUERY_ME);

    const [ updateUser ] = useMutation(UPDATE_ME);

    const [ deleteUser ] = useMutation(DELETE_ME);

    // state for messages
    const [infoMessage, setInfoMessage] = useState('');

    useEffect(() => {
      const getUserData = async () => {
        try {
          const token = Auth.loggedIn() ? Auth.getToken() : null;
  
          if (!token) {
            console.log("Need to be logged in to do this")
            window.location.replace("/login");
            return false;
          }
  
          const currentUser = data?.me || [];
  
          if (!currentUser) {
            setInfoMessage('something went wrong getting user data!')
            throw new Error('something went wrong getting user data!');
            
          }
  
          setUserData(currentUser);
        } catch (err) {
          console.error(err);
        }
      };
  
      getUserData();
    });

    //Delete account if logged in
    const deleteAccount = async () => {
    
          const token = Auth.loggedIn() ? Auth.getToken() : null;

          try {
          const { data } = await deleteUser({
            variables: { ...userData },
          });

          // If no data or token, return to login page
          if (!token || !data) {
            console.log("Need to be logged in to do this")
            window.location.replace("/login");
            return false;
          }

        //Delete user account, destroy access token and redirect to signup page if successful
        setInfoMessage('Account deleted!')
        console.log('user deleted')
        Auth.logout()
        window.location.replace("/signup");

      } catch (err) {
        console.error(err);
      }
    };

    //Update function for form
    const submitForm = async (event) => {
      event.preventDefault();
      setSubmittingForm(true);

      //Send data to update user endpoint
          const token = Auth.loggedIn() ? Auth.getToken() : null;

          if (!token || !formInput) {
            console.log("Need to be logged in to do this")
            window.location.replace("/login");
            return false;
          }

          //Send data to login endpoint
          try {
            const { data } = await updateUser({
              variables: { ...formInput },
            });

        setInfoMessage('Details updated!')
        window.location.replace("/profile");
        console.log(data);
  
        setFormInput('');
      } catch (err) {
        console.error(err);
      }
    };

    const handleChange = async (event) => {
      const { name, value } = event.target;
      setFormInput({ ...formInput, [name]: value });
    };

    const welcome = <Greeting lastname={userData.lastname} firstname={userData.firstname} username={userData.username} email={userData.email}/>

    return (
    <Container>
        <>
        {Auth && (
            <>
              <h2 className='text-center'>Your Profile</h2>
      
              <div>{welcome}</div>

              {infoMessage && (
                  <div className='text-center'>{infoMessage}</div>
                )}

            {/*Click to show or hide edit form*/ }
            <div className='text-center'>
              <Button className=' btn btn-dark col-sm-12 col-md-8 col-lg-4 m-2'
                    onClick={() => setShowEditForm(!showEditForm)}>
                        Edit Details
              </Button>
            </div>
 
              {showEditForm && (
                <>
                <Container className='fluid'>
            <div>
            <h1 className='text-center'>Update Your Details</h1>
            <Form onSubmit={submitForm} className='mx-auto'>

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update First Name</Form.Label>
                    <Form.Control type="text" name ="firstname" value={formInput.firstname || userData.firstname} placeholder={userData.firstname} onChange={handleChange} minLength={2}/>
                </Form.Group>

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Last Name</Form.Label>
                    <Form.Control type="text"name ="lastname" value={formInput.lastname || userData.lastname} placeholder={userData.lastname} onChange={handleChange} minLength={2}/>
                </Form.Group>
                
                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Username</Form.Label>
                    <Form.Control type="text" name ="username" value={formInput.username || userData.username} placeholder={userData.username} onChange={handleChange} minLength={2}/>
                </Form.Group>

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Email address</Form.Label>
                    <Form.Control type="email" name ="email" value={formInput.email || userData.email} placeholder={userData.email} onChange={handleChange} minLength={2}/>
                </Form.Group>

                {infoMessage && (
              <div className='text-center'>{infoMessage}</div>
            )}

                <div className='text-center'>
                    <Button type="submit" 
                    className=' btn form-btn col-sm-12 col-md-8 col-lg-4 m-2'>
                        Update
                    </Button>
                </div>
            </Form>

        </div>
    </Container>
                </>
              )};

            <div className='text-center'>
              <Button className=' btn btn-danger col-sm-12 col-md-8 col-lg-4 m-2'
                    onClick={deleteAccount}>
                        Delete Account
            </Button>
              </div>
            </>
        )}
        </>
        </Container>
        );
    
};

export default Profile;