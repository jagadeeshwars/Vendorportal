import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../MaterialModule';
import { SAMPLE_DATA } from './sampledata';

@Component({
  selector: 'app-asnapproval',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,MaterialModule],
  templateUrl: './asnapproval.component.html',
  styleUrl: './asnapproval.component.scss'
})
export class AsnapprovalComponent {
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
