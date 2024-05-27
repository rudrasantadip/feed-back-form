import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  private dataSubject = new BehaviorSubject<boolean>(false);
  isVerified$ = this.dataSubject.asObservable();

  updateVerification(value:boolean)
  {
    this.dataSubject.next(value);
  }
  constructor() { }
}
