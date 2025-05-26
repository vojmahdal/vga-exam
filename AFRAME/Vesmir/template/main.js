import './style.css'
import 'aframe'
import 'aframe-extras'
import 'aframe-physics-system'
import './components/character'
import './components/obstacle'
import './components/raycaster_detecion'

document.querySelector('#app').innerHTML = `
 <div id="game-victory">Výhra!</div>
    <a-scene>
        <!-- External files -->
        <a-assets>
            <img src="/models/planet1.jpg" id="planet1">
            <img src="/models/planet2.png" id="planet2">
            <img src="/models/planet3.jpg" id="planet3">
        </a-assets>
  
        <!-- Environment -->
        <!--  sky    --> <a-sky color="#4a4a4a"></a-sky>
      
        <!-- Camera -->

        <!-- Lights -->
        <a-light type="ambient" color="#888888"></a-light>
        <a-light type="directional" position="0 1 1" intensity="0.5"></a-light>
        
        <a-box class="fake" width="2" height="1" depth="1", position = "-4 0.5 -3" material="src: #planet2; repeat: 1 1;" raycast-blab></a-box> 
        <a-box class="fake" width="2" height="1" depth="1", position = "-7 3 -3" material="src: #planet2; repeat: 1 1;" raycast-blab></a-box> 
        <a-box class="fake" width="2" height="1" depth="1", position = "10 0.5 -8" material="src: #planet2; repeat: 1 1;" raycast-blab></a-box> 
        <a-box class="fake" width="2" height="1" depth="1", position = "-4 0.5 -3" material="src: #planet2; repeat: 1 1;" raycast-blab></a-box> 
        
        <a-box class="real" width="2" height="1" depth="1", position = "4 2 -3" material="src: #planet3; repeat: 1 1;" raycast-blab></a-box>
        <a-box class="real" width="2" height="1" depth="1", position = "-1 3 -3" material="src: #planet1; repeat: 1 1;" raycast-blab></a-box> 
        <a-box class="real" width="2" height="1" depth="1", position = "-5 2 -6" material="src: #planet3; repeat: 1 1;" raycast-blab></a-box> 
        <a-box class="real" width="2" height="1" depth="1", position = "-7 0 -3" material="src: #planet3; repeat: 1 1;" raycast-blab></a-box> 
        <a-box class="real" width="2" height="1" depth="1", position = "-1 3 0" material="src: #planet1; repeat: 1 1;" raycast-blab></a-box> 
        <a-box class="real" width="2" height="1" depth="1", position = "7 1 -7" material="src: #planet3; repeat: 1 1;" raycast-blab></a-box> 
        <a-box class="real" width="2" height="1" depth="1", position = "-2 3 -3" material="src: #planet1; repeat: 1 1;" raycast-blab></a-box> 

        <a-box class="final" width="2" height="1" depth="1", position = "3 4 -8" material="src: #planet1; repeat: 1 1;" raycast-blab></a-box> 
        
        <a-entity id="myCamera" camera character look-controls wasd-controls raycaster="interval: 1; odbjects: [raycast-blab]" position="0 0 10"></a-entity>
       <!-- <a-entity geometry="primitive: box" material="color: #000" position="0 0 -2" raycast-blab></a-entity> -->
        
       
    </a-scene>
`