import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherEvalService {

  private headers: HttpHeaders;

  constructor(private _http: HttpClient) {

  }

  get(url: string) {
    this.headers = new HttpHeaders()
        .set('X-Requested-With', 'XMLHttpRequest')
        .append('Content-Type', 'application/json')
        .append('Accept', 'application/json');
     // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
    url = environment.API_URL_TEACHER_EVAL + url;
    return this._http.get(url, {headers: this.headers});
}

post(url: string, data: any) {
  this.headers = new HttpHeaders()
      .set('X-Requested-With', 'XMLHttpRequest')
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');
  // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
  url = environment.API_URL_TEACHER_EVAL + url;
  return this._http.post(url, data, {headers: this.headers});
}

update(url: string, data: any) {
  this.headers = new HttpHeaders()
      .set('X-Requested-With', 'XMLHttpRequest')
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');
  // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
  url = environment.API_URL_TEACHER_EVAL + url;
  return this._http.put(url, data, {headers: this.headers});
}

delete(url: string) {
  this.headers = new HttpHeaders()
      .set('X-Requested-With', 'XMLHttpRequest')
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');
  // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
  url = environment.API_URL_TEACHER_EVAL + url;
  return this._http.delete(url, {headers: this.headers});
}
}
