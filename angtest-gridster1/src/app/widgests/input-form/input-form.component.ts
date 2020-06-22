import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetCommunicationService } from 'src/app/services/widget-communication.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  @Input()
  widget;
  @Input()
  resizeEvent: EventEmitter<any>;
  private resizeSub$: Subscription;
  public selectedNomination: any;
  private widgetCommunicationServiceSubscription$: Subscription;

  constructor(
    private ref: ChangeDetectorRef,
    private widgetCommunicationService: WidgetCommunicationService) { }

  ngOnInit() {
    this.resizeSub$ = this.resizeEvent.subscribe((widget) => {
      if (widget === this.widget) {
      }
    });

    this.widgetCommunicationServiceSubscription$ = this.widgetCommunicationService.data.subscribe(newNomination => {
      this.selectedNomination = null;
      if (newNomination) {
        this.selectedNomination = newNomination;
        this.ref.detectChanges();
      }
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.resizeSub$.unsubscribe();
    this.widgetCommunicationServiceSubscription$.unsubscribe();
  }

}
