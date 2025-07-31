import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menu = [
    {
      // MainTitle: 'Home',
      title: 'Dashboards',
      icon: 'mynaui--grid',
      expanded: false,
      route: '/dashboard/dashboard',
      
    },
    // {
    //   // MainTitle: 'Configuration Masters',
    //   title: 'Masters',
    //   icon: 'mingcute--user-edit-line',
    //   expanded: false,
    //   submenu: {
    //     items: [
    //       {
    //         name: 'Packing Type',
    //         icon: 'packtype',
    //         route: '/masters/pack-type',
    //       },
     
    //     ],
    //   },
    // },
    // {
    //   // MainTitle: 'Insights',
    //   title: 'Reports',
    //   icon: 'reports',
    //   expanded: false,
    //   submenu: {
       
    //     items: [
    //       {
    //         name: 'Po Confirmation',
    //         icon: 'poconfrom',
    //         route: '/reports/po-confirmation',
    //       },
    //       {
    //         name: 'DSP Report',
    //         icon: 'dspreport',
    //         route: '/reports/Dsp',
    //       }
    //     ],
    //   },
    // },
    {
      // MainTitle: 'Documents',
      title: 'Advance Shipment Notes',
      icon: 'asn',
      expanded: false,
      submenu: {
      
        items: [
          {
            name: 'ASN Reports',
            icon: 'asnreport',
            route: '/asn/asnreport',
          },
          {
            name: 'ASN Request',
            icon: 'packtype',
            route: '/asn/asnrequest',
          },
          {
            name: 'ASN Approval',
            icon: 'asnapproval',
            route: '/asn/asnapproval',
          }
        ],
      },
    },
    {
      // MainTitle: 'Home',
      title: 'Delivery Schedule',
      icon: 'delivery',
      expanded: true,
      route: '/delivery/devliveryschedule',
    },
    {
      // MainTitle: 'Home',
      title: 'PO',
      icon: 'po',
      expanded: false,
      route: '/po/po-confirm',
    },
    
  ];

  constructor(private router: Router) {}

  toggleMain(menuItem: any) {
    menuItem.expanded = !menuItem.expanded;
  }

  toggleSub(menuItem: any) {
    menuItem.expanded = false;
  }

  navigate(route?: string) {
    if (route) {
      this.router.navigate([route]);
    }
  }
  
  isActiveRoute(route?: string): boolean {
    return route ? this.router.url === route : false;
  }
  

  isSidebarCollapsed = false;
  isHovering = false;

  toggleSidebar() {
    if (window.innerWidth > 769) {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      const sidebar = document.querySelector('.sidebar') as HTMLElement;
      const wrap = document.querySelector('.wrap') as HTMLElement;

      if (this.isSidebarCollapsed) {
        sidebar.style.width = '80px';
        wrap.style.width = 'calc(100% - 80px)';
      } else {
        sidebar.style.width = '240px';
        wrap.style.width = 'calc(100% - 240px)';
      }
    }
  }

  hoverSidebar() {
    if (window.innerWidth > 769) {
      if (this.isSidebarCollapsed) {
        this.isHovering = true;
        const sidebar = document.querySelector('.sidebar') as HTMLElement;
        const wrap = document.querySelector('.wrap') as HTMLElement;
        sidebar.style.width = '240px';
        wrap.style.width = 'calc(100% - 240px)';
      }
    }
  }

  unhoverSidebar() {
    if (window.innerWidth > 769) {
      if (this.isSidebarCollapsed) {
        this.isHovering = false;
        const sidebar = document.querySelector('.sidebar') as HTMLElement;
        const wrap = document.querySelector('.wrap') as HTMLElement;
        sidebar.style.width = '80px';
        wrap.style.width = 'calc(100% - 80px)';
      }
    }
  }

  closeSidebar() {
    const sidebar = document.getElementById('sidebar') as HTMLElement;

    sidebar.classList.remove('sidebar-mob');
    sidebar.classList.add('d-non');
  }








  
}
