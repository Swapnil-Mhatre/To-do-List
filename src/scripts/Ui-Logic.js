import { allTaskCon } from "./task.js";
import { allProjectCon, createFolderObj } from "./folder.js";
import {
  toggleTaskCompletion,
  deleteCard,
  deleteProject,
  editTask,
} from "./event-Listners.js";
import { formatDate, closeBox } from "../index.js";

export const taskPopBox = document.querySelector(".createTaskContainer");
export const TaskForm = document.querySelector("#createTaskForm");
export const tasksListCon = document.querySelector(".tasksListCon");
export const projectPopBox = document.querySelector(".createProjectCon");
export const ProjectForm = document.querySelector("#newProjectForm");
export const createTaskBtn = document.querySelector(".createBtn");
export const createProjectBtn = document.querySelector(".projectBtn");
export const completedSecBtn = document.querySelector(".completedBtn");
export const ProjectSec = document.querySelector(".Projects");
export const allTaskSecBtn = document.querySelector(".AlltasksBtn");
export const para = document.querySelector(".para");
export const emptyFolderTaskBtn = document.querySelector(".emptyFolderTaskBtn");
export const projectHeadline = document.querySelector("#Project-Heading");
export const taskHeadline = document.querySelector("#task-Headline");
export const projectCancelBtn = document.querySelector(".projectCancelBtn");
export const taskCancelBtn = document.querySelector(".taskCancelBtn");
export const projectFolder = document.querySelector("#projectFolder");
export const taskNameInput = document.querySelector("#nameInput");
export const taskDescription = document.querySelector("#taskDescription");
export const taskDueDate = document.querySelector("#dueDate");
export const priorlow = document.querySelector("#low");
export const priormoderate = document.querySelector("#moderate");
export const priorhigh = document.querySelector("#high");

export function renderTaskCard(task) {
  const taskCard = document.createElement("div");
  const checkbox = document.createElement("input");
  const textContainer = document.createElement("div");
  const name = document.createElement("h3");
  const dueDate = document.createElement("p");
  const description = document.createElement("p");
  const detailBtn = document.createElement("button");
  const svgdetail = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  const pathdetail = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  const EditBtn = document.createElement("button");
  const svgedit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const pathedit = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  const deleteBtn = document.createElement("button");
  const svgdelete = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  const pathdelete = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );

  svgdetail.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgdetail.setAttribute("x", "0px");
  svgdetail.setAttribute("y", "0px");
  svgdetail.setAttribute("width", "100");
  svgdetail.setAttribute("height", "100");
  svgdetail.setAttribute("viewBox", "0 0 50 50");

  pathdetail.setAttribute(
    "d",
    "M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"
  );

  svgdetail.appendChild(pathdetail);

  svgedit.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgedit.setAttribute("x", "0px");
  svgedit.setAttribute("y", "0px");
  svgedit.setAttribute("width", "100");
  svgedit.setAttribute("height", "100");
  svgedit.setAttribute("viewBox", "0 0 30 30");

  pathedit.setAttribute(
    "d",
    "M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"
  );

  svgedit.appendChild(pathedit);

  svgdelete.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgdelete.setAttribute("x", "0px");
  svgdelete.setAttribute("y", "0px");
  svgdelete.setAttribute("width", "100");
  svgdelete.setAttribute("height", "100");
  svgdelete.setAttribute("viewBox", "0 0 30 30");

  pathdelete.setAttribute(
    "d",
    "M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"
  );

  svgdelete.appendChild(pathdelete);

  taskCard.classList.add("taskCard");
  checkbox.setAttribute("type", "checkbox");
  textContainer.classList.add("textcontainer");
  name.textContent = task.name;
  dueDate.textContent = "Due By " + formatDate(task.duedate);
  description.textContent = task.description;
  description.classList.add("Hide");
  detailBtn.appendChild(svgdetail);
  EditBtn.appendChild(svgedit);
  deleteBtn.appendChild(svgdelete);

  if (task.iscompleted === "true") {
    checkbox.setAttribute("checked", "checked");
  }

  switch (task.priority) {
    case "low":
      dueDate.classList.add("low");
      break;
    case "moderate":
      dueDate.classList.add("moderate");
      break;
    case "high":
      dueDate.classList.add("high");
      break;
  }

  textContainer.append(name, dueDate, description);
  taskCard.append(checkbox, textContainer, detailBtn, EditBtn, deleteBtn);
  tasksListCon.append(taskCard);

  checkbox.addEventListener("click", () => {
    toggleTaskCompletion(task, taskCard, checkbox);
  });

  deleteBtn.addEventListener("click", () => {
    deleteCard(task, taskCard);
  });

  EditBtn.addEventListener("click", () => {
    if (task.iscompleted !== "true") {
      closeBox(projectPopBox, ProjectForm)
      taskHeadline.textContent = "Edit Task";
      editTask(task);
    } else {
      alert("Can't edit Completed Task");
    }
  });

  detailBtn.addEventListener("click", () => {
    description.classList.toggle("Hide");
  });
}

