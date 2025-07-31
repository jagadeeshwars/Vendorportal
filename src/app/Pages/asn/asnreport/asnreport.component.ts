import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SAMPLE_DATA } from './sampledata';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../MaterialModule';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-asnreport',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,MaterialModule,NgSelectModule],
  templateUrl: './asnreport.component.html',
  styleUrl: './asnreport.component.scss'
})
export class AsnreportComponent {
  Transport:any=[]
@ViewChild('MatPaginator') paginator!: MatPaginator;
  ReportdisplayedColumns: any = [];
  ReportdataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    if (SAMPLE_DATA.length > 0) {
      this.ReportdisplayedColumns = Object.keys(SAMPLE_DATA[0]);
      this.ReportdataSource = new MatTableDataSource(SAMPLE_DATA);
    }
    this.ReportdataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.ReportdataSource.paginator = this.paginator;
    this.ReportdataSource.sort = this.sort;
  }
  demo(){
    
  }
}
