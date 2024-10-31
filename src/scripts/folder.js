import { ProjectForm } from "./Ui-Logic.js";
import { updateLocalStorage } from "../index.js";

export const allProjectCon = [];

class Project {
    constructor (name) {
        this.name = name;
    }
}

export function createFolderObj() {
    const formData = new FormData(ProjectForm);
    const formDataObj = Object.fromEntries(formData);
    const project = new Project(formDataObj.name_Input);
    if (isDuplicateName(formDataObj.name_Input.trim())) {
        alert("Cannot have Duplicate folder names");
    } else if (!formDataObj.name_Input.trim()) {
        alert("Folder Name Cannot be empty");
    } else {
        allProjectCon.push(project);
    }
    updateLocalStorage();
}

if (localStorage.length === 0) {
    const defaultFolder = new Project("Default Project");
    allProjectCon.push(defaultFolder);
}

function isDuplicateName(newFolder) {
    return allProjectCon.some((folder) => folder.name === newFolder);
}