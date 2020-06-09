import { Component, OnInit, Input, EventEmitter, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges  {

  @Input()
  widget;
  @Input()
  resizeEvent: EventEmitter<any>;
  resizeSub: Subscription;

  constructor() { }

  ngOnChanges() {
    console.log( this.resizeSub);
    this.resizeSub = this.resizeEvent.subscribe((widget) => {
      if (widget === this.widget) {
        console.log(widget);
      }
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.resizeSub.unsubscribe();
  }

}
