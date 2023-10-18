
import {gql} from '@apollo/client';

const User_LIST = gql`
 query allUsers {
  users{
    id,
    name,
    email
}
}`;

const CREATE_USER = gql`
mutation CreateUser ($name: String!, $email: String!){
  createUser(input: {name: $name, email: $email}) {
      errors
      user {
          email
          id
          name
      }
  }
}
`;

const USER_TASKS = gql`
query GetUserTask($userId: ID!) {
  userTasks(userId: $userId) {
    name
    description
  }
}
`;

const USER_NOTES = gql`
query GetUserNote($userId: ID!) {
  userNotes(userId: $userId) {
    name
    content
  }
}
`;

export {User_LIST, USER_TASKS, USER_NOTES, CREATE_USER}