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
      console.log(this.imageVal);
      console.log('after constructor');
 }

   }

  ngOnInit() {
    console.log('chart-----');
    console.log(this.dashboardService.currentdashboard[0].widgets.length);
    console.log(this.dashboardService.currentdashboard[0].widgets[this.dashboardService.kendocount] !=  null);


    // tslint:disable-next-line: max-line-length
    if (this.dashboardService.currentdashboard[0].widgets.length > 0 && this.dashboardService.currentdashboard[0].widgets[this.dashboardService.kendocount] !=  null) {
      console.log('after kendo count');
      console.log(this.dashboardService.currentdashboard[0].widgets[this.dashboardService.kendocount]);
      this.idvalue =  Number(this.dashboardService.currentdashboard[0].widgets[this.dashboardService.kendocount].id);
      console.log( this.idvalue);
      let reader = new FileReader();
      this.dashboardService.kendocount = this.dashboardService.kendocount + 1 ;
     
      reader.readAsDataURL(this.imageVal);
      console.log('uuuuuuuuuuuu');
      this.imgURL = reader.result;
      console.log(reader);
      console.log('tttttttttttttt');

    } else {

    // tslint:disable-next-line: max-line-length
    this.idvalue =  Number(this.dashboardService.currentdashboard[0].widgets[this.dashboardService.currentdashboard[0].widgets.length - 1].id);
    }
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
    console.log(files[0]);
    this.dashboardService.IDModelDictionary.set(id, files[0]);
    console.log(this.dashboardService.IDModelDictionary);
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

}
