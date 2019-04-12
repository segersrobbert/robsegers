// https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_draggablecubes.html

import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

import { DragControls } from './three-lib/three.dragcontrols';
import { TrackballControls } from './three-lib/three.trackballcontrolls';
import { Stats } from './three-lib/stats.min';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements AfterViewInit, OnDestroy {

  container;
  stats;
  camera;
  controls;
  scene;
  renderer;
  objects = [];

  constructor() { }

  ngAfterViewInit() {
    this.init();
    this.animate();
  }

  ngOnDestroy() {
    document.body.removeChild(this.container);
  }

  init() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
    this.camera.position.z = 1000;
    this.controls = new TrackballControls(this.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#F5F5F5');
    this.scene.add(new THREE.AmbientLight(0x505050));
    const light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);
    light.angle = Math.PI / 9;
    light.castShadow = true;
    light.shadow.camera.near = 1000;
    light.shadow.camera.far = 4000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this.scene.add(light);
    const geometry = new THREE.BoxBufferGeometry(40, 40, 40);
    for (let i = 0; i < 200; i++) {
      const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
      object.position.x = Math.random() * 1000 - 500;
      object.position.y = Math.random() * 600 - 300;
      object.position.z = Math.random() * 800 - 400;
      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;
      object.scale.x = Math.random() * 2 + 1;
      object.scale.y = Math.random() * 2 + 1;
      object.scale.z = Math.random() * 2 + 1;
      object.castShadow = true;
      object.receiveShadow = true;
      this.scene.add(object);
      this.objects.push(object);
    }
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight - 170);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.container.appendChild(this.renderer.domElement);
    const dragControls = new DragControls(this.objects, this.camera, this.renderer.domElement);
    dragControls.addEventListener('dragstart', () => {
      this.controls.enabled = false;
    });
    dragControls.addEventListener('dragend', () => {
      this.controls.enabled = true;
    });
    this.stats = new Stats();
    this.container.appendChild(this.stats.dom);

    window.addEventListener('resize', this.onWindowResize, false);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    window.requestAnimationFrame(() => {
      this.animate();
    });
    this.render();
    this.stats.update();
  }
  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

}
