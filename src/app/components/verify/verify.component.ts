import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { GoogleResponse } from 'src/app/models/captcha_response';
import { PersonalInformation } from 'src/app/models/personalInfo';
import { ActivateComponentService } from 'src/app/services/activate-component.service';
import { PersonalInfoShareService } from 'src/app/services/personal-info-share.service';
import { TokenverifyService } from 'src/app/services/tokenverify.service';
import { VerifyService } from 'src/app/services/verify.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit, AfterViewInit {
  //object to store personal info
  personalInfo: PersonalInformation | null = { fullName: '', mobileNumber: '' };
  isVerified:boolean=false;

 


  constructor(
    private router: Router,
    private activeComponent: ActivateComponentService,
    private personalInfoShare: PersonalInfoShareService,
    private recaptcha: ReCaptchaV3Service,
    private tokenverify:TokenverifyService,
    private verify:VerifyService
  ) {}

  //oninit method
  ngOnInit(): void {
    this.personalInfoShare.personalInfo$.subscribe((response) => {
      this.personalInfo = response; // fetching the personal information of the user for login verification
      console.log(this.personalInfo);
    });
  }

  ngAfterViewInit(): void {
    this.activeComponent.updateComponent(1);
  }

  //Method to fetch the values from the pin view


  //function to validate user using captcha
  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.recaptcha.execute('importantAction')
    .subscribe((token: string) => {
      console.log(`Token [${token}] generated`);
      this.tokenverify.verifyToken(token).subscribe(
        (response)=>
          {
            console.log(response.score);
            this.checkScore(Number(response.score));
            this.isVerified=true; // user is verified
            this.verify.updateVerification(this.isVerified);
          }
      )


    });
  }
  //function to verify the captcha token
  checkScore(score:number)
  {
    if(score>=0.5)
      {
        this.isVerified=true;
        alert('Captcha Verified, Please Wait! Redirecting to the feedback form');
        this.router.navigate(['/feedback']);
      }
    else
    {
        alert('You did not pass the captcha test');
    }
  }
}
