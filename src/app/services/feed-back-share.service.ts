import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeedBack } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedBackShareService {

  constructor() { }

  //default initialization
  feedback:FeedBack={
    emailAddress: '',
    eventName: '',
    likedManagement: false,
    likedOrganization: false,
    likedValueAddition: false,
    contentRating: 0,
    managementRating: 0,
    informationRating: 0
  }

  private dataSubject = new BehaviorSubject<FeedBack>(this.feedback);
  currentFeedback$ = this.dataSubject.asObservable();

  updateFeedback(newFeedback:FeedBack)
  {
    this.dataSubject.next(newFeedback);
  }
}
