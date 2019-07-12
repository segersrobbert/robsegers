import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Granim from 'Granim';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  granimInstance: Granim;

  constructor(
    private router: Router
  ) {
  }

  ngAfterViewInit() {

    const teal = '#004D40';
    const cyan = '#006064';
    const indigo = '#1A237E';
    const deepPurple = '#311B92';
    const purple = '#6A1B9A';
    const pink = '#880E4F';
    const green = '#1B5E20';
    const lightgreen = '#33691E';

    this.granimInstance = new Granim({
      element: '#js-logo-liquidgradient-canvas',
      direction: 'left-right',
      opacity: [1, 1],
      states: {
        'default-state': { gradients: [[teal, cyan]], loop: false, },
        'thefalloffiat': { gradients: [[indigo, deepPurple]], loop: false, },
        'playground': { gradients: [[green, lightgreen]], loop: false, },
      }
    });
  }

  goTo(state: string) {
    this.router.navigate([state]);
    this.granimInstance.changeState(state);
  }

  setGranimState(state: string) {
    this.granimInstance.changeState(state);
  }

}

