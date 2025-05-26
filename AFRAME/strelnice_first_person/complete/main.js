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
             <a-asset-item id="pistol" src="/models/9mm Pistol.glb"></a-asset-item>
            <img src="/models/grass.jpg" id="grass">
        </a-assets>
  
        <!-- Environment -->
        <!--  sky    --> <a-sky color="#eeeeee"></a-sky>
        <!--  ground --> <a-box static-body="friction: 0;" position="0 0 0" width="20" depth="20" height="0.2" material="src: #grass; repeat: 1 1;"></a-box> 
  
        <!-- Camera -->
       
        <!-- Obstacles -->
        
        
        
        <a-cylinder static-body position="1.5 0.75 -6" radius="0.5" height="1.5" color="#964B00"></a-cylinder>
        <a-sphere obstacle="strength: 9999" static-body position="1.5 1.75 -6" radius="1.0" color="#FF0000"></a-sphere>


         <a-cylinder static-body position="-5.0 0.75 -6" radius="0.5" height="1.5" color="#964B00"></a-cylinder>
        <a-sphere obstacle="strength: 9999" static-body position="-5.0 1.75 -6" radius="1.0" color="#FF0000"></a-sphere>

         <a-cylinder static-body position="-1.0 0.75 -6" radius="0.5" height="1.5" color="#964B00"></a-cylinder>
        <a-sphere obstacle="strength: 9999" static-body position="-1.0 1.75 -6" radius="1.0" color="#FF0000"></a-sphere>

        <!-- Character -->
        
            <a-entity camera look-controls="enabled: false" player position="0 1.6 0">
            <a-entity gltf-model="#pistol" log-gltf-animations animation-mixer="clip: idle;" position="0 -0.2 -0.3" rotation="0 -90 0" scale="0.2 0.2 0.2" animation="property: rotation; to: 0 -90 0; dur: 200; easing: linear"></a-entity>
            <a-entity raycaster="objects: [obstacle]; direction: 0 0 -1; far: 100;" position="0 0 0"></a-entity>
        </a-entity>


       
    </a-scene>
`