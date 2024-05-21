import { NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivateComponentService } from 'src/app/services/activate-component.service';

@Component({
  selector: 'app-feedback2',
  templateUrl: './feedback2.component.html',
  styleUrls: ['./feedback2.component.css']
})
export class Feedback2Component implements OnInit {

  startClassList:Set<string>
  @ViewChildren('star1, star2, star3, star4 , star5, star6') stars!: QueryList<ElementRef>;

  recommendations:string='';
  remarks:string='';
  rating:number=0;


  constructor(private router:Router, private activeService:ActivateComponentService)
  {
    this.startClassList = new Set<string>();
  }

   //oninit method
   ngOnInit(): void {
    this.activeService.updateComponent(2); // activating route 1
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
    console.log(index);
  }


  onSubmit(feedback:NgForm) //submission form
  {
    console.log(this.recommendations);
    console.log(this.remarks);
    alert(this.rating);
  }

  //Rating mechanism
  rate(index:number)
  {
    for(let i=0;i<index;i++)
      {
        this.stars.toArray()[i].nativeElement.style.color='orange';
      }
  }

}