export function displayCompletedProject() {
  tasksListCon.replaceChildren();
  const filteredTask = allTaskCon.filter((tasks) => {
    if (tasks.iscompleted === "true") {
      return tasks;
    }
  });
  filteredTask.forEach((taskCard) => renderTaskCard(taskCard));
  projectHeadline.textContent = "Completed";
  ProjectSec.childNodes.forEach((project) => {
    project.classList.remove("active");
  });
  allTaskSecBtn.classList.remove("active");
  completedSecBtn.classList.add("active");
  if (filteredTask.length === 0) {
    tasksListCon.append(para);
  }
}

export function displayAllTask() {
  tasksListCon.replaceChildren();
  allTaskCon.forEach((task) => {
    if (task.iscompleted === "false") {
      renderTaskCard(task);
    }
  });
  projectHeadline.textContent = "All Tasks";
  ProjectSec.childNodes.forEach((project) => {
    project.classList.remove("active");
  });
  completedSecBtn.classList.remove("active");
  allTaskSecBtn.classList.add("active");
  if (
    allTaskCon.every((task) => {
      return task.iscompleted !== "false";
    })
  ) {
    tasksListCon.appendChild(emptyFolderTaskBtn);
  }
}

export function displaycurrentProject(projectName) {
  tasksListCon.replaceChildren();
  const filteredTask = allTaskCon.filter((taskCard) => {
    if (projectName === taskCard.project && taskCard.iscompleted === "false") {
      return taskCard;
    }
  });
  filteredTask.forEach((task) => renderTaskCard(task));
  projectHeadline.textContent = projectName;
  highlightSelectedProject(projectName);
  if (filteredTask.length === 0) {
    tasksListCon.append(emptyFolderTaskBtn);
  }
}

function highlightSelectedProject(projectName) {
  ProjectSec.childNodes.forEach((project) => {
    if (project.firstChild.textContent === projectName) {
      ProjectSec.childNodes.forEach((project) => {
        project.classList.remove("active");
      });
      project.classList.add("active");
      completedSecBtn.classList.remove("active");
      allTaskSecBtn.classList.remove("active");
    }
  });
}

export function updateDisplay() {
  displaycurrentProject(allTaskCon[allTaskCon.length - 1].project);
}

export function renderProjectBtns(manualCallback = false) {
  ProjectSec.replaceChildren();
  projectFolder.replaceChildren();
  if (manualCallback === false) {
    createFolderObj();
  }
  allProjectCon.forEach((project) => {
    const container = document.createElement("div");
    const projectBtn = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const projectOption = document.createElement("option");
    const svgProject = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const pathProject = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    const svgTrashCan = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const pathTrashCan = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    svgProject.setAttribute("class", "w-6 h-6 text-gray-800 dark:text-white");
    svgProject.setAttribute("aria-hidden", "true");
    svgProject.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgProject.setAttribute("width", "24");
    svgProject.setAttribute("height", "24");
    svgProject.setAttribute("fill", "currentColor");
    svgProject.setAttribute("viewBox", "0 0 24 24");

    pathProject.setAttribute("fill-rule", "evenodd");
    pathProject.setAttribute(
      "d",
      "M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 .087.586l2.977-7.937A1 1 0 0 1 6 10h12V9a2 2 0 0 0-2-2h-4.532l-1.9-2.28A2 2 0 0 0 8.032 4H4Zm2.693 8H6.5l-3 8H18l3-8H6.693Z"
    );
    pathProject.setAttribute("clip-rule", "evenodd");
    svgProject.append(pathProject);

    svgTrashCan.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgTrashCan.setAttribute("x", "0px");
    svgTrashCan.setAttribute("y", "0px");
    svgTrashCan.setAttribute("width", "100");
    svgTrashCan.setAttribute("height", "100");
    svgTrashCan.setAttribute("viewbox", "0 0 30 30");

    pathTrashCan.setAttribute(
      "d",
      "M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"
    );
    svgTrashCan.append(pathTrashCan);

    container.classList.add("projectContainer");
    projectBtn.append(svgProject, project.name);
    const removeSpace = project.name.replace(/ /g, "");
    projectBtn.classList.add(removeSpace);
    projectOption.textContent = project.name;
    projectOption.setAttribute("value", project.name);

    deleteBtn.append(svgTrashCan);
    container.append(projectBtn, deleteBtn);
    ProjectSec.append(container);
    projectFolder.append(projectOption);
    displaycurrentProject(project.name);

    projectBtn.addEventListener("click", () => {
      displaycurrentProject(project.name);
    });

    deleteBtn.addEventListener("click", () => {
      if (allProjectCon.length > 1) {
        deleteProject(project.name, container);
        folderOption.remove();
      }
    });
  });
}

export function exitBox(box, form) {
  box.classList.remove("showBox");
  form.reset();
}
