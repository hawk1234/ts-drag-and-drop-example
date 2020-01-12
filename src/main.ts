//using ES6 modules support for imports.
//alternative would be TS namespaces, however namespaces doesn't strictly watch that each file import all necessary functionalities

//NOTE: export keyword for each module is important. Classes, functions etc. without export are seen by TS everywhere and lead to runtime errors, instead of compile time. This is the behavior I have in TS v3.7.4
import { ProjectList } from './ui/component/project-list';
import { ProjectForm } from './ui/component/project-form';
import { ProjectStatus } from './model/project-status';
import { Projects } from './model/projects';

const MAIN_DIV_ID = 'app';
const mainAppDiv = document.getElementById(MAIN_DIV_ID) as HTMLDivElement;
const activeProjectList = new ProjectList('active-projects', mainAppDiv, 'Active Projects', ProjectStatus.ACTIVE);
const finishedProjectList = new ProjectList('finished-projects', mainAppDiv, 'Finished Projects', ProjectStatus.FINISHED);
const projectForm = new ProjectForm('projectForm', mainAppDiv);

Projects.getInstance().addProjectsChangeListener(activeProjectList);
Projects.getInstance().addProjectsChangeListener(finishedProjectList);

projectForm.render();
activeProjectList.render();
finishedProjectList.render();