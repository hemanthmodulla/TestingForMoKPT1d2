import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Textbox } from 'src/app/models/textbox.model';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})

export class TextboxComponent implements OnInit {
  public val: string;
  public txtbox: Textbox ;
  public idvalue: Number;
  selectedFile: ImageSnippet;

  @Input()
  widget;
  @Input()
  resizeEvent: EventEmitter<any>;
  resizeSub: Subscription;
  constructor(public dashboardService: DashboardService) { this.txtbox = new Textbox();
                                                           this.txtbox.v = ''; }
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
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.resizeSub.unsubscribe();
  }

  onSearchChange(searchValue: string): void {
    this.txtbox.v = searchValue;
  }

  saveImage(imageInput: any, id: string, $event) {
    let me = this;

    const imageFile: File = imageInput.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    console.log('save image');
    reader.onload = function () {
      console.log(reader.result);
      me.dashboardService.IDModelDictionary.set(id, reader.result.toString());
      console.log(me.dashboardService.IDModelDictionary);

    };
    
  }

}
