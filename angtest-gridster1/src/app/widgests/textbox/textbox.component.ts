import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Textbox } from 'src/app/models/textbox.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {
  public val: string;
  public txtbox : Textbox ;
  @Input()
  widget;
  @Input()
  resizeEvent: EventEmitter<any>;
  resizeSub: Subscription;
  constructor() { this.txtbox = new Textbox();
    this.txtbox.v = '';}
  ngOnInit() {
    this.resizeSub = this.resizeEvent.subscribe((widget) => {
      if (widget === this.widget) {
        console.log(widget);
      }
    });
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.resizeSub.unsubscribe();
  }

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    this.txtbox.v = searchValue;
    console.log('this is ' + this.txtbox.v);
  }


}
