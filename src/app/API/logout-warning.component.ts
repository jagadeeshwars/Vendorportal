import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InactivityService } from './inactivity.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-warning',
  standalone: true,
  imports: [CommonModule],
 template: `
    <div *ngIf="countdown > 0" class="overlay">
      <div class="popup">
        <h2>⚠ Session Expiring</h2>
        <p>You’ve been inactive for a while.</p>
        <p class="timer">Logging out in <span>{{ countdown }}</span> seconds...</p>
        <div class="buttons">
          <button class="stay-btn" (click)="stayLoggedIn()">Stay Logged In</button>
         
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease-in-out;
      z-index: 9999;
    }
    .popup {
      background: #fff;
      border-radius: 12px;
      padding: 25px 30px;
      width: 320px;
      text-align: center;
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
      animation: slideUp 0.4s ease-out;
    }
    h2 {
      margin: 0 0 10px;
      color: #ff4d4f;
    }
    p {
      margin: 8px 0;
      font-size: 15px;
      color: #333;
    }
    .timer {
      font-weight: bold;
      color: #d4380d;
      font-size: 16px;
    }
    .timer span {
      font-size: 20px;
    }
    .buttons {
      margin-top: 15px;
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    .stay-btn, .logout-btn {
      padding: 8px 14px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    .stay-btn {
      background: #52c41a;
      color: white;
    }
    .stay-btn:hover {
      background: #389e0d;
    }
    .logout-btn {
      background: #ff4d4f;
      color: white;
    }
    .logout-btn:hover {
      background: #cf1322;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class LogoutWarningComponent implements OnInit {
  countdown = 0;

  constructor(private inactivityService: InactivityService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.inactivityService.warning$.subscribe((sec:any) => {
      this.countdown = sec;
       this.cdr.detectChanges();
      console.log('Countdown:', sec); // 👈 check in console
    });

    this.inactivityService.logout$.subscribe(() => {
      // redirect or call logout service
     // window.location.href = '/logout';
        localStorage.setItem('userid', '');
    localStorage.setItem('active', 'false');
    localStorage.setItem('sessionId', '');
    localStorage.setItem('isLoggedin', 'false');
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    });
  }

  stayLoggedIn() {
    this.countdown = 0; // hide popup
  }


}
