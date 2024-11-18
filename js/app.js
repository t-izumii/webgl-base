// import * as THREE from 'three';
import * as THREE from '../node_modules/three/build/three.module.js';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';


class app3 {
    constructor() {
        this.container = document.querySelector('main');
        this.scene = new THREE.Scene();
        this.sceneBg = new THREE.Scene();
        this.mouse = new THREE.Vector2(0.5, 0.5);
        this.time = 0;
        this.isPlay = true;
        this.init();
    }

    init() {
        this.mousePosition();
        this.createCamera();
        this.createRenderer();
        this.createMesh();
        this.render();
    }

    get viewport(){
        let width = window.innerWidth;
        let height = window.innerHeight;
        let aspectRatio = width / height;

        return{
            width,
            height,
            aspectRatio
        }
    }

    mousePosition() {
            window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX - this.viewport.width / 2;
            this.mouse.y = this.viewport.height / 2 - event.clientY;
        });
    }

    createCamera() {
        let perspective = 1000;
        let fov = (180 * (2 * Math.atan(this.viewport.height / 2 / perspective))) / Math.PI;
        this.camera = new THREE.PerspectiveCamera(fov, this.viewport.aspectRatio, 1, 1000);
        this.camera.position.z = perspective;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.viewport.width, this.viewport.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
    }
    createMesh() {

    }

    stop() {
        this.isPlay = false;
    }

    start() {
        if(!this.isPlay){
            this.isPlay = true;
            this.render();
        }
    }

    render() {
        if (!this.isPlay) {
            return;
        }
        this.time += 0.01;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }


    lerp(a, b, n) {
        return (1 - n) * a + n * b;
    }

}

new app3();
