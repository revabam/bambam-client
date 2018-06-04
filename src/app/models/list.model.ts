export class ListModel {
    listName: string;
    listItems: string[];

    constructor(listName: string) {
        this.listName = listName;
        this.listItems = [];
    }
}
