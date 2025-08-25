
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoComponent } from './po/po.component';
import { PoConfirmationComponent } from './po-confirmation/po-confirmation.component';
import { PoScheduleDateComponent } from './po-schedule-date/po-schedule-date.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'po',
    component: PoComponent,
    data: { breadcrumb: 'Po' }
  },
  {
    path: 'po-confirmation',
    component: PoConfirmationComponent,
    data: { breadcrumb: 'poconfirmation' }
  },
  {
    path: 'po-schedule-date',
    component: PoScheduleDateComponent,
    data: { breadcrumb: 'poscheduledate' }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PoModule { }
