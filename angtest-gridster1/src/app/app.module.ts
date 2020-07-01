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
import { KendoComponent } from './widgests/kendo/kendo.component';
import { InputFormComponent } from './widgests/input-form/input-form.component';
import { DashboardService } from './services/dashboard.service';
import { WidgetCommunicationService } from './services/widget-communication.service';
import { Example1Component } from './widgets/example1/example1.component';
import { TextboxComponent } from './widgests/textbox/textbox.component';

import { HttpClientModule } from '@angular/common/http';
import { CheckboxComponent } from './widgests/checkbox/checkbox.component';
import { ImageComponent } from './widgests/image/image.component';
import { EditComponent } from './widgests/edit/edit.component';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    KendoComponent,
    InputFormComponent,
    Example1Component,
    TextboxComponent,
    CheckboxComponent,
    ImageComponent,
    EditComponent,
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
    MatIconModule,
    HttpClientModule,
    // tslint:disable-next-line: deprecation
    DynamicModule.withComponents([KendoComponent, InputFormComponent,ImageComponent,CheckboxComponent]),
    BrowserAnimationsModule
  ],
  exports: [
    DashboardComponent,
    KendoComponent,
    InputFormComponent,
    ImageComponent,
    CheckboxComponent,
    MatIconModule
  ],
  providers: [
    DashboardService,
    WidgetCommunicationService
  ],
  entryComponents:[
    KendoComponent,
    InputFormComponent,
    Example1Component,
    TextboxComponent,
    CheckboxComponent,
    ImageComponent
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
