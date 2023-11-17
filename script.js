let tasks = [];

function addTask() {
    const taskText = document.getElementById("task").value;
    const priority = document.getElementById("priority").value;
    const dependency = document.getElementById("dependency").value;

    if (taskText === "") {
        alert("Please enter a task description.");
        return;
    }

    const task = {
        description: taskText,
        priority: priority,
        dependency: dependency,
        completed: false,
    };

    tasks.push(task);

    // Sort tasks based on priority, urgency, and dependencies
    tasks.sort((a, b) => {
        if (a.priority === b.priority) {
            if (a.dependency === b.dependency) {
                return 0;
            } else if (a.dependency < b.dependency) {
                return -1;
            } else {
                return 1;
            }
        } else if (a.priority === "high") {
            return -1;
        } else if (b.priority === "high") {
            return 1;
        } else if (a.priority === "medium") {
            return -1;
        } else if (b.priority === "medium") {
            return 1;
        } else {
            return 0;
        }
    });

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <strong>Task:</strong> ${task.description}<br>
            <strong>Priority:</strong> ${task.priority}<br>
            <strong>Description:</strong> ${task.dependency}<br>
            ${task.completed ? '<span style="color: green;">Completed</span>' :
                '<button onclick="completeTask(' + index + ')">Mark as Complete</button>'}
            <button onclick="removeTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });

    document.getElementById("task").value = "";
    document.getElementById("priority").value = "low";
    document.getElementById("dependency").value = "";
}

function removeTask(index) {
    tasks.splice(index, 1);
    addTask();
}

function completeTask(index) {
    tasks[index].completed = true;
    addTask();
}
