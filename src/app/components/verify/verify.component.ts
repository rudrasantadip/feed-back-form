import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalInformation } from 'src/app/models/personalInfo';
import { ActivateComponentService } from 'src/app/services/activate-component.service';
import { PersonalInfoShareService } from 'src/app/services/personal-info-share.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit,AfterViewInit
{

  userInput:string=''; // user entered otp
  actualOtp:string='9830'; // actual otp
  errorMessage:string='';

  //object to store personal info
  personalInfo:PersonalInformation | null={fullName:'',mobileNumber:''}

  @ViewChildren('pin0, pin1, pin2, pin3') pinInputs!: QueryList<ElementRef>; // fetching the reference of the four pin views

  constructor(private router:Router, private activeComponent:ActivateComponentService, private personalInfoShare:PersonalInfoShareService)
  {

  }

  //oninit method
  ngOnInit(): void {
      this.personalInfoShare.personalInfo$.subscribe(
        (response)=>
          {
            this.personalInfo=response;
          }
      )
  }

  ngAfterViewInit(): void {
    this.activeComponent.updateComponent(1);
  }


  //Method to fetch the values from the pin view
  onInputPinView(event:any, index:number)
  {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < this.pinInputs.length - 1) {
      const nextInput = this.pinInputs.toArray()[index + 1];
      nextInput.nativeElement.focus();
    }
  }

  //Method to validate
  validateOtp()
  {
    this.userInput='';
    this.pinInputs.forEach((input:ElementRef,index:number)=>{
      this.userInput= this.userInput+input.nativeElement.value;
    })
    console.log(this.userInput);
    if(this.userInput=='' && this.userInput.length<4) // user entered otp is empty
    {
      this.errorMessage='Please enter the otp sent to your mobile';
    }
    else // otp is not empty
    {

      //LOGIC TO SEND OTP TO THE MOBILE NUMBER HERE

    if(this.userInput==this.actualOtp) // user entered otp matches, the generated otp
      {
        this.errorMessage='';
        alert('Valid');
        this.router.navigate(['feedback']);
      }
    else // invalid otp
    {
      this.errorMessage='Invalid OTP entered';
    }
    }

  }

  //function to extract last three digits of mobile number

  lastThreeDigits(mobileNumber:string | undefined):string
  {
    if(mobileNumber)
    {
      return mobileNumber.slice(mobileNumber.length-3,mobileNumber.length)
    }
    return ''
  }
}
