import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { MaterialModule } from '../../MaterialModule';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,MatIconModule,MatMenuModule,MaterialModule],
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

  logout() {
    // handle logout logic here
    console.log('Logging out...');
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
}
