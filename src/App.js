import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './TaskList';
import Modal from './Modal';

function App() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});
    const [Title, setTitle] = useState('');
    const [Date, setDate] = useState('');
    const [Description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleAddButtonClick = () => {
        setShowAddModal(true);
        resetForm();
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        resetForm();
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        resetForm();
    };

    const handleOpenEditModal = (task) => {
        setSelectedTask(task);
        setTitle(task.title);
        setDate(task.date);
        setDescription(task.description);
        setShowAddModal(false);
        setShowEditModal(!showEditModal);
    };

    const resetForm = () => {
        setTitle('');
        setDate('');
        setDescription('');
        setErrorMessage('');
    };

    const handleAddNewTask = () => {
        if (Title.trim() === '') {
            setErrorMessage("Title can't be blank");
        } else {
            setErrorMessage('');
            const newTask = {
                title: Title,
                date: Date,
                description: Description,
            };
            setTaskData([...taskData, newTask]);
            handleCloseAddModal();
        }
    };

    const handleEditTask = () => {
        if (Title.trim() === '') {
            setErrorMessage("Title can't be blank");
        } else {
            setErrorMessage('');
            const updatedTaskData = taskData.map((task) =>
                task === selectedTask
                    ? { ...task, title: Title, date: Date, description: Description }
                    : task
            );
            setTaskData(updatedTaskData);
            handleCloseEditModal();
        }
    };

    const handleDeleteTask = (taskToDelete) => {
        const updatedTaskData = taskData.filter((task) => task !== taskToDelete);
        setTaskData(updatedTaskData);
    };


    useEffect(() => {
        // Save data to localStorage
        localStorage.setItem('taskData', JSON.stringify(taskData));
    }, [taskData]);

    useEffect(() => {
        // Initialize app data from localStorage
        const data = localStorage.getItem('taskData');
        if (data) {
            setTaskData(JSON.parse(data));
        }
    }, []);

    const modalForm = (
        <>
            <div className="form-group">
                <label htmlFor="formTitle" className='labelMessage'>Task Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="error-message">{errorMessage}</div>
            </div>
            <div className="form-group">
                <label htmlFor="formDate" className='labelMessage'>Due Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={Date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="formDescription" className='labelMessage'>Description</label>
                <textarea
                    className="form-control"
                    rows="5"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
        </>
    );

    return (
        <div className="container">
            <h4 className="title">To-Do App 🎯</h4>
            <button className="add-new-btn" onClick={handleAddButtonClick}>
                <span>Add New Task</span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Add-new-icon">
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

            <TaskList tasks={taskData} onEdit={handleOpenEditModal} onDelete={handleDeleteTask} />

            {showAddModal && (
                <Modal
                    title="Add New Task"
                    onClose={handleCloseAddModal}
                    onConfirm={handleAddNewTask}
                >
                    {modalForm}
                </Modal>
            )}

            {showEditModal && (
                <Modal
                    title="Edit Task"
                    onClose={handleCloseEditModal}
                    onConfirm={handleEditTask}
                >
                    {modalForm}
                </Modal>
            )}
        </div>
    );
}

export default App;