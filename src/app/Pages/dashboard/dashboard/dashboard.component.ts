import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
import { SAMPLE_DATA } from './sampledata';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MaterialModule,FormsModule,NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  // Po: {
  //   series: ApexAxisChartSeries;
  //   chart: ApexChart;
  //   dataLabels: ApexDataLabels;
  //   plotOptions: ApexPlotOptions;
  //   responsive: ApexResponsive[];
  //   xaxis: ApexXAxis;
  //   legend: ApexLegend;
  //   fill: ApexFill;
  // };

  constructor() {
    // this.Po = {
    //   series: [
    //     {
    //       name: 'Orders',
    //       data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    //     },
    //   ],
    //   chart: {
    //     type: 'bar',
    //     height: 350,
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       columnWidth: '55%',
    //       // endingShape: 'rounded',
    //     },
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 300,
    //         },
    //         legend: {
    //           position: 'bottom',
    //         },
    //       },
    //     },
    //   ],
    //   xaxis: {
    //     categories: [
    //       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'
    //     ],
    //   },
    //   legend: {
    //     position: 'right',
    //     offsetY: 40,
    //   },
    //   fill: {
    //     type: 'gradient',
    //     gradient: {
    //       shade: 'light',
    //       type: 'horizontal',
    //       shadeIntensity: 0.25,
    //       gradientToColors: undefined,
    //       inverseColors: true,
    //       opacityFrom: 0.85,
    //       opacityTo: 0.85,
    //       stops: [50, 0, 100],
    //     },
    //   },
    // };
  }


  date = new Date();
  Filter: any = {
    fromdate: '',
    todate: ''
  };
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    if (SAMPLE_DATA.length > 0) {
           this.ListColumns = Object.keys(SAMPLE_DATA[0]);
           this.dataSource = new MatTableDataSource(SAMPLE_DATA);
         }
       

    this.Filter.fromdate = (JSON.stringify(new Date(this.date.getFullYear(), this.date.getMonth(), 2))).slice(1, 11);
    this.Filter.todate = (JSON.stringify(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1))).slice(1, 11);
    this.getList()
    // this.getgp()
  }


  vendor: any = []

  dataSource = new MatTableDataSource<any>([]);
  ListColumns: any = []
  getList() {
   
    var post = {
      FromDate: this.Filter.fromdate,
      ToDate: this.Filter.todate,
      Vendor: this.vendor,
    }
    let Parameter: any = JSON.stringify(post)
    
  }
  getgp() {
    
  }
  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}


function getPoGrp(data1: any, data2: any) {


  return {
    series: data1,
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    xaxis: {
      type: "category",
      categories: data2
    },
    legend: {
      position: "right",
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  };
}
