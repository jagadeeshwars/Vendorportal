import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../MaterialModule';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SAMPLE_DATA } from './sampledata';
import { NgSelectModule } from '@ng-select/ng-select';
export interface LEDL_ASNR {
  Attachment?: any;
}
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
  Header: LEDL_ASNR = {}
  selectedCar: number = 1;

  Transport = [
    {Code:'B' , Name :'Bike'},
    {Code:'B' , Name :'Bike'},
    {Code:'B' , Name :'Bike'}, {Code:'B' , Name :'Bike'}
  ];
  Status:any = []
  DeliverydisplayedColumns: any = [];
  DeliverydataSource!: MatTableDataSource<any>;
  DeliveryTableArray: any = [{}];
  PackingType: any = [ ];
  ShipmentdisplayedColumns: string[] = [];
  ShipmentdataSource!: MatTableDataSource<any>;

  selectedIndex: any = 0;
  onTabChanged(event: any) {
    // this.selectedIndex = this.selectedIndex - 1;
    console.log("index", event.index);
  }
  isActive = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('attach') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.Header.Attachment = input.files[0];
      // Optional: Upload logic here
      console.log('Selected file:', this.Header.Attachment.name);
    }
  }
  DeliveryEntrydata = [
    {
      Code: '',
      LineId: 1,
      Action: '',
      PoNumber: '',
      Plant: '',
      PlantName: '',
      MaterialCode: '',
      MaterialName: '',
      OldPartNo: '',
      InvoiceQty: '',
      ToleranceQty: '',
      UnitPrice: '',
      TotalValue: '',
      DeliveryDate: '',
      NoofPack: '',
      PackingQty: '',
      PackingType: '',
      NetWeight: '',
      GrossWeight: '',
      Remarks: '',
      RelevantDeliveryDate: '',
    },
  ];



  constructor(
    public dialog: MatDialog,


  ) {


  }

  ngOnInit(): void {
    this.DeliverydisplayedColumns = ShowColumn.map((Col) => Col.Column);
    this.DeliveryTableArray = ShowColumn;

    if (SAMPLE_DATA.length > 0) {
      this.ShipmentdisplayedColumns = Object.keys(SAMPLE_DATA[0]);
      this.ShipmentdataSource = new MatTableDataSource(SAMPLE_DATA);
    }

  }


  ngAfterViewInit(): void {
    this.DeliverydataSource = new MatTableDataSource<any>(this.DeliveryEntrydata);

  }

  Addrow(rowIndex: number) {
    let Code: string = 'EQPM';
    let DeliveryLineNumber: number = this.DeliveryEntrydata.length;
    if (rowIndex === this.DeliveryEntrydata.length - 1) {
      const numericCode = (DeliveryLineNumber + 1).toString().padStart(3, '0');
      const newCode = Code + numericCode;
      const newRow: any = {
        Action: '',
        PoNumber: '',
        Plant: '',
        PlantName: '',
        MaterialCode: '',
        MaterialName: '',
        OldPartNo: '',
        InvoiceQty: '',
        ToleranceQty: '',
        UnitPrice: '',
        TotalValue: '',
        DeliveryDate: '',
        NoofPack: '',
        PackingQty: '',
        PackingType: '',
        NetWeight: '',
        GrossWeight: '',
        Remarks: '',
        RelevantDeliveryDate: '',
        LineId: DeliveryLineNumber + 1,
        Active: 'Y',
      };
      this.DeliveryEntrydata.push(newRow);
      this.DeliverydataSource.data = [...this.DeliveryEntrydata];
    }
  }

  @ViewChild('Shipment') dialogTemplate!: TemplateRef<any>;
  openDialog1(item: any, element: any): void {
    if (item == 'Open') {
      const dialogRef = this.dialog.open(this.dialogTemplate, {
        width: '1000px',

        // height: '430px',
        data: { item, element }
      });



    } else {
      this.dialog.closeAll();

    }

  }

}




export const ShowColumn = [
  {
    Column: 'SINo',
    type: 'sno',
    Description: 'S.No',
    visible: true,
    readonly: false,
  },
  {
    Column: 'Action',
    type: 'check',
    length: 40,
    Description: 'Action',
    visible: true,
    readonly: false,
  },
  {
    Column: 'PoNumber',
    type: 'text1',
    Description: 'Po Number',
    length: 30,
    visible: true,
    readonly: true,
  },
  {
    Column: 'Plant',
    type: 'text1',
    Description: 'Plant',
    length: 30,
    visible: true,
    readonly: true,
  },
  {
    Column: 'PlantName',
    type: 'text1',
    Description: 'Plant Name',
    length: 30,
    visible: true,
    readonly: true,
  },
  {
    Column: 'MaterialCode',
    type: 'text1',
    Description: 'Material Code',
    length: 50,
    visible: true,
    readonly: true,
  },

  {
    Column: 'MaterialName',
    type: 'text1',
    Description: 'Material Name',
    length: 40,
    visible: true,
    readonly: true,
  },
  {
    Column: 'OldPartNo',
    type: 'text1',
    Description: 'Old Part No',
    length: 100,
    visible: true,
    readonly: true,
  },
  {
    Column: 'InvoiceQty',
    type: 'text1',
    Description: 'Invoice Qty',
    length: 100,
    visible: true,
    readonly: true,
  },
  {
    Column: 'ToleranceQty',
    type: 'text1',
    Description: 'Tolerance Qty',
    length: 100,
    visible: true,
    readonly: true,
  },
  {
    Column: 'UnitPrice',
    type: 'text1',
    Description: 'Unit Price',
    length: 100,
    visible: true,
    readonly: true,
  },
  {
    Column: 'TotalValue',
    type: 'text',
    Description: 'TotalValue',
    length: 100,
    visible: true,
    readonly: false,
  },
  {
    Column: 'DeliveryDate',
    type: 'date',
    Description: 'Delivery Date',
    length: 100,
    visible: true,
    readonly: true,
  },
  {
    Column: 'NoofPack',
    type: 'text',
    Description: 'No of Pack',
    length: 100,
    visible: true,
    readonly: false,
  },
  {
    Column: 'PackingQty',
    type: 'text',
    Description: 'Packing Qty',
    length: 100,
    visible: true,
    readonly: false,
  },
  {
    Column: 'PackingType',
    type: 'select',
    Description: 'Packing Type',
    length: 100,
    visible: true,
    readonly: false,
  },
  {
    Column: 'NetWeight',
    type: 'text',
    Description: 'Net Weight',
    length: 100,
    visible: true,
    readonly: false,
  },
  {
    Column: 'GrossWeight',
    type: 'text',
    Description: 'Gross Weight',
    length: 100,
    visible: true,
    readonly: false,
  },
  {
    Column: 'Remarks',
    type: 'text',
    Description: 'Remarks',
    length: 100,
    visible: true,
    readonly: false,
  },
  {
    Column: 'RelevantDeliveryDate',
    type: 'date',
    Description: 'RelevantDeliveryDate',
    length: 100,
    visible: true,
    readonly: true,
  },
];
