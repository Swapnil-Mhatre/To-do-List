import {
  displaycurrentProject,
  projectHeadline,
  displayCompletedProject,
  displayAllTask,
  taskPopBox,
  TaskForm,
  taskNameInput,
  taskDueDate,
  taskDescription,
  priorlow,
  priormoderate,
  priorhigh,
} from "./Ui-Logic.js";
import { allProjectCon } from "./folder.js";
import { updateLocalStorage } from "../index.js";
import { allTaskCon, updateId, Task } from "./task.js";

export function toggleTaskCompletion(object, taskCard) {
  if (object.iscompleted === "true") {
    object.iscompleted = "false";
    addFastFadeAnimation(taskCard, displayCompletedProject);
  } else {
    object.iscompleted = "true";
    if (projectHeadline.textContent === "All Tasks") {
      addFadeAnimation(taskCard, displayAllTask);
    } else {
      addFadeAnimation(taskCard, displaycurrentProject, object.project);
    }
  }
  updateLocalStorage();
}

function addFadeAnimation(taskCard, func, arg = null) {
  taskCard.classList.add("fade600");
  document.body.style.pointerEvents = "none";
  setTimeout(() => {
    func(arg);
    document.body.style.pointerEvents = "auto";
  }, 600);
}

function addFastFadeAnimation(taskCard, func, arg = null, deleteObj = null) {
  taskCard.classList.add("fade250");
  document.body.style.pointerEvents = "none";
  setTimeout(() => {
    func(arg);
    if (deleteObj !== null) {
      deleteObj.remove();
    }
    document.body.style.pointerEvents = "auto";
  }, 250);
}

export function deleteCard(object, taskCard) {
  allTaskCon.splice(object.id, 1);
  updateId();
  if (object.iscompleted === "true") {
    addFastFadeAnimation(taskCard, displayCompletedProject);
  } else if (projectHeadline.textContent === "All Tasks") {
    addFastFadeAnimation(taskCard, displayAllTask);
  } else {
    addFastFadeAnimation(taskCard, displaycurrentProject, object.project);
  }
}

export function deleteProject(projectName, container) {
  const filteredFolderCon = allProjectCon.filter(
    (project) => project.name !== projectName
  );
  allProjectCon.length = 0;
  filteredFolderCon.forEach((item) => allProjectCon.push(item));

  const filteredTaskCon = allTaskCon.filter(
    (task) => task.folder !== projectName
  );
  allTaskCon.length = 0;
  filteredTaskCon.forEach((item) => allTaskCon.push(item));
  updateId();
  if (projectHeadline.textContent === "Completed") {
    addFastFadeAnimation(container, displayCompletedProject, null, container);
  } else if (projectHeadline.textContent === "All Tasks") {
    addFastFadeAnimation(container, displayAllTask, null, container);
  } else {
    addFastFadeAnimation(
      container,
      displaycurrentProject,
      allProjectCon[allProjectCon.length - 1].name,
      container
    );
  }
  updateLocalStorage();
}

const isComplete = document.querySelector("#isComplete");
const taskID = document.querySelector("#taskID");

export function editTask(task) {
  taskNameInput.setAttribute("value", task.name);
  taskDescription.textContent = task.description;
  taskDueDate.setAttribute("value", task.duedate);
  switch (task.priority) {
    case "high":
      priorhigh.removeAttribute("selected");
      priormoderate.removeAttribute("selected");
      priorlow.removeAttribute("selected");
      priorhigh.setAttribute("selected", "");
      break;
    case "moderate":
      priorhigh.removeAttribute("selected");
      priormoderate.removeAttribute("selected");
      priorlow.removeAttribute("selected");
      priormoderate.setAttribute("selected", "");
      break;
    case "low":
      priorhigh.removeAttribute("selected");
      priormoderate.removeAttribute("selected");
      priorlow.removeAttribute("selected");
      priorlow.setAttribute("selected", "");
      break;
  }
  const option = document.querySelectorAll(`option[value="${task.project}"]`);
  const options = document.querySelectorAll("#projectFolder option");
  options.forEach((option) => option.removeAttribute("selected"));
  option[0].setAttribute("selected", "");
  isComplete.setAttribute("value", task.iscompleted);
  taskID.setAttribute("value", task.id);
  taskNameInput.setSelectionRange(
    taskNameInput.value.length,
    taskNameInput.value.length
  );
  taskPopBox.classList.add("showBox");
}

export function clearForm() {
  taskNameInput.setAttribute("value", "");
  taskDescription.textContent = "";
  taskDueDate.setAttribute("value", "");
  priorhigh.removeAttribute("selected");
  priormoderate.removeAttribute("selected");
  priorlow.removeAttribute("selected");
}

export function updateTaskCard() {
  const formData = new FormData(TaskForm);
  const formDataObj = Object.fromEntries(formData);
  const task = new Task(
    formDataObj.project_Folder,
    formDataObj.name_Input,
    formDataObj.task_Description,
    formDataObj.due_date,
    formDataObj.task_Priority,
    formDataObj.is_complete,
    formDataObj.task_id
  );
  allTaskCon.splice(task.id, 1, task);
  updateId();
  updateLocalStorage();
  return task.project;
}
