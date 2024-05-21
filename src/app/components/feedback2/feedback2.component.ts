import { NgFor } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedBack } from 'src/app/models/feedback';
import { Participant } from 'src/app/models/participant';
import { PersonalInformation } from 'src/app/models/personalInfo';
import { ActivateComponentService } from 'src/app/services/activate-component.service';
import { FeedBackShareService } from 'src/app/services/feed-back-share.service';
import { PersonalInfoShareService } from 'src/app/services/personal-info-share.service';
import { SheetApiService } from 'src/app/services/sheet-api.service';

@Component({
  selector: 'app-feedback2',
  templateUrl: './feedback2.component.html',
  styleUrls: ['./feedback2.component.css']
})
export class Feedback2Component implements OnInit,AfterViewInit {

  //list for the star rating
  startClassList:Set<string>
  @ViewChildren('star1, star2, star3, star4 , star5, star6') stars!: QueryList<ElementRef>;

  //variable to store feedback
  feedBackData!:FeedBack

  //variable to store personal info
  personalInformation!:PersonalInformation | null

  recommendations:string='';
  remarks:string='';
  rating:number=0;


  constructor(private router:Router,
    private activeComponent:ActivateComponentService,
    private feedBackShare:FeedBackShareService,
    private personalInfo:PersonalInfoShareService,
    private sheetApi:SheetApiService
  )
  {
    this.startClassList = new Set<string>();
  }

   //oninit method
   ngOnInit(): void
  {
    this.feedBackShare.currentFeedback$.subscribe(
      (response)=>
        {
          this.feedBackData=response;
          console.log(this.feedBackData);
        }
    )

    this.personalInfo.personalInfo$.subscribe(
      (response)=>{
        this.personalInformation=response;
      }
    )
  }

  ngAfterViewInit(): void {
    this.activeComponent.updateComponent(2);
  }
  //Rating mechanism
  mouseOverStar(index:number) //mouse exits a star
  {
    for(let i=0;i<index;i++)
    {
      this.stars.toArray()[i].nativeElement.style.color='orange';
    }
    for(let i=index;i<this.stars.length;i++)
      {
        this.stars.toArray()[i].nativeElement.style.color='black';
      }
      this.rating=index;
  }
  
  mouseOutsideStar(index:number) //mouse enters a star
  {
    this.stars.toArray()[index].nativeElement.style.color='black';
    if(index==1)
      {
        this.stars.toArray()[0].nativeElement.style.color='black';
      }
  }


  onSubmit(feedback:NgForm) //submission form
  {
    this.feedBackData.toRecommend=this.recommendations;
    this.feedBackData.remarks=this.remarks;
    this.feedBackData.rating=this.rating;


    //Creating the participant object
    
    const participant:Participant={
      MobileNumber: this.personalInformation?.mobileNumber,
      FullName: this.personalInformation?.fullName,
      EmailAddress: this.feedBackData.emailAddress,
      EventName: this.feedBackData.eventName,
      LikedEventManagement: this.feedBackData.likedManagement,
      LikedEventOrganization: this.feedBackData.likedOrganization,
      LikedValueAddition:this.feedBackData.likedValueAddition,
      ContentRating: this.feedBackData.contentRating,
      ManagementRating: this.feedBackData.managementRating,
      InformationRating: this.feedBackData.informationRating,
      toRecommend: this.feedBackData.toRecommend,
      Remarks: this.feedBackData.remarks,
      Rating: this.feedBackData.rating
    }

    console.log(participant);

    //REST API CALL
    // this.sheetApi.sendData(participant).subscribe(
    //   (response)=>{
    //     console.log(response);
    //   }
    // )
  }

  //Rating mechanism
  rate(index:number)
  {
    for(let i=0;i<index;i++)
      {
        this.stars.toArray()[i].nativeElement.style.color='orange';
      }
      this.rating=index;
  }

}
