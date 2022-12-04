import {API, graphqlOperation, Auth} from 'aws-amplify';

export default getCommonChatRoomWithUser = async (meID, matchID) => {
  console.log('hi');
  const authUser = await Auth.currentAuthenticatedUser();
  // get all chat room of user1
  const response = await API.graphql(
    graphqlOperation(listChatRooms, {id: matchID}),
  );
  //console.log(response.data.getUser.chatrooms.items);

  const chatRooms = response.data?.getUser?.chatrooms?.items || [];

  const chatRoom = chatRooms.find(chatRoomItem => {
    return (
      chatRoomItem.chatRoom.Users.items.length === 2 &&
      chatRoomItem.chatRoom.Users.items.some(
        userItem => userItem.user.id === meID,
      )
    );
  });

  return chatRoom;
};

export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      chatrooms {
        items {
          chatRoom {
            id
            Users {
              items {
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
