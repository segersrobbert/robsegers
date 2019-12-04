import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LineGeneratorService {

  constructor() {
    console.log('Line generator');
  }

  generateLine() {
    console.log('Line generate!');
  }

}
