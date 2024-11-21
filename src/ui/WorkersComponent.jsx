import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkersAction, updateWorkerAction, deleteWorkerAction, addWorkerAction } from "../store/actions/workerActions";

function WorkersComponent() {
  const dispatch = useDispatch();
  const { workers, loading, error } = useSelector((state) => state.workers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [newWorkerData, setNewWorkerData] = useState({ name: "", wage: "", email: "" });

  useEffect(() => {
    dispatch(fetchWorkersAction());
  }, [dispatch]);

  const handleEdit = (worker) => {
    setIsModalOpen(true);
    setSelectedWorker(worker);
  };

  const handleDelete = (workerId) => {
    if (window.confirm('Are you sure you want to delete this worker?')) {
      dispatch(deleteWorkerAction(workerId));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorker(null);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewWorkerData({ name: "", wage: "", email: "" });
  };

  const handleSave = (workerId, updatedData) => {
    dispatch(updateWorkerAction(workerId, updatedData));
    setIsModalOpen(false);
    setSelectedWorker(null);
  };

  const handleAddNewWorker = (e) => {
    e.preventDefault();
    dispatch(addWorkerAction(newWorkerData));
    setIsAddModalOpen(false);
    setNewWorkerData({ name: "", wage: "", email: "" });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkerData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Workers</h1>
      <button
        className="btn btn-success mb-3"
        onClick={() => setIsAddModalOpen(true)} // Відкриває модальне вікно для додавання
      >
        Add New Worker
      </button>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <ul className="list-group">
          {workers.map((worker) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={worker.id}>
              <div>
                <h5 className="mb-1">{worker.name}</h5>
                <p className="mb-1">Wage: ${worker.wage}</p>
                <p className="mb-1">Email: {worker.email}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(worker)}
                >
                  Edit
                </button>
                <button 
                  className="workers__item-btn"
                  onClick={() => handleDelete(worker.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && (
        <Modal worker={selectedWorker} onClose={closeModal} onSave={handleSave} />
      )}
      {isAddModalOpen && (
        <AddWorkerModal
          newWorkerData={newWorkerData}
          handleInputChange={handleInputChange}
          handleAddNewWorker={handleAddNewWorker}
          closeAddModal={closeAddModal}
        />
      )}
    </div>
  );
}

const Modal = ({ worker, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: worker.name,
    wage: worker.wage,
    email: worker.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(worker.id, formData);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Worker</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Wage</label>
                <input
                  type="number"
                  name="wage"
                  className="form-control"
                  value={formData.wage}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AddWorkerModal = ({ newWorkerData, handleInputChange, handleAddNewWorker, closeAddModal }) => {
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Worker</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={closeAddModal}></button>
          </div>
          <form onSubmit={handleAddNewWorker}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={newWorkerData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Wage</label>
                <input
                  type="number"
                  name="wage"
                  className="form-control"
                  value={newWorkerData.wage}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={newWorkerData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeAddModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkersComponent;
