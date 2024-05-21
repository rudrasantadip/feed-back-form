import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedBack } from 'src/app/models/feedback';
import { ActivateComponentService } from 'src/app/services/activate-component.service';
import { FeedBackShareService } from 'src/app/services/feed-back-share.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit, AfterViewInit {
  //Reference to the feedback form


  //Object to store feedback
  feedBackData: FeedBack = {
    emailAddress: '',
    eventName: '',
    likedManagement: false, //checkbox item
    likedOrganization: false, // checkbox item
    likedValueAddition: false, // checkbox item
    contentRating: 0, // range
    managementRating: 0, // range
    informationRating: 0, // range
  };

  constructor(
    private router: Router,
    private activeComponent: ActivateComponentService,
    private feedbackShare: FeedBackShareService
  ) {}

  //oninit method
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.activeComponent.updateComponent(2);
  }
  //submit form
  onSubmit(feedback: NgForm) {
    if(this.isValidEmail(this.feedBackData.emailAddress)==true) // email is valid
    {
        if(this.feedBackData.eventName!='') // event name is not empty
        {
          if(feedback.controls['event_management'].touched ||  // true if any one option is selected
           feedback.controls['event_organization'].touched ||
           feedback.controls['value_addition'].touched)
           {
            
              this.feedbackShare.updateFeedback(this.feedBackData);
              this.router.navigate(['feedback2']);
           }
           else
           {
            alert('We shall try better');
           }
        } 
        else // no event is selected
        {
          alert('Please Select an event')
        }
    }
    else // email is invalid
    {
      alert("Invalid email address");
    }

   

  }

  //go back to personal
  gotoPersonal() {
    this.router.navigate(['personal']);
  }

  //Email validation
  isValidEmail(email: string): boolean {
    // Regular expression for validating an email
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegexp.test(email);
  }
}
