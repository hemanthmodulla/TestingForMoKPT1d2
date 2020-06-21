import { Widget } from './widget.model';

export class WidgetToList {
    id: string;
    name: string;
    componentName: string;
    cols: number;
    rows: number;
    y: number;
    x: number;
    // tslint:disable-next-line: ban-types
    model: string;
    constructor(item: Widget) {
        this.id = item.id;
        this.name = item.name;
        this.componentName = item.componentName,
        this.cols = item.cols,
        this.rows = item.rows,
        this.y = item.y,
        this.x = item.x,
        this.model = '';
    }
}
