import { Component, AfterViewInit } from '@angular/core';
// import * as Granim from 'Granim';

import {
  teal,
  cyan,
  indigo,
  deepPurple,
  green,
  lightgreen
} from './granimColors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  granimInstance: any;

  constructor() {}

  ngAfterViewInit() {

    // this.granimInstance = new Granim({
    //   element: '#js-logo-liquidgradient-canvas',
    //   direction: 'left-right',
    //   opacity: [1, 1],
    //   states: {
    //     'default-state': { gradients: [[teal, cyan]], loop: false, },
    //     'thefalloffiat': { gradients: [[indigo, deepPurple]], loop: false, },
    //     'playground': { gradients: [[green, lightgreen]], loop: false, },
    //   }
    // });
  }

  changeHeaderState(state: string) {
    // this.granimInstance.changeState(state);
  }

  setGranimState(state: string) {
    // this.granimInstance.changeState(state);
  }

}

