import alienUrl from '../dist/assets/models/alien2.glb?url' 
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const app = () => {
    const init = () => {
        console.log(navigator.xr);
        if (navigator.xr) {
            document.querySelector('#startAR').addEventListener('click', activateXR);
        } else {
            alert('not comp');
        }
    };

    console.log(alienUrl)

    const activateXR = async () => {
        // create canvas and initialize WebGL Context
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        const gl = canvas.getContext('webgl', {
            xrCompatible: true
        });

        // create scene to draw object on
        const scene = new THREE.Scene();

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set(0, 1, 10);
        scene.add(directionalLight);
        const loader = new GLTFLoader();
        let reticle;
        loader.load(
            'https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf',
            function (gltf) {
                reticle = gltf.scene;
                reticle.visible = false;
                scene.add(reticle);
            }
        );
        
        let alien;
        loader.load (
            alienUrl,
            function(gltf){
                alien = gltf.scene;
                alien.scale.set(0.5,0.5,0.5);
                alien.position.set(0, -1, -2);
                alien.visible = true;
                scene.add(alien);
            }
        )

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            preserveDrawingBuffer: true,
            canvas: canvas,
            context: gl,
        });

        renderer.autoClear = false;

        const camera = new THREE.PerspectiveCamera();
        camera.matrixAutoUpdate = false;

        const session = await navigator.xr.requestSession('immersive-ar', {
            requiredFeatures: ['hit-test'],
        });

        session.updateRenderState({
            baseLayer: new XRWebGLLayer(session, gl),
        });

        session.addEventListener('select', (event) => {
            if (alien) {
                const clone = alien.clone();
                clone.position.copy(reticle.position);
                scene.add(clone);
            }
        });
        const referenceSpace = await session.requestReferenceSpace('local');

        const viewerSpace = await session.requestReferenceSpace('viewer');

        const hitTestSource = await session.requestHitTestSource({
            space: viewerSpace,
        });

        const onXRFrame = (time, frame) => {
            session.requestAnimationFrame(onXRFrame);

            gl.bindFramebuffer(
                gl.FRAMEBUFFER,
                session.renderState.baseLayer.framebuffer
            );

            const pose = frame.getViewerPose(referenceSpace);

            if (pose) {
                const view = pose.views[0];

                const viewport = session.renderState.baseLayer.getViewport(view);
                renderer.setSize(viewport.width, viewport.height);

                camera.matrix.fromArray(view.transform.matrix);
                camera.projectionMatrix.fromArray(view.projectionMatrix);
                camera.updateMatrixWorld(true);

                const hitTestResults = frame.getHitTestResults(hitTestSource);
                if (hitTestResults.length > 0 && reticle) {
                    const hitPose = hitTestResults[0].getPose(referenceSpace);
                    reticle.visible = true;
                    reticle.position.set(
                        hitPose.transform.position.x,
                        hitPose.transform.position.y,
                        hitPose.transform.position.z
                    );
                    reticle.updateMatrixWorld(true);
                }
                renderer.render(scene, camera);
            }
        };
        session.requestAnimationFrame(onXRFrame);
    };

    init();
};

app();