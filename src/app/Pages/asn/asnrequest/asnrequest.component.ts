import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../MaterialModule';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { ServicesService } from '../../../API/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from "xlsx";
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
export interface INUR_ASNR {
  DocEntry?: any
  CardCode?: any
  CardName?: any
  PoNum?: any
  CreatedBy?: any
  POEntry?: any
  PoLineNum?: any
  ItemCode?: any
  ItemName?: any
  Quantity?: any
  DeliveryDate?: any
  POValue?: any
  ASNQty?: any
  ScheduleLine?: any
  ScheduleQty?: any
  ScheduleDate?: any
  DeliveryASNQty?: any
  DeliveryASNDate?: any
  DeliveryTAT?: any
  ApprovalTAT?: any
  ModeOfTransport?: any
  ASNReqNum?: any
}
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
      Column: 'PoNum',
      type: 'Text',
      Description: 'Purchase Order',
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
      Column: 'ScheduleLine',
      type: 'Text',
      Description: 'Schedule Line',
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
      Column: 'ScheduleQty',
      type: 'Text1',
      Description: 'Schedule Qty',
      visible: true,
      readonly: true,
    },

    {
      Column: 'ScheduleDate',
      type: 'date',
      Description: 'Schedule Date',
      visible: true,
      readonly: true,
    },
    {
      Column: 'DeliveryASNQty',
      type: 'Text2',
      Description: 'Delivery Qty',
      visible: true,
      readonly: false,
    }
    ,
    {
      Column: 'DeliveryASNDate',
      type: 'date1',
      Description: 'Exp Delivery Date',
      visible: true,
      readonly: true,
    }
    , {
      Column: 'ModeOfTransport',
      type: 'Transport',
      Description: 'Mode of Transport',
      visible: true,
      readonly: false,
    }
    , {
      Column: 'DeliveryTAT',
      type: 'Text',
      Description: 'Delivery TAT',
      visible: true,
      readonly: false,
    }
    , {
      Column: 'ApprovalTAT',
      type: 'Text',
      Description: 'Approval TAT',
      visible: true,
      readonly: false,
    }
  ]
@Component({
  selector: 'app-asnrequest',
  standalone: true,
  imports: [MaterialModule, HttpClientModule,
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  templateUrl: './asnrequest.component.html',
  styleUrl: './asnrequest.component.scss'
})
export class AsnrequestComponent {
  SerialNo: any = 0
  Transport = [
    { Code: "-", Name: 'Select' },
    { Code: "Road", Name: 'Road' },
    { Code: "AIR", Name: "AIR" },
    { Code: 'Ship', Name: 'Ship' },
    { Code: 'Train', Name: 'Train' },

  ];
  Status: any = []
  PackingType: any = [];
  dataSource = new MatTableDataSource<any>([]);
  ListColumns: any = []
  vendor: any = []
  SPName: any = 'INUR_GetASNRequestDatas'
  UserType: any;
  date = new Date();
  Filter: any = {
    fromdate: '',
    todate: ''
  };
  linearray2: Array<any> = [];
  getLoginDetails: any;
  displayedColumns: string[] = [];
  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private dataService: ServicesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NgToastService,
    private ChangeDef: ChangeDetectorRef,
  ) {
    this.dataSource = new MatTableDataSource<any>([{}]);
  }
  AddColarr = ["Action", "Select"];
  HeaderTable: any = 'INUR_ASNR';
  TransType: any = 'T'
  ngOnInit(): void {

    var loginDetails: any = localStorage.getItem("LoginDetails");
    this.getLoginDetails = JSON.parse(loginDetails);
    this.vendor = this.getLoginDetails.EmployeeCode;
    this.UserType = this.getLoginDetails.LoginType;
    this.Filter.fromdate = (JSON.stringify(new Date(this.date.getFullYear(), this.date.getMonth(), 2))).slice(1, 11);
    this.Filter.todate = (JSON.stringify(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1))).slice(1, 11);
    this.ListColumns = ShowColumn;
    this.displayedColumns = ShowColumn.map((Col => Col.Column))
    this.getASNRequestList()
  }

  isSticky(column: string): boolean {
    return this.AddColarr.includes(column) ? true : false;
  }



  getASNRequestList() {
    this.spinner.show();
    var post = {
      vendor: this.vendor,
      fromdate: this.Filter.fromdate,
      todate: this.Filter.todate,
      UserType: this.UserType

    }
    let Parameter: any = JSON.stringify(post)

    this.dataService.ASNRequestdata(this.SPName, Parameter).subscribe((res) => {
      debugger
      if (res.success == true) {
        this.spinner.hide();
        let data = res.data
        console.log(data)
        this.linearray2 = data.flatMap((item: { InnerData: string; }) => JSON.parse(item.InnerData));
        this.dataSource = new MatTableDataSource<any>(this.linearray2)

      }
      else {
        this.spinner.hide();
        this.toastr.danger("error", res.data[0].message);
      }



    })

  }


  Clear() {
    this.linearray2 = [];
    this.getASNRequestList()
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  exportexcel(): void {
    debugger
    var table: any[] = [];
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-GB').replace(/[/:, ]/g, '-');
    var FileName = 'Po Overview Details ' + '-' + formattedDateTime + '.xlsx'
    XLSX.writeFile(wb, FileName);
  }

  AddANSRequest() {
    this.spinner.show();
    debugger
    const filteredData = this.linearray2
      .filter(item => item.DeliveryASNQty > 0 && item.DeliveryASNDate !== null && item.DeliveryASNDate !== undefined)
      .map(({ OpenQty, ...rest }) => rest);
    let Post = { Header_Name: this.HeaderTable, TransType: this.TransType, postData: filteredData }
    this.dataService.CreationAPINew(Post).pipe(
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
        this.toastr.success("Success", "ASN Request Created Sucessfully!!!!!   ")
        this.linearray2 = []
        debugger
        this.getASNRequestList()
      } else {
        this.spinner.hide();
        this.toastr.danger("Error", data.data[0].message);
      }
    })

  }


  ReqQtyValidation(element: any) {
    debugger
    let Openqty = element.OpenQty
    let DeliveryASNQty = element.DeliveryASNQty
    if (DeliveryASNQty > Openqty) {
      element.DeliveryASNQty = 0

      this.toastr.warning("warning", 'ASN Delivery Quantity should not be greater than Schedule Quantity...');

    }

  }
}

