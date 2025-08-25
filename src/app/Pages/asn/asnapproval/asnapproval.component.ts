import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../MaterialModule';
import { ServicesService } from '../../../API/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from "xlsx";
import { NgToastService } from 'ng-angular-popup';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

export const ShowColumn =
  [

    {
      Column: 'S.No',
      type: 'S.NO',
      Description: 'S.No',
      visible: true,
      readonly: false,
    },
    {
      Column: 'Action',
      type: 'Action',
      Description: 'Action',
      visible: true,
      readonly: false,
    },
    {
      Column: 'CardCode',
      type: 'Text',
      Description: 'Vendor Code',
      visible: true,
      readonly: true,
    },
    {
      Column: 'CardName',
      type: 'Text',
      Description: 'Vendor Name',
      visible: true,
      readonly: true,
    },
    {
      Column: 'ASNReqNum',
      type: 'Text',
      Description: 'ASN Request No',
      visible: true,
      readonly: true,
    },
    {
      Column: 'ASNStatus',
      type: 'Status',
      Description: 'Status',
      visible: true,
      readonly: true,
    }


  ]
export const ShowColumn1 =
  [


    {
      Column: 'S.No',
      type: 'S.NO',
      Description: 'S.No',
      visible: true,
      readonly: false,
    },
    {
      Column: 'ASNReqNum',
      type: 'Text',
      Description: 'ASn Request ID',
      visible: true,
      readonly: true,
    },
    {
      Column: 'PoNum',
      type: 'Text',
      Description: 'PurchaseOrder No ',
      visible: true,
      readonly: true,
    },
    {
      Column: 'PoLineNum',
      type: 'Text',
      Description: 'Po LineNum',
      visible: true,
      readonly: true,
    },
    {
      Column: 'ItemCode',
      type: 'Text',
      Description: 'Material',
      visible: true,
      readonly: true,
    },
    {
      Column: 'ItemName',
      type: 'Text',
      Description: 'Material Name',
      visible: true,
      readonly: true,
    },

    {
      Column: 'DeliveryDate',
      type: 'Text',
      Description: 'Req Delivery Date',
      visible: true,
      readonly: true,
    },

    {
      Column: 'Quantity',
      type: 'Text',
      Description: 'Po Qty',
      visible: true,
      readonly: true,
    },
    {
      Column: 'ASNQty',
      type: 'Text',
      Description: 'ASN Qty',
      visible: true,
      readonly: true,
    },
    {
      Column: 'OpenQty',
      type: 'Text',
      Description: 'Open Qty',
      visible: true,
      readonly: true,
    },
    {
      Column: 'DeliveryASNQty',
      type: 'Text',
      Description: 'Delivery Qty',
      visible: true,
      readonly: true,
    },
    {
      Column: 'DeliveryASNDate',
      type: 'Text',
      Description: 'Delivery Date',
      visible: true,
      readonly: true,
    },
    {
      Column: 'DeliveryTAT',
      type: 'Text',
      Description: 'Delivery TAT',
      visible: true,
      readonly: true,
    },
    {
      Column: 'ApprovalTAT',
      type: 'Text',
      Description: 'Approval TAT',
      visible: true,
      readonly: true,
    }

  ]

@Component({
  selector: 'app-asnapproval',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MaterialModule, MatButtonModule,
    MatIconModule,],
  templateUrl: './asnapproval.component.html',
  styleUrl: './asnapproval.component.scss'
})
export class AsnapprovalComponent {
  @ViewChild('MatPaginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  vendor: any = []
  SPName: any = 'INUR_GetASNApprovalDatas'
  UserType: any;
  SerialNo: any = 0;
  date = new Date();
  Filter: any = {
    fromdate: '',
    todate: ''
  };
  HeaderTable: any = 'INUR_ASNR';
  TransType: any = 'T'
  linearray2: Array<any> = [];
  DetailData: any = [{}];
  DetailData1: any = [{}];
  getLoginDetails: any;
  expandedElement: any | null = null;
  newTableDataSource!: MatTableDataSource<any>;
  innerTableDataSource!: MatTableDataSource<any>;
  displayedColumns1: string[] = [];
  innerTableColumns: string[] = [];
  constructor(
    private dataService: ServicesService,
    private spinner: NgxSpinnerService,
    private toastr: NgToastService,

  ) {

    this.newTableDataSource = new MatTableDataSource<any>([{}]);
    this.innerTableDataSource = new MatTableDataSource<any>([{}]);
  }

  ngOnInit(): void {
    var loginDetails: any = localStorage.getItem("LoginDetails");
    this.getLoginDetails = JSON.parse(loginDetails);
    this.vendor = this.getLoginDetails.EmployeeCode;
    this.UserType = this.getLoginDetails.LoginType;
    this.Filter.fromdate = (JSON.stringify(new Date(this.date.getFullYear(), this.date.getMonth(), 2))).slice(1, 11);
    this.Filter.todate = (JSON.stringify(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1))).slice(1, 11);
    this.DetailData = ShowColumn;
    this.DetailData1 = ShowColumn1;
    this.displayedColumns1 = ShowColumn.map((Col => Col.Column))
    this.innerTableColumns = ShowColumn1.map((Col => Col.Column))
    this.getASNApprovalList()
  }

