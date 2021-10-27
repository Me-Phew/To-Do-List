let taskNameInput = document.getElementById("input-task");
taskNameInput.addEventListener("input", addTaskAvailable);

let addTaskBtn = document.getElementById("add-task-button");

function addTaskAvailable(){
    addTaskBtn.disabled = taskNameInput.value.trim() === "";
}

addTaskBtn.addEventListener("click", addTask);
taskNameInput.addEventListener("keyup", event => {
    if(event.key === "Enter"){
        addTask();
    }
});

let taskList = document.getElementById("task-list");

function addTask(){
    if (taskNameInput.value.trim() !== ""){
        let fragment = new DocumentFragment();
        let element = createTask(taskNameInput.value.trim(), false);

        fragment.appendChild(element);
        taskList.appendChild(fragment);
        taskNameInput.value = "";
        addTaskBtn.disabled = true;
        saveTasks();
    }
}

function createTask(name, completed){
    let checked = completed ? "checked " : "";
    let spanClassList = completed ? "\"task completed-task\"" : "\"task\"";

    let element = document.createElement("li");
    element.innerHTML = "<label>\n" +
        "<input type=\"checkbox\" class=\"completed\" " + checked + "onclick=\"completeTask(this)\">\n" +
        "</label>\n" +
        "<span class=" + spanClassList + ">" + name + "</span>\n" +
        "<button class=\"delete-btn\" onclick='removeTask(this)'></button>\n"

    return element;
}

function removeTask(element){
    taskList.removeChild(element.parentElement);
    saveTasks();
}

function completeTask(checkbox){
    let task = checkbox.parentElement.parentElement;
    let span = task.children[1];
    span.classList.toggle("completed-task");
    saveTasks();
}

function saveTasks(){
    let tasks = taskList.children;

    let tasksData = [];

    for(let x = 0; x < tasks.length; x++){
        let li = tasks[x];
        let taskName = li.children[1].innerText;
        let taskCompleted = li.children[0].children[0].checked;

        tasksData.push([taskName, taskCompleted]);
    }

    localStorage.setItem("tasksData", JSON.stringify(tasksData));
}

function loadTasks(){
    let tasksData = JSON.parse(localStorage.getItem("tasksData")) || [];

    let fragment = new DocumentFragment();

    for(let x = 0; x < tasksData.length; x++){
        let taskName = tasksData[x][0];
        let taskCompleted = tasksData[x][1];


        let element = createTask(taskName, taskCompleted);
        fragment.appendChild(element);

    }

    taskList.appendChild(fragment);
}
