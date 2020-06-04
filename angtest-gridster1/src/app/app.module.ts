import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { PopupModule } from '@progress/kendo-angular-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridsterModule } from 'angular-gridster2';
import { DynamicModule } from 'ng-dynamic-component';
import { DashboardComponent } from './widgests/dashboard/dashboard.component';
import { BarChartComponent } from './widgests/bar-chart/bar-chart.component';
import { KendoComponent } from './widgests/kendo/kendo.component';
import { InputFormComponent } from './widgests/input-form/input-form.component';
import { DashboardService } from './services/dashboard.service';
import { WidgetCommunicationService } from './services/widget-communication.service';
import { Example1Component } from './widgets/example1/example1.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BarChartComponent,
    KendoComponent,
    InputFormComponent,
    Example1Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    GridsterModule,
    ButtonsModule,
    GridModule,
    ChartsModule,
    DropDownsModule,
    DialogModule,
    NotificationModule,
    DatePickerModule,
    PopupModule,
    // tslint:disable-next-line: deprecation
    DynamicModule.withComponents([KendoComponent, InputFormComponent, BarChartComponent])
  ],
  exports: [
    DashboardComponent,
    KendoComponent,
    InputFormComponent,
    BarChartComponent
  ],
  providers: [
    DashboardService,
    WidgetCommunicationService
  ],
  entryComponents:[
    BarChartComponent,
    KendoComponent,
    InputFormComponent,
    Example1Component
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
