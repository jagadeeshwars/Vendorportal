import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouteHistoryService {
  private history: string[] = [];
  private programmaticNav = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!this.programmaticNav) {
          this.history.push(event.url);
        }
        this.programmaticNav = false; // reset after every nav
      }
    });
  }

  markProgrammaticNav() {
    this.programmaticNav = true;
  }

  getPreviousUrl(): string {
    return this.history.length > 1 ? this.history[this.history.length - 2] : '';
  }
}
