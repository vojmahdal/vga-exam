AFRAME.registerComponent('house', {
    schema: {
        dogName: { type: 'string', default: 'Dog' },
        dogModel: { type: 'string', default: 'dog1' },
        dogScale: { type: 'string', default: '0.1 0.1 0.1' }
    },

    init() {
        this.isDogAvailable = true;
    },

    pickupDog() {
        if (this.isDogAvailable) {
            this.isDogAvailable = false;
            console.log(`Picked up ${this.data.dogName}`);
            
            const dog = document.createElement('a-entity');
            dog.setAttribute('gltf-model', `#${this.data.dogModel}`);
            dog.setAttribute('scale', this.data.dogScale);
            dog.setAttribute('position', '0 0 0');
            
            // Přidáme psa k postavě
            const character = document.querySelector('[character]');
            if (character) {
                character.appendChild(dog);
                // Vysíláme event o sebrání psa
                document.dispatchEvent(new Event('dogPickedUp'));
            }
            
            return true;
        }
        return false;
    }
}); 