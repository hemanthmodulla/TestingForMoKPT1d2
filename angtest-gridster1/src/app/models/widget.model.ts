import { Type } from '@angular/compiler';

export class Widget {
    id: string;
  name: string;
  componentName: string;
  // tslint:disable-next-line: ban-types
  componentType: Object;
  cols: number;
  rows: number;
  y: number;
  x: number;
  // tslint:disable-next-line: ban-types
  model: Object;
}
