import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Dashboard } from '../models/dashboard.model';
import { DashboardOptions } from '../models/dashboard-options.model';
import { KendoComponent } from '../widgests/kendo/kendo.component';
import { BarChartComponent } from '../widgests/bar-chart/bar-chart.component';
import { InputFormComponent } from '../widgests/input-form/input-form.component';
import { Widget } from '../models/widget.model';
import { GridType, CompactType } from 'angular-gridster2';
import { Textbox } from '../models/textbox.model';
import { TextboxComponent } from '../widgests/textbox/textbox.component';
import { TSMap } from 'typescript-map';
import { WidgetToList } from '../models/widget-to-list.model';
import { HttpClient } from '@angular/common/http';

interface IDashboardService {
  getUserDashBoards(user: User): Array<Dashboard>;
  saveUserDashBoards(user: User): void;
  getDashBoardOptions(): DashboardOptions;
}
@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private userDashboards: Map<string, Array<Dashboard>> = new Map<string, Array<Dashboard>>();
  IDModelDictionary = new Map<string, any>();
  public idVal = 0;
  private defaultUser: User;
  public currentdashboard = Array<Dashboard>();
  public dahboardsFromsave = Array<Dashboard>();

  textboxval = '';
  kendocount = 0;
  constructor(private http: HttpClient) {
    this.loadDashBoards();
   }

   private loadDashBoards(): void {
     console.log('yooo');
     this.defaultUser = new User();
     this.defaultUser.id = '123';
     if (localStorage.getItem(this.defaultUser.id) ) {
      if (localStorage.getItem('dictionary1') ) {
        const jsonObject2 = JSON.parse(localStorage.getItem('dictionary1'));
        const map = new Map<string, string>();
        // tslint:disable-next-line: forin
        for (const value in jsonObject2) {
            map.set(value, jsonObject2[value]);
            }
        this.IDModelDictionary = map;
      }
      const savdDashboards = localStorage.getItem(this.defaultUser.id);
      const dashboards = JSON.parse(savdDashboards) as Array<Dashboard>;
      this.currentdashboard = dashboards;
      dashboards.forEach((dashboard: Dashboard) => {
        dashboard.widgets.forEach((widget: Widget) => {
          if (widget.componentName === 'kendo-widget') {
            widget.componentType = KendoComponent;
            this.idVal = Number(widget.id);
          }
          if (widget.componentName === 'input-form') {
            widget.componentType = InputFormComponent;
            this.idVal = Number(widget.id);
          }
          if (widget.componentName === 'bar-chart') {
            widget.componentType = BarChartComponent;
            this.idVal = Number(widget.id);
          }
          if (widget.componentName === 'textbox') {
            widget.componentType = TextboxComponent;
            this.idVal = Number(widget.id);
          }
          // if (widget.componentName === "operator-widget") {
          //   widget.componentType = OperatorWidgetComponent;
          // }
        });
      });
      this.userDashboards.set(this.defaultUser.id, dashboards);
    } else {
      const dashBoards = new Array<Dashboard>();
      dashBoards.push({
      id: '1', name: 'dashboard-1', user: this.defaultUser, widgets: [
        {
          id: '1',
          name: 'Nomination List',
          componentName: 'kendo-widget',
          componentType: KendoComponent,
          cols: 2,
          rows: 1,
          y: 0,
          x: 0,
          model: this.textboxval,
        },
        {
          id: '2',
          name: 'Edit Nomination',
          componentName: 'input-form',
          componentType: InputFormComponent,
          cols: 2,
          rows: 1,
          y: 0,
          x: 2,
          model: new Textbox(),
        },
        {
          id: '3',
          name: 'Chart',
          componentName: 'bar-chart',
          componentType: BarChartComponent,
          cols: 2,
          rows: 2,
          y: 0,
          x: 0,
          model: new Textbox(),
        },
        {
          id: '4',
          name: 'textbox',
          componentName: 'textbox',
          componentType: TextboxComponent,
          cols: 2,
          rows: 1,
          y: 0,
          x: 0,
          model:  {v: 'hhh'} as Textbox,
        }
      ]
      });

      this.userDashboards.set(this.defaultUser.id, dashBoards);
    }
  }

  public getUserDashBoards(user: User): Array<Dashboard> {
    return this.userDashboards.get(user.id);
  }

  public saveUserDashBoards(user: User): void {
    localStorage.setItem(user.id, JSON.stringify(this.userDashboards.get(user.id)));
    console.log('From save');
    this.dahboardsFromsave = this.userDashboards.get(user.id);
    const data = this.dahboardsFromsave.map(x => x.widgets)[0];

    let dummy = data.map(item => new WidgetToList(item, user.id ));
    this.http.post('http://localhost:5000/api' + '/Widget', dummy, { observe: 'response' }).subscribe();

    console.log(dummy);
    // console.log(this.userDashboards.get(user.id));
    // console.log('this is value from textbox : ' + this.textboxval);
  }

  public getDashBoardOptions(): DashboardOptions {
    return {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 1000,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: true,
        dragHandleClass: 'drag-handler',
        dropOverItems: false
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid() {},
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
      itemChangeCallback() {},
      itemResizeCallback() {}
     };
  }
}
