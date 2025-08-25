import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsnreportComponent } from './asnreport/asnreport.component';
import { AsnrequestComponent } from './asnrequest/asnrequest.component';
import { RouterModule, Routes } from '@angular/router';
import { AsnapprovalComponent } from './asnapproval/asnapproval.component';
import { DocumentuploadComponent } from './documentupload/documentupload.component';
import { EditdocumentuploadComponent } from './editdocumentupload/editdocumentupload.component';

const routes: Routes = [
  {
      path: 'asnreport',
      component: AsnreportComponent,
      data: { breadcrumb: 'ASN Reports' }
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
    {
      path: 'documentupload',
      component: DocumentuploadComponent,
      data: { breadcrumb: 'Document Upload' }
    },
    {
      path: 'editdocumentupload',
      component: EditdocumentuploadComponent,
      data: { breadcrumb: 'Edit Document Upload' }
    },
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AsnModule { }
