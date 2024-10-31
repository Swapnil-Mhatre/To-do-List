import { TaskForm } from "./Ui-Logic.js";
import { updateLocalStorage } from "../index.js";

export const allTaskCon = [];

export class Task {
    constructor(project, name, description, duedate, priority, iscompleted, id) {
        this.project = project,
        this.name = name,
        this.description = description,
        this.duedate = duedate,
        this.priority = priority,
        this.iscompleted = iscompleted,
        this.id = id 
    }
}

export function updateId () {
    let number = 0;
    allTaskCon.forEach((task) => {
        task.id = number;
        number++;
    });
};

export function createTaskObj() {
    const formData = new FormData(TaskForm);
    const formDataObj = Object.fromEntries(formData);
    const task = new Task (
        formDataObj.project_Folder,
        formDataObj.name_Input,
        formDataObj.task_Description,
        formDataObj.due_date,
        formDataObj.task_Priority,
        "false",
        null,
    );
    allTaskCon.push(task);
    updateId();
    updateLocalStorage();
}

if (localStorage.length === 0) {
    const defaultTask = new Task(
        "Default Project",
        "Create first task",
        "Use the first menu button to create a new task.",
        "2025-10-05",
        "high",
        "false",
        0,
    );
    allTaskCon.push(defaultTask);
}