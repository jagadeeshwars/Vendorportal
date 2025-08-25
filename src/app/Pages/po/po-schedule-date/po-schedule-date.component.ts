
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
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from '../../../API/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as XLSX from "xlsx";

export interface INUR_OPORSC {
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
  UpdatedBy?: any
  ScheduleDate?: any
  ScheduleQty?: any
  ScheduleLine?: any
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
      Description: 'Po LineNumber',
      visible: true,
      readonly: true,
    }
    ,
    {
      Column: 'Quantity',
      type: 'Text',
      Description: 'Po Qty',
      visible: true,
      readonly: true,
    }
    ,
    {
      Column: 'DeliveryDate',
      type: 'Text',
      Description: 'Delivery Date',
      visible: true,
      readonly: true,
    },
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
      Column: 'Add',
      Description: 'Add',
    },
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
    }
    ,
    // {
    //   Column: 'PoConfirmed',
    //   type: 'CheckBox',
    //   Description: 'Confirmation',
    //   visible: true,
    //   readonly: true,
    // }

  ]

@Component({
  selector: 'app-po-schedule-date',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, NgApexchartsModule],
  templateUrl: './po-schedule-date.component.html',
  styleUrl: './po-schedule-date.component.scss'
})
export class PoScheduleDateComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) newPaginator!: MatPaginator;
  displayedColumns: string[] = [];
  expandedElement: any | null = null;
  dataSource!: MatTableDataSource<any>;
  newTableDataSource!: MatTableDataSource<any>;
  innerTableDataSource!: MatTableDataSource<any>;
  displayedColumns1: string[] = [];
  ReportData = [];
  innerTableColumns: string[] = [
  ];
  linearray1: Array<any> = [];
  linearray2: Array<any> = [];
  DetailData: any = [{}];
  DetailData1: any = [{}];
  SerialNo: any = 0;
  vendor: any = [];
  ListColumns: any = [];
  SPName: any = 'INUR_GetPoSchduleDatas'
  UserType: any;
  HeaderTable: any = 'INUR_OPORSC';
  TransType: any = 'T'
  PoConfirmationData: INUR_OPORSC = {};
  date = new Date();
  Filter: any = {
    fromdate: '',
    todate: ''
  };
  getLoginDetails: any;
  @ViewChild(MatSort) sort!: MatSort;

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
    this.getSchdulePoList()

  }

  getSchdulePoList() {
    this.spinner.show();
    var post = {
      vendor: this.vendor,
      fromdate: this.Filter.fromdate,
      todate: this.Filter.todate,
      UserType: this.UserType
    }
    let Parameter: any = JSON.stringify(post)

    this.dataService.PoSchduledata(this.SPName, Parameter).subscribe((res) => {

      if (res.success == true) {
        this.spinner.hide();
        let data = res.data[0].PoConfirmationList
        debugger
        console.log(data)
        this.linearray1 = !!JSON.parse(data) ?JSON.parse(data) :[];
         this.linearray2 = !!JSON.parse(res.data[0].Scheduledatas) ? JSON.parse(res.data[0].Scheduledatas) :[];
        this.newTableDataSource = new MatTableDataSource<any>(this.linearray1)
        this.innerTableDataSource = new MatTableDataSource<any>([{}])
      }
      else {
        this.spinner.hide();
        this.toastr.danger("error", res.data[0].message);
      }
    })

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
        CreatedBy: this.getLoginDetails.EmployeeCode,
        CardCode: this.expandedElement.CardCode,
        CardName: this.expandedElement.CardName,
        ItemCode: this.expandedElement.ItemCode,
        ItemName: this.expandedElement.ItemName,
        PoNum: this.expandedElement.PoNum,
        PoLineNum: this.expandedElement.PoLineNum,
        Quantity: this.expandedElement.Quantity,
        DeliveryDate: this.expandedElement.DeliveryDate,
        POValue: this.expandedElement.POValue,
        ScheduleQty: 0,//this.expandedElement.Quantity,
        ScheduleDate: this.expandedElement.DeliveryDate,
        ScheduleLine: (this.expandedElement.PoNum + '_' + this.expandedElement.PoLineNum + '_SC' + 1),
        POEntry: this.expandedElement.POEntry,

      });
    }
    else if (this.linearray2.length > 0) {
      let filterdt = this.linearray2.filter((D: any) => {
        return D.POEntry == this.expandedElement.POEntry && D.PoLineNum == this.expandedElement.PoLineNum
      })
      if (filterdt.length == 0) {
        let numRows = !!this.innerTableDataSource.data.length ? this.innerTableDataSource.data.length : 0;
        this.linearray2.push({
          CreatedBy: this.getLoginDetails.EmployeeCode,
          CardCode: this.expandedElement.CardCode,
          CardName: this.expandedElement.CardName,
          ItemCode: this.expandedElement.ItemCode,
          ItemName: this.expandedElement.ItemName,
          PoNum: this.expandedElement.PoNum,
          PoLineNum: this.expandedElement.PoLineNum,
          Quantity: this.expandedElement.Quantity,
          DeliveryDate: this.expandedElement.DeliveryDate,
          POValue: this.expandedElement.POValue,
          ScheduleQty: 0,//this.expandedElement.Quantity,
          ScheduleDate: this.expandedElement.DeliveryDate,
          ScheduleLine: (this.expandedElement.PoNum + '_' + this.expandedElement.PoLineNum + '_SC' + 1),
          POEntry: this.expandedElement.POEntry,

        });
      }
    }
    let filterdt1 = this.linearray2.filter((D: any) => {
      return D.POEntry == this.expandedElement.POEntry && D.PoLineNum == this.expandedElement.PoLineNum
    })

    this.innerTableDataSource.data = filterdt1
  }

  addRow(lindata: any) {
    const TotalQty = this.linearray2
      .filter((data: any) => lindata.POEntry === data.POEntry && lindata.PoLineNum == data.PoLineNum)
      .reduce((sum: number, val: any) => sum + Number(val.ScheduleQty ?? 0), 0);
    let BalReqQty = lindata.Quantity
    if (TotalQty < BalReqQty) {
      let numRows = !!this.innerTableDataSource.data.length ? this.innerTableDataSource.data.length : 0;
      this.linearray2.push({
        CreatedBy: this.getLoginDetails.EmployeeCode,
        CardCode: this.expandedElement.CardCode,
        CardName: this.expandedElement.CardName,
        ItemCode: this.expandedElement.ItemCode,
        ItemName: this.expandedElement.ItemName,
        PoNum: this.expandedElement.PoNum,
        PoLineNum: this.expandedElement.PoLineNum,
        Quantity: this.expandedElement.Quantity,
        DeliveryDate: this.expandedElement.DeliveryDate,
        ScheduleQty: 0,//this.expandedElement.Quantity,
        ScheduleDate: this.expandedElement.DeliveryDate,
        ScheduleLine: (this.expandedElement.PoNum + '_' + this.expandedElement.PoLineNum + '_SC' + (numRows + 1)),
        POEntry: this.expandedElement.POEntry,
        POValue: this.expandedElement.POValue,
      });

      let filterdt1 = this.linearray2.filter((D: any) => {
        return D.POEntry == lindata.POEntry && D.PoLineNum == lindata.PoLineNum
      })
      this.innerTableDataSource.data = filterdt1
    }


  }

  ReqQtyValidation(element: any, lineID: any, Qty: any, Type: any) {
    debugger

    const TotalQty = this.linearray2
      .filter((data: any) => element.POEntry === data.POEntry && element.PoLineNum == data.PoLineNum)
      .reduce((sum: number, val: any) => sum + Number(val.ScheduleQty ?? 0), 0);
    let BalReqQty = element.Quantity
    if (TotalQty > BalReqQty) {
      this.linearray2[this.linearray2.length - 1].ScheduleQty = 0

      this.toastr.warning("warning", 'Schedule Quantity should not be greater than PO Qty...');

    }

  }

  AddPOSchedule() {
    this.spinner.show();
    const filteredData = this.linearray2.filter(item => item.ScheduleQty > 0 && item.ScheduleDate !== null && item.ScheduleDate !== undefined);
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
        this.toastr.success("success", "Po Scheduled Sucessfully!!!!!   ")
         this.linearray1 = []
        this.linearray2 = []
        debugger
        this.getSchdulePoList()
      } else {
        this.spinner.hide();
        this.toastr.danger("error", data.data[0].message);
      }
    })

  }

  Clear() {
    this.linearray1 = [];
    this.linearray2 = [];
    this.getSchdulePoList()
  }
}


