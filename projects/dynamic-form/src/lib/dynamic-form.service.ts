import { Injectable, NgZone, Optional } from '@angular/core';
import { ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { InputConfig } from './config/inputs.config';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(
      @Optional() config: InputConfig, 
      private _ngZone: NgZone,
      private componentFactoryResolver: ComponentFactoryResolver
    ){
        if (config) {
          console.log(config);
        }
    }

    static getComponents(components: any[]): any[] {
        var tmp = Array();

        for (var i = 0; i < components.length; ++i){
            if (components[i].key == 0){
                tmp.push(components[i].component);
            }
        }

        return tmp;
    }

    load(container: ViewContainerRef, components: any[]): void {
        
        container.clear();
        for (var i = 0; i < components.length; ++i){
            if (components[i].key == 0 || components[i].key == 'site'){
                const childComponent = this.componentFactoryResolver.resolveComponentFactory( components[i].component );
                container.createComponent(childComponent);          
            }            
        }
    }
}
