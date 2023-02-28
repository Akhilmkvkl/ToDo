import React from "react";

const TaskForm = ({ createTask, name, handleInput,isEditing,updateTask }) => {
  return (
    
    <form className="task-form" onSubmit={isEditing?updateTask:createTask}>
      <input
        type="text"
        placeholder="Add a Task"
        name="name"
        value={name}
        onChange={handleInput}
      />
    <button type="submit" className="">{isEditing ? "Edit" : "Add"}</button>
    </form>
  );
};

export default TaskForm;
