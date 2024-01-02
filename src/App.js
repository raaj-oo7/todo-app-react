import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import TaskList from './TaskList';
import Modal from './Modal';
import FormInput from './Modalform';

function App() {
  const storedTaskData = JSON.parse(localStorage.getItem('taskData'))
  const [modalType, setModalType] = useState(null);
  const [taskData, setTaskData] = useState(storedTaskData || []);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
  });

  const openModal = (type, taskData) => {
    setModalType(type);
    resetForm();

    if (type === 'edit' && taskData) {
      setFormData({ ...taskData });
    }
  };

  const closeModal = () => {
    setModalType(null);
    resetForm();
  };

  const handleFormChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({ title: '', date: '', description: '' });
    setErrorMessage('');
  };

  const handleAddNewTask = () => {
    if (formData.title.trim() === '') {
      setErrorMessage("Title can't be blank");
      return;
    }

    setErrorMessage('');
    const newTask = { ...formData, id: uuidv4() };
    const updatedTaskData = [...taskData, newTask];
    setTaskData(updatedTaskData);
    saveToLocalStorage(updatedTaskData);
    closeModal();
  };

  function handleEditTask(updatedTask) {
    const updatedTaskData = taskData.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    setTaskData(updatedTaskData);
    saveToLocalStorage(updatedTaskData);
    closeModal();
  }

  const saveToLocalStorage = (data) => {
    localStorage.setItem('taskData', JSON.stringify(data));
  };

  const handleDeleteTask = (taskToDelete) => {
    const updatedTaskData = taskData.filter((task) => task !== taskToDelete);
    setTaskData(updatedTaskData);
    saveToLocalStorage(updatedTaskData);
  };

  const modalForm = (
    <>
      <FormInput
        label="Task Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleFormChange}
        errorMessage={errorMessage}
      />

      <FormInput
        label="Due Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleFormChange}
      />

      <FormInput
        label="Description"
        type="textarea"
        name="description"
        value={formData.description}
        onChange={handleFormChange}
      />
    </>
  );
  return (
    <div className="container">
      <h4 className="title">To-Do App 🎯</h4>
      <button type='button' className="add-new-btn" onClick={() => openModal('add')}>
        <span>Add New Task</span>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="add-new-icon">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M4 12H20M12 4V20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </button>

      <h5 className="task-title">Tasks</h5>

      <TaskList tasks={taskData} onEdit={(task) => openModal('edit', task)} onDelete={handleDeleteTask} />

      {modalType && (
        <Modal
          formData={formData}
          errorMessage={errorMessage}
          handleFormChange={handleFormChange}
          modalForm={modalForm}
          modalType={modalType}
          closeModal={closeModal}
          handleAddNewTask={handleAddNewTask}
          handleEditTask={handleEditTask}
        />
      )}
    </div>
  );
}

export default App;