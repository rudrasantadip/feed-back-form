import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from '../models/participant';

@Injectable({
  providedIn: 'root'
})
export class SheetApiService {

 
  private apiUrl = 'https://sheet.best/api/sheets/6de30596-a904-4b76-ad3b-b49736d564a0';
  constructor(private http:HttpClient)
  {

  }

  sendData(data:Participant):Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl, data, { headers });
  }
}
