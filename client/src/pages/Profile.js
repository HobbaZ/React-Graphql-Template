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
  
  const Profile = (props) => {

    const { data, loading } = useQuery(QUERY_ME);

    //set user data to the requested data
    const userData = data?.me || [];

    const [formInput, setFormInput] = useState({firstname: `${userData.firstname}`, lastname: `${userData.lastname}`, username: `${userData.username}`, email: `${userData.email}`});
    
    const [submittingForm, setSubmittingForm] = useState(false);

    const [showEditForm, setShowEditForm] = useState(false);

    const [ updateUser ] = useMutation(UPDATE_ME);

    const [ deleteUser ] = useMutation(DELETE_ME);

    // state for messages
    const [infoMessage, setInfoMessage] = useState('');

    let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  
    //Get user data when component loads
    useEffect(() => {
      const getUserData = async () => {
        try {
          const token = Auth.loggedIn() ? Auth.getToken() : null;
  
          if (!token) {
            setInfoMessage("Need to be logged in to do this")
            window.location.replace("/login");
            return false;
          }
  
          if (!userData) {
            setInfoMessage('Error getting user data!')
            throw new Error('Error getting user data!');
          }
  
        } catch (err) {
          console.error(err);
        }
      };
  
      setFormInput(userData)
      getUserData();
    }, [userData]);

    

    //Delete account if logged in
    const deleteAccount = async (_id) => {
    
          const token = Auth.loggedIn() ? Auth.getToken() : null;

          try {
          await deleteUser({
            variables: { ...userData },
          });

          // If no data or token, return to login page
          if (!token) {
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

    const handleChange = async (event) => {
      const { name, value } = event.target;
      setFormInput({ ...formInput, [name]: value });
    };


    //Update function for form
    const submitForm = async (event, _id) => {
      event.preventDefault();
      setSubmittingForm(true);

      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      //Send data to update user endpoint
          const token = Auth.loggedIn() ? Auth.getToken() : null;

          if (!token) {
            setInfoMessage("Need to be logged in to do this")
            window.location.replace("/login");
            return false;
          }

          //Send data to update endpoint
          try {
            setFormInput(formInput)
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

    //Welcome sub component
    const welcome = <Greeting lastname={userData.lastname} firstname={userData.firstname} username={userData.username} email={userData.email}/>

    //HTML view
    return (
    <Container>
        <>
        {Auth && (
            <>
              <h2 className='text-center'>Your Profile</h2>
      
              <div>{welcome}</div>

        {loading && (
          <p>Loading Content...</p>
        )}

            {/*Click to show or hide edit form*/ }
            <div className='text-center'>
              <Button className=' btn btn-dark col-sm-12 col-md-8 col-lg-4 mb-2'
                    onClick={() => setShowEditForm(!showEditForm)}>
                        Edit Details
              </Button>
            </div>
 
              {showEditForm && (
                <>
                <Container className='fluid'>
            <div>
            
            <Form onSubmit={submitForm} className='mx-auto'>

            <h1 className='text-center'>Update Your Details</h1>

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update First Name</Form.Label>
                    <Form.Control type="text" name ="firstname" value={formInput.firstname || userData.firstname} placeholder={userData.firstname} onChange={handleChange} minLength={2}/>
                </Form.Group>

                {formInput.firstname!== '' && formInput.firstname.length < 2 ? 
                  <div className="text-center text-danger">{"First name must be minimum 2 characters"}</div> : ''}

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Last Name</Form.Label>
                    <Form.Control type="text"name ="lastname" value={formInput.lastname || userData.lastname} placeholder={userData.lastname} onChange={handleChange} minLength={2}/>
                </Form.Group>

                {formInput.lastname!== '' && formInput.lastname.length < 2 ? 
                  <div className="text-center text-danger">{"Last name must be minimum 2 characters"}</div> : ''}
                
                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Username</Form.Label>
                    <Form.Control type="text" name ="username" value={formInput.username || userData.username} placeholder={userData.username} onChange={handleChange} minLength={2}/>
                </Form.Group>

                {formInput.username!== '' && formInput.username.length < 2 ? 
                  <div className="text-center text-danger">{"Username must be minimum 2 characters"}</div> : ''}

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Email address</Form.Label>
                    <Form.Control type="email" name ="email" value={formInput.email || userData.email} placeholder={userData.email} onChange={handleChange} minLength={2}/>
                </Form.Group>

                {formInput.email!== '' && !emailRegex.test(formInput.email) ? 
                  <div className="text-center text-danger">{"Invalid email entered"}</div> : ''}

                {infoMessage && (
              <div className='text-center text-danger'>{infoMessage}</div>
            )}

            <div className='text-center'>
                    <Button type="submit" 
                    className=' btn form-btn col-sm-12 col-md-8 col-lg-4 my-2'>
                        Update
                    </Button>
            </div>
            </Form>
        </div>

    </Container>
                </>
              )}

            <div className='text-center'>
              <Button className=' btn btn-danger col-sm-12 col-md-8 col-lg-4 my-3'
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