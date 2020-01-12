import { ApplicationComponent } from './application-component';
import { Autobind } from '../../decorator/autobind';
import { Project } from '../../model/project';
import * as dnd from '../../dnd/dnd-support';

export class ProjectItem extends ApplicationComponent<HTMLElement> implements dnd.Dragable {
    public static readonly PROJECT_ID_TYPE = 'project-id';
    private static readonly SINGLE_PROJECT_DESC_ID = 'single-project';

    constructor(id: string, parent: HTMLElement, private project: Project) {
        super(id, ProjectItem.SINGLE_PROJECT_DESC_ID, parent);
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.effectAllowed = 'move';
        event.dataTransfer!.setData(ProjectItem.PROJECT_ID_TYPE, this.project.id.toString())
    }

    dragEndHandler(_: DragEvent): void {
        //do nothing
    }

    protected renderInternal(): void {
        const singleProjectEl = this.cloneTemplate();
        const liEl = singleProjectEl.querySelector('li')!;
        liEl.addEventListener('dragstart', this.dragStartHandler);
        liEl.addEventListener('dragend', this.dragEndHandler);
        liEl.querySelector('h2')!.innerText = "Title: " + this.project.projectTitle;
        liEl.querySelector('h3')!.innerText = "Number of participants: " + this.project.nrOfPeople;
        liEl.querySelector('p')!.innerText = "Description: " + this.project.projectDesc;
        this.getDivElement().appendChild(liEl);
    }
}