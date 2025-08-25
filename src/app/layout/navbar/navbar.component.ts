import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { MaterialModule } from '../../MaterialModule';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, MatIconModule, MatMenuModule, MaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    // Toggle 'sidebar-mob' class (e.g., for mobile view)
    sidebar.classList.add('sidebar-mob');
    sidebar.classList.remove('d-non');
  }

  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.route.root);
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string, url: string }> = []): Array<{ label: string, url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
  showDropdown = false;

  @ViewChild('dropdownRef') dropdownRef!: ElementRef;

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }


  getLoginDetails: any;
  month1: any
  year1: any

  ngOnInit(): void {
    // this.month1 = currentDate.getMonth()+1;
    // this.year1 = currentDate.getFullYear();
    var loginDetails: any = localStorage.getItem("LoginDetails");
    this.getLoginDetails = JSON.parse(loginDetails);

  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.dropdownRef?.nativeElement.contains(
      event.target
    );
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }
  logout() {
    debugger
    Swal.fire({
      title: 'Leaving so soon? 👋',
      html: `
        <div style="font-size:16px; margin-top:10px;">
          Your current session will end.<br>
          Are you <b>sure</b> you want to logout?
        </div>
      `,
      icon: 'warning',
      background: 'rgba(255, 255, 255, 0.8)',

      showCancelButton: true,
      confirmButtonText: '🚪 Yes, Logout',
      cancelButtonText: '✨ Stay Logged In',
      customClass: {
        popup: 'glass-popup',
        confirmButton: 'gradient-confirm-btn',
        cancelButton: 'gradient-cancel-btn'
      },
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.setItem('userid', '');
        localStorage.setItem('active', 'false');
        localStorage.setItem('sessionId', '');
        localStorage.setItem('isLoggedin', 'false');
        localStorage.clear();
        this.router.navigate(['/auth/login']);
      }
    });


    //  this.dataService.Logout(headerOptions).subscribe((dtdata) => {
    //   if (dtdata.success == true) {
    //     console.log('logout success')
    //     this.toastr.success({ detail: "Success", summary: 'Logout successfully!!!', duration: 3000 });
    //     localStorage.clear();
    //     if (!localStorage.getItem('isLoggedin')) {
    //       this.router.navigate(['/auth/login']);
    //     }
    //   }
    //   else if (dtdata.success == false) {
    //     console.log('logout success failed',dtdata)
    //     localStorage.clear();
    //     if (!localStorage.getItem('isLoggedin')) {
    //       this.router.navigate(['/auth/login']);
    //     }
    //   }
    //  this.socket.emit('logout', { userid: userid, sessionId: sessionId });
    //});

  }

}
