import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterOutlet],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {}
