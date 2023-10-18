import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  NOTE_LIST,
  CREATE_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
} from "../services/NoteQuery";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../modal/updateModal";
import CreateModal from "../modal/createModal";
import ShowModal from "../modal/showModal";
import '../style.css'

export interface INote {
  id: string;
  name: string;
  content: string;
  user: string;
}

const NoteList:React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery<any>(NOTE_LIST);

  const [editNote, setEditNote] = useState<INote>();
  const [createNoteMutation] = useMutation(CREATE_NOTE);
  const [deleteNote] = useMutation(DELETE_NOTE);
  const [updateNote] = useMutation(UPDATE_NOTE);
 
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenShowModal, setIsOpenShowModal] = useState<boolean>(false);

  const closeAddModal = () => {
    setIsOpenCreateModal(false);
  };

  const closeUpdateModal = () => {
    setIsOpenUpdateModal(false);
  };

  const closeShowModal = () => {
    setIsOpenShowModal(false);
  };

  const handleCreateItem = async (
    name: string,
    content: string,
    userId: string
  ) => {
    try {
      await createNoteMutation({
        variables: {
          name: name,
          content: content,
          userId: userId,
        },
        refetchQueries: [{ query: NOTE_LIST }],
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote({
        variables: {
          id: noteId,
        },
        refetchQueries: [{ query: NOTE_LIST }],
      });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleUpdateNote = async (
    id: string,
    name: string,
    userId: string,
    content: string,
  ) => {
    try {
      await updateNote({
        variables: {
          id: id,
          name: name,
          content: content,
          userId: userId,
        },
        refetchQueries: [{ query: NOTE_LIST }],
      });
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="mb-3 row bg-nav text-start">
          <div className="col p-2 ">
            <span className="h5">
            <i className="bi bi-stickies-fill me-2"></i>Notes
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col ">
        <div className="d-flex justify-content-between mb-3">
          <div>
            <button
              type="button"
              className="btn btn-warning text-light"
              onClick={() => navigate("/tasks")}
            >
              Go to Tasks
            </button>

            <button
              type="button"
              className="btn btn-success text-light ms-3"
              onClick={() => navigate("/users")}
            >
              Go to Users
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setIsOpenCreateModal(true);
              }}
            >
              Create Note
            </button>
          </div>
          {isOpenCreateModal && (
            <CreateModal
              isOpen={isOpenCreateModal}
              closeModal={closeAddModal}
              handleCreateItem={handleCreateItem}
              listType={"note"}
            />
          )}
        </div>
        </div>
        </div>
        {!loading && (
          <div>
            <table className="table">
              <thead className="bg-primary text-white">
                <tr>
                  <th>S.no</th>
                  <th scope="col">Name</th>
                  <th scope="col">Content</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data?.notes?.map(
                    ({ id, name, content, user }: INote, index: number) => (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{content}</td>
                        <td>
                          {" "}
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeleteNote(id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-success ms-3"
                            onClick={() => {
                              setEditNote({ id, name, content, user });
                              setIsOpenShowModal(true);
                            }}
                          >
                            Show
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary ms-3"
                            onClick={() => {
                              setEditNote({ id, name, content, user });
                              setIsOpenUpdateModal(true);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isOpenShowModal && (
        <ShowModal        
          closeModal={closeShowModal}
          item={editNote}
          listType="note"
          isOpen={isOpenShowModal}
        />
      )}
      {isOpenUpdateModal && (
        <UpdateModal
          isOpen={isOpenUpdateModal}
          closeModal={closeUpdateModal}
          item={editNote}
          handleItem={handleUpdateNote}
          listType="note"
        />
      )}
    </>
  );
};

export default NoteList;
