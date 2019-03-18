import { FieldConfig } from '../../models/field-config.interface';
import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[amountField]'
})
export class AmountFieldDirective {

  private readonly element: HTMLInputElement;
  private abstractControl: AbstractControl;
  @Input() config: FieldConfig;
  @Input() group: FormGroup;
  @Input() length = 8;
  @Input() decimalCount = 2;
  @Input() decimalDelimiter = '.';
  @Input() thousandDelimiter = ',';
  @Input() currencySign = '$';
  @Input() valueMasked = '';
  pattern = /^[0-9.]*$/;
  carret: number;

  allowedKeys: Array<number> = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];

  constructor(ref: ElementRef) {
    this.element = ref.nativeElement;
  }

  ngOnInit() {
    this.abstractControl = this.group.controls[this.config.name];
  }

  @HostListener('keydown', ['$event']) validations(event: any) {

    this.carret = this.element.selectionStart;
    if (!this.validateAllowedKeys(event)) {
      this.validateDecimal(event);
      this.validatePattern(event);
      this.validateLength(event);
    } else {
      this.validateBackspace(event);
    }
  }

  validateAllowedKeys(event): boolean {
    let isAllowedKey = false;
    this.allowedKeys.forEach(value => {
      if (event.keyCode === value) {
        isAllowedKey = true;
      }
    });
    return isAllowedKey;
  }

  validateDecimal(event) {
    if (event.target.value.includes(this.decimalDelimiter)) {
      if (event.key === this.decimalDelimiter) {
        event.preventDefault();
      } else {
        if (event.target.value.split(this.decimalDelimiter)[1].length === this.decimalCount &&
          event.target.selectionStart > event.target.value.length - 3) {
          event.preventDefault();
        }
      }
    }
  }

  validatePattern(event) {
    if (!this.pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  validateLength(event) {
    const valueSplitted = event.target.value.split(this.decimalDelimiter);
    const length = valueSplitted[0].replace(/[^0-9]/g, '').length;
    if (length >= this.length) {
      if (event.key === this.decimalDelimiter && event.target.selectionStart >= event.target.value.length - this.decimalCount) {
        return;
      }
      if (valueSplitted[1] !== undefined) {
        if (event.target.selectionStart - valueSplitted[1].length >= valueSplitted[0].length) {
          return;
        }
      }
      event.preventDefault();
    }
  }

  validateBackspace(event) {
    if (event.keyCode === 8) {
      const deletedChar = event.target.value.substring(event.target.selectionStart - 1, event.target.selectionStart);
      if (deletedChar === this.decimalDelimiter) {
        this.abstractControl.setValue(event.target.value.split(this.decimalDelimiter)[0] + this.decimalDelimiter, { emitEvent: true });
      }
      if (deletedChar === this.thousandDelimiter) {
        event.target.setSelectionRange(event.target.selectionStart - 1, event.target.selectionStart - 1);
      }
    }
  }


  @HostListener('keyup', ['$event']) ontextInput(event: any) {

    this.carret = event.target.selectionStart;

    this.valueMasked = this.addComma(event.target.value);
    this.abstractControl.setValue(this.valueMasked, { emitEvent: true });
    this.element.setSelectionRange(this.carret, this.carret);
  }


  addComma(value) {
    const splittedByDot = value.split(this.decimalDelimiter);
    const countCommas = value.split(this.thousandDelimiter).length;
    const replaced = splittedByDot[0].replace(/[^0-9.]/g, '');
    const splitted = replaced.split('');
    for (let i = replaced.length - 3; i > 0; i -= 3) {
      splitted.splice(i, 0, this.thousandDelimiter);
    }
    let returnValue = splitted.join('');
    if (splittedByDot[1] !== undefined) {
      returnValue += this.decimalDelimiter + splittedByDot[1].replace(/[^0-9.]/g, '').substring(0, this.decimalCount);

    }
    this.carret += returnValue.split(this.thousandDelimiter).length - countCommas;
    return returnValue;
  }

  @HostListener('blur', ['$event'])
  blurInput() {
    if (!this.config.readonly) {
      let splittedByDot = this.valueMasked.split(this.decimalDelimiter);
      if (splittedByDot[0] !== '0') {
        for (let i = 0; i < splittedByDot[0].length; i++) {
          if (this.valueMasked.charAt(0) === '0') {
            this.valueMasked = this.valueMasked.substring(1, this.valueMasked.length);
          } else if (this.valueMasked.charAt(0) === this.thousandDelimiter && this.valueMasked.charAt(1) === '0') {
            this.valueMasked = this.valueMasked.substring(2, this.valueMasked.length);
          }
        }
      }
      splittedByDot = this.valueMasked.split(this.decimalDelimiter);
      if (splittedByDot[0] === '') {
        if (splittedByDot[1] === undefined) {
          return;
        }
        this.valueMasked = '0' + this.valueMasked;
      }
      if (splittedByDot[1] === undefined) {
        this.valueMasked += this.decimalDelimiter;
        splittedByDot = this.valueMasked.split(this.decimalDelimiter);
      }
      while (splittedByDot[1].length < this.decimalCount) {
        this.valueMasked += '0';
        splittedByDot = this.valueMasked.split(this.decimalDelimiter);
      }
      this.abstractControl.setValue(this.currencySign + this.valueMasked, { emitEvent: true });
    }
  }

}
