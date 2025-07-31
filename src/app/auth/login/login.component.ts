import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MaterialModule } from '../../MaterialModule';
import * as login from '../../../../public/assets/js/login.json';
import lottie from 'lottie-web';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
// import Swal from 'sweetalert2';
// import { DataservicesService } from '../../dataservices/dataservices.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MaterialModule } from '../../MaterialModule';
import { NgToastService } from 'ng-angular-popup';
import { ServicesService } from '../../API/services.service';
import { truncate } from 'fs';

export interface Login{
  SelectID?: any;
  UserName?:any
  Password?:any
   otp?: any;
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
public Header:Login={}
  forcelogin: any = false;
  Userinfo = {
    userid: 1,
    token: '',
    active: 'true',
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
     private toastr: NgToastService,
  private spinner: NgxSpinnerService,
   private dataService: ServicesService,
  ) { }

  UserTypeArray: any = [
    { UserTypeCode: '0', UserType: 'Select' },
    { UserTypeCode: '1', UserType: 'Department' },
    { UserTypeCode: '2', UserType: 'Vendor' },
  ]
    ;

  public hide = true;

  
    ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.returnUrl = this.returnUrl == "/" ? "/dashboard" : this.returnUrl;
    // this.LoginModel.UserLoginTypeCode="0";
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      requestIdleCallback(() => this.loadAnimation());
      // or
      // setTimeout(() => this.loadAnimation(), 0);
    }
  }

  validation() {
    var userId = this.Header.UserName;
    var password = this.Header.Password;
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

  SPName: any = 'INUR_GetUserLogin'
   correctOtp:any;
  isOtpValid: boolean | null = null;

  otpControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.maxLength(6),
  ]);
 
  verifyOtp() {
    const OTP = this.otpControl.value ?? '';
    if (OTP.length === 4) {
      this.isOtpValid = OTP === this.correctOtp;
      clearInterval(this.timerInterval);
      this.otpTimer=0
    } else {
      this.isOtpValid = false;
    }
  }

  
otpTimer: number = 0;
  timerInterval: any;
  displayTime: string = '00:60';

  startOtpTimer(): void {
    this.otpTimer = 60; 
  
    // Clear any previous interval
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  
    // Start the countdown
    this.timerInterval = setInterval(() => {
      if (this.otpTimer > 0) {
        this.otpTimer--;
  
      
        const minutes = '00'; 
        const seconds = this.otpTimer % 60;
        const textSec = seconds < 10 ? '0' + seconds : seconds;
  
        this.displayTime = `${minutes}:${textSec}`; // Assign the formatted time to display
  
      } else {
        clearInterval(this.timerInterval); // Stop the timer at 0
      }
    }, 1000);
  }

  
  SentOTP() {
    debugger
    if(this.validation()){
    this.spinner.show();
    this.dataService.LoginOtp(this.Header.UserName,this.Header.UserName).subscribe((data) => {
      if (data.success == true) {
        if (data.data.length > 0) {
          this.spinner.hide();
          this.correctOtp=data.data
         this.toastr.success(
           'success',
         'Email Sent',
        );
        this.startOtpTimer();
        } else {
          this.toastr.warning(
           'WARNING',
             'No data found',
          );
          this.spinner.hide();
        }
      } else {
        this.toastr.danger(
          'ERROR',
           data.message,
        );
        // this.spinner.hide();
      }
    }, (error: any) => {
      this.toastr.danger( 'ERROR',  error.Message )
     this.spinner.hide();
    });
  }
  // else{
  //   this.toastr.warning(
  //   'WARNING',
  //     'Username is Required'
  //   );
  // }
  
  }
  async onLoggedin(e: Event) {
    e.preventDefault();
    //this.verifyOtp();
    debugger
    // if (this.isOtpValid) {
      if (this.validation()) {
        this.spinner.show();
        let headerOptions;
        debugger
        this.forcelogin = false;
 
         await this.CheckUser().then(async (CheckUser: any) => {
          
           if (CheckUser == "C" || CheckUser == "A") {
             this.forcelogin = true;
             let authorizationData = 'Basic ' + btoa(this.Header.UserName + ':' + this.Header.Password);
 
             headerOptions = {
               headers: new HttpHeaders({
                 'Content-Type': 'application/json',
                 'Authorization': authorizationData,
                 'Forcelogin': `'${this.forcelogin}'`
               })
             };
           }
           else {
             return
           }
           
           await this.dataService.getUserLogin(headerOptions).subscribe((response: any) => {
 
             let ipVar;
             if (response.success == true && response.data.length > 0) {
 
              // this.socket.emit('login', { userid: this.Header.UserName, token: response.token, active: true, IP: ipVar, sessionId: response.sessionId })
              this.spinner.hide();
               localStorage.setItem('active', 'true');
               localStorage.setItem('userid', this.Header.UserName || '');
               localStorage.setItem('token', response.token);
               localStorage.setItem('sessionId', response.sessionId);
               localStorage.setItem('isLoggedin', 'true');
              // localStorage.setItem('AuthorisationWalkaroo', '');
              localStorage.setItem('ResponseNew',JSON.stringify(response));
               localStorage.setItem('LoginDetails', JSON.stringify(response.data[0]));
               this.toastr.success("Success",'Login successfully!!!',9000)
              // this.toastr.success({ detail: "Success", summary: 'Login successfully!!!', duration: 9000 });
               this.router.navigate([this.returnUrl]);
 
             } else {
             this.spinner.hide();
             this.toastr.danger( "Error", response.message,  9000)
               //this.toastr.danger({ detail: "Error", summary: response.message, duration: 9000 });
             }
           })
 
 
         });
     }
   }

  async CheckUser() {

    return new Promise(async (resolve, reject) => {

      this.forcelogin = false;

      const headerOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'UserID': `${this.Header.UserName}`
        })
      };
      console.log("ActiveUsers");

      
      await this.dataService.ActiveUsers(headerOptions).subscribe((response: any) => {
        console.log("response", response);
        
        if (response.success == true && response.data.length > 0) {
          
          this.spinner.hide()
          Swal.fire({
            title: "Alert",
            text: "Another user session already active. Do you want to force login ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm",
          }).then((result) => {

            //alert(result.isConfirmed);
            if (result.isConfirmed) {
              resolve("C");
              //return true
              //this.forcelogin = true;
            }
            else {
              reject("R");
              // return false
              //this.forcelogin = false;
            }

          });
        }
        else {
          reject("A");
        }
      })
      //reject(false);
    }
    )
      .then((result) => {
        return result;
      })
      .catch((result) => {
        return result;
      });
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


