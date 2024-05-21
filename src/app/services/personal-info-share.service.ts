import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonalInformation } from '../models/personalInfo';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoShareService {

  private dataSubject = new BehaviorSubject<PersonalInformation | null>(null)

  personalInfo$ = this.dataSubject.asObservable();


  updateInfo(information:PersonalInformation)
  {
    this.dataSubject.next(information);
  }
  constructor() { }
}
