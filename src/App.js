const [showAddModal, setShowAddModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [taskData, setTaskData] = useState([]);
const [selectedTask, setSelectedTask] = useState({});
const [Title, setTitle] = useState('');
const [Date, setDate] = useState('');
const [Description, setDescription] = useState('');
const [ErrorMessage, setErrorMessage] = useState('');

const handleAddButtonClick = () => {
  setShowAddModal(true);
};

const handleCloseAddModal = () => {
  setShowAddModal(false);
  resetAddForm();
};

const handleCloseEditModal = () => {
  setShowEditModal(false);
  resetEditForm();
};

const handleOpenEditModal = (task) => {
  setSelectedTask(task);
  setTitle(task.title);
  setDate(task.date);
  setDescription(task.description);
  setShowEditModal(true);
};

const resetAddForm = () => {
  setTitle('');
  setDate('');
  setDescription('');
  setErrorMessage('');
};

const resetEditForm = () => {
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

    <div className='task-list'>
      {taskData.map((task, index) => (
        <div key={index} className='task'>
          <span className="fw-bold">{task.title}</span>
          <span className="small text-secondary">{task.date}</span>
          <p>{task.description}</p>
          <div className="options">
            <button className="edit-button" onClick={() => handleOpenEditModal(task)}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256">
                <defs><linearGradient x1="46.807" y1="9.849" x2="46.807" y2="24.215" gradientUnits="userSpaceOnUse" id="color-1_56304_gr1"><stop offset="0" stopColor="#3d7598" stopOpacity="0"></stop><stop offset="1" stopColor="#ffffff"></stop></linearGradient><linearGradient x1="32" y1="8.084" x2="32" y2="55.83" gradientUnits="userSpaceOnUse" id="color-2_56304_gr2"><stop offset="0" stopColor="#0d6efd"></stop><stop offset="1" stopColor="#0067ff"></stop></linearGradient></defs><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(4,4)"><path d="M49.482,24.392l-9.874,-9.874l4.232,-4.232c0.39,-0.39 1.021,-0.39 1.411,0l8.464,8.464c0.39,0.39 0.39,1.021 0,1.411z" fill="url(#color-1_56304_gr1)"></path><path d="M50.697,25.999l4.428,-4.428c1.167,-1.167 1.167,-3.065 0,-4.232l-8.464,-8.464c-1.167,-1.167 -3.065,-1.167 -4.232,0l-4.428,4.428c-0.664,-0.175 -1.4,-0.011 -1.92,0.509l-1.411,1.411c-0.52,0.52 -0.684,1.256 -0.509,1.92l-22.963,22.963l-0.508,0.508l-0.2,0.2l-2.373,9.967c-0.343,1.442 0.078,2.928 1.126,3.976c1.048,1.048 2.534,1.469 3.976,1.125l9.967,-2.373l0.2,-0.2l0.508,-0.508l22.964,-22.964c0.664,0.175 1.4,0.011 1.92,-0.509l1.411,-1.411c0.519,-0.518 0.683,-1.254 0.508,-1.918zM47.367,27.92l-11.286,-11.286l1.411,-1.411l11.285,11.285zM23.46,50.414c-0.28,-1.063 -0.682,-2.077 -1.198,-3.034l20.872,-20.872l2.116,2.116zM14.916,53.428c-0.12,-1.074 -0.58,-2.115 -1.405,-2.939c-0.825,-0.825 -1.865,-1.285 -2.939,-1.405l0.698,-2.931c1.649,0.266 3.173,1.036 4.357,2.22c1.184,1.184 1.954,2.709 2.22,4.357zM17.038,46.962c-1.447,-1.447 -3.301,-2.396 -5.306,-2.75l0.463,-1.943c2.382,0.441 4.533,1.562 6.254,3.282c1.721,1.72 2.841,3.872 3.282,6.254l-1.943,0.463c-0.355,-2.005 -1.303,-3.859 -2.75,-5.306zM19.859,44.141c-0.477,-0.477 -0.987,-0.907 -1.517,-1.304l20.561,-20.561l2.821,2.821l-20.561,20.561c-0.397,-0.53 -0.827,-1.04 -1.304,-1.517zM16.62,41.738c-0.957,-0.516 -1.971,-0.918 -3.034,-1.198l21.79,-21.79l2.116,2.116zM43.84,10.286c0.389,-0.389 1.022,-0.389 1.411,0l8.464,8.464c0.389,0.389 0.389,1.022 0,1.411l-4.232,4.232l-9.874,-9.874z" fill="url(#color-2_56304_gr2)"></path></g></g>
              </svg>
            </button>
            <button className="delete-button" onClick={() => handleDeleteTask(task)}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256">
                <g fill="#de0000" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(10.66667,10.66667)"><path d="M10.80664,2c-0.517,0 -1.01095,0.20431 -1.37695,0.57031l-0.42969,0.42969h-5c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h16c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5l-0.42969,-0.42969c-0.365,-0.366 -0.85995,-0.57031 -1.37695,-0.57031zM4.36523,7l1.52734,13.26367c0.132,0.99 0.98442,1.73633 1.98242,1.73633h8.24805c0.998,0 1.85138,-0.74514 1.98438,-1.74414l1.52734,-13.25586z"></path></g></g>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Add modal */}


    <div className={`modal ${showAddModal ? 'show' : 'hide'}`}>
      <div className='modal-content'>
        <div className="modal-header">
          <div className="modal-title">Add New Task</div>
          <button className='close-modal' onClick={handleCloseAddModal}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 40 40">
              <path fill="#98ccfd" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"></path><path fill="#4788c7" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-134.999 20 20)"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-45.001 20 20)"></path><g><path fill="#fff" d="M28.132 13.99L26.01 11.868 20 17.879 13.99 11.868 11.868 13.99 17.879 20 11.868 26.01 13.99 28.132 20 22.121 26.01 28.132 28.132 26.01 22.121 20z"></path></g>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <div htmlFor="formTitle" className='labelMessage'>Task Title</div>
              <input
                type="text"
                className="form-control"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="error-message">{ErrorMessage}</div>
            </div>
            <div className="form-group">
              <div htmlFor="formDate" className='labelMessage'>Due Date</div>
              <input
                type="date"
                className="form-control"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div htmlFor="formDescription" className='labelMessage'>Description</div>
              <textarea
                className="form-control"
                rows="5"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="button-close" onClick={handleCloseAddModal}>
            Close
          </button>
          <button className="button-add" onClick={handleAddNewTask}>
            Add
          </button>
        </div>
      </div>
    </div>

    {/* Edit modal */}
    <div className={`modal ${showEditModal ? 'show' : 'hide'}`}>
      <div className='modal-content'>
        <div className="modal-header">
          <div className="modal-title">Edit Task</div>
          <button className="close-modal" onClick={handleCloseEditModal}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 40 40">
              <path fill="#98ccfd" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"></path><path fill="#4788c7" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-134.999 20 20)"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-45.001 20 20)"></path><g><path fill="#fff" d="M28.132 13.99L26.01 11.868 20 17.879 13.99 11.868 11.868 13.99 17.879 20 11.868 26.01 13.99 28.132 20 22.121 26.01 28.132 28.132 26.01 22.121 20z"></path></g>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <div htmlFor="formTitle" className='labelMessage'>Task Title</div>
              <input
                type="text"
                className="form-control"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="error-message">{ErrorMessage}</div>
            </div>
            <div className="form-group">
              <div htmlFor="formDate" className='labelMessage'>Due Date</div>
              <input
                type="date"
                className="form-control"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div htmlFor="formDescription" className='labelMessage'>Description</div>
              <textarea
                className="form-control"
                rows="5"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="button-close" onClick={handleCloseEditModal}>
            Close
          </button>
          <button className="button-edit" onClick={handleEditTask}>
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default App;