import { Injectable, InjectionToken, Inject } from '@angular/core';

export interface Dependency {
    property: any;
}

export const DEPENDENCY_SERVICE = new InjectionToken<Dependency>('DEPENDENCY_SERVICE');


@Injectable()
export class DependencyService {
    constructor(@Inject(DEPENDENCY_SERVICE) dependency: Dependency ){
        console.log('[dependency] ', dependency);
    }
}