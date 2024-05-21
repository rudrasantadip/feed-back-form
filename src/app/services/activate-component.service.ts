import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateComponentService {

  constructor() { }

  private dataSubject = new BehaviorSubject<number>(-1);
  currentComponent$ = this.dataSubject.asObservable();

  updateComponent(newComponent:number)
  {
    this.dataSubject.next(newComponent);
  }
}
