"use strict";
// ifSavedlocallyAnyTask
const taskFromStorage = localStorage.getItem("tasksList");
// Input Element
const inputTask = document.getElementById("inputTask");
// Add Button
const addButton = document.querySelector(".addTask");
// Save button
const saveTask = document.querySelector(".saveTask");
// Task Container
const taskListContainer = document.querySelector(".taskListContainer");
// TaskList
let tasksList = [];
// handleTaskDisplay
const handleTask = () => {
    displayTask(tasksList);
    inputTask.value = "";
};
// dispalyAllTodoToUser
const displayTask = (taskList) => {
    let htmlTaskString = "";
    taskList.map((task) => {
        htmlTaskString += `<div class="d-flex justify-content-between align-items-center mt-2">
    <div>    
    <input type="checkbox" class="checkbox ms-2" id="${task.id}" ${task.isCompleted ? "checked" : ""} onclick="taskCompletionStatus(this.id)" />
    
        <label class="p-1 ps-2">${task.task}</label>
      </div>

      <div>
          <button type="button" id="${task.id}" class="p-1" data-bs-toggle="modal" data-bs-target="#myModal" onclick="editTask(this.id)">Edit</button>
       
       
          <button id="${task.id}" class="p-1" onclick="deleteTask(this.id)">Delete </button>
      
          </div>
      
        </div>

    `;
    });
    taskListContainer.innerHTML = htmlTaskString;
};
// localSavedDataAddedToTaskList
if (taskFromStorage) {
    tasksList = JSON.parse(taskFromStorage);
    handleTask();
}
// addingTaskOnClick[add]
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", () => {
    const userTask = inputTask.value;
    if (userTask) {
        tasksList.push({
            id: tasksList.length + 1,
            task: userTask,
            isCompleted: false,
        });
        handleTask();
    }
    else {
        toastr.error("Kindly Enter the Task.", "Note:", {
            positionClass: "toast-bottom-right",
            showDuration: 70,
            closeButton: true,
            progressBar: false,
            preventDuplicates: true,
        });
    }
});
// editTask
const taskToEdit = document.querySelector(".taskToEdit");
let taskIdToEdit;
const editTask = (id) => {
    taskIdToEdit = id;
    // toFindObjectWithTaskToBeEditedId
    tasksList.forEach((task) => {
        if (task.id == taskIdToEdit) {
            console.log(taskToEdit);
            taskToEdit.value = task.task;
        }
    });
};
// savingTheEditedTaskToObject
const saveEditedTask = () => {
    if (taskToEdit.value == "") {
        toastr.error("Kindly Enter the Task.Task is not edited.", "Note:", {
            positionClass: "toast-bottom-right",
            showDuration: 70,
            closeButton: true,
            progressBar: false,
            preventDuplicates: true,
        });
    }
    else {
        tasksList[taskIdToEdit - 1].task = taskToEdit.value;
        handleTask();
    }
};
// deleteTaskonClick[delete]
const deleteTask = (taskIdToRemove) => {
    tasksList = tasksList.filter((task) => task.id != taskIdToRemove);
    displayTask(tasksList);
};
// updateTaskStatus[checkbox - complete/incomplete]
const taskCompletionStatus = (taskStatusToUpdate) => {
    tasksList.find((task) => {
        if (task.id == taskStatusToUpdate) {
            task.isCompleted = !task.isCompleted;
        }
    });
};
// userSearchForAnyTask
const searchTasks = (toSearch) => {
    let searchedTasks = [];
    // userTypedSomething
    if (toSearch !== "") {
        // filterTaskSavedToArray - noChangesMadeToTasksList
        searchedTasks = tasksList.filter((task) => {
            const Data = Object.values(task).join("").toLowerCase();
            if (Data.includes(toSearch.toLowerCase())) {
                return task;
            }
        });
    }
    else {
        searchedTasks = tasksList;
    }
    // showTheSearchedTasks => [ tasksList/SearchedTasks]
    displayTask(searchedTasks);
};
// saveToLocalStorageOnClick[save]
saveTask === null || saveTask === void 0 ? void 0 : saveTask.addEventListener("click", () => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
});
