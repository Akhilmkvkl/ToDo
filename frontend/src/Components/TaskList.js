import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import loader from "../asset/loader.gif";

const TaskList = () => {
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  const [task, setTask] = useState([]);
  const [completedTask, setCompletedtask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

  const { name } = formData;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //create
  const createTask = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (name === "") {
      return toast.error("The Input Field cannot be empty",{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    try {
      await axios.post(`http://localhost:5000/api/task`, formData);
      toast.success("Task added");
      setFormData({ ...formData, name: "" });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    getTask();
  };
  //get
  const getTask = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/task`);
      setTask(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(()=>{
  const ctask = task.filter((task)=>{
    return task.complte === true
  })
  setCompletedtask(ctask)
  },[task])

  useEffect(() => {
    getTask();
  }, []);
  //delete
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/${id}`);
      toast.success("Task Deleted",{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      getTask();
    } catch (error) {
      toast.error(error.message);
    }
  };
  //get single task
  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskId(task._id);
    setIsEditing(true);
  };
  //update
  const updateTask = async(e) =>{
    e.preventDefault();
    if(name === ""){
      toast.error("Enter a task")
    }
    try {
      await axios.put(`/api/task/${taskId}`,formData)
      setFormData({...formData, name :""})
      setIsEditing(false)
      getTask()
    } catch (error) {
      toast.error(error.message)
    }
  }
  //complete
  const setToComplete = async (task) =>{
  const  newFormData = {
      name:task.name,
      complte:true
    }
    try {
      // console.log(task._id);
      await axios.put(`/api/task/${task._id}`,newFormData)
      getTask()
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      <h3>TaskList</h3>
      <TaskForm
        name={name}
        handleInput={handleInput}
        createTask={createTask}
        deleteTask={deleteTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
        {
          task.length>0 && (
            <div className="--flex-between --pb">
            <p>
            <b>Total Task:</b> {task.length}
          </p>
          <p>
            <b>Task Completed:</b> {completedTask.length}
          </p>
      </div>
          )
        }
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loader} alt="Loading" />
        </div>
      )}
      {!isLoading && task.length === 0 ? (
        <p className="--py">No task is added</p>
      ) : (
        task.map((task, index) => {
          return (
            <Task
              key={task._id}
              task={task}
              index={index}
              deleteTask={deleteTask}
              getSingleTask={getSingleTask}
              setToComplete={setToComplete}
            />
          );
        })
      )}
    </div>
  );
};

export default TaskList;
