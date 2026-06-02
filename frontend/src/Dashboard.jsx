import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // if not logged in, send to login page
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getTasks();
    }
  }, []);

  // get tasks from the backend
  const getTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  // add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (title === "") return;

    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      setTasks([...tasks, data]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  // mark a task complete / not complete
  const toggleTask = async (task) => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks/" + task._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const data = await res.json();
      // replace the old task with the updated one
      setTasks(tasks.map((t) => (t._id === task._id ? data : t)));
    } catch (err) {
      console.log(err);
    }
  };

  // delete a task
  const deleteTask = async (id) => {
    try {
      await fetch("http://localhost:5000/api/tasks/" + id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
      <h2>My Tasks</h2>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={task.completed ? "task completed" : "task"}
            >
              <div onClick={() => toggleTask(task)} style={{ cursor: "pointer" }}>
                <input type="checkbox" checked={task.completed} readOnly />
                <span className="task-title">{task.title}</span>
                {task.description && <p className="task-desc">{task.description}</p>}
              </div>
              <button onClick={() => deleteTask(task._id)} className="delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
