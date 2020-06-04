import { Component, OnInit, EventEmitter } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { GridsterConfig, GridsterItem, DisplayGrid } from 'angular-gridster2';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { KendoComponent } from '../kendo/kendo.component';
import { User } from 'src/app/models/user.model';
import { Example1Component } from 'src/app/widgets/example1/example1.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }
  public options: GridsterConfig;
  public dashboard: Array<GridsterItem>;
  private resizeEvent: EventEmitter<any> = new EventEmitter<any>();
  private configureEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public showConfig = false;

  public inputs = {
    widget: '',
    resizeEvent: this.resizeEvent,
    configureEvent: this.configureEvent
  };
  public outputs = {
    onSomething: (type) => alert(type)
  };

  ngOnInit() {
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
    this.dashboard = this.dashboardService.getUserDashBoards(user)[0].widgets;
  }
  changedOptions() {
    this.options.api.optionsChanged();
  }

  public onClick_removeItem($event, item): void {
   $event.preventDefault();
   $event.stopPropagation();
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
   this.dashboard = this.dashboardService.getUserDashBoards(user)[0].widgets;
 }

 public onClick_LoadUserDashboard2(): void {
   const user = new User();
   user.id = '123';
   this.dashboard = this.dashboardService.getUserDashBoards(user)[1].widgets;
 }

  public onClick_AddChartWidget(): void {
    this.dashboard.push({
     id: '3',
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
   this.dashboard.push({
     id: '1',
     name: 'Nomination List',
     componentName: 'kendo-widget',
     componentType: KendoComponent,
     cols: 2,
     rows: 1,
     y: 0,
     x: 0,
   });
 }


 public onClick_SaveUserDashboardsToLocalStorage(): void {
   const user = new User();
   user.id = '123';
   this.dashboardService.saveUserDashBoards(user);
 }

}
