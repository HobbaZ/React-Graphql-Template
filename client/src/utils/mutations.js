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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_ME = gql`
mutation updateUser($username: String, $email: String) {
  updateUser(username: $username, email: $email) {
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
        savedItems{ 
                    purchasePrice
                    price
                    itemName
                    percent
                    profit
                    quantity
                    itemImages
                    purchasePrice
                    quantity
                  }
    }
}
`;

export const SAVE_ITEM = gql`
mutation saveItem($item: itemInput!) {
  saveItem(item: $item) {
      _id
      username
      email
      savedItems{ 
                  purchasePrice
                  price
                  itemName
                  percent
                  profit
                  quantity
                  itemImages
                  quantity
                }
  }
}
`;

export const UPDATE_ITEM = gql`
mutation updateItem($item: updateItem) {
  updateItem(item: $item) {
      _id
      username
      email
      savedItems{ 
                  purchasePrice
                  price
                  itemName
                  percent
                  profit
                  quantity
                  itemImages
                  quantity
                }
  }
}
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($_id: ID) {
    deleteItem(_id: $_id) {
        _id
        username
        email
        savedItems{ 
                    purchasePrice
                    price
                    itemName
                    percent
                    profit
                    quantity
                    itemImages
                    purchasePrice
                    quantity
                  }
    }
}
`;