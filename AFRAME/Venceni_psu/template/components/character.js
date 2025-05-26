AFRAME.registerComponent('character', {
    init() {
        this.directions = {
            'back': new CANNON.Vec3(0, 0, 3),
            'right': new CANNON.Vec3(3, 0, 0),
            'front': new CANNON.Vec3(0, 0, -3),
            'left': new CANNON.Vec3(-3, 0, 0),
        }

        this.velocity = null;
        this.rotationY = 90;
        this.direction = 'right';
        this.characterModel = this.el.children[0];
        this.nearbyHouse = null;
        this.dogs = [];  // Pole pro sledování psů
        this.totalDogs = 3;  // Celkový počet psů ve hře

        document.addEventListener('keydown', event => {
            if (event.key === 'ArrowLeft' || event.key === 'a') {
                this.startRunning('left');
            } else if (event.key === 'ArrowRight' || event.key === 'd') {
                this.startRunning('right');
            } else if (event.key === 'ArrowUp' || event.key === 'w') {
                this.startRunning('front');
            } else if (event.key === 'ArrowDown' || event.key === 's') {
                this.startRunning('back');
            }
        })
        document.addEventListener('keyup', () => this.stop())
    },

    startRunning(direction) {
        const directions = Object.keys(this.directions);
        let diff = directions.indexOf(direction) - directions.indexOf(this.direction);
        diff = diff >= 3 ? diff - 4 : diff;
        diff = diff <= -3 ? diff + 4 : diff;

        this.rotationY += diff * 90;
        this.direction = direction;
        this.velocity = this.directions[direction];

        this.characterModel.setAttribute('animation', {
            property: 'rotation',
            to: {x: 0, y: this.rotationY, z: 0},
            dur: 500,
            easing: 'easeOutQuad',
        })

        this.characterModel.setAttribute('animation-mixer', {
            clip: 'Armature|Walking',
            crossFadeDuration: 0.2,
        });
    },

    stop() {
        this.velocity = null;
        this.characterModel.setAttribute('animation-mixer', {
            clip: 'Armature|Idle',
            crossFadeDuration: 0.2,
        });
    },

    showVictoryScreen() {
        const victoryScreen = document.getElementById('game-victory');
        if (victoryScreen) {
            victoryScreen.style.display = 'block';
        }
    },

    tick() {
        if (this.velocity !== null) {
            this.el.body.velocity.x = this.velocity.x
            this.el.body.velocity.z = this.velocity.z
        }

        // Check for nearby houses
        const houses = document.querySelectorAll('[house]');
        let closestHouse = null;
        let minDistance = Infinity;

        houses.forEach(house => {
            const housePos = house.getAttribute('position');
            const charPos = this.el.getAttribute('position');
            const distance = Math.sqrt(
                Math.pow(housePos.x - charPos.x, 2) +
                Math.pow(housePos.z - charPos.z, 2)
            );

            if (distance < 2 && distance < minDistance) {
                minDistance = distance;
                closestHouse = house;
            }
        });

        if (closestHouse !== this.nearbyHouse) {
            this.nearbyHouse = closestHouse;
            if (closestHouse) {
                const houseComponent = closestHouse.components.house;
                if (houseComponent) {
                    const success = houseComponent.pickupDog();
                    if (success) {
                        // Přidáme nového psa do pole
                        const newDog = this.el.lastElementChild;
                        if (newDog) {
                            this.dogs.push(newDog);
                            
                            // Kontrola, zda máme všechny psy
                            if (this.dogs.length === this.totalDogs) {
                                this.showVictoryScreen();
                            }
                        }
                    }
                }
            }
        }

        // Aktualizujeme pozice psů
        this.updateDogPositions();
    },

    updateDogPositions() {
        this.dogs.forEach((dog, index) => {
            const angle = (index * 120) * (Math.PI / 180);  // 120 stupňů mezi psy
            const radius = 0.5;  // Vzdálenost od hráče
            
            // Vypočítáme pozici psa vzhledem k hráči
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            dog.setAttribute('position', `${x} 0 ${z}`);
            dog.setAttribute('rotation', `0 ${this.rotationY} 0`);
        });
    }
});