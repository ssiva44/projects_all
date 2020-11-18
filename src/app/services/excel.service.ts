import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportNoticesExcelFile(json: any[], excelFileName: string, tableHeaders: any[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
	worksheet['A1'].v = tableHeaders[0];
	worksheet['B1'].v = tableHeaders[1];
	worksheet['C1'].v = tableHeaders[2];
	worksheet['D1'].v = tableHeaders[3];
	
    const workbook: XLSX.WorkBook = { Sheets: { 'Notice Search Results': worksheet }, SheetNames: ['Notice Search Results'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
	
  }
  
  public exportPlanExcelFile(json: any[], excelFileName: string, tableHeaders: any[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

	worksheet['A1'].v = tableHeaders[0];
	worksheet['B1'].v = tableHeaders[1];
	worksheet['C1'].v = tableHeaders[2];
	worksheet['D1'].v = tableHeaders[3];
	
	
    const workbook: XLSX.WorkBook = { Sheets: { 'Plans': worksheet }, SheetNames: ['Plans'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  

  
    public exportContractExcelFile(json: any[], excelFileName: string, tableHeaders: any[],projectId: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

	worksheet['A1'].v = tableHeaders[0];
	worksheet['B1'].v = tableHeaders[1];
	worksheet['C1'].v = tableHeaders[2];
	worksheet['D1'].v = tableHeaders[3];
	worksheet['E1'].v = tableHeaders[4];
	worksheet['F1'].v = tableHeaders[5];
	worksheet['G1'].v = tableHeaders[6];
	worksheet['H1'].v = tableHeaders[7];
	worksheet['I1'].v = tableHeaders[8];
	worksheet['J1'].v = tableHeaders[9];
	
    const workbook: XLSX.WorkBook = { Sheets: { 'Contract Data': worksheet }, SheetNames: ['Contract Data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  public exportProjectsExcelFile(json: any[], excelFileName: string, tableHeaders: any[], titleLinks: any[]): void {
   
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

	worksheet['A1'].v = tableHeaders[0];
	worksheet['B1'].v = tableHeaders[1];
	worksheet['C1'].v = tableHeaders[2];
  worksheet['D1'].v = tableHeaders[3];	
  
  for (let i = 0; i < titleLinks.length; i++) {            
    worksheet['A' + (2 + i)].l = { Target: titleLinks[i] };
    worksheet['A' + (2 + i)].s = { color: "red" };
}  

	const workbook: XLSX.WorkBook = { Sheets: { 'Project Documents': worksheet }, SheetNames: ['Project Documents'] };
	
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
	
  }
  
    public exportArchivalExcelFile(json: any[], excelFileName: string, tableHeaders: any[], titleLinks: any[]): void {
   
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

	worksheet['A1'].v = tableHeaders[0];
	worksheet['B1'].v = tableHeaders[1];
	worksheet['C1'].v = tableHeaders[2];
  worksheet['D1'].v = tableHeaders[3];	
  for (let i = 0; i < titleLinks.length; i++) { 
    if(titleLinks[i] !== "")     
    {      
    worksheet['A' + (2 + i)].l = { Target: titleLinks[i] };
    worksheet['A' + (2 + i)].s = { color: "blue" };
    }
}  

	const workbook: XLSX.WorkBook = { Sheets: { 'Archival Records': worksheet }, SheetNames: ['Archival Records'] };
	
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
	
  }

}

