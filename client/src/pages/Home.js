import React from 'react';

import {Container} from 'react-bootstrap';

function Home() {

    return (
        <>
        <Container>
        <h1 className='text-center'>Home</h1>
        <p>A bare bones template with navigation, user authentication, basic styling and a GraphQL MongoDB database connection aleady set up, just add your own content.</p>
        </Container>
        </>
    );
};

export default Home;