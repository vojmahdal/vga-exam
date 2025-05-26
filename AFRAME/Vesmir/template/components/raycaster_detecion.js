AFRAME.registerComponent('raycast-blab', {
    init: function () {

        this.el.addEventListener('raycaster-intersected', function (evt) {
            var el = evt.target;
            // May get two intersection events per tick; same element, different faces.
            console.log('raycaster-intersected ' + el.outerHTML);
            el.setAttribute('material', 'color', '#7f7');

            document.addEventListener('keydown', event => {
                if (event.key === 't') {

                    console.log("t pressed");


                    console.log("el.position " + el.getAttribute('position'));
                    console.log("el.class " + el.getAttribute('class'));

                    if(el.getAttribute('class') === 'real'){
                        console.log("Object is real");
                        document.getElementById('myCamera').setAttribute('position', el.getAttribute('position'));
                    }

                    else if (el.getAttribute('class') === 'final') {
                        console.log("Object is final");
                        document.getElementById('myCamera').setAttribute('position', el.getAttribute('position'));

                        const victoryScreen = document.getElementById('game-victory');
                        if (victoryScreen) {
                            victoryScreen.style.display = 'block';
                        }

                    } else {
                        console.log("Object is fake");
                        document.getElementById('myCamera').setAttribute('position', {x:0, y:0, z:10});
                    }


                }
            });

        });

        this.el.addEventListener('raycaster-intersected-cleared', function (evt) {
            var el = evt.target;
            // May get two intersection events per tick; same element, different faces.
            console.log('raycaster-intersected-cleared ' + el.outerHTML);
            el.setAttribute('material', 'color', '');
        });



    }
});