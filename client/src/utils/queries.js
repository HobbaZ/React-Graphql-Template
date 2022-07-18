import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedItems{ 
                  _id
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
