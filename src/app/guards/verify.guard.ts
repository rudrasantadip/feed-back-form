import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { VerifyService } from '../services/verify.service';

export const verifyGuard: CanActivateFn = (route, state) => {

  const verifyService = inject(VerifyService); // injecting a verification service object
  const router=inject(Router);
  let isVerified:boolean=true;
  verifyService.isVerified$.subscribe(
    response=>{
      if(response==false)
        {
          isVerified=false;
          router.navigate(['verify']);
        }
    }
  )
  return isVerified;
};
