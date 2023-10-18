import {gql} from '@apollo/client';

const NOTE_LIST = gql`
 query allNotes {
  notes{
    id,
    name,
    content,
    user {
      id
    }
}
}`;

const CREATE_NOTE = gql`
  mutation CreateNote($name: String!, $content: String!, $userId: ID!) {
    createNote(
      input: { name: $name, content: $content, userId: $userId }
    ) {
      errors
      note {
        content
        createdAt
        id
        name
        updatedAt
      }
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $name: String!, $content: String!, $userId: ID!) {
    updateNote(input: { id: $id, name: $name, content: $content, userId: $userId }) {
      note {
        id
        content
      }
    }
  }
`;

const DELETE_NOTE = gql`
mutation DestroyNote($id:ID!) {
  destroyNote(input: {id: $id}) {
      errors
      note {
          content
          createdAt
          id
          name
          updatedAt
      }
  }
}
`;

const GET_NOTE = gql`
  query GetNote($id: ID!) {
    note(id: $id) {
      name
      content
    }
  }
`;


export { NOTE_LIST, CREATE_NOTE, DELETE_NOTE, UPDATE_NOTE, GET_NOTE }
