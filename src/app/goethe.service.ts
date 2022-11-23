import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoetheService {
  private readonly url = 'https://goethelb.com/api/dates-all?category_id=11';
  constructor(private readonly http: HttpClient) {}

  query(): Observable<any> {
    return this.http.get(this.url);
  }
}
