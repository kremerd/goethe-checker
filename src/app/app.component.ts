import { Component, OnInit } from '@angular/core';
import { GoetheService } from './goethe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'goethe-checker';

  constructor(private readonly goetheService: GoetheService) {}

  ngOnInit(): void {
    //this.goetheService.query().subscribe(console.log);
  }
}
