import {gql} from '@apollo/client';

const TASK_LIST = gql`
 query allNotes {
  tasks{
    id,
    name,
    description,
    user {
      id
    }
}
}`;

  
const CREATE_TASK = gql`
  mutation CreateTask($name: String!, $description: String!, $userId: ID!) {
    createTask(
      input: { name: $name, description: $description, userId: $userId }
    ) {
      errors
      task {
        description
        createdAt
        id
        name
        updatedAt
      }
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $name: String!, $description: String!, $userId: ID!) {
    updateTask(input: { id: $id, name: $name, description: $description, userId: $userId }) {
      task {
        id
        description
      }
    } 
  }
`;

const DELETE_TASK = gql`
mutation DestroyNote($id:ID!) {
  destroyTask(input: {id: $id}) {
      errors
      task {
          description
          createdAt
          id
          name
          updatedAt
      }
  }
}
`;


const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      name
      description
    }
  }
`;


export { TASK_LIST, CREATE_TASK, DELETE_TASK, UPDATE_TASK, GET_TASK }
