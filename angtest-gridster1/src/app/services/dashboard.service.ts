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
  private userDashboards: Map<string, Dashboard> = new Map<string, Dashboard>();
  IDModelDictionary = new Map<string, any>();
  public idVal = 0;
  readonly rootUrl = 'http://localhost:5000/api/';
  private defaultUser: User;
  public currentdashboard = new Dashboard();
  public dahboardFromSave = new Dashboard ();
  public dummy = new Array<Widget>();

  textboxval = '';
  kendocount = 0;
  constructor(private http: HttpClient) {
    // this.loadDashBoards();
   }

   public loadDashBoards(): Promise<void | Widget[]> {
     console.log('initialize Load Dashboards method');
     this.defaultUser = new User();
     this.defaultUser.id = '123';
     localStorage.clear();
    //  if (localStorage.getItem('dictionary1') ) {
    //     const jsonObject2 = JSON.parse(localStorage.getItem('dictionary1'));
    //     const map = new Map<string, string>();
    //     // tslint:disable-next-line: forin
    //     for (const value in jsonObject2) {
    //         map.set(value, jsonObject2[value]);
    //     }
    //     this.IDModelDictionary = map;
    //   }
     const dashBoards = new Dashboard();
     dashBoards.id = '1';
     dashBoards.name = 'dashboard-1';
     dashBoards.user = this.defaultUser;
     dashBoards.widgets = new Array<Widget>();
     console.log('get stuff from service');
     console.log(this.defaultUser.id);
      ////////////// change here
     return (this.http.get<Widget[]>('http://localhost:5000/api/Widget', {
        params: {
          id: this.defaultUser.id,
        },
      }).toPromise().then(x => {
        console.log('Hit Dashboard comp then');
        this.dummy = x;
        console.log(this.dummy);
        dashBoards.widgets = x;
        for (let i = 0; i < dashBoards.widgets.length; i++) {
          console.log(dashBoards.widgets[i]);
          this.IDModelDictionary.set(dashBoards.widgets[i].id, dashBoards.widgets[i].model);
          
        }
        console.log(this.IDModelDictionary)
        this.currentdashboard = dashBoards;
        dashBoards.widgets.forEach((widget: Widget) => {
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
        this.userDashboards.set(this.defaultUser.id, dashBoards);
      }));

      // const savdDashboards = localStorage.getItem(this.defaultUser.id);
      // this.http.get(this.rootUrl + 'widget').subscribe(data => {});
      // const dashboards = JSON.parse(savdDashboards) as Dashboard;

  }

  public getUserDashBoards(user: User): Dashboard {
    return this.userDashboards.get(user.id);
  }

  public saveUserDashBoards(user: User): void {
    // localStorage.setItem(user.id, JSON.stringify(this.userDashboards.get(user.id)));

    // used to save widgets[] to database
    this.dahboardFromSave = this.userDashboards.get(user.id);
    console.log('From Save');
    console.log(this.dahboardFromSave);
    const du = new WidgetToList(this.dahboardFromSave.widgets[0], user.id );


    const dataToSave = this.dahboardFromSave.widgets.map(item => new WidgetToList(item, user.id ));
    console.log(dataToSave);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < dataToSave.length; i++) {
      this.IDModelDictionary.forEach((value, key) => {

        if ( dataToSave[i].id.toString() === key.toString()) {
          
          dataToSave[i].model = value;
        }

        // this.dashboardService.updateModel(user.id,key,value);
    });

    }

    this.http.post('http://localhost:5000/api' + '/Widget', dataToSave, { observe: 'response' }).subscribe();
  }

  // public updateModel(userid: string, widgetid:string, modelinfo: string){
  //   let completeModel: ModelInfo;
  //   completeModel = new ModelInfo();
  //   console.log(userid);
  //   console.log(widgetid);
  //   console.log(modelinfo);
  //   completeModel.userID = userid;
  //   completeModel.widgetID = widgetid;
  //   completeModel.modelInfo = modelinfo;
  //   console.log('update model');
  //   console.log(completeModel);

  //   this.http.put('http://localhost:5000/api/Widget/1', completeModel)
  // }

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
