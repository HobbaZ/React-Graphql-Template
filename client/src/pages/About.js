import React from 'react';

import { Container } from 'react-bootstrap';

function About() {

    return (
        <>
        <Container>
            <h1 className='text-center'>About</h1>
            <p>This website was made with React, Bootstrap and has a GraphQL MongoDB backend database</p>
        </Container>
        </>
    );
};

export default About;