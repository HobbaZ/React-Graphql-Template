const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    username: String!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID): User
    me: User
  }

  type Mutation {
    addUser(firstname: String!, lastname: String!, username: String!, email: String!, password: String!): Auth

    updateUser(firstname: String!, lastname: String!, username: String, email: String): User

    login(email: String!, password: String!): Auth

    deleteUser: User 
  }
`;

module.exports = typeDefs;
