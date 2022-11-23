import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoetheService {
  private readonly goetheUrl =
    'https://goethelb.com/api/dates-all?category_id=11';
  private readonly meowFactsUrl = 'https://meowfacts.herokuapp.com/';

  constructor(private readonly http: HttpClient) {}

  query(): Observable<any> {
    return this.http
      .get(this.getUrl())
      .pipe(catchError(() => of('Fehler beim Abfragen der Termine')));
  }

  private getUrl(): string {
    if (isDevMode()) {
      return this.meowFactsUrl;
    } else {
      return this.goetheUrl;
    }
  }
}
