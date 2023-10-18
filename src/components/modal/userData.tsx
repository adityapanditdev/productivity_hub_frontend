import React from "react";
import { useQuery } from "@apollo/client";
import { USER_NOTES, USER_TASKS } from "../services/userQuery";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  item: any;
  userData: string;
}

const UserData: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  item,
  userData,
}: ModalProps) => {
  const { data, loading, error } = useQuery(
    userData === "note" ? USER_NOTES : USER_TASKS,
    { variables: { userId: item.id } }
  );

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      tabIndex={-1}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {userData === "note" ? "User Notes" : "User Tasks"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          {!loading && (
            <div className="modal-body">
              {userData === "note" && (
                <div>
                  <ul>
                    {data?.userNotes?.map(
                      ({ content }: { content: string }, index: number) => (
                        <li key={index} className="text-start ">
                          {content}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              {userData === "task" && (
                <div>
                  <ul>
                    {data?.userTasks?.map(
                      (
                        { description }: { description: string },
                        index: number
                      ) => (
                        <li key={index} className="text-start ">
                          {description}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserData;
