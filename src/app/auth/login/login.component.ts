import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '../../MaterialModule';
import * as login from '../../../../public/assets/js/login.json';
import lottie from 'lottie-web';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
// import Swal from 'sweetalert2';
// import { DataservicesService } from '../../dataservices/dataservices.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MaterialModule } from '../../MaterialModule';


export interface Login {
  Username?: any
  Password?: any
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  // providers: [DataservicesService]
})
export class LoginComponent {
  
  returnUrl: any;
  public LoginModel: any = {};
  forcelogin: any = false;
  Userinfo = {
    userid: 1,
    token: '',
    active: 'true',
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  UserTypeArray: any = [
    { UserTypeCode: '0', UserType: 'Select' },
    { UserTypeCode: '1', UserType: 'Department' },
    { UserTypeCode: '2', UserType: 'Vendor' },
  ]
    ;

  public hide = true;
//   ngOnInit(): void {
//  if (isPlatformBrowser(this.platformId)) {
//       this.loadAnimation();
//     }
  
//   }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      requestIdleCallback(() => this.loadAnimation());
      // or
      // setTimeout(() => this.loadAnimation(), 0);
    }
  }

  validation() {
    var userId = this.LoginModel.username;
    var password = this.LoginModel.password;
    if (!!userId == false) {
      //this.toastr.danger("User Name is Required");
      Swal.fire({
        title: "User Name is Required",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    if (!!password == false) {
      Swal.fire({
        title: "Password is Required",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500
      });
     // this.toastr.danger("","password is Required",5000);
      return false;
    }
    return true;
  }
  // eyeicon
  passwordFieldType: string = 'password';

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  async onLoggedin(e: Event) {
   
  }

  async CheckUser() {

  }


  animationData: any = (login as any).default;



  //loginanimation 
  loadAnimation() {
    const container = document.getElementById('animation-container');
    if (container) {
      const animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: this.animationData,
        name: 'demo animation'
      });
      // Find and hide the "Made with Lottielab" layer
      animation.addEventListener('DOMLoaded', () => {
        const layers = animation.renderer.elements;
        layers.forEach((layer: { name: string; hide: () => void; }) => {
          if (layer.name === 'Made with Lottielab') {
            layer.hide();
          }
        });
      });
    } else {
      console.error('Animation container not found');
    }
  }

}


