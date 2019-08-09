import { Injectable, EventEmitter } from '@angular/core';

 
  @Injectable({
  providedIn: 'root'
})
export class  Service {
    checksite = new EventEmitter<any>();
    fullScreen = new EventEmitter<any>();
   
}
