import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent
{

  userInput:string='';
  actualOtp:string='';

  @ViewChildren('pin0, pin1, pin2, pin3') pinInputs!: QueryList<ElementRef>; // fetching the reference of the four pin views
  onInputPinView(event:any, index:number)
  {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < this.pinInputs.length - 1) {
      const nextInput = this.pinInputs.toArray()[index + 1];
      nextInput.nativeElement.focus();
    }
  }

  validateOtp()
  {
    this.pinInputs.forEach((input:ElementRef,index:number)=>{
      this.userInput.concat(input.nativeElement.value);
      console.log(this.userInput);
    })
  }
}