  getASNApprovalList() {
    this.spinner.show();
    var post = {
      vendor: this.vendor,
      fromdate: this.Filter.fromdate,
      todate: this.Filter.todate,
      UserType: this.UserType

    }
    let Parameter: any = JSON.stringify(post)

    this.dataService.ASNApprovaldata(this.SPName, Parameter).subscribe((res) => {
      debugger
      if (res.success == true) {
        this.spinner.hide();
        let data = res.data
        console.log(data)
        this.linearray2 = data.flatMap((item: { InnerData: string; }) => JSON.parse(item.InnerData));
        this.newTableDataSource = new MatTableDataSource<any>(data)
        this.innerTableDataSource = new MatTableDataSource<any>(this.linearray2)
      }
      else {
        this.spinner.hide();
        this.toastr.danger("error", res.data[0].message);
      }

    })

  }


  toggleRow(element: any) {
    debugger
    this.expandedElement = this.expandedElement === element ? null : element;
    if (this.linearray2.length == 0) {
      let numRows = !!this.innerTableDataSource.data.length ? this.innerTableDataSource.data.length : 0;
      this.linearray2.push({
        CreatedBy: this.getLoginDetails.UserName
      });
    }
    else if (this.linearray2.length > 0) {
      let filterdt = this.linearray2.filter((D: any) => {
        return D.ASNReqNum == this.expandedElement.ASNReqNum
      })
      if (filterdt.length == 0) {
        let numRows = !!this.innerTableDataSource.data.length ? this.innerTableDataSource.data.length : 0;
        this.linearray2.push({
          CreatedBy: this.getLoginDetails.UserName

        });
      }
    }
    let filterdt1 = this.linearray2.filter((D: any) => {
      return D.ASNReqNum == this.expandedElement.ASNReqNum
    })

    this.innerTableDataSource.data = filterdt1
  }


  Clear() {
    this.linearray2 = [];
    this.getASNApprovalList()
  }


  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.newTableDataSource.filter = filterValue;
  }

  exportexcel(): void {
    debugger
    var table: any[] = [];
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.newTableDataSource.filteredData);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-GB').replace(/[/:, ]/g, '-');
    var FileName = 'ASN Approval Details ' + '-' + formattedDateTime + '.xlsx'
    XLSX.writeFile(wb, FileName);
  }

  approveRejectHold(element: any, action: string) {
    Swal.fire({
      title: `${action} Request`,
      html: `
    <div class="swal-outline-body">
  <div class="swal-form-group">
    <label>ASNReq. No</label>
    <input id="swal-item" class="swal2-input" value="${element.ASNReqNum || ''}" readonly>
  </div>

  <div class="swal-form-group">
    <label>Remarks <span style="color:red">*</span></label>
    <textarea id="swal-remarks" class="swal2-textarea swal-outline-textarea"
      placeholder="Enter remarks..."></textarea>
  </div>
</div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#2196f3',
      cancelButtonColor: '#9e9e9e',
      customClass: {
        popup: 'swal-outline-popup',
        confirmButton: 'swal-outline-confirm',
        cancelButton: 'swal-outline-cancel'
      },
      didOpen: () => {
        (document.getElementById('swal-remarks') as HTMLTextAreaElement)?.focus();
      },
      preConfirm: () => {
        const remarks = (document.getElementById('swal-remarks') as HTMLTextAreaElement)?.value.trim();
        if (!remarks) {
          Swal.showValidationMessage('⚠️ Remarks are required!');
          return false;
        }
        return { action, remarks, element };
      }
    }).then(result => {
      if (result.isConfirmed && result.value) {
        debugger
        const filteredData = this.linearray2
          .filter(item => item.ASNReqNum === element.ASNReqNum)
          .map(item => {
            item.ASNStatus = action;
            if (action == 'Approve') {
              item.ApprovalRemarks = result.value.remarks;
            }
            else if (action == 'Reject') {
              item.RejectionRemarks = result.value.remarks;
            }
            else if (action == 'Hold') {
              item.HoldRemarks = result.value.remarks;
            }
             delete item.OpenQty;
            return item; // return the updated item
          });

        let Post = { Header_Name: this.HeaderTable, TransType: this.TransType, postData: filteredData }
        this.dataService.CreationAPI(Post).pipe(
          catchError((error) => {
            if (error.name === 'TimeoutError') {
              console.error('Request timed out');
              this.spinner.hide();
              this.toastr.danger("An error occurred:", "Request timed out");
            } else {
              console.error('An error occurred:', error.statusText);
              this.spinner.hide();
              this.toastr.danger("An error occurred:", error.statusText);
            }
            return throwError(() => error);
          })
        ).subscribe((data) => {
          console.log(data.data[0])
          debugger
          if (data.success == true) {
            this.spinner.hide();
            this.toastr.success("success", "Asn " + action +" Sucessfully!!!!!   ")
            this.linearray2 = []
            debugger
            this.getASNApprovalList()
          } else {
            this.spinner.hide();
            this.toastr.danger("error", data.data[0].message);
          }
        })
        // Swal.fire({
        //   icon: 'success',
        //   title: `${result.value.action} Successful`,
        //   text: 'Your response has been recorded!',
        //   confirmButtonColor: '#2196f3'
        // });
      }
    });
  }


}
