import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../MaterialModule';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  NgApexchartsModule
} from 'ng-apexcharts';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from '../../../API/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatPaginator } from '@angular/material/paginator';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as XLSX from "xlsx";

export interface INUR_OPORC {
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
  PoConfirmed?: any
  DeliveryDate?: any
  POValue?: any
  ASNQty?: any
  UpdatedBy?: any

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
      Column: 'POValue',
      type: 'Text',
      Description: 'Po Value',
      visible: true,
      readonly: true,
    }
    // ,{
    //   Column: 'Remarks',
    //   type: 'Text2',
    //   Description: 'Remarks',
    //   visible: true,
    //   readonly: false,
    // }

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
      Column: 'PoNum',
      type: 'Text',
      Description: 'PurchaseOrder No ',
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
      Column: 'PoLineNum',
      type: 'Text',
      Description: 'Po LineNum',
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
      Column: 'DeliveryDate',
      type: 'Text',
      Description: 'Delivery Date',
      visible: true,
      readonly: true,
    },
    {
      Column: 'PoConfirmed',
      type: 'CheckBox',
      Description: 'Confirmation',
      visible: true,
      readonly: true,
    }

  ]
@Component({
  selector: 'app-po-confirmation',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, NgApexchartsModule],
  templateUrl: './po-confirmation.component.html',
  styleUrl: './po-confirmation.component.scss'
})

export class PoConfirmationComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) newPaginator!: MatPaginator;
  displayedColumns: string[] = [];
  expandedElement: any | null = null;
  dataSource!: MatTableDataSource<any>;
  newTableDataSource!: MatTableDataSource<any>;
  innerTableDataSource!: MatTableDataSource<any>;
  displayedColumns1: string[] = [];
  ReportData = [];
  ChildrenData = [
    {
      'S.No': '1',
      'Plant': '0',
      'Required Qty': '0',
      'Confirmed Qty': '0',
      'Balance Qty': '0',
      'Delivery Date': '0',
      'Remarks for Unit': '0',
      'Action': '',
    },

  ]
  innerTableColumns: string[] = [
  ];
  linearray2: Array<any> = [];
  DetailData: any = [{}];
  DetailData1: any = [{}];
  SerialNo: any = 0;
  vendor: any = [];
  ListColumns: any = [];
  SPName: any = 'INUR_GetPoConfirmationDatas'
  UserType: any;
  HeaderTable: any = 'INUR_OPORC';
  TransType: any = 'T'
  PoConfirmationData: INUR_OPORC = {};

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
    this.dataSource = new MatTableDataSource<any>(this.ReportData);
    this.newTableDataSource = new MatTableDataSource<any>([{}]);
    this.innerTableDataSource = new MatTableDataSource<any>(this.ChildrenData);
  }


  date = new Date();
  Filter: any = {
    fromdate: '',
    todate: ''
  };
  getLoginDetails: any;
  @ViewChild(MatSort) sort!: MatSort;
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
    this.getPoList()

  }



  getPoList() {
    this.spinner.show();
    var post = {
      vendor: this.vendor,
      fromdate: this.Filter.fromdate,
      todate: this.Filter.todate,
      UserType: this.UserType

    }
    let Parameter: any = JSON.stringify(post)

    this.dataService.PoConfirmationdata(this.SPName, Parameter).subscribe((res) => {
      debugger
      if (res.success == true) {
        this.spinner.hide();
        let data = res.data
        console.log(data)
        //this.DetailData = Object.keys(data[0])

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


  Clear() {
    this.linearray2 = [];
    this.getPoList()
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  toggleRow(element: any) {

    this.expandedElement = this.expandedElement === element ? null : element;
    if (this.linearray2.length == 0) {
      let numRows = !!this.innerTableDataSource.data.length ? this.innerTableDataSource.data.length : 0;
      this.linearray2.push({
        //DocEntry: 0,
        CreatedBy: this.getLoginDetails.UserName
        //LineID: 1,
        //ItemCode: this.expandedElement.ItemCode,
        // UniqID: this.expandedElement.LineID,

      });
    }
    else if (this.linearray2.length > 0) {
      let filterdt = this.linearray2.filter((D: any) => {
        return D.PoNum == this.expandedElement.PoNum
      })
      if (filterdt.length == 0) {
        let numRows = !!this.innerTableDataSource.data.length ? this.innerTableDataSource.data.length : 0;
        this.linearray2.push({
          // DocEntry: 0,
          CreatedBy: this.getLoginDetails.UserName
          //LineID: 1,
          //ItemCode: this.expandedElement.ItemCode,
          // UniqID: this.expandedElement.LineID,

        });
      }
    }
    let filterdt1 = this.linearray2.filter((D: any) => {
      return D.PoNum == this.expandedElement.PoNum
    })

    this.innerTableDataSource.data = filterdt1
  }

  AddPOConfirmation() {
    this.spinner.show();

    const filteredData = this.linearray2.filter(item => item.PoConfirmed === true);
    let Details1: any = this.linearray2
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
        this.toastr.success("success", "Po Confirmed Sucessfully!!!!!   ")
        this.linearray2 = []
        debugger
        this.getPoList()
      } else {
        this.spinner.hide();
        this.toastr.danger("error", data.data[0].message);
      }
    })

  }

   exportexcel(): void {
      debugger
      var table: any[] = [];
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.innerTableDataSource.filteredData);
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      /* save to file */
      const now = new Date();
      const formattedDateTime = now.toLocaleString('en-GB').replace(/[/:, ]/g, '-');
      var FileName = 'Po Confirmation Details ' + '-' + formattedDateTime + '.xlsx'
      XLSX.writeFile(wb, FileName);
    }
}


