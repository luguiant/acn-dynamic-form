
import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { InputConfig } from '../../config/inputs.config';



@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {

  @Input() config: FieldConfig;

  @Input() group: FormGroup;

  component: ComponentRef<Field>;
  
  public components: { [type: string]: Type<Field> } = {};

  constructor(
    private readonly resolver: ComponentFactoryResolver,
    private readonly container: ViewContainerRef,
    private readonly configInputs: InputConfig
  ) {
    this.components = {
      ...this.configInputs[0].typesInput
    } 
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!this.components[this.config.type]) {
      const supportedTypes = Object.keys(this.components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    Promise.resolve().then(
      () => {
        const component = this.resolver.resolveComponentFactory<Field>(this.components[this.config.type]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
      }
    );
  }

}
