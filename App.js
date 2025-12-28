const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let todos = [];

// Load tasks from file if exists
if (fs.existsSync("todos.json")) {
  const data = fs.readFileSync("todos.json", "utf-8");
  todos = JSON.parse(data || "[]");
}

const saveToFile = () => {
  fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
};

const showMenu = () => {
  console.log("\n📌 TODO MENU");
  console.log("1: Add a task");
  console.log("2: View tasks");
  console.log("3: Edit a task");
  console.log("4: Delete a task");
  console.log("5: Exit");
  rl.question("Choose an option: ", handleInput);
};

const showTasks = () => {
  if (todos.length === 0) {
    console.log("\nNo tasks found.");
    return;
  }
  console.log("\n📝 Your Tasks:");
  todos.forEach((task, index) => {
    console.log(`${index + 1}: ${task}`);
  });
};

const handleInput = (option) => {
  if (option === "1") {
    rl.question("Enter the task: ", (task) => {
      todos.push(task);
      saveToFile();
      console.log("✅ Task added.");
      showMenu();
    });
  } else if (option === "2") {
    showTasks();
    showMenu();
  } else if (option === "3") {
    showTasks();
    if (todos.length === 0) return showMenu();

    rl.question("Enter task number to edit: ", (num) => {
      const index = parseInt(num) - 1;
      if (index >= 0 && index < todos.length) {
        rl.question("Enter new task text: ", (newTask) => {
          todos[index] = newTask;
          saveToFile();
          console.log("✏️ Task updated.");
          showMenu();
        });
      } else {
        console.log("❌ Invalid task number.");
        showMenu();
      }
    });
  } else if (option === "4") {
    showTasks();
    if (todos.length === 0) return showMenu();

    rl.question("Enter task number to delete: ", (num) => {
      const index = parseInt(num) - 1;
      if (index >= 0 && index < todos.length) {
        const removed = todos.splice(index, 1);
        saveToFile();
        console.log(`❌ Deleted: ${removed[0]}`);
      } else {
        console.log("❌ Invalid task number.");
      }
      showMenu();
    });
  } else if (option === "5") {
    console.log("👋 Exiting... Tasks saved.");
    rl.close();
  } else {
    console.log("❌ Invalid option. Try again.");
    showMenu();
  }
};

showMenu();
