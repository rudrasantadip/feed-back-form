import { Injectable } from '@angular/core';
import { Participant } from '../models/participant';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private apiUrl='http://localhost:3000/participants/save';
  private prodUrl='https://feed-back-form-backend.onrender.com/participants/save'
  constructor(private http:HttpClient) { }

  sendData(data:Participant):Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.prodUrl,data,{headers,observe:'response'})
    .pipe(
      map((response:HttpResponse<any>)=>{
        return {
          body:response.body,
          status:response.status
        }
      })
    );
  }
}
