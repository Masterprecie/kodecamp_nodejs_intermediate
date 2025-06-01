const fs = require("fs");
const path = require("path");

const tasksFilePath = path.join(__dirname, "tasks.json");

let tasks = [];

// Load tasks from file
function loadTasksFromFile() {
  try {
    if (fs.existsSync(tasksFilePath)) {
      const data = fs.readFileSync(tasksFilePath, "utf8");
      tasks = data ? JSON.parse(data) : [];
    } else {
      tasks = [];
    }
  } catch (err) {
    console.error("Error loading tasks:", err.message);
    tasks = [];
  }
}

// Add new task
function addTask(title, description) {
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasksToFile();
  console.log(
    `✓ Task added successfully!\nID: ${newTask.id}, Title: "${title}"`
  );
}

//get all tasks
function getAllTasks() {
  return tasks;
}

// Mark task as complete
function markTaskComplete(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = true;
    saveTasksToFile();
    console.log(`✓ Task ${taskId} marked as completed!`);
  } else {
    console.log(`Task with ID ${taskId} not found.`);
  }
}

// Delete a task
function deleteTask(taskId) {
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasksToFile();
    console.log(`✓ Task ${taskId} deleted successfully!`);
  } else {
    console.log(`Task with ID ${taskId} not found.`);
  }
}

// Save tasks to file
function saveTasksToFile() {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error("Error saving tasks:", err.message);
  }
}

// Load tasks immediately on module import
loadTasksFromFile();

// Export functions
module.exports = {
  addTask,
  getAllTasks,
  markTaskComplete,
  deleteTask,
  saveTasksToFile,
  loadTasksFromFile,
};
