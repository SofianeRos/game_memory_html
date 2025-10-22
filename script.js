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

// reglage du jeu dans Config.js Variable gameConfig
    
    
    // objet literal pour stocker l'etat actuel du jeu
    const gameState = {
        arrFound: [], // tableau des cartes trouvees
        arrFlipped: [], // tableau des cartes retournees durant une tentative
        canPlay: true,// booleen pour savoir si le joueur peut jouer
        tries: 0, // nombre de tentatives
        hiScore: 0, // hi-score actuel 0 signifiera qu'il n'y en a pas encore
        timer: null // timer du retournement des cartes non matchées

    };


    // Etapes de demarrage du jeu :

    //recuperation et affichage du hi-score
    const storedHiScore = localStorage.getItem('memory-game-hiscore');
    //si il n'en existe pas on le cree dans le stockage du navigateur
    if (storedHiScore === null) {
        localStorage.setItem('memory-game-hiscore', gameState.hiScore);

    }
    //sinon on met a jour le gamestate
    else {
        gameState.hiScore = parseInt(storedHiScore, 10);

    }


    // implementation des cliks sur les boutons fixes : elBtnResetScore  et elBtnPlayAgain 

    //ecouteur de click sur elBtnResetScore
    elBtnResetScore.addEventListener('click', function () {
        // effacer le hi-score de la memoire
        localStorage.removeItem('memory-game-hiscore');
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
            <div class="card" data-num-card="[numCard]">

                   <div class="card-back"></div>
                    <div class="card-img" style="background-image:url('img/[numCard].webp')"></div>
                 </div>
         */

        const elCard = document.createElement('div');
        elCard.classList.add('card');
        elCard.dataset.numCard = numCard;

        // on fabrique l'interieur de elCard 

        let cardInnerHTML = '<div class="card-back"></div>';

        cardInnerHTML += `<div class="card-img" style = "background-image:url('img/${numCard}.webp')"></div >`;

        elCard.innerHTML = cardInnerHTML;

        // envent listener pour le clique sur la carte

        elCard.addEventListener('click', handlerCardClick);




        return elCard;

    }

    // cree une fonction pour reinitialiser l'interface graphique
    function initGame() {
        console.log("Initialisation de l'interface graphique du jeu");

        //remise a zero du current score
        gameState.tries = 0;
        elCurrentScore.textContent = gameState.tries;

        // remise a zero du final score

        elFinalScore.textContent = '';

        //remise de la liste des paires trouvees

        gameState.arrFound = [];

        // remise a zero de la liste des cartes retournees

        arrNumCards = [];

        //vidage du deck

        elDeck.innerHTML = '';

        // afficher le hi score

        elHiScore.textContent = gameState.hiScore > 0 ? gameState.hiScore : 'Aucun';

        // generation d'une liste de nombre en double 
        for (let i = 1; i <= gameConfig.distinctCards; i++) {
            // on ajoute deux fois le i a la fin du tableau
            arrNumCards.push(i, i);

        }
        console.log(arrNumCards);



        //on melange la liste de nombre de la liste
        shuffleArray(arrNumCards);

        // apres melange 
        console.log(arrNumCards);


        //on genere les cartes dans le deck a partir de la liste melangee et les afficher

        //boucle pour parcourir un tableau  => for classique

        //for(let i= 0; i< arrNumCards.length; i++){
        //  console.log(arrNumCards[i]);
        // }

        // Boucle pour parcourir un tableau dans son integralite => for in 

        // for (let i in arrNumCards) {
        //   console.log(arrNumCards[i]);
        //}

        // Boucle pour parcourir un tableau dans son integralite => for of

        for (let numCard of arrNumCards) {
            const elCard = getCardDOM(numCard);
            elDeck.append(elCard);
        }

        // boucle pour parcourir un tableau dans osn integralite => array forEach
        // arrNumCards.forEach(numCard => { console.log(numcard)});


    }

    // gestionnaire clicl sur une carte
    function handlerCardClick() {
        //console.log("cliqué:", this.dataset.numCard);
        //technique early return 
        //on sort de la fonctio si on n'a plus besoin dexecuter la suite du code
        // on limite l'emboitement de plusieurs niveaux d'indentation typiquement 
        // generer par des blocs if......else  les uns dans les autres 
        // si on a pas le droit de retourner les cartes on sort 
        // ou la carte cliqué est deja retourne on sort 

        if (!gameState.canPlay || this.classList.contains('flipped')) return; // en js on peut faire ca en une ligne sans les accolades

        // sinon on continue 

        // console.log('cliqué:', this.dataset.numCard);

        // on reinitialise le timer 

        clearTimeout(gameState.timer);

        // on retourne la carte cliquée

        this.classList.add('flipped');

        // si on a pas deja retournee une carte ( cest arrFlipped est vide )

        if (!gameState.arrFlipped.length > 0) {
            // on ajoute l'element de la carte dans arrFlipped
            gameState.arrFlipped.push(this);
            return; // on sort 
        }

        // sinon on continue 
        // on incremente le nombre de tentatives
        gameState.tries++;
        // on met a jour l'affichage du nombre de tentatives
        elCurrentScore.textContent = gameState.tries

        // on recupere les numero des deux cartes

        const numCard1 = gameState.arrFlipped[0].dataset.numCard;
        const numCard2 = this.dataset.numCard;

        // on verifie si les deux cartes sont identiques

        if (numCard1 === numCard2) {
            // on ajopute le numero de la carte dans la liste des cartes trouvees 
            gameState.arrFound.push(numCard1);
            // on vide le tableau des cartes retournees
            gameState.arrFlipped = [];

            // si on a pas trouvé toutes les paires
            if (gameState.arrFound.length < gameConfig.distinctCards) return;

            // sinon on a gagné 
            //on met a jour le final score
            elFinalScore.textContent = gameState.tries;

            // on affiche la modal de victoire
            elModalWin.classList.remove('hidden');

            // on verifie si on a un nouveau hi-score
            // si aucun hi_score ou que le nombre de tentative est meilleur que hi_score 
            // L'autre test ne sera pas evalue car il n'aura aucun effet sur le resultat final
            //cela permet d'optimiser les performances
            // si aucun hi_score ou que le nombre de tentative est meilleur que hi_score ou qu'il ny a pas de hi-score
            // => on met a jour le hi-score

            if (gameState.tries < gameState.hiScore || gameState.hiScore <= 0) {
                //on met a jour le hi-score dans le gamestate
                gameState.hiScore = gameState.tries;
                // on enregistre le nouveau score dans le localstorage

                localStorage.setItem('memory-game-hiscore', gameState.hiScore);
            }


            return;




        }
        //sinon on continue 
        // on ajoute la carte actuelle dans arrFlipped
        gameState.arrFlipped.push(this);

        // on bloque le jeu en attendant de retourner les cartes
        gameState.canPlay = false;

        // on met en place un timer pour retourner les cartes apres un delai
        // dans une fonction fleche la convention dit que un argument seul qui est a coup sur undefined doit etre nomme "_"
        gameState.timer = setTimeout(_ => {
            // pour chaque carte retournee sur cette tentative
            for (let elCard of gameState.arrFlipped) {
                elCard.classList.remove('flipped');
            }
            // reactive la posibilite de jouer
            gameState.canPlay = true;

            // on vide le tableau des cartes retournees
            gameState.arrFlipped = [];

        }, gameConfig.timerDelay);





    }
    // lance l'initialisation du jeu
    initGame();



}

// mise en place d'un ecouteur pour lancer ne lancer le code que lorsque le navigateur a fini de charger le DOM
document.addEventListener('DOMContentLoaded', handlerDOMContentLoaded);
