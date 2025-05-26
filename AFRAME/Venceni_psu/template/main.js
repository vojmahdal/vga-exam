import './style.css'
import 'aframe'
import 'aframe-extras'
import 'aframe-physics-system'
import './components/character'
import './components/obstacle'
import './components/collider-check'
import './components/house'

document.querySelector('#app').innerHTML = `
    <div id="game-over">You lost!</div>
    <div id="game-victory">Výhra!</div>
    <a-scene>
        <!-- External files -->
        <a-assets>
            <a-asset-item id="tree" src="/models/tree/tree.gltf"></a-asset-item>
            <a-asset-item id="char" src="/models/Animated Woman.glb"></a-asset-item>
            <a-asset-item id="house" src="/models/House.glb"></a-asset-item>
            <img src="/models/grass.jpg" id="grass">

            <a-asset-item id="dog1" src="/models/Dog.glb"></a-asset-item>
            <a-asset-item id="dog2" src="/models/Beagle.glb"></a-asset-item>
            <a-asset-item id="dog3" src="/models/Greyhound.glb"></a-asset-item>
        </a-assets>
  
        <!-- Environment -->
        <!--  sky    --> <a-sky color="#eeeeee"></a-sky>
        <!--  ground --> <a-box static-body="friction: 0;" position="0 0 -4" rotation="-90 0 0" width="9" height="9" depth="0.2" material="src: #grass; repeat: 1 1;"></a-box> 
        <!--  tree    <a-entity static-body gltf-model="#tree" position="2 0 -6" scale="0.2 0.2 0.2"></a-entity> 
  -->
        <!-- Camera -->
        <a-entity camera position="0 3 3" rotation="-20 0 0"></a-entity>
        
        <!-- Lights -->
        <a-light type="ambient" color="#888888"></a-light>
        <a-light type="directional" position="0 1 1" intensity="0.5"></a-light>

        <!-- Obstacles -->
        <a-sphere obstacle="strength: 9999" dynamic-body="mass: 0.3;" position="2 1 -3" radius="0.5" color="orange"></a-sphere>
        
        <!-- Houses -->
        <a-entity house="dogName: Buddy; dogModel: dog1; dogScale: 0.1 0.1 0.1" static-body gltf-model="#house" position="-2 0 -6" scale="2 2 2"></a-entity>
        <a-entity house="dogName: Max; dogModel: dog2; dogScale: 0.01 0.01 0.01" static-body gltf-model="#house" position="0 0 -6" scale="2 2 2"></a-entity>
        <a-entity house="dogName: Luna; dogModel: dog3; dogScale: 0.1 0.1 0.1" static-body gltf-model="#house" position="2 0 -6" scale="2 2 2"></a-entity>
       
        <!-- Character -->
        <a-entity character dynamic-body="mass: 1; angularDamping: 1; shape: box;" position="-2 0.4 -3">
            <a-entity gltf-model="#char" animation-mixer="clip: idle;" position="0 0 0" rotation="0 90 0" scale="0.2 0.2 0.2"></a-entity>
            <a-entity raycaster="direction: 1 0 0; far: 2;" position="0 0.5 0" rotation="0 0 0" collider-check></a-entity>
        </a-entity>
    </a-scene>
`