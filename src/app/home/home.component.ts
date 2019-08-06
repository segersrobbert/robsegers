import {
  Component,
  AfterViewInit,
} from '@angular/core';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor() {
    console.log('https://github.com/dixonandmoe/rellax');
  }

  ngAfterViewInit() {

    new Rellax('.rellax', {
      speed: -2,
      vertical: false,
      horizontal: true
    });

  }

}
