import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../MaterialModule';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
//import { MatTableExporterModule } from 'mat-table-exporter';
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
import { ServicesService } from '../../../API/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from "xlsx";
@Component({
  selector: 'app-po',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, NgApexchartsModule,],
  templateUrl: './po.component.html',
  styleUrl: './po.component.scss'
})
export class PoComponent {


  constructor(
    private dataService: ServicesService,
    private spinner: NgxSpinnerService,) {

  }
  dataSource = new MatTableDataSource<any>([]);
  ListColumns: any = []
  vendor: any = []
  SPName: any = 'INUR_GetPoOverViewDatas'
  UserType: any;
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
    this.getPoOverViewList()

  }


  getPoOverViewList() {
    this.spinner.show();
    var post = {
      vendor: this.vendor,
      fromdate: this.Filter.fromdate,
      todate: this.Filter.todate,
      UserType: this.UserType

    }
    let Parameter: any = JSON.stringify(post)
 
    this.dataService.PoOverviewReport(this.SPName, Parameter).subscribe((res) => {

      this.spinner.hide();
      let data = res.data
      console.log(data)
      this.ListColumns = Object.keys(data[0])
      this.dataSource = new MatTableDataSource<any>(data)
    })

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
}




