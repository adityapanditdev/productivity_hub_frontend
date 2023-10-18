import React, { useState, ChangeEvent } from 'react';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    item: any;
    handleItem: Function;
    listType:string;
}

const UpdateModal: React.FC<ModalProps> = ({ isOpen, closeModal, item, handleItem, listType }: ModalProps) => {
  console.log(item?.content)
    const [name, setName] = useState<string>(item?.name);
    const [content, setContent] = useState<any>(item?.content);
    const [description, setDescription] = useState<string>(item?.description)

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
       listType==='note'? setContent(event.target.value) : setDescription(event.target.value);
    };

    const handleFormSubmit = (id:string, name:string, content:string, description:string, userId:string) =>{
        listType==='note'? handleItem(id, name, userId, content) : handleItem(id, name, userId,  description);
        closeModal();
    }

    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex={-1} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update {listType==='note'? 'Note' : 'Task'}</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <form >
                            <div className="mb-4 text-start">
                                <label htmlFor="name" className="form-label ps-1">
                                    Name
                                </label>
                                <input type="text" placeholder='Enter Name' className="form-control" id="name" value={name} onChange={handleNameChange} />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="content" className="form-label ps-1">
                                   {listType==='note'? 'Content' : 'Description'}
                                </label>
                                <textarea className="form-control" placeholder={`Enter ${listType==='note'? 'Content' : 'Description'}`} id="content" value={listType==='note'? content : description} onChange={handleContentChange}></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>
                            Close
                        </button>
                       <button type="button" className="btn btn-primary" onClick={() => {                    
                        handleFormSubmit(item?.id, name, content, description, item?.user?.id)}}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;
