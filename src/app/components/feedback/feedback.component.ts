import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivateComponentService } from 'src/app/services/activate-component.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent  implements OnInit
{

  feedBackData={
    emailAddress:'',
    eventType:'',
    eventManagement:false, //checkbox item
    eventOrganization:false, // checkbox item
    valueAddition:false, // checkbox item
    contentRating:0, // range 
    managementRating:0, // range
    informationRating:0 // range
  }

  constructor(private router:Router, private activeService:ActivateComponentService)
  {
    
  }

   //oninit method
   ngOnInit(): void {
    this.activeService.updateComponent(2); // activating route 1
  }

  //submit form
  onSubmit(feedback:NgForm)
  {
    console.log(this.feedBackData);
    this.router.navigate(['feedback2']);
  }

  //go back to personal
  gotoPersonal()
  {
    this.router.navigate(['personal']);
  }
}
