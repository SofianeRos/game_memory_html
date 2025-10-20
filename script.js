console.log("Hello World");
/*
<div class="card">

    <div class="card-back"></div>
    <div class="card-img" style="background-image:url('img/1.webp')"></div>
</div>
*/



function handlerDOMContentLoaded() {


    console.log("Le jeu demarre ");

    // on recupere dans le dom les elements dont on a besoin

    const elHiScore = document.getElementById('hi-score');
    const elBtnResetScore = document.getElementById('btn-reset-score');
    const elCurrentScore = document.getElementById('current-score');
    const elDeck = document.getElementById('deck');
    const elFinalScore = document.getElementById('final-score');
    const elBtnPlayAgain = document.getElementById('btn-play-again');
    const elModalWin = document.getElementById('modal-win');
}

// mise en place d'un ecouteur pour lancer ne lancer le code que lorsque le navigateur a fini de charger le DOM
document.addEventListener('DOMContentLoaded', handlerDOMContentLoaded);