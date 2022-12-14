import { gql } from '@apollo/client';


export const GET_CUSTOMERS = gql`
    query GetCustomers {
        getCustomers {
          name
          value {
            email
            name
          }
        }
    }
`;


export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      name
      value {
        trackingId
        trackingItems {
          customer_id
          items {
            item_id
            name
            price
            quantity
          }
          customer {
            email
            name
          }
        }
        Address
        City
        Lat
        Lng
        carrier
        createdAt
        shippingCost
      }
    }
  }
`;