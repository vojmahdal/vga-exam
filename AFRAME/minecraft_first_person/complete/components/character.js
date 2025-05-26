AFRAME.registerComponent('player', {
    init: function () {
        this.moveSpeed = 0.1;
        this.tiltSpeed = 2;
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            space: false,
            m: false
        };
        this.hitTargets = new Set();
        this.isBreaking = false;
        this.breakingBlock = null;
        this.blocksMined = 0;
        this.currentTool = 'axe'; // 'axe' nebo 'pickaxe'

        // Přidání raycasteru pro těžbu
        this.raycaster = this.el.querySelector('[raycaster]');
        
        // Inicializace konzole
        console.log('=== Stavy vytěžených bloků ===');
        console.log('Vytěžené bloky: 0');
        
        document.addEventListener('keydown', (e) => {
            if (this.keys.hasOwnProperty(e.key.toLowerCase())) {
                this.keys[e.key.toLowerCase()] = true;
            }
            if (e.code === 'Space') {
                this.keys.space = true;
                this.startBreaking();
            }
            if (e.code === 'KeyM') {
                this.switchTool();
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

    switchTool: function() {
        if (this.blocksMined >= 5) {
            this.currentTool = this.currentTool === 'axe' ? 'pickaxe' : 'axe';
            const tool = this.el.querySelector('[gltf-model]');
            
            // Změna modelu nástroje
            if (this.currentTool === 'pickaxe') {
                tool.setAttribute('gltf-model', '#pickaxe');
                tool.setAttribute('position', '0.2 -0.2 -0.3');
                tool.setAttribute('rotation', '0 -45 0');
                console.log('Nástroj změněn na: Krumpáč');
            } else {
                tool.setAttribute('gltf-model', '#axe');
                tool.setAttribute('position', '0.2 -0.2 -0.3');
                tool.setAttribute('rotation', '0 -45 0');
                console.log('Nástroj změněn na: Sekera');
            }
        } else {
            console.log(`Potřebujete vytěžit ještě ${5 - this.blocksMined} bloků pro odemknutí krumpáče`);
        }
    },

    startBreaking: function() {
        if (this.isBreaking) return;
        
        const intersections = this.raycaster.components.raycaster.intersectedEls;
        for (let i = 0; i < intersections.length; i++) {
            const block = intersections[i];
            if (block.hasAttribute('obstacle') && !this.hitTargets.has(block)) {
                this.isBreaking = true;
                this.breakingBlock = block;
                
                // Animace sekání - pouze rotace
                const tool = this.el.querySelector('[gltf-model]');
                
                // Animace rotace
                tool.setAttribute('animation__rotation', {
                    property: 'rotation',
                    to: '-90 45 0',
                    dur: 200,
                    easing: 'linear',
                    loop: true,
                    dir: 'alternate'
                });

                // Počkáme 2 sekundy a pak blok odstraníme
                setTimeout(() => {
                    if (this.breakingBlock) {
                        this.hitTargets.add(this.breakingBlock);
                        this.blocksMined++;
                        
                        // Aktualizace konzole
                        console.log(`Vytěžené bloky: ${this.blocksMined}`);
                        if (this.blocksMined === 5) {
                            console.log('Krumpáč odemčen! Stiskněte M pro přepnutí nástroje.');
                        }
                        
                        // Kontrola bloků nad rozbitým blokem
                        const blockPosition = this.breakingBlock.getAttribute('position');
                        const blocksAbove = document.querySelectorAll('[obstacle]');
                        blocksAbove.forEach(block => {
                            const pos = block.getAttribute('position');
                            if (pos.x === blockPosition.x && 
                                pos.z === blockPosition.z && 
                                pos.y > blockPosition.y) {
                                // Propadnutí bloku dolů
                                block.setAttribute('position', {
                                    x: pos.x,
                                    y: pos.y - 1,
                                    z: pos.z
                                });
                            }
                        });

                        // Odstranění rozbitého bloku
                        this.breakingBlock.parentNode.removeChild(this.breakingBlock);
                        this.isBreaking = false;
                        this.breakingBlock = null;
                        
                        // Zastavení animace
                        const tool = this.el.querySelector('[gltf-model]');
                        tool.removeAttribute('animation__rotation');
                        
                        // Vrácení do výchozí pozice
                        tool.setAttribute('position', '0.2 -0.2 -0.3');
                        tool.setAttribute('rotation', '0 -45 0');
                        
                        // Kontrola výhry
                        this.checkWinCondition();
                    }
                }, 2000);
                
                break;
            }
        }
    },

    checkWinCondition: function() {
        const allTargets = document.querySelectorAll('[obstacle]');
        if (this.hitTargets.size === allTargets.length) {
            document.getElementById('game-win').style.display = 'block';
        }
    },

    tick: function () {
        const position = this.el.getAttribute('position');
        const rotation = this.el.getAttribute('rotation');

        if (this.keys.w) {
            position.z -= Math.cos(rotation.y * Math.PI / 180) * this.moveSpeed;
            position.x -= Math.sin(rotation.y * Math.PI / 180) * this.moveSpeed;
        }
        if (this.keys.s) {
            position.z += Math.cos(rotation.y * Math.PI / 180) * this.moveSpeed;
            position.x += Math.sin(rotation.y * Math.PI / 180) * this.moveSpeed;
        }

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