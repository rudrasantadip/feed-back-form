import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PersonalInfoShareService } from '../services/personal-info-share.service';


export const personalGuard: CanActivateFn = (route, state) => {
  const personalInfoService = inject(PersonalInfoShareService);
  const router=inject(Router);
  let infoPresent:boolean=true;
  personalInfoService.personalInfo$.subscribe(
    (response)=>
      {
        if(response==null)
        {
            infoPresent=false;
            router.navigate(['personal']);
        }
      }
  );

  return infoPresent;
};
