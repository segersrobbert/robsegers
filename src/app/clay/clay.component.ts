import { Component, AfterViewInit } from '@angular/core';

import * as clay from './claygl.min';

@Component({
  selector: 'app-clay',
  templateUrl: './clay.component.html',
  styleUrls: ['./clay.component.scss']
})
export class ClayComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {

    const app = clay.application.create('#clayCanvas', {

      graphic: {
        shadow: true,
        tonemapping: true,
        linear: true
      },

      init: function (app) {
        this._camera = app.createCamera([2, 1, -2.6], [0, 0, 0]);
        app.createDirectionalLight([-1, -1, -1]);
        this._control = new clay.plugin.OrbitControl({
          target: this._camera,
          domElement: app.container
        });

        app.createAmbientCubemapLight('../../assets/clayModel/pisa.hdr', 1, 1);
        return app.loadModel('../../assets/clayModel/model.gltf');
      },

      loop: function (app) {
        this._control.update(app.frameTime);
      }
    });

  }

}

