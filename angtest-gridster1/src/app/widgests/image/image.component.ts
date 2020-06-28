import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  constructor(public dashboardService: DashboardService) { }

  @Input()
  widget;
  @Input()
  resizeEvent: EventEmitter<any>;
  resizeSub: Subscription;
  // tslint:disable-next-line: ban-types
  public idvalue: Number;


  ngOnInit() {
     // tslint:disable-next-line: max-line-length
     if (this.dashboardService.currentdashboard.widgets.length > 0 && this.dashboardService.currentdashboard.widgets[this.dashboardService.kendocount] !=  null) {
      this.idvalue =  Number(this.dashboardService.currentdashboard.widgets[this.dashboardService.kendocount].id);
      this.dashboardService.kendocount = this.dashboardService.kendocount + 1 ;
    } else if (this.dashboardService.currentdashboard.widgets.length === 0 ) {
      this.idvalue = 1;
    } else {
    // tslint:disable-next-line: max-line-length
      this.idvalue =  Number(this.dashboardService.currentdashboard.widgets[this.dashboardService.currentdashboard.widgets.length - 1].id);
    }

     this.resizeSub = this.resizeEvent.subscribe((widget) => {
      if (widget === this.widget) {      }
    });
  }


  saveImage(imageInput: any, id: string, $event) {
    const me = this;

    const imageFile: File = imageInput.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    console.log('save image');
    reader.onload = function() {
      console.log(reader.result);
      me.dashboardService.IDModelDictionary.set(id, reader.result.toString());
      console.log(me.dashboardService.IDModelDictionary);
    };
  }
}
