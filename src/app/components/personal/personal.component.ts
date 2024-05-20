import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent {

  //Name Validation variables
  isNameValid:boolean=false;
  nameErrorMessage:string=''
  nameClassList:Set<string> 

  //Mobile Validation variables
  isMobileValid:boolean=false;
  mobileErrorMessage:string='';
  mobileClassList:Set<string>

  //Json to fetch form data
  userForm={
    name:'',
    mobileNumber:''
  }

  //constructor 
  constructor(private router:Router)
  {
    this.nameClassList = new Set<string>("form-control");
    this.mobileClassList= new Set<string>("form-control");
  }

  //function to go to the otp verification page
  gotoValidate(personalInfo:NgForm)
  {
    this.isNameValid=this.validateName(this.userForm.name);
    this.isMobileValid=this.validateMobile(this.userForm.mobileNumber);

    if(this.isNameValid==true && this.isMobileValid==true)
      {
        this.router.navigate(['verify']);
      }
  }


  //function to validate name
  
  validateName(name:string):boolean
  {
    if(name!='') // name if not empty
    {
      if(this.isNumeric(name)) // name contains numbers
      {
        this.nameErrorMessage='Name cannot contain numbers';
        this.nameClassList.add('invalid-input');
        return false;
      }
      else // name is perfect
      {
        this.nameErrorMessage='';
        //removing the invalid class attribute
        this.nameClassList.delete('invalid-input');
        return true;
      }
    }
    else // name is empty
    {
      this.nameClassList.add('invalid-input');
      this.nameErrorMessage='Please Enter your full name';
      return false;
    }
  }


  //Function to validate mobile number
  validateMobile(mNumber:string):boolean
  {
    if(mNumber!='' && mNumber.length<=15 && mNumber.length>=7) //mobile number is not empty, is smaller than 15 numbers and greater than 7
    {

      if(!this.isNumeric(mNumber)) // mobile number contains non numeric characters
      {
        this.mobileErrorMessage='Mobile number must contain only numbers';
        this.mobileClassList.add('invalid-input');
        return false;
      }
      else // does not contain non numeric characters
      {
        this.mobileErrorMessage='';
        this.mobileClassList.delete('invalid-input');
        return true;
      }
      }
      else // mobile number is empty
      {
        this.mobileErrorMessage='Please enter a valid mobile number';
        this.mobileClassList.add('invalid-input');
      return false;
    }
  }

  //method to check if string is numeric
  isNumeric(text:string):boolean
  {
    return !isNaN(Number(text));
  }


  //method to remove an item from array

}
