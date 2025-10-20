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

    /* on peut declarer plusieurs const avec le meme const 
    exemple :
    const elHiScore = document.getElementById('hi-score'),
          elBtnResetScore = document.getElementById('btn-reset-score'),
          elCurrentScore = document.getElementById('current-score');
    */

    // les variables de fonctionnement du jeu
    let arrNumCards = []; // tableau qui contiendra les cartes du jeu


    // Etapes de demarrage du jeu :

    //TODO: recuperation et affichage du hi-score
    //TODO: implementation des cliks sur les boutons fixes : elBtnResetScore  et elBtnPlayAgain 

    //ecouteur de click sur elBtnResetScore
    elBtnResetScore.addEventListener('click', function () {
        // TODO: effacer le hi-score de la memoire
        // on reinitialise l'interface graphique
        elHiScore.textContent = 'Aucun';

    });

    // ecouteur de click sur elBtnPlayAgain

    elBtnPlayAgain.addEventListener('click', function () {

        // on cache la modal de victoire
        elModalWin.classList.add('hidden');

        // on reinitialise le jeu
        initGame();

    });

    // fonction utilitaire pour melanger un tableau
    function shuffleArray(arr) {
        // on recupere l'index max de arr
        let idMax = arr.length - 1;

        // on boucle de lecture inversee de arr 
        while (idMax > 0) {
            // on genere un index aleatoire de 0 a idMax -1
            let idRandom = Math.floor(Math.random() * idMax);

            // on recupere les valeur associées aux deux indices 
            let valueAtMax = arr[idMax];
            let valueAtRandom = arr[idRandom];

            // on echange les deux valeurs dans le tableau
            arr[idMax] = valueAtRandom;
            arr[idRandom] = valueAtMax;

            //forme courte moins lisible
            // on donne a gauche une liste de positions dans le tableau 
            // et a droite des valeurs dans le meme ordre associer
            // [arr[idMax], arr[idRandom]] = [valueAtRandom, valueAtMax ];

            // on decremente idMax
            idMax--;



        }
    }

    // generation du dom dune carte 

    function getCardDOM(numCard) {

        /*
            <div class="card">

                   <div class="card-back"></div>
                    <div class="card-img" style="background-image:url('img/[numCard].webp')"></div>
                 </div>
         */

        const elCard = document.createElement('div');
        elCard.classList.add('card');

        // on fabrique l'interieur de elCard 

        let cardInnerHTML = '<div class="card-back"></div>';
        
        cardInnerHTML += `<div class="card-img" style = "background-image:url('img/${numCard}.webp')"></div >`;

        elCard.innerHTML = cardInnerHTML;

        // TODO: envent listener pour le clique sur la carte

        elCard.addEventListener('click', function () {
            elCard.classList.toggle('flipped');
        });


        return elCard;

    }

    // cree une fonction pour reinitialiser l'interface graphique
    function initGame() {
        console.log("Initialisation de l'interface graphique du jeu");

        //remise a zero du current score

        elCurrentScore.textContent = '0';

        // remise a zero du final score

        elFinalScore.textContent = '';

        //vidage du deck

        elDeck.innerHTML = '';

        // generation d'une liste de nombre en double 
        for (let i = 1; i <= 12; i++) {
            // on ajoute deux fois le i a la fin du tableau
            arrNumCards.push(i, i);

        }
        console.log(arrNumCards);



        //on melange la liste de nombre de la liste
        shuffleArray(arrNumCards);
        console.log(arrNumCards);


        //on genere les cartes dans le deck a partir de la liste melangee et les afficher

        //TODO: test a remplacer par la boucle 


        let uneCarte = getCardDOM(5) ;
        elDeck.append(uneCarte);


    }

    // lance l'initialisation du jeu
    initGame();



}

// mise en place d'un ecouteur pour lancer ne lancer le code que lorsque le navigateur a fini de charger le DOM
document.addEventListener('DOMContentLoaded', handlerDOMContentLoaded);