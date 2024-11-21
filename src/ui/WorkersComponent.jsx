import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkersAction, updateWorkerAction } from "../store/actions/workerActions";

function WorkersComponent() {
  const dispatch = useDispatch();
  const { workers, loading, error } = useSelector(state => {
    console.log('Current Redux State:', state);
    return state.workers;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  
  useEffect(() => {
    dispatch(fetchWorkersAction());
  }, [dispatch]);

  const handleEdit = (worker) => {
    setIsModalOpen(true);
    setSelectedWorker(worker);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorker(null);
  };

  const handleSave = (workerId, updatedData) => {
    dispatch(updateWorkerAction(workerId, updatedData));
    setIsModalOpen(false);
    setSelectedWorker(null);
  };

  return (
    <div className="workers">
      <div className="container">
        <h1 className="workers__title title">Workers</h1>
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : (
          <ul className="workers__list">
            {workers.map((worker) => (
              <li className="workers__item" key={worker.id}>
                <p className="workers__item-name">{worker.name}</p>
                <p className="workers__item-wage">{worker.wage}</p>
                <p className="workers__item-email">{worker.email}</p>
                
                <div className="workers__item-buttons">
                  <button 
                    className="workers__item-btn" 
                    onClick={() => handleEdit(worker)}
                  >
                    Edit
                  </button>
  
                  <button className="workers__item-btn">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
       {isModalOpen && (
          <Modal
            worker={selectedWorker}
            onClose={closeModal}
            onSave={handleSave}
          />
        )}
      </div>
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
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">Edit Worker</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            <span className="modal__label-text">Name:</span>
            <input
              type="text"
              name="name"
              className="modal__input"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className="modal__label">
            <span className="modal__label-text">Wage:</span>
            <input
              type="number"
              name="wage"
              className="modal__input"
              value={formData.wage}
              onChange={handleChange}
            />
          </label>
          <label className="modal__label">
            <span className="modal__label-text">Email:</span>
            <input
              type="email"
              name="email"
              className="modal__input"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <div className="modal__buttons">
            <button
              type="button"
              className="modal__button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="modal__button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkersComponent;