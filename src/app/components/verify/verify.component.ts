import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ActivateComponentService } from 'src/app/services/activate-component.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit
{

  userInput:string=''; // user entered otp
  actualOtp:string='9830'; // actual otp
  errorMessage:string='';

  @ViewChildren('pin0, pin1, pin2, pin3') pinInputs!: QueryList<ElementRef>; // fetching the reference of the four pin views

  constructor(private router:Router, private activeService:ActivateComponentService)
  {

  }

  //oninit method
  ngOnInit(): void {
    this.activeService.updateComponent(1); // activating route 1
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
    this.pinInputs.forEach((input:ElementRef,index:number)=>{
      this.userInput= this.userInput+input.nativeElement.value;
    })
    console.log(this.userInput);
    if(this.userInput=='') // user entered otp is empty
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
}
