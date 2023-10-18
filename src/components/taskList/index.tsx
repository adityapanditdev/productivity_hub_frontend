import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_TASK,
  DELETE_TASK,
  TASK_LIST,
  UPDATE_TASK,
} from "../services/taskQuery";
import { useNavigate } from "react-router";
import CreateModal from "../modal/createModal";
import UpdateModal from "../modal/updateModal";
import ShowModal from "../modal/showModal";

interface ITask {
  id: string;
  name: string;
  description: string;
  user: { id: string; name: string };
}

const TaskList: React.FC = () => {
  const navigate = useNavigate();

  const listOfTasks = useQuery(TASK_LIST);
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const [createTaskMutation, addNote] = useMutation(CREATE_TASK);
  const [updateTask, { data, loading, error }] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const [task, setTask] = useState<ITask>();

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenShowModal, setIsOpenShowModal] = useState<boolean>(false);

  const closeCreateModal = () => {
    setIsOpenCreateModal(false);
  };

  const closeUpdateModal = () => {
    setIsOpenUpdateModal(false);
  };

  const closeShowModal = () =>{
    setIsOpenShowModal(false);
  }

  useEffect(() => {
    setTaskList(listOfTasks?.data?.tasks);
  }, [listOfTasks]);

  const handleCreateItem = async (
    name: string,
    description: string,
    userId: string
  ) => {
    try {
      const { data } = await createTaskMutation({
        variables: {
          name: name,
          description: description,
          userId: userId,
        },
        refetchQueries: [{ query: TASK_LIST }],
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleUpdateTask = (
    id: string,
    name: string,
    userId: string,
    description: string
  ) => {
    updateTask({
      variables: {
        id: id,
        name: name,
        description: description,
        userId: userId,
      },
      refetchQueries: [{ query: TASK_LIST }],
    });
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteTask({
        variables: {
          id: noteId,
        },
        refetchQueries: [{ query: TASK_LIST }],
      });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      <div>
        <div className="container mt-4">
          <div className="mb-3 row bg-nav text-start">
            <div className="col p-2 ">
              <span className="h5">
                <i className="bi bi-list-task me-2"></i>Tasks
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <button
                type="button"
                className="btn btn-warning text-light"
                onClick={() => navigate("/")}
              >
                Go to Notes
              </button>

              <button
                type="button"
                className="btn btn-success text-light ms-3"
                onClick={() => navigate("/users")}
              >
                Go to Users
              </button>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setIsOpenCreateModal(true);
              }}
            >
              Create Task
            </button>
            {isOpenCreateModal && (
              <CreateModal
                isOpen={isOpenCreateModal}
                closeModal={closeCreateModal}
                handleCreateItem={handleCreateItem}
                listType={"task"}
              />
            )}
          </div>
          <div>
            <table className="table">
              <thead className="bg-primary text-white">
                <tr>
                  <th>S.no</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {taskList?.map(
                  ({ id, name, description, user }: ITask, index: number) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{description}</td>
                      <td>
                        {" "}
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteNote(id)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                        <button 
                        type="button"
                        className="btn btn-success ms-3"
                        onClick={() => {
                          setTask({ id, name, description, user });
                          setIsOpenShowModal(true);
                        }}
                        >Show</button>
                        <button
                          type="button"
                          className="btn btn-primary ms-3"
                          onClick={() => {
                            console.log("=cnkn",user)
                            setTask({ id, name, description, user });
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
        </div>
      </div>
      {isOpenShowModal && (
        <ShowModal
          isOpen={isOpenShowModal}
          closeModal={closeShowModal}
          item={task}
          listType="task"
        />
      )}
      {isOpenUpdateModal && (
        <UpdateModal
          isOpen={isOpenUpdateModal}
          closeModal={closeUpdateModal}
          item={task}
          handleItem={handleUpdateTask}
          listType="task"
        />
      )}
    </>
  );
};
export default TaskList;
