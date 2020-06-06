import { User } from './user.model';
import { Widget } from './widget.model';
import { Textbox } from './textbox.model';

export class Dashboard {
    id: string;
    name: string;
    user: User;
    widgets: Array<Widget>;
}
