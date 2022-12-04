export const MyQuery = /* GraphQL */ `
  query MyQuery ($id: ID!) {
    getUser(id: $id) {
      id
      name
      chatrooms {
        items {
          id
          chatRoom {
            id
            updatedAt
            Users {
              items {
                id
                user {
                  image
                  name
                  id
                }
                userID
              }
            }
            createdAt
            LastMessage {
              id
              createdAt
              text
            }
          }
        }
      }
    }
  }
`;
