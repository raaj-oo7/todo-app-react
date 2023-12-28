import React from "react";
import "./App.css";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete }) => (
  <div className="task-list">
    {tasks.map((task, index) => (
      <TaskItem key={index} task={task} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);

export default TaskList;
