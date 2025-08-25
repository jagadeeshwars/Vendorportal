import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationStart, Router, RouterModule, RouterOutlet, Event as NavigationEvent } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ServicesService } from './API/services.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InactivityService } from './API/inactivity.service';
import { LogoutWarningComponent } from './API/logout-warning.component';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HttpClientModule,
    NgToastModule
    , CommonModule
    , FormsModule
    , NgxSpinnerModule,
    RouterModule,
    LogoutWarningComponent],
  providers: [ServicesService,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Collabrium';
  private isBrowser: boolean;
  private popStateHandler: any;
  constructor(
    private router: Router,
    private inactivityService: InactivityService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { this.isBrowser = isPlatformBrowser(platformId); }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.inactivityService.startTracking();
    }
    if (!isPlatformBrowser(this.platformId)) return;
    // Push a dummy state to prevent immediate back to login
    history.pushState(null, '', window.location.href);

    this.popStateHandler = (event: PopStateEvent) => {
      const targetPath = this.router.url; // current route
      const nextPath = window.location.pathname; // attempted back

      // If next path is login or login with query params
      if (nextPath.startsWith('/auth/login')) {
        // Re-push the same state so URL doesn't change
        history.pushState(null, '', window.location.href);

        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to go back to the login page?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, go',
          cancelButtonText: 'Stay here',
        }).then(result => {
          if (result.isConfirmed) {
            // Now allow back navigation
            history.back();
            localStorage.clear();
          }
        });
      }
    };

    window.addEventListener('popstate', this.popStateHandler);
  }


  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.popStateHandler) {
      window.removeEventListener('popstate', this.popStateHandler);
    }
  }

}


