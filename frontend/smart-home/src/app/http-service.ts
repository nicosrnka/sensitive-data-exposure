import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private APIURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  public getAllTempDevices(): Promise<any> {
    return this.http
      .get<any>(this.APIURL + 'temp-devices')
      .toPromise();
  }

  public getAllGeneralDevices(): Promise<any> {
    return this.http
      .get<any>(this.APIURL + 'general-devices')
      .toPromise();
  }

  public login(username : string, password : string): Promise<any> {
    return this.http
      .post<any>(this.APIURL + 'user/login', {userName : username, password : password})
      .toPromise();
  }

  public createNewTempDevice(name : string, status : boolean, temp : number): Promise<any> {
    return this.http
      .post<any>(this.APIURL + 'temp-devices', {name : name, status : status, temp : temp})
      .toPromise();
  }

  public createNewGeneralDevice(name : string, status : boolean): Promise<any> {
    return this.http
      .post<any>(this.APIURL + 'general-devices', {name : name, status : status})
      .toPromise();
  }

  public updateGeneralDevice(name : string, status : boolean, id : string): Promise<any> {
    var tmp = [{"propName": "name", "value" : name}, {"propName": "status", "value" : status}];
    return this.http
      .patch<any>(this.APIURL + 'general-devices/' + id, tmp)
      .toPromise();
  }

  public updateTempDevice(name : string, status : boolean, temp : number, id : string): Promise<any> {
    var tmp = [{"propName": "name", "value" : name}, {"propName": "temp", "value" : temp}, {"propName": "status", "value" : status}];
    return this.http
      .patch<any>(this.APIURL + 'temp-devices/' + id, tmp)
      .toPromise();
  }

}
