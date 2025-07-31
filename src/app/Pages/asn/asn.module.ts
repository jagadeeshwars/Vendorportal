import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsnreportComponent } from './asnreport/asnreport.component';
import { AsnrequestComponent } from './asnrequest/asnrequest.component';
import { RouterModule, Routes } from '@angular/router';
import { AsnapprovalComponent } from './asnapproval/asnapproval.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Advance Shipment Notes' },  // 👈 2nd breadcrumb level
    children: [
      {
        path: 'asnreport',
        component: AsnreportComponent,
        data: { breadcrumb: 'ASN Reports' }  // 👈 3rd breadcrumb level
      },
      {
        path: 'asnrequest',
        component: AsnrequestComponent,
        data: { breadcrumb: 'ASN Request' }
      },
      {
        path: 'asnapproval',
        component: AsnapprovalComponent,
        data: { breadcrumb: 'ASN Approval' }
      },
      
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AsnModule { }
