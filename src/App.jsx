import { use, useState } from "react";
import "./App.css";

export default function App() {
  let [task, setTask] = useState("");
  let [tasks, setTasks] = useState([]);
  let [selected, setSelected] = useState(null);

  const addTask = () => {
    if (task.trim() == "") return;
    setTasks([...tasks, { name: task, id: Date.now(), completed: false }]);
    setTask("");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((item) => {
        if (item.completed === false) {
          return item.id === id ? { ...item, completed: true } : item;
        } else {
          return item.id === id ? { ...item, completed: false } : item;
        }
      })
    );
  };

  const handleClick = (id) => {
    if (selected === null) {
      setSelected(id);
    } else if (selected === id) {
      setSelected(null);
    } else {
      const firstIndex = tasks.findIndex((item) => item.id === selected);
      const secondIndex = tasks.findIndex((item) => item.id === id);
      if (firstIndex !== -1 && secondIndex !== -1) {
        const newTasks = [...tasks];
        [newTasks[firstIndex], newTasks[secondIndex]] = [
          newTasks[secondIndex],
          newTasks[firstIndex],
        ];
        setTasks(newTasks);
      }
      setSelected(null);
    }
  };

  const sortedTasks = [
    ...tasks.filter((item) => !item.completed),
    ...tasks.filter((item) => item.completed),
  ];
  return (
    <>
      <main>
        <div className="input_div">
          <h1>Welcome to the TO-DO LIST APP</h1>
          <div className="add_task">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="TYPE HERE..."
            />
            <button onClick={addTask}>ADD TASK</button>
          </div>
        </div>
        <div className="task_list">
          <h2>There's your list of tasks:</h2>
          <ul>
            {sortedTasks.map((item) => (
              <li
                key={item.id}
                style={{
                  border: selected === item.id ? "2px solid #007bff" : "",
                }}
                onClick={() => handleClick(item.id)}
              >
                {item.name}
                <span
                  className="task-tooltip"
                  style={{ display: selected === item.id ? "none" : "" }}
                >
                  Click to choose task for swapping
                </span>
                <div className="button-div">
                  {item.completed ? (
                    <button
                      className="completed_button"
                      onClick={(e) => {
                        e.stopPropagation();
                        completeTask(item.id);
                      }}
                    ></button>
                  ) : (
                    <button
                      className="complete_button"
                      onClick={(e) => {
                        e.stopPropagation();
                        completeTask(item.id);
                      }}
                    ></button>
                  )}
                  <button
                    className="remove_button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTask(item.id);
                    }}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {tasks.length !== 0 && (
            <p className="hint">
              Hint: click on another task to swap their places
            </p>
          )}
        </div>
      </main>
    </>
  );
}
