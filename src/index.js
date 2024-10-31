import "./styles/main.css";
import { allTaskCon, createTaskObj } from "./scripts/task.js";
import {
  TaskForm,
  createTaskBtn,
  taskPopBox,
  projectPopBox,
  ProjectForm,
  projectCancelBtn,
  taskCancelBtn,
  createProjectBtn,
  exitBox,
  renderProjectBtns,
  allTaskSecBtn,
  completedSecBtn,
  updateDisplay,
  displayCompletedProject,
  displayAllTask,
  displaycurrentProject,
  emptyFolderTaskBtn,
  taskHeadline,
} from "./scripts/Ui-Logic.js";
import { allProjectCon } from "./scripts/folder.js";
import { updateTaskCard, clearForm } from "./scripts/event-Listners.js";

export function formatDate(dateStr) {
  const arrOfMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let year = dateStr.slice(0, 4);
  let month = dateStr.slice(5, 7) - 1;
  let day = dateStr.slice(8, 10);

  switch (day.slice(0, 2)) {
    case "01":
      day += "st";
      break;
    case "02":
      day += "nd";
      break;
    case "03":
      day += "rd";
      break;
    default:
      day += "th";
  }

  if (day[0] === "0") {
    day = day.slice(1, day.length);
  }

  return `${day} ${arrOfMonths[month]} ${year}`;
}

if (localStorage.length === 0) {
  renderProjectBtns(true);
  updateLocalStorage();
  displaycurrentProject("Default Project");
} else {
  const deserializedProject = JSON.parse(localStorage.getItem("projectArray"));
  deserializedProject.forEach((object) => {
    allProjectCon.push(object);
  });

  const deserializedTasks = JSON.parse(localStorage.getItem("taskArray"));
  deserializedTasks.forEach((object) => {
    allTaskCon.push(object);
  });
  renderProjectBtns(true);
  displaycurrentProject(allProjectCon[0].name);
}

export function updateLocalStorage() {
  localStorage.setItem("taskArray", JSON.stringify(allTaskCon));
  localStorage.setItem("projectArray", JSON.stringify(allProjectCon));
}

export function closeBox(box, form) {
  const boxes = document.querySelectorAll(".formbox");
  boxes.forEach((box) => {
    box.classList.add("boxClose");
  });
  setTimeout(() => {
    exitBox(box, form);
    boxes.forEach((box) => {
      box.classList.remove("boxClose");
    });
  }, 300);
}

createTaskBtn.addEventListener("click", () => {
  clearForm();
  taskPopBox.classList.add("showBox");
  closeBox(projectPopBox, ProjectForm);
  taskHeadline.textContent = "Create New Task";
});
taskCancelBtn.addEventListener("click", () => {
  closeBox(taskPopBox, TaskForm);
});

createProjectBtn.addEventListener("click", () => {
  closeBox(taskPopBox, TaskForm);
  projectPopBox.classList.add("showBox");
});
projectCancelBtn.addEventListener("click", () => {
  closeBox(projectPopBox, ProjectForm);
});

emptyFolderTaskBtn.addEventListener("click", () => {
  clearForm();
  closeBox(projectPopBox, ProjectForm);
  taskPopBox.classList.add("showBox");
  taskHeadline.textContent = "Create New Task";
});

TaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  closeBox(taskPopBox, TaskForm);
  if (taskHeadline.textContent === "Edit Task") {
    const projectName = updateTaskCard();
    displaycurrentProject(projectName);
  } else {
    createTaskObj();
    updateDisplay();
  }
});

ProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  closeBox(projectPopBox, ProjectForm);
  renderProjectBtns();
});

allTaskSecBtn.addEventListener("click", () => displayAllTask());
completedSecBtn.addEventListener("click", () => displayCompletedProject());