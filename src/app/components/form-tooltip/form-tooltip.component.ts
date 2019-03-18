import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'form-tooltip',
  templateUrl: './form-tooltip.component.html',
  styleUrls: ['./form-tooltip.component.scss']
})
export class FormTooltipComponent implements OnInit {

  @Input() title:string;
  @Input() icon:string;
  @Input() idTooltip:string;
  
  constructor() { }

  ngOnInit() {
  }

}
