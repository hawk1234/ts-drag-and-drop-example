import { ApplicationComponent } from './application-component';
import { Projects } from '../../model/projects';

export class ProjectForm extends ApplicationComponent<HTMLFormElement> {
    private static readonly PROJECT_INPUT_FORM_ID = 'project-input';
    //ids that can be used in querySelector method to lookup for ids only within given element
    private static readonly PROJECT_TITLE_ID = '#title';
    private static readonly PROJECT_DESC_ID = '#description';
    private static readonly PROJECT_NR_OF_PEOPLE = '#people';

    constructor(id: string, parent: HTMLElement) {
        super(id, ProjectForm.PROJECT_INPUT_FORM_ID, parent);
        this.setStyle('user-input');
    }

    protected renderInternal(): void {
        this.getDivElement().appendChild(this.cloneTemplate());

        const formEl = this.getDivElement().querySelector('form')!;
        formEl.addEventListener('submit', (event) => {
            event.preventDefault();
            const projectTitle = (this.getDivElement().querySelector(ProjectForm.PROJECT_TITLE_ID)! as HTMLInputElement).value;
            const projectDesc = (this.getDivElement().querySelector(ProjectForm.PROJECT_DESC_ID)! as HTMLTextAreaElement).value;
            const nrOfPeople = (this.getDivElement().querySelector(ProjectForm.PROJECT_NR_OF_PEOPLE)! as HTMLInputElement).value;

            if (projectTitle.trim() && projectDesc.trim() && nrOfPeople.trim()) {
                Projects.getInstance().addProject(projectTitle, projectDesc, +nrOfPeople);
            } else {
                alert('Some of the required fields are empty');
            }
        });
    }
}