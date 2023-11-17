// definedTaskType
interface taskType {
  id: number;
  task: string;
  isCompleted: boolean;
}

// ifSavedlocallyAnyTask
const taskFromStorage = localStorage.getItem("tasksList");

// Input Element
const inputTask = document.getElementById("inputTask") as HTMLInputElement;
// Add Button
const addButton = document.querySelector(".addTask") as HTMLButtonElement;
// Save button
const saveTask = document.querySelector(".saveTask") as HTMLButtonElement;

// Task Container
const taskListContainer = document.querySelector(
  ".taskListContainer"
) as HTMLDivElement;

// TaskList
let tasksList: taskType[] = [];

// handleTaskDisplay
const handleTask = () => {
  displayTask(tasksList);
  inputTask.value = "";
};

// dispalyAllTodoToUser
const displayTask = (taskList: taskType[]): void => {
  let htmlTaskString = "";
  taskList.map((task: taskType): void => {
    htmlTaskString += `<div class="d-flex justify-content-between align-items-center mt-2">
    <div>    
    <input type="checkbox" class="checkbox ms-2" id="${task.id}" ${
      task.isCompleted ? "checked" : ""
    } onclick="taskCompletionStatus(this.id)" />
    
        <label class="p-1 ps-2">${task.task}</label>
      </div>

      <div>
          <button type="button" id="${
            task.id
          }" class="p-1" data-bs-toggle="modal" data-bs-target="#myModal" onclick="editTask(this.id)">Edit</button>
       
       
          <button id="${
            task.id
          }" class="p-1" onclick="deleteTask(this.id)">Delete </button>
      
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
addButton?.addEventListener("click", () => {
  const userTask = inputTask.value;
  if (userTask) {
    tasksList.push({
      id: tasksList.length + 1,
      task: userTask,
      isCompleted: false,
    });
    handleTask();
  } else {
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
const taskToEdit = document.querySelector(".taskToEdit") as HTMLInputElement;
let taskIdToEdit: number;
const editTask = (id: number): void => {
  taskIdToEdit = id;
  // toFindObjectWithTaskToBeEditedId
  tasksList.forEach((task: taskType) => {
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
  } else {
    tasksList[taskIdToEdit - 1].task = taskToEdit.value;
    handleTask();
  }
};
// deleteTaskonClick[delete]
const deleteTask = (taskIdToRemove: number): void => {
  tasksList = tasksList.filter(
    (task: taskType): boolean => task.id != taskIdToRemove
  );
  displayTask(tasksList);
};

// updateTaskStatus[checkbox - complete/incomplete]
const taskCompletionStatus = (taskStatusToUpdate: number) => {
  tasksList.find((task: taskType) => {
    if (task.id == taskStatusToUpdate) {
      task.isCompleted = !task.isCompleted;
    }
  });
};

// userSearchForAnyTask
const searchTasks = (toSearch: string): void => {
  let searchedTasks: taskType[] = [];
  // userTypedSomething
  if (toSearch !== "") {
    // filterTaskSavedToArray - noChangesMadeToTasksList
    searchedTasks = tasksList.filter((task: taskType) => {
      const Data = Object.values(task).join("").toLowerCase();
      if (Data.includes(toSearch.toLowerCase())) {
        return task;
      }
    });
  } else {
    searchedTasks = tasksList;
  }
  // showTheSearchedTasks => [ tasksList/SearchedTasks]
  displayTask(searchedTasks);
};

// saveToLocalStorageOnClick[save]
saveTask?.addEventListener("click", () => {
  localStorage.setItem("tasksList", JSON.stringify(tasksList));
});
