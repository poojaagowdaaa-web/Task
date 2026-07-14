let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text === "") {
        alert("Please enter a task!");
        return;
    }
    const duplicate = allTasks.some(
        task => task.text.toLowerCase() === text.toLowerCase()
    );

    if (duplicate) {
        alert("Task already exists!");
        return;
    }

    allTasks.push({
        text: text,
        done: false
    });
    localStorage.setItem("tasks", JSON.stringify(allTasks));

    input.value = "";
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    allTasks.forEach((task, index) => {

        const li = document.createElement("li");
        const span = document.createElement("span");
        span.className = "task-text";
        span.innerText = task.text;

        if (task.done) {
            span.classList.add("completed");
        }
        const actions = document.createElement("div");
        actions.className = "actions";
        const doneBtn = document.createElement("button");
        doneBtn.innerText = task.done ? "Undo" : "Done";
        doneBtn.className = "done-btn";

        doneBtn.onclick = () => {
            allTasks[index].done = !allTasks[index].done;
            localStorage.setItem("tasks", JSON.stringify(allTasks));
            renderTasks();
        };
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.className = "edit-btn";

        editBtn.onclick = () => {

            const updatedTask = prompt("Edit Task", task.text);

            if (updatedTask === null) return;

            const newText = updatedTask.trim();

            if (newText === "") {
                alert("Task cannot be empty!");
                return;
            }

            const duplicate = allTasks.some(
                (t, i) =>
                    i !== index &&
                    t.text.toLowerCase() === newText.toLowerCase()
            );

            if (duplicate) {
                alert("Task already exists!");
                return;
            }

            allTasks[index].text = newText;

            localStorage.setItem("tasks", JSON.stringify(allTasks));

            renderTasks();
        };
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = () => {
            allTasks.splice(index, 1);

            localStorage.setItem("tasks", JSON.stringify(allTasks));
            localStorage.setItem("tasks", JSON.stringify(allTasks));
            console.log(localStorage.getItem("tasks"));

            renderTasks();
        };

        actions.appendChild(doneBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        list.appendChild(li);
    });
}