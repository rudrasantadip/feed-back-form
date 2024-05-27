import { NgFor } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedBack } from 'src/app/models/feedback';
import { Participant } from 'src/app/models/participant';
import { PersonalInformation } from 'src/app/models/personalInfo';
import { ActivateComponentService } from 'src/app/services/activate-component.service';
import { FeedBackShareService } from 'src/app/services/feed-back-share.service';
import { ParticipantService } from 'src/app/services/participant.service';
import { PersonalInfoShareService } from 'src/app/services/personal-info-share.service';
import { SheetApiService } from 'src/app/services/sheet-api.service';

@Component({
  selector: 'app-feedback2',
  templateUrl: './feedback2.component.html',
  styleUrls: ['./feedback2.component.css'],
})
export class Feedback2Component implements OnInit, AfterViewInit {
  //list for the star rating
  startClassList: Set<string>;
  @ViewChildren('star1, star2, star3, star4 , star5, star6')
  stars!: QueryList<ElementRef>;

  //variable to store feedback
  feedBackData!: FeedBack;

  //variable to store personal info
  personalInformation!: PersonalInformation | null;

  recommendations: string = '';
  remarks: string = '';
  rating: number = 0;

  constructor(
    private router: Router,
    private activeComponent: ActivateComponentService,
    private feedBackShare: FeedBackShareService,
    private personalInfo: PersonalInfoShareService,
    private participantApi:ParticipantService
  ) {
    this.startClassList = new Set<string>();
  }

  //oninit method
  ngOnInit(): void {
    //Getting the first part of the feedback form
    this.feedBackShare.currentFeedback$.subscribe((response) => {
      this.feedBackData = response;
      console.log(this.feedBackData);
    });

    //Getting the personal information 
    this.personalInfo.personalInfo$.subscribe((response) => {
      this.personalInformation = response;
    });
  }

  ngAfterViewInit(): void {
    this.activeComponent.updateComponent(2); //updating the navigation bar everytime a new component is loaded
  }
  //Rating mechanism
  mouseOverStar(
    index: number //mouse enters a star
  ) {
    for (let i = 0; i < index; i++) {
      this.stars.toArray()[i].nativeElement.style.color = 'orange'; // color from star 1 to the star the pointer is currently at as orange
    }
    for (let i = index; i < this.stars.length; i++) {
      this.stars.toArray()[i].nativeElement.style.color = 'black'; // color the stars after that as black
    }
    this.rating = index; // set the rating value
  }

  mouseOutsideStar(
    index: number //mouse exits a star
  ) {
    this.stars.toArray()[index].nativeElement.style.color = 'black';
    if (index == 1) {
      this.stars.toArray()[0].nativeElement.style.color = 'black';
    }
  }

  onSubmit(
    feedback: NgForm //submission form
  ) {
    this.feedBackData.toRecommend = this.recommendations;
    this.feedBackData.remarks = this.remarks;
    this.feedBackData.rating = this.rating;


    if(this.recommendations=='')
    {
        alert('Please select any one of the options');
    }
    else
    {
      
    //Creating the participant object
      const participant: Participant = {
        MobileNumber: this.personalInformation?.mobileNumber,
        FullName: this.personalInformation?.fullName,
        EmailAddress: this.feedBackData.emailAddress,
        EventName: this.feedBackData.eventName,
        LikedEventManagement: this.feedBackData.likedManagement,
        LikedEventOrganization: this.feedBackData.likedOrganization,
        LikedValueAddition: this.feedBackData.likedValueAddition,
        ContentRating: this.feedBackData.contentRating,
        ManagementRating: this.feedBackData.managementRating,
        InformationRating: this.feedBackData.informationRating,
        toRecommend: this.feedBackData.toRecommend,
        Remarks: this.feedBackData.remarks,
        Rating: this.feedBackData.rating,
      };
     
      //Sending the data to the backend server
      this.participantApi.sendData(participant).subscribe(
        (response:{body:any,status:number})=>
          {
            console.log(response.body);
            console.log(response.status);
            if(response.status==200)
            {
              alert("Your response has been submitted successfully");
              this.router.navigate(['personal']);
            }
          },
          (error)=>{
            console.error(error);
            alert("Some error occured please retry");
            this.router.navigate(['personal']);
          }
      );

    }
   



   

    //REST API CALL
    // this.sheetApi.sendData(participant).subscribe(
    //   (response)=>{
    //     console.log(response);
    //   }
    // )
  }

  //Rating mechanism
  rate(index: number) {
    for (let i = 0; i < index; i++) {
      this.stars.toArray()[i].nativeElement.style.color = 'orange';
    }
    this.rating = index;
  }
}
