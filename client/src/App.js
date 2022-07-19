import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import About from './pages/About';
import AppNavbar from './components/NavBar.js';

import './app.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
        <div><AppNavbar/></div>

          <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/profile' element={<Profile/>} />
          <Route render={() => <h1>404! This page doesn't exist</h1>} />
        </Routes> 
      </Router>

      <div className='heroImage'>
        <div className='overlay'></div>
      </div>

      <Footer />
    </ApolloProvider>
  );
}

export default App;
