import { Component, OnInit, Input, EventEmitter, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit  {

  @Input()
  widget;
  @Input()
  resizeEvent: EventEmitter<any>;
  resizeSub: Subscription;
  public imagePath;
  // tslint:disable-next-line: ban-types
  public idvalue: Number;
  imgURL: any;
  imageVal: Blob;
  public message: string;
  constructor(public dashboardService: DashboardService) {
    if (this.dashboardService.IDModelDictionary != null) {
      this.imageVal = new Blob([this.dashboardService.IDModelDictionary.get(this.dashboardService.idVal.toString())]);
 }

   }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    if (this.dashboardService.currentdashboard.widgets.length > 0 && this.dashboardService.currentdashboard.widgets[this.dashboardService.kendocount] !=  null) {
      this.idvalue =  Number(this.dashboardService.currentdashboard.widgets[this.dashboardService.kendocount].id);
      let reader = new FileReader();
      this.dashboardService.kendocount = this.dashboardService.kendocount + 1 ;
      reader.readAsDataURL(this.imageVal);
      this.imgURL = reader.result;

    } else if (this.dashboardService.currentdashboard.widgets.length === 0 ) {
      this.idvalue = 1;
    } else {

    // tslint:disable-next-line: max-line-length
    this.idvalue =  Number(this.dashboardService.currentdashboard.widgets[this.dashboardService.currentdashboard.widgets.length - 1].id);
    }
    this.resizeSub = this.resizeEvent.subscribe((widget) => {
      if (widget === this.widget) {
      }
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.resizeSub.unsubscribe();
  }
  preview(files , id: string) {
    if (files.length === 0) {
      return;
    }

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    let reader = new FileReader();
    this.imagePath = files;
    this.dashboardService.IDModelDictionary.set(id, files[0]);
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

}
