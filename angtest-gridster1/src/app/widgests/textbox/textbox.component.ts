import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Textbox } from 'src/app/models/textbox.model';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {
  public val: string;
  public txtbox : Textbox ;
  @Input()
  widget;
  @Input()
  resizeEvent: EventEmitter<any>;
  resizeSub: Subscription;
  constructor(public dashboardService: DashboardService) { this.txtbox = new Textbox();
    this.txtbox.v = '';}
  ngOnInit() {
    this.resizeSub = this.resizeEvent.subscribe((widget) => {
      if (widget === this.widget) {
        console.log(widget);
      }
    });
    if (this.dashboardService.currentdashboard[0].widgets.length > 0 && this.dashboardService.currentdashboard[0].widgets[this.dashboardService.kendocount] !=  null) {
      this.dashboardService.kendocount = this.dashboardService.kendocount + 1 ;
    }
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.resizeSub.unsubscribe();
  }

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    this.txtbox.v = searchValue;
    console.log('this is ' + this.txtbox.v);
  }


}
