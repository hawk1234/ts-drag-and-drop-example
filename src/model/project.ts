import { ProjectStatus } from "./project-status";

export class Project {

    private _projectStatus: ProjectStatus;

    constructor(
        private _id: number,
        private _projectTitle: string,
        private _projectDesc: string,
        private _nrOfPeople: number,
    ) {
        this._projectStatus = ProjectStatus.ACTIVE;
    };

    get id() {
        return this._id;
    }

    get projectTitle() {
        return this._projectTitle;
    }

    get projectDesc() {
        return this._projectDesc;
    }

    get nrOfPeople() {
        return this._nrOfPeople;
    }

    get projectStatus() {
        return this._projectStatus;
    }

    set projectStatus(newStatus) {
        this._projectStatus = newStatus;
    }
}