export abstract class ApplicationComponent<T extends HTMLElement> {
    private divEl: HTMLDivElement;

    constructor(id: string, private templateId: string, private parent: HTMLElement) {
        this.divEl = document.createElement('div');
        this.divEl.setAttribute('id', id);
    }

    protected setStyle(styleClass: string) {
        this.divEl.setAttribute('class', styleClass);
    }

    protected cloneTemplate(): T {
        const projectFormTemplate = document.getElementById(this.templateId) as HTMLTemplateElement;
        return projectFormTemplate.content.cloneNode(true) as T;
    }

    render(): void {
        //add new div representing this element if it not exist in the DOM
        if (!this.parent.querySelector('#' + this.divEl.getAttribute('id')!)) {
            //NOTE: this id might not be unique in the project but should be unique in the parent for this to work properly
            this.parent.appendChild(this.divEl);
        }
        //clear div conntents
        while (this.divEl.firstChild) {
            this.divEl.removeChild(this.divEl.firstChild);
        }
        //render updated contents
        this.renderInternal();
    }

    protected abstract renderInternal(): void;

    getDivElement() {
        return this.divEl;
    }
}