AFRAME.registerComponent('character', {
    init() {
        console.log('Character init!');

        document.addEventListener('keydown', event => {
            if (event.key === 'j') {
                console.log("keyboard j");
            } else if (event.key === 'ArrowRight') {
            }
        });
    }
});