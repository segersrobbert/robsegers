import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-the-storm',
  templateUrl: './the-storm.component.html',
  styleUrls: ['./the-storm.component.scss']
})
export class TheStormComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {

    new Rellax('.rellax');

  }

}
