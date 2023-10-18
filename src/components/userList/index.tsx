import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CREATE_USER, User_LIST } from "../services/userQuery";
import CreateModal from "../modal/createModal";
import UserData from "../modal/userData";

interface IUser {
  id: string;
  name: string;
  email: string;
}
const UserList : React.FC = () => {
  const navigate = useNavigate();

  const { data, loading } = useQuery(User_LIST);
  const [createUser] = useMutation(CREATE_USER);

  const [userDetails, setUserDetails] = useState<IUser>();
  const [isOpenUserTask, setIsOpenUserTask] = useState<boolean>(false);
  const [isOpenUserNote, setIsOpenUserNote] = useState<boolean>(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  
  const closeCreateModal = () =>{
    setIsOpenCreateModal(false);
  }

  const closeUserNote = () =>{
    setIsOpenUserNote(false);
  }

  const closeUserTask = () =>{
    setIsOpenUserTask(false);
  }

  const handleCreateUser = async(name:string, email:string) =>{
      try {
        await createUser({
          variables: {
            name: name,
            email:email
          },
          refetchQueries: [{ query: User_LIST}],
        });
      } catch (error) {
        console.error("Error creating note:", error);
      }
  }

  return (
    <>
      <div>
        <div className="container mt-4">
        <div className="mb-3 row bg-nav text-start">
          <div className="col p-2 ">
            <span className="h5">
            <i className="bi bi-person-square me-2"></i>Users
            </span>
          </div>
        </div>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <button
                type="button"
                className="btn btn-success text-light me-3"
                onClick={() => navigate("/")}
              >
                Go to Note
              </button>

              <button
                type="button"
                className="btn btn-warning text-light"
                onClick={() => navigate("/tasks")}
              >
                Go to Task
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
              Create User
            </button>
            </div>
            {isOpenCreateModal && <CreateModal isOpen={isOpenCreateModal} closeModal={closeCreateModal} handleCreateItem={handleCreateUser} listType={"user"}/>}
          </div>
          <div>
            {!loading && (
              <table className="table">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>S.no</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th>User Data</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    data?.users?.map(
                      ({ id, name, email }: IUser, index: number) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{name}</td>
                          <td>{email}</td>
                          <td>                          
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              setUserDetails({ id, name, email });
                              setIsOpenUserNote(true);
                            }}
                          >
                            View Notes
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary ms-3"
                            onClick={() => {
                              setUserDetails({ id, name, email });
                              setIsOpenUserTask(true);
                            }}
                          >
                            View Tasks
                          </button>
                        </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {isOpenUserNote && (
        <UserData
          isOpen={isOpenUserNote}
          closeModal={closeUserNote}
          item={userDetails}
          userData={"note"}
        />
      )}
      {isOpenUserTask && (
        <UserData
          isOpen={isOpenUserTask}
          closeModal={closeUserTask}
          item={userDetails}
          userData={"task"}
        />
      )}
    </>
  );
};
export default UserList;
