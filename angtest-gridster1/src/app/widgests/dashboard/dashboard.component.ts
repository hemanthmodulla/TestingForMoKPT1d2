import { Component, OnInit, EventEmitter } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { GridsterConfig, GridsterItem, DisplayGrid } from 'angular-gridster2';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { KendoComponent } from '../kendo/kendo.component';
import { User } from 'src/app/models/user.model';
import { Example1Component } from 'src/app/widgets/example1/example1.component';
import { TextboxComponent } from '../textbox/textbox.component';
import { Textbox } from 'src/app/models/textbox.model';
import {HttpClient} from '@angular/common/http';
import { Widget } from 'src/app/models/widget.model';
import { WidgetToList } from 'src/app/models/widget-to-list.model';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private http: HttpClient) { }
  public options: GridsterConfig;
  public dashboard: Array<GridsterItem>;
  private resizeEvent: EventEmitter<any> = new EventEmitter<any>();
  private configureEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public showConfig = false;
  readonly rootUrl = 'http://localhost:5000/api/';
  widgetVal: any = [];
  public inputs = {
    widget: '',
    resizeEvent: this.resizeEvent,
    configureEvent: this.configureEvent

  };
  public outputs = {
    onSomething: (type) => alert(type)
  };
  isDataAvailable: boolean = false;
  ngOnInit() {
    console.log('Dashboard comp init');
    this.dashboardService.loadDashBoards().then(() => {
    this.isDataAvailable = true;
    console.log('From Dashboard comp' );
    console.log(this.isDataAvailable );
    this.options = this.dashboardService.getDashBoardOptions();
    this.options.displayGrid = DisplayGrid.OnDragAndResize;
    this.options.itemChangeCallback = (item) => {
      // update DB with new size
      // send the update to widgets
      this.resizeEvent.emit(item);
    };
    this.options.itemResizeCallback = (item) => {
      // update DB with new size
      // send the update to widgets
      this.resizeEvent.emit(item);
    };
    const user = new User();
    user.id = '123';
    this.dashboard = this.dashboardService.getUserDashBoards(user).widgets;
    // tslint:disable-next-line: radix
    this.dashboardService.idVal = parseInt(this.dashboard[this.dashboard.length - 1].id);});
  }
  changedOptions() {
    this.options.api.optionsChanged();
  }

  public onClick_removeItem($event, item): void {
   $event.preventDefault();
   $event.stopPropagation();
   this.dashboardService.IDModelDictionary.delete(item.id);
   this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  onClick_configureItem($event, item): void {
   $event.preventDefault();
   $event.stopPropagation();
   this.showConfig = !this.showConfig;
   this.configureEvent.emit(this.showConfig);
  }

  public onClick_LoadUserDashboard1(): void {
   const user = new User();
   user.id = '123';
   this.dashboard = this.dashboardService.getUserDashBoards(user).widgets;
 }

  public onClick_AddChartWidget(): void {
    this.dashboardService.idVal = this.dashboardService.idVal + 1;
    this.dashboardService.IDModelDictionary.set(this.dashboardService.idVal.toString(), '');
    this.dashboard.push({
     id: this.dashboardService.idVal.toString(),
     name: 'Chart',
     componentName: 'bar-chart',
     componentType: BarChartComponent,
     cols: 2,
     rows: 2,
     y: 0,
     x: 0,
   });

  }

  public onClick_AddNominationListWidget(): void {
    this.dashboardService.idVal = this.dashboardService.idVal + 1;
    this.dashboardService.IDModelDictionary.set(this.dashboardService.idVal.toString(), this.dashboardService.textboxval);
    this.dashboard.push({
     id: this.dashboardService.idVal.toString(),
     name: 'Nomination List',
     componentName: 'kendo-widget',
     componentType: KendoComponent,
     cols: 2,
     rows: 1,
     y: 0,
     x: 0,
     model: this.dashboardService.textboxval,

   });

 }

 public onClick_AddTextBox(): void {
  this.dashboardService.idVal = this.dashboardService.idVal + 1;
  this.dashboardService.IDModelDictionary.set(this.dashboardService.idVal.toString(), this.dashboardService.textboxval);
  this.dashboard.push({
    id: this.dashboardService.idVal.toString(),
    name: 'Text Box',
    componentName: 'textbox',
    componentType: TextboxComponent,
    cols: 2,
    rows: 1,
    y: 0,
    x: 0,
    model:  {v: 'hhh'} as Textbox,
  });

}

public onClick_AddCheckbox(): void {
  this.dashboardService.idVal = this.dashboardService.idVal + 1;
  this.dashboardService.IDModelDictionary.set(this.dashboardService.idVal.toString(), this.dashboardService.textboxval);
  this.dashboard.push({
    id: this.dashboardService.idVal.toString(),
    name: 'Check Box',
    componentName: 'checkbox',
    componentType: CheckboxComponent,
    cols: 2,
    rows: 1,
    y: 0,
    x: 0,
    model:  '',
  });

}


 public onClick_SaveUserDashboardsToLocalStorage(): void {
  const user = new User();
  if (localStorage.getItem('dictionary1') ) {
    localStorage.removeItem( 'dictionary1');
   }
  user.id = '123';
  this.dashboardService.saveUserDashBoards(user);
  const jsonObject = {};

  this.dashboardService.IDModelDictionary.forEach((value, key) => {
      jsonObject[key] = value;
      console.log(this.dashboardService.IDModelDictionary);
  });

  localStorage.setItem('dictionary1', JSON.stringify(jsonObject));
 }

}
