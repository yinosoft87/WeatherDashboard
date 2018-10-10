import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IDayTemperature } from './IDayTemperature';

@Injectable()
export class WDashboardService {

  private apiURL = this.baseUrl + "api/WeatherBit/GetListTemperatures";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  GetListTemperatures(cname: string, utemp: string): Observable<IDayTemperature> {
    return this.http.get<IDayTemperature>(this.apiURL + "?cityName=" + cname + "&unitTemp=" + utemp + "");
  }

}
