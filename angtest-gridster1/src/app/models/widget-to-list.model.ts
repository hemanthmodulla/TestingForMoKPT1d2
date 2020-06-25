import { Widget } from './widget.model';

export class WidgetToList {
    UserID: string;
    id: string;
    name: string;
    componentName: string;
    cols: number;
    rows: number;
    y: number;
    x: number;
    // tslint:disable-next-line: ban-types
    model: string;

    constructor(item: Widget , userid : string)
    {
        this.UserID = userid;
        this.id = item.id;
        this.name = item.name;
        this.componentName = item.componentName;
        this.cols = item.cols;
        this.rows = item.rows;
        this.y = item.y;
        this.x = item.x;
        this.model = '';
    }
}
