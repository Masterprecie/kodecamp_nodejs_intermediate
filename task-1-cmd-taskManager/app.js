const http = require("http");
const taskManager = require("./taskManager");

const args = process.argv.slice(2);
const command = args[0];

if (command === "add") {
  const [title, description] = args.slice(1);
  if (!title || !description) {
    console.log("Error: Missing task title or description.");
  } else {
    taskManager.addTask(title, description);
  }
} else if (command === "list") {
  const tasks = taskManager.getAllTasks();
  console.log("=== Your Tasks ===\n");
  tasks.forEach((task) => {
    console.log(
      `[${task.id}] ${task.title} (${
        task.completed ? "Completed ✓" : "Pending"
      })\n` +
        `    Description: ${task.description}\n` +
        `    Created: ${new Date(task.createdAt).toLocaleString()}\n`
    );
  });
} else if (command === "complete") {
  const taskId = parseInt(args[1]);
  if (isNaN(taskId)) {
    console.log("Error: Invalid task ID.");
  } else {
    taskManager.markTaskComplete(taskId);
  }
} else if (command === "delete") {
  const taskId = parseInt(args[1]);
  if (isNaN(taskId)) {
    console.log("Error: Invalid task ID.");
  } else {
    taskManager.deleteTask(taskId);
  }
} else if (command === "server") {
  const PORT = 3000;

  const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (url === "/" && method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to the Personal Task Manager!");
    } else if (url === "/tasks" && method === "GET") {
      taskManager.loadTasksFromFile();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(taskManager.getAllTasks(), null, 2));
    } else if (url === "/tasks" && method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          const { title, description } = JSON.parse(body);
          if (!title || !description) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Missing title or description" }));
          } else {
            taskManager.addTask(title, description);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Task added successfully" }));
          }
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON format" }));
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  });

  server.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
  });
} else {
  console.log(
    "Unknown command. Available commands: add, list, complete, delete, server"
  );
}
