let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        dateAdded: new Date().toLocaleString()
    };

    tasks.push(newTask);
    taskInput.value = "";
    displayTasks();
}

function displayTasks() {
    const pendingTasks = document.getElementById("pendingTasks");
    const completedTasks = document.getElementById("completedTasks");

    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.textContent = `${task.text} (Added on: ${task.dateAdded})`;

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.classList.add("complete-btn");
        completeBtn.onclick = () => toggleComplete(task.id);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = () => editTask(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        taskItem.appendChild(completeBtn);
        taskItem.appendChild(editBtn);
        taskItem.appendChild(deleteBtn);

        if (task.completed) {
            taskItem.classList.add("completed");
            completedTasks.appendChild(taskItem);
        } else {
            pendingTasks.appendChild(taskItem);
        }
    });
}

function toggleComplete(taskId) {
    tasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed, dateCompleted: new Date().toLocaleString() } : task
    );
    displayTasks();
}

function editTask(taskId) {
    const newTaskText = prompt("Edit the task:");

    if (newTaskText === null || newTaskText.trim() === "") {
        return;
    }

    tasks = tasks.map(task =>
        task.id === taskId ? { ...task, text: newTaskText } : task
    );

    displayTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
}

document.addEventListener("DOMContentLoaded", displayTasks);
