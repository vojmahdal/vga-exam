AFRAME.registerComponent('player', {
    init: function () {
        this.moveSpeed = 0.1;
        this.tiltSpeed = 2;
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            space: false
        };
        this.hitTargets = new Set(); // Množina pro sledování zasažených terčů

        // Přidání raycasteru pro střelbu
        this.raycaster = this.el.querySelector('[raycaster]');
        
        document.addEventListener('keydown', (e) => {
            if (this.keys.hasOwnProperty(e.key.toLowerCase())) {
                this.keys[e.key.toLowerCase()] = true;
            }
            if (e.code === 'Space') {
                this.keys.space = true;
                this.shoot();
            }
        });

        document.addEventListener('keyup', (e) => {
            if (this.keys.hasOwnProperty(e.key.toLowerCase())) {
                this.keys[e.key.toLowerCase()] = false;
            }
            if (e.code === 'Space') {
                this.keys.space = false;
            }
        });
    },

    checkWinCondition: function() {
        // Získání všech terčů ve scéně
        const allTargets = document.querySelectorAll('[obstacle]');
        // Pokud počet zasažených terčů odpovídá celkovému počtu terčů
        if (this.hitTargets.size === allTargets.length) {
            document.getElementById('game-win').style.display = 'block';
        }
    },

    shoot: function() {
        // Získání průsečíků raycasteru
        const intersections = this.raycaster.components.raycaster.intersectedEls;
        
        // Kontrola, zda byl zasažen nějaký terč
        for (let i = 0; i < intersections.length; i++) {
            const hitObject = intersections[i];
            if (hitObject.hasAttribute('obstacle')) {
                // Kontrola, zda tento terč ještě nebyl zasažen
                if (!this.hitTargets.has(hitObject)) {
                    console.log('Trefil jsem terč na pozici:', hitObject.getAttribute('position'));
                    
                    // Přidání terče do množiny zasažených
                    this.hitTargets.add(hitObject);
                    
                    // Animace pádu terče
                    const currentRotation = hitObject.getAttribute('rotation');
                    const currentPosition = hitObject.getAttribute('position');
                    
                    // Nastavení animace pádu
                    hitObject.setAttribute('animation', {
                        property: 'rotation',
                        to: `${currentRotation.x + 90} ${currentRotation.y} ${currentRotation.z}`,
                        dur: 1000,
                        easing: 'easeOutQuad'
                    });
                    
                    // Nastavení animace posunu dolů
                    hitObject.setAttribute('animation__position', {
                        property: 'position',
                        to: `${currentPosition.x} ${currentPosition.y - 1} ${currentPosition.z}`,
                        dur: 1000,
                        easing: 'easeOutQuad'
                    });

                    // Kontrola výhry
                    this.checkWinCondition();
                }
                break;
            }
        }
    },

    tick: function () {
        const position = this.el.getAttribute('position');
        const rotation = this.el.getAttribute('rotation');

        // Pohyb dopředu/dozadu
       /* if (this.keys.w) {
            position.z -= Math.cos(rotation.y * Math.PI / 180) * this.moveSpeed;
            position.x -= Math.sin(rotation.y * Math.PI / 180) * this.moveSpeed;
        }
        if (this.keys.s) {
            position.z += Math.cos(rotation.y * Math.PI / 180) * this.moveSpeed;
            position.x += Math.sin(rotation.y * Math.PI / 180) * this.moveSpeed;
        }*/

        if (this.keys.w) {
            rotation.x += this.tiltSpeed;
        }
        if (this.keys.s) {
            rotation.x -= this.tiltSpeed;
        }

        // Naklánění do stran
        if (this.keys.a) {
            rotation.y += this.tiltSpeed;
        }
        if (this.keys.d) {
            rotation.y -= this.tiltSpeed;
        }

        this.el.setAttribute('position', position);
        this.el.setAttribute('rotation', rotation);
    }
});