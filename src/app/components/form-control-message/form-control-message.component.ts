import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'form-control-message',
  templateUrl: './form-control-message.component.html',
  styleUrls: ['./form-control-message.component.scss']
})
export class FormControlMessageComponent implements OnInit {

  constructor() { }

  @Input() group;
  @Input() config;

  ngOnInit() {
  }

  getErrorMessage(control: FormControl, validationConfig: any[]) {
    let message;
    let priority = Infinity;
    validationConfig.forEach(validation => {
      if (validation.function(control)) {
        if ((validation.priority !== undefined && validation.priority < priority) || message === undefined) {
          message = validation.message;
          priority = validation.priority !== undefined ? validation.priority : Infinity;
        }
      }
    });
    return message;
  }
  getValue() {
    return this.group.controls[this.config.name].value ? this.group.controls[this.config.name].value : '';

  }
}
