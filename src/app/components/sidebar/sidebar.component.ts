import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivateComponentService } from 'src/app/services/activate-component.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit{
  
  isComponentActive:boolean=true;
  @ViewChildren(" colorButton") buttons!: QueryList<ElementRef>; // buttons to be highlighted when component is loaded

  constructor(private activatedComponent:ActivateComponentService)
  {

  }

  //on component creation
  ngAfterViewInit(): void 
  {
   let current:number; 
   this.activatedComponent.currentComponent$.subscribe(
    (currentComponent)=>
      {
        current=currentComponent;
        this.buttons.toArray()[current].nativeElement.style.backgroundColor='#6c5ce7';
      }
    ) 
  }
}
