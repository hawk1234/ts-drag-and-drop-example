import { Project } from "./project";
import { ProjectStatus } from "./project-status";
import { ProjectsChangeListener } from "./listener/projects-change";

export class Projects {
    private static instance: Projects;
    private projects: Project[] = [];
    private listeners: ProjectsChangeListener[] = [];

    private constructor() { }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Projects();
        }
        return this.instance;
    }

    addProject(projectTitle: string, projectDesc: string, nrOfPeople: number): number {
        const project = new Project(this.projects.length, projectTitle, projectDesc, nrOfPeople);
        this.projects.push(project);
        this.fireProjectsChanged();
        return project.id;
    }

    changeProjectStatus(id: number, newType: ProjectStatus): void {
        let p = this.projects.filter(p => { return p.id === id })[0];
        if (p) {
            p.projectStatus = newType;
        }
        this.fireProjectsChanged();
    }

    getProjects() {
        return this.projects.slice();
    }

    addProjectsChangeListener(l: ProjectsChangeListener) {
        this.listeners.push(l);
    }

    fireProjectsChanged() {
        this.listeners.forEach(l => {
            l.projectsChanged();
        })
    }
}