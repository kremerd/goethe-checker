import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  filter,
  interval,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { GoetheService } from './goethe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [AsyncPipe, NgIf, JsonPipe],
})
export class AppComponent implements OnInit {
  readonly REFRESH_INTERVAL = 60;
  timeUntilRefresh$!: Observable<number>;
  lastResponse$!: Observable<unknown>;
  lastResponseSuccessful$!: Observable<boolean>;

  constructor(private readonly goetheService: GoetheService) {}

  ngOnInit(): void {
    this.timeUntilRefresh$ = interval(1000).pipe(
      map((n) => this.REFRESH_INTERVAL - (n % this.REFRESH_INTERVAL) - 1),
      shareReplay(1)
    );

    this.lastResponse$ = this.timeUntilRefresh$.pipe(
      filter((timeUntilRefresh) => timeUntilRefresh === 0),
      startWith(0),
      switchMap(() => this.goetheService.query()),
      shareReplay(1)
    );

    this.lastResponseSuccessful$ = this.lastResponse$.pipe(
      map((response) => Array.isArray(response) && response.length > 0)
    );
  }
}
