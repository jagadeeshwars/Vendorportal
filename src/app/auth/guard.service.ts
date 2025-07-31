import { Injectable,Inject, PLATFORM_ID  } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   // const checkToken1 = localStorage.getItem("LoginDetails");
    // if (localStorage.getItem('isLoggedin') && checkToken1) {
      if(typeof window !== 'undefined' )
        {
          const isLoggedIn = localStorage.getItem('isLoggedIn');
          let userid = localStorage.getItem('isLoggedin');
          if (userid)
            {
               // logged in so return true
              return true;
            }
          // if (localStorage.getItem('isLoggedin')) {
          //   // logged in so return true
          //   return true;
          // }
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
         
        }
        return false;
  }
}