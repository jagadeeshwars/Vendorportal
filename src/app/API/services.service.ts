import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: {},
  body: {},
};
const TIMEOUT_IN_MS = 60000;
const headers = new HttpHeaders({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
});

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient
    , private router: Router,
  ) { }

// Login Api Call  Start


  //Login 
  GetLoginAPI(SPName: any, Parameter: any): Observable<any> {
    return this.http.get<any>(`${environment.apiurl}/GetTransactionData?SPName=${SPName}&&Parameter=${Parameter}`, {
      headers: headers as any,
    });
  }


  ActiveUsers(headeroption: any): Observable<any> {

    return this.http.get<any>(`${environment.apiurl}/activeusers`, headeroption);
  }

  getUserLogin(headeroption: any): Observable<any> {

    return this.http.get<any>(`${environment.apiurl}/login`, headeroption)
  }


  Logout(headeroption: any): Observable<any> {

    return this.http.get<any>(`${environment.apiurl}/logout`, headeroption);
  }

    
  LoginOtp(ToMailId: any, UserId: any): Observable<any> {
    return this.http.get<any>(`${environment.apiurl}/loginotp?ToMailId=${ToMailId}&&UserId=${UserId}`
      , {
        headers: Headers as any,
      })
      .pipe(catchError(this.handleError));;
  }

  
  UserForgot(ToMailId: any, UserId: any): Observable<any> {
    return this.http.get<any>(`${environment.apiurl}/forgot?ToMailId=${ToMailId}&&UserId=${UserId}`
      , {
        headers: Headers as any,
      })
      .pipe(catchError(this.handleError));;
  }

// login Api Call End 


  //Creation 
  CreationAPI(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/PostAPI`, data, {
      headers: headers as any,
    });
  }

  //Creation 
  PostAutorizationAPI(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/PostAutorizationAPI`, data, {
      headers: headers as any,
    });
  }

  //Platmail api 
  PostMailPlantAPI(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/PostMailPlantAPI`, data, {
      headers: headers as any,
    });
  }


  //StockCheckAPI 
  StockCheckAPI(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/StockCeckReqAPI`, data, {
      headers: headers as any,
    });
  }


  //Update 
  UpdateAPI(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/UpdateAPI`, data, {
      headers: headers as any,
    });
  }

  //Update 
  PriceValidation(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/PriceListValidation`, data, {
      headers: headers as any,
    });
  }
  //GetPIdashboardData 
  GetPIData(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/SalesPIReport`, data, {
      headers: headers as any,
    });
  }

  //GetMasterDetailsAPI 
  GetMasterAPI(SPName: any, Parameter: any): Observable<any> {
    return this.http.get<any>(`${environment.apiurl}/GetMasterData?SPName=${SPName}&&Parameter=${Parameter}`, {
      headers: headers as any,
    });
  }

  //GetMasterDetailsAPI 
  GetTransactionAPI(SPName: any, Parameter: any): Observable<any> {
    return this.http.get<any>(`${environment.apiurl}/GetMasterData?SPName=${SPName}&&Parameter=${Parameter}`, {
      headers: headers as any,
    });
  }


  GetNumberingSeries(NumberingSeriesSPName: any, Prefix: any, Object: any, Series: any, UserID: any): Observable<any> {
    return this.http.get<any>(`${environment.apiurl}/GetNumberingseries?SPName=${NumberingSeriesSPName}&&Prefix=${Prefix}&&Object=${Object}&&Series=${Series}&&UserID=${UserID}`, {
      headers: headers as any,
    });
  }

  GetMenuList(SPName: any, Parameter: any): Observable<any> {
    return this.http.get<any>(`${environment.apiurl}/GetTransactionData?SPName=${SPName}&&Parameter=${Parameter}`, {
      headers: headers as any,
    });
  }


  OrderTrackingReport(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/OrderTrackingReport`, data, {
      headers: headers as any,
    });
  }

  GetOrderTracking(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/GetOrderTracking`, data, {
      headers: headers as any,
    });
  }


  //S4 Stock API
  MaterialStockAPI_S4(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/GetStockDetails`, data, {
      headers: headers as any,
    }).pipe(timeout(TIMEOUT_IN_MS) // Apply timeout
    );
  }

  Salesorderposting(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/SalesOrderPosting`, data, {
      headers: headers as any,
    }).pipe(timeout(TIMEOUT_IN_MS) // Apply timeout
    );
  }

  MaterialStockAPI_PI(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/GetStockDetails_PI`, data, {
      headers: headers as any,
    });
  }

  PriceListBulkUpload(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/PriceBulkPosting`, data, {
      headers: headers as any,
    });
  }

  PI_StockCheck(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiurl}/PI_StockCheck`, data, {
      headers: headers as any,
    });
  }

  ExcelUpload(data: any, screen: any): Observable<any> {
    var formData = new FormData();
    formData.append(
      "excelfile",
      data,
      Math.floor(Math.random() * 100) + ".xlsx"
    );
    formData.append("Screen", screen);
    return this.http.post<any>(`${environment.apiurl}/masters/excel`, formData)
      .pipe(catchError(this.handleError));;
  }

  handleError(error: HttpErrorResponse) {
    let msg: any = {};
    if (error.status === 404) {
      msg = { Message: 'User Not Found or API not found', Code: error.status };
    } else if (error.status === 401) {
      // msg= {User Not Authorized to Access', 'Error 401'};
      msg = { Message: 'User Not Authorized to Access', Code: error.status };
    } else if (error.status === 402) {
      // msg= {User Already Logged In', 'Info'};
      msg = { Message: 'User Already Logged In', Code: error.status };
    } else if (error.status === 399) {
      msg = {
        Message:
          'User Forced Logout: Another user attempted to use the same credentials',
        Code: error.status,
      };
      this.router.navigate(['login']);
    } else if (error.status === 403) {
      msg = { Message: 'Access Forbidden', Code: error.status };
    } else if (error.status === 500) {
      msg = { Message: 'Internal Server Error', Code: error.status };
    } else if (error.status === 406) {
      msg = { Message: 'Session Expired', Code: error.status };
    } else {
      msg = {
        Message: error.error.Message,
        FullMessage: `Backend returned code ${error.status}`,
        Code: error.status,
      };
    }
    return throwError(msg);
  }

  //Attachment
  attachService(data: any): Observable<any> {

    let Formdata = new FormData();
    // Array.from(this.AttachmentArray4).forEach((file: any, index: number) => {
    // data.forEach(((ele: any) => {
    Formdata.append('image', data.fileAtt);
    // }))

    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
    });
    return this.http.post<any>(`${environment.apiurl}/attach/store`, Formdata, {
      headers: headers as any,
    });
  }


  //Sync API
  GetExeSync(SPName: any, Parameter: any): Observable<any> {
    return this.http.get<any>(`${environment.apiurl}/GetSyncData`, {
      headers: headers as any,
    });
  }


}

