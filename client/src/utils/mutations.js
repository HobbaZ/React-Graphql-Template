import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstname: String!, $lastname: String!, $username: String!, $email: String!, $password: String!) {
    addUser(firstname: $firstname, lastname: $lastname, username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_ME = gql`
mutation updateUser($firstname: String!, $lastname: String!, $username: String, $email: String) {
  updateUser(firstname: $firstname, lastname: $lastname, username: $username, email: $email) {
    _id
    username
    email
  }
}
`;

export const RESET_PASSWORD = gql`
mutation resetPassword($password: String!) {
  resetPassword(password: $password) {
    _id
    username
    email
  }
}
`;

export const DELETE_ME = gql`
  mutation deleteUser {
    deleteUser {
        _id
        username
        email
    }
}
`;