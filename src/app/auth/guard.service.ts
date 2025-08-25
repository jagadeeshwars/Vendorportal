import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
  //   if (typeof window !== 'undefined') {
  //     // If SSR, skip popup and allow navigation
  //     if (!isPlatformBrowser(this.platformId)) {
  //       return true;
  //     }
  //     const result = await Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'Do you want to go to the login page?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, go',
  //       cancelButtonText: 'Stay here',
  //     });

  //     if (result.isConfirmed) {
  //       return true; // allow
  //     } else {
  //       return this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  //     }
  //   }

  //   return false;
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(typeof window !== 'undefined' )
        {
          const isLoggedIn = localStorage.getItem('isLoggedIn');
          let userid = localStorage.getItem('isLoggedin');
          if (userid)
            {
               // logged in so return true
              return true;
            }
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });

        }
        return false;
  }

}