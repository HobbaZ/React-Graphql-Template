import React, { useState } from 'react';

import { Container, Button, Form} from 'react-bootstrap';

import Auth from '../utils/auth';

const EditDetails = (userData) => {
    const [formInput, setFormInput] = useState({ username: userData.username, email: userData.email ,firstname: userData.firstname, lastname: userData.lastname});
    
      const [submittingForm, setSubmittingForm] = useState(false);
  
      // state for messages
      const [infoMessage, setInfoMessage] = useState('');
  
      const handleSubmit = async (event) => {
          event.preventDefault();
          setSubmittingForm(true);
      
          if (!formInput) {
            return false;
          }
          
          //Send data to update user endpoint
          try {
  
              const token = Auth.loggedIn() ? Auth.getToken() : null;
  
              const response = await fetch(`/api/users/${userData.id}`, {
                  method: 'PUT',
                  body: JSON.stringify({ ...formInput}),
                  headers: { 'Content-Type': 'application/json',
                  authorization: `Bearer ${token}`},
            });
      
            if (!response.ok) {
              console.log(response);
              throw new Error('something went wrong updating your details!');
            }
  
            const user = await response.json();
            console.log(user);
      
            setFormInput('');
          } catch (err) {
            console.error(err);
          }
        };
  
        const handleChange = async (event) => {
          const { name, value } = event.target;
          setFormInput({ ...formInput, [name]: value });
        };

return (
    <>
    <Container className='fluid'>
        <div>
            <h1 className='text-center'>Update Your Details</h1>
            <Form onSubmit={handleSubmit} className='mx-auto'>

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update First Name</Form.Label>
                    <Form.Control type="text" name ="firstname" value={formInput.firstname || ''} placeholder={userData.firstname} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Last Name</Form.Label>
                    <Form.Control type="text"name ="lastname" value={formInput.lastname || ''} placeholder={userData.lastname} onChange={handleChange}/>
                </Form.Group>
                
                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Username</Form.Label>
                    <Form.Control type="text" name ="username" value={formInput.username || ''} placeholder={userData.username} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" disabled={submittingForm}>
                    <Form.Label>Update Email address</Form.Label>
                    <Form.Control type="email" name ="email" value={formInput.email || ''} placeholder={userData.email} onChange={handleChange}/>
                </Form.Group>

                {infoMessage && (
              <div className='text-center'>{infoMessage}</div>
            )}

                <div className='text-center'>
                    <Button variant="primary" 
                    type="submit" 
                    className='col-sm-8 col-md-4 col-lg-2 m-2'>
                        Update
                    </Button>
                </div>
            </Form>

        </div>
    </Container>
    </>
)};

export default EditDetails;