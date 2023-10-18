import React from "react";
import { GET_NOTE } from "../services/NoteQuery";
import { useQuery } from "@apollo/client";
import { GET_TASK } from "../services/taskQuery";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  item: any;
  listType: string;
}

const ShowModal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  item,
  listType,
}: ModalProps) => {
  const { data, loading, error } = useQuery(
    listType === "note" ? GET_NOTE : GET_TASK,
    { variables: { id: item.id } }
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
              {listType === "user"
                ? "User"
                : listType === "note"
                ? "Note"
                : "Task"}{" "}
              Details
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          {!loading && (
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="form-control"
                  id="name"
                  value={
                    listType === "note"
                      ? data?.note?.name
                      : listType === "task"
                      ? data?.task?.name
                      : ""
                  }
                />
              </div>
              {(listType === "note" || listType === "task") && (
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    {listType === "note" ? "Content" : "Description"}
                  </label>
                  <textarea
                    className="form-control"
                    placeholder={`Enter ${
                      listType === "note" ? "Content" : "Description"
                    }`}
                    id="content"
                    value={
                      listType === "note"
                        ? data?.note?.content
                        : listType === "task"
                        ? data?.task?.description
                        : ""
                    }
                  ></textarea>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowModal;
