import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExcelExportService {
  constructor() {}

  exportToExcel(dataSets: any[], sheetNames: string[], fileName: string): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    dataSets.forEach((data, index) => {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetNames[index] || `Sheet${index + 1}`);
    });

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  exportToExcelmultidatasource(array1: any[], array2: any[], fileName: string): void {
    const excelData: any[][] = [];
    // Find max length to ensure all rows are included
    const maxLength = Math.max(array1.length, array2.length);

    for (let i = 0; i < maxLength; i++) {
        if (i === 0) {
            excelData.push(Object.keys(array1[0])); // Add User header once
          }

      if (array1[i]) {
        excelData.push(Object.values(array1[i])); // Push only product values (No headers)
      }
      if (array2[i]) {
       // excelData.push(productHeader);
        excelData.push(Object.values(array2[i])); // Push only user values (No headers)
      }
    }

    // Convert array to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(excelData);

    // Create workbook and append the sheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate and save the Excel file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, fileName + '.xlsx');
  }
}