import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenverifyService {

  apiUrl:string='http://localhost:3000/captcha/verify';
  prodUrl:string='https://feed-back-form-backend.onrender.com/captcha/verify';

  constructor(private http:HttpClient) 
  {

  }


  verifyToken(token:string):Observable<any>
  {
      const data={
        "token": token
      }
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.post(this.prodUrl,data,{headers});
  }

}
