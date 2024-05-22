import { Injectable } from '@angular/core';
import { Participant } from '../models/participant';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private apiUrl='http://localhost:3000/participants/save';
  constructor(private http:HttpClient) { }

  sendData(data:Participant):Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl,data,{headers});
  }
}
