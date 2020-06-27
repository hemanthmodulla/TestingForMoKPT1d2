import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  public idvalue: Number;
  public checkedVal: string;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    if (this.dashboardService.currentdashboard.widgets.length > 0 && this.dashboardService.currentdashboard.widgets[this.dashboardService.kendocount] !=  null) {
      this.idvalue =  Number(this.dashboardService.currentdashboard.widgets[this.dashboardService.kendocount].id);
      this.dashboardService.kendocount = this.dashboardService.kendocount + 1 ;
    } else if (this.dashboardService.currentdashboard.widgets.length === 0 ) {
      this.idvalue = 1;
    } else {
    // tslint:disable-next-line: max-line-length
      this.idvalue =  Number(this.dashboardService.currentdashboard.widgets[this.dashboardService.currentdashboard.widgets.length - 1].id);
    }
  }
  doIfChecked($event, id: string)
  {
    console.log($event.target.checked);
    console.log(id);
    if ($event.target.checked) {
      this.checkedVal = 'checked';
    }
    else{
      this.checkedVal = 'unchecked';
    }
    this.dashboardService.IDModelDictionary.set(id, this.checkedVal);
  }
}
