import React, { useState, ChangeEvent } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleCreateItem: Function;
  listType: string;
}

const CreateModal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  handleCreateItem,
  listType,
}: ModalProps) => {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = async (
    name: string,
    content: string,
    userId: string
  ) => {
    listType === "user"
      ? handleCreateItem(name, email)
      : handleCreateItem(name, content, userId);
    closeModal();
  };

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      tabIndex={-1}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create {listType==='user'? 'User' : listType==='note'? 'Note':'Task'}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3 text-start">
                <label htmlFor="name" className="form-label ps-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              {(listType === "note" || listType === "task") && (
                <div className="mb-3 text-start">
                  <label htmlFor="content" className="form-label ps-1">
                    {listType === "note" ? "Content" : "Description"}
                  </label>
                  <textarea
                    className="form-control"
                    placeholder={`Enter ${listType==='note'? 'Content' : 'Description'}`}
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                  ></textarea>
                </div>
              )}
              {listType === "user" && (
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    className="form-control"
                    id="name"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              )}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleFormSubmit(name, content, "1")}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
