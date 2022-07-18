import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchItems from './pages/SearchItems';
import Home from './pages/Home';
import SavedItems from './pages/SavedItems';
import Footer from './components/Footer';
import AppNavBar from './components/NavBar';

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
        <div>
          <AppNavBar/>
          <div>

          <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/search' component={SearchItems} />
          <Route exact path='/saved' component={SavedItems} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route render={() => <h1>404! This page doesn't exist</h1>} />
        </Switch>
        </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
