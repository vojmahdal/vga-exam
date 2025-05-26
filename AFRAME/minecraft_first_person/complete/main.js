import './style.css'
import 'aframe'
import 'aframe-extras'
import 'aframe-physics-system'
import './components/character'
import './components/obstacle'
import './components/collider-check'
import './components/log-gltf-animations'

document.querySelector('#app').innerHTML = `
    <div id="game-over">You lost!</div>
    <div id="game-win">You won!</div>
    <a-scene>
        <!-- External files -->
        <a-assets>
             <a-asset-item id="axe" src="/models/Diamond Axe.glb"></a-asset-item>
             <a-asset-item id="pickaxe" src="/models/Diamond Pickaxe.glb"></a-asset-item>
            <img src="/models/grass.jpg" id="grass">
        </a-assets>
  
        <!-- Environment -->
        <!--  sky    --> <a-sky color="#eeeeee"></a-sky>
        <!--  ground --> <a-box static-body="friction: 0;" position="0 0 0" width="20" depth="20" height="0.2" material="color: #90EE90; repeat: 20 20;"></a-box> 
        <!--  water  --> <a-box static-body="friction: 0;" position="0 0.1 0" width="20" depth="2" height="0.2" material="color: #4169E1; repeat: 1 1;"></a-box> 
  
        <!-- Camera -->
       
        <!-- Trees -->
        <a-box obstacle="strength: 9999" static-body position="1.5 1.5 -6" width="1" height="3" depth="1" color="#8B4513" material="opacity: 1"></a-box>
        <a-box obstacle="strength: 9999" static-body position="1.5 4.5 -6" width="4" height="4" depth="4" color="#006400" material="opacity: 1"></a-box>

        <a-box obstacle="strength: 9999" static-body position="-5.0 1.5 -6" width="1" height="3" depth="1" color="#8B4513" material="opacity: 1"></a-box>
        <a-box obstacle="strength: 9999" static-body position="-5.0 4.5 -6" width="4" height="4" depth="4" color="#006400" material="opacity: 1"></a-box>

        <a-box obstacle="strength: 9999" static-body position="-1.0 1.5 -6" width="1" height="3" depth="1" color="#8B4513" material="opacity: 1"></a-box>
        <a-box obstacle="strength: 9999" static-body position="-1.0 4.5 -6" width="4" height="4" depth="4" color="#006400" material="opacity: 1"></a-box>

        <!-- Nové stromy -->
        <a-box obstacle="strength: 9999" static-body position="3.0 1.5 -8" width="1" height="3" depth="1" color="#8B4513" material="opacity: 1"></a-box>
        <a-box obstacle="strength: 9999" static-body position="3.0 4.5 -8" width="4" height="4" depth="4" color="#006400" material="opacity: 1"></a-box>

        <a-box obstacle="strength: 9999" static-body position="-3.0 1.5 -8" width="1" height="3" depth="1" color="#8B4513" material="opacity: 1"></a-box>
        <a-box obstacle="strength: 9999" static-body position="-3.0 4.5 -8" width="4" height="4" depth="4" color="#006400" material="opacity: 1"></a-box>

        <!-- Character -->
        
            <a-entity camera look-controls="enabled: false" player position="0 1.6 0">
            <a-entity gltf-model="#axe" log-gltf-animations animation-mixer="clip: idle;" position="0.2 -0.2 -0.3" rotation="0 -45 0" scale="0.2 0.2 0.2"></a-entity>
            <a-entity raycaster="objects: [obstacle]; direction: 0 0 -1; far: 3;" position="0 0 0"></a-entity>
        </a-entity>


       
    </a-scene>
`