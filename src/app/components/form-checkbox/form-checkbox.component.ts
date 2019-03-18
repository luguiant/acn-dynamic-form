import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss']
})
export class FormCheckboxComponent implements OnInit {

  @Input() group;
  @Input() config;

  constructor() {
  }

  ngOnInit() {
  }


}
