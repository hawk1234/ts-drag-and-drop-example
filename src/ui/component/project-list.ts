import { ApplicationComponent } from './application-component';
import { ProjectItem } from './project-item';
import { Autobind } from '../../decorator/autobind';
import { ProjectStatus } from '../../model/project-status';
import { Projects } from '../../model/projects';
import { ProjectsChangeListener } from '../../model/listener/projects-change';
import * as dnd from '../../dnd/dnd-support';

export class ProjectList extends ApplicationComponent<HTMLElement> implements dnd.DragTarget, ProjectsChangeListener {
    private static readonly PROJECT_LIST_ID = 'project-list';
    private static readonly PROJECT_ID_PREFIX = 'project-';

    private projectItems: Array<ProjectItem> = [];

    constructor(id: string, parent: HTMLElement, private listTitle: string, private projectStatus: ProjectStatus) {
        super(id, ProjectList.PROJECT_LIST_ID, parent);
        this.getDivElement().addEventListener('dragover', this.dragOverHandler);
        this.getDivElement().addEventListener('dragleave', this.dragLeaveHandler);
        this.getDivElement().addEventListener('drop', this.dropHandler);
    }

    @Autobind
    dragLeaveHandler(_event: DragEvent): void {
        this.getDivElement().querySelector('ul')!.classList.remove('droppable');
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer &&
            event.dataTransfer.types.indexOf(ProjectItem.PROJECT_ID_TYPE) !== -1) {

            event.preventDefault();
            event.dataTransfer!.dropEffect = 'move';
            this.getDivElement().querySelector('ul')!.classList.add('droppable');
        }
    }

    @Autobind
    dropHandler(event: DragEvent): void {
        const projectId = +event.dataTransfer!.getData(ProjectItem.PROJECT_ID_TYPE);
        Projects.getInstance().changeProjectStatus(projectId, this.projectStatus);
    }

    projectsChanged() {
        this.render();
    }

    protected renderInternal(): void {
        this.projectItems = [];

        this.getDivElement().appendChild(this.cloneTemplate());
        this.getDivElement().querySelector('h2')!.innerText = this.listTitle;
        const ul = this.getDivElement().querySelector('ul')!;
        Projects.getInstance().getProjects()
            .filter(p => { return p.projectStatus === this.projectStatus; })
            .forEach(p => {

                const pItem = new ProjectItem(ProjectList.PROJECT_ID_PREFIX + p.id, ul, p);
                this.projectItems.push(pItem);
                pItem.render();
            });
    }
}