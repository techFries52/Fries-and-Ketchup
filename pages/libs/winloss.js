//RBG Variables
var wsgTrophyButton = document.querySelector('#wsgTrophyButton');
var wsgTrophyCount = 0;
var wsgTrophytDisplay = document.querySelector('#wsgTrophyDisplay');
var wsgShitButton = document.querySelector('#wsgShitButton');
var wsgShitCount = 0;
var wsgShitDisplay = document.querySelector('#wsgShitDisplay');

var arathiTrophyButton = document.querySelector('#arathiTrophyButton');
var arathiTrophyCount = 0;
var arathiTrophyDisplay = document.querySelector('#arathiTrophyDisplay');
var arathiShitButton = document.querySelector('#arathiShitButton');
var arathiShitCount = 0;
var arathiShitDisplay = document.querySelector('#arathiShitDisplay');

var eotsTrophyButton = document.querySelector('#eotsTrophyButton');
var eotsTrophyCount = 0;
var eotsTrophyDisplay = document.querySelector('#eotsTrophyDisplay');
var eotsShitButton = document.querySelector('#eotsShitButton');
var eotsShitCount = 0;
var eotsShitDisplay = document.querySelector('#eotsShitDisplay');

var ssTrophyButton = document.querySelector('#ssTrophyButton');
var ssTrophyCount = 0;
var ssTrophyDisplay = document.querySelector('#ssTrophyDisplay');
var ssShitButton = document.querySelector('#ssShitButton');
var ssShitCount = 0;
var ssShitDisplay = document.querySelector('#ssShitDisplay');

var bfgTrophyButton = document.querySelector('#bfgTrophyButton');
var bfgTrophyCount = 0;
var bfgTrophyDisplay = document.querySelector('#bfgTrophyDisplay');
var bfgShitButton = document.querySelector('#bfgShitButton');
var bfgShitCount = 0;
var bfgShitDisplay = document.querySelector('#bfgShitDisplay');

var tpTrophyButton = document.querySelector('#tpTrophyButton');
var tpTrophyCount = 0;
var tpTrophyDisplay = document.querySelector('#tpTrophyDisplay');
var tpShitButton = document.querySelector('#tpShitButton');
var tpShitCount = 0;
var tpShitDisplay = document.querySelector('#tpShitDisplay');

var templeTrophyButton = document.querySelector('#templeTrophyButton');
var templeTrophyCount = 0;
var templeTrophyDisplay = document.querySelector('#templeTrophyDisplay');
var templeShitButton = document.querySelector('#templeShitButton');
var templeShitCount = 0;
var templeShitDisplay = document.querySelector('#templeShitDisplay');

var seethingTrophyButton = document.querySelector('#seethingTrophyButton');
var seethingTrophyCount = 0;
var seethingTrophyDisplay = document.querySelector('#seethingTrophyDisplay');
var seethingShitButton = document.querySelector('#seethingShitButton');
var seethingShitCount = 0;
var seethingShitDisplay = document.querySelector('#seethingShitDisplay');

var totalWinCount = 0;
var totalWinCountDisplay = document.querySelector('#totalWinCountDisplay');
var totalLoseCount = 0;
var totalLoseCountDisplay = document.querySelector('#totalLoseCountDisplay');

var resetButton = document.querySelector('#resetButton');


//WSG Buttons
wsgTrophyButton.addEventListener('click', function(){
    wsgTrophyCount++;
    wsgTrophyDisplay.textContent = wsgTrophyCount;
    totalWinCount++;
    totalWinCountDisplay.textContent = totalWinCount;
})

arathiTrophyButton.addEventListener('click', function(){
    arathiTrophyCount++;
    arathiTrophyDisplay.textContent = arathiTrophyCount;
    totalWinCount++;
    totalWinCountDisplay.textContent = totalWinCount;
})

eotsTrophyButton.addEventListener('click', function(){
    eotsTrophyCount++;
    eotsTrophyDisplay.textContent = eotsTrophyCount;
    totalWinCount++;
    totalWinCountDisplay.textContent = totalWinCount;
})

ssTrophyButton.addEventListener('click', function(){
    ssTrophyCount++;
    ssTrophyDisplay.textContent = ssTrophyCount;
    totalWinCount++;
    totalWinCountDisplay.textContent = totalWinCount;
})

bfgTrophyButton.addEventListener('click', function(){
    bfgTrophyCount++;
    bfgTrophyDisplay.textContent = bfgTrophyCount;
    totalWinCount++;
    totalWinCountDisplay.textContent = totalWinCount;
})

tpTrophyButton.addEventListener('click', function(){
    tpTrophyCount++;
    tpTrophyDisplay.textContent = tpTrophyCount;
    totalWinCount++;
    totalWinCountDisplay.textContent = totalWinCount;
})

templeTrophyButton.addEventListener('click', function(){
    templeTrophyCount++;
    templeTrophyDisplay.textContent = templeTrophyCount;
    totalWinCount++;
    totalWinCountDisplay.textContent = totalWinCount;
})

seethingTrophyButton.addEventListener('click', function(){
    seethingTrophyCount++;
    seethingTrophyDisplay.textContent = seethingTrophyCount;
    totalWinCount++;
    totalWinCountDisplay.textContent = totalWinCount;
})






//Shit Buttons
wsgShitButton.addEventListener('click', function(){
    wsgShitCount++;
    wsgShitDisplay.textContent = wsgShitCount;
    totalLoseCount++;
    totalLoseCountDisplay.textContent = totalLoseCount;
})

arathiShitButton.addEventListener('click', function(){
    arathiShitCount++;
    arathiShitDisplay.textContent = arathiShitCount;
    totalLoseCount++;
    totalLoseCountDisplay.textContent = totalLoseCount;
})

eotsShitButton.addEventListener('click', function(){
    eotsShitCount++;
    eotsShitDisplay.textContent = eotsShitCount;
    totalLoseCount++;
    totalLoseCountDisplay.textContent = totalLoseCount;
})

ssShitButton.addEventListener('click', function(){
    ssShitCount++;
    ssShitDisplay.textContent = ssShitCount;
    totalLoseCount++;
    totalLoseCountDisplay.textContent = totalLoseCount;
})

bfgShitButton.addEventListener('click', function(){
    bfgShitCount++;
    bfgShitDisplay.textContent = bfgShitCount;
    totalLoseCount++;
    totalLoseCountDisplay.textContent = totalLoseCount;
})

tpShitButton.addEventListener('click', function(){
    tpShitCount++;
    tpShitDisplay.textContent = tpShitCount;
    totalLoseCount++;
    totalLoseCountDisplay.textContent = totalLoseCount;
})

templeShitButton.addEventListener('click', function(){
    templeShitCount++;
    templeShitDisplay.textContent = templeShitCount;
    totalLoseCount++;
    totalLoseCountDisplay.textContent = totalLoseCount;
})

seethingShitButton.addEventListener('click', function(){
    seethingShitCount++;
    seethingShitDisplay.textContent = seethingShitCount;
    totalLoseCount++;
    totalLoseCountDisplay.textContent = totalLoseCount;
})

// Fade ins

// function fadeInOnLoad() {
//     $('.fadeLoad1').hide(0).delay(750).fadeIn('slow');
//     $('.fadeLoad2').hide(0).delay(1250).fadeIn('slow');
//     $('.fadeLoad3').hide(0).delay(1750).fadeIn('slow');
//     $('.fadeLoad4').hide(0).delay(2250).fadeIn('slow');
//     $('.totalCount').hide(0).delay(3000).fadeIn('slow');

// }

var fadeLoad1V = document.querySelectorAll('.winloss1');
var fadeLoadTotal = document.querySelector('.totalCount');
// var fadeLoad2V = document.getElementsByClassName('winloss2');
// var fadeLoad3V = document.getElementsByClassName('winloss3');
// var fadeLoad4V = document.getElementsByClassName('winloss4');


// for(var i = 0; i < fadeLoad1V.length; i++) {
//     fadeLoad1V[i].classList.add('fadeLoad1');
// }

// document.getElementsByClassName('fadeLoad1').style.opacity='1';
function fadeLoad1In() {
    fadeLoadTotal.classList.add('fadeLoad1');
    for(var i = 0; i < fadeLoad1V.length; i++) {
        fadeLoad1V[i].classList.add('fadeLoad1');
    };
}

// function fadeLoad2In() {
//     for(var i = 0; i < fadeLoad2V.length; i++) {
//         fadeLoad2V[i].classList.add('fadeLoad2');
//     };
// }

// function fadeLoad3In() {
//     for(var i = 0; i < fadeLoad3V.length; i++) {
//         fadeLoad3V[i].classList.add('fadeLoad3');
//     };
// }

// function fadeLoad4In() {
//     for(var i = 0; i < fadeLoad4V.length; i++) {
//         fadeLoad4V[i].classList.add('fadeLoad4');
//     };
// }


document.addEventListener('DOMContentLoaded', function() {
    fadeLoad1In();
    // fadeLoad2In();
    // fadeLoad3In();
    // fadeLoad4In();
})

// $(document).ready(function() {
//     // fadeInOnLoad();
//     // opacityLoadIn();
//     fadeLoadInOpac();
// });

resetButton.addEventListener('click', function(){
    resetAllScores();
});

// function opacityLoadIn() {
//     $('.fadeLoad1').css('opacity', '1').delay(750);
//     $('.fadeLoad2').hide(0).delay(1250).fadeIn('slow');
//     $('.fadeLoad3').hide(0).delay(1750).fadeIn('slow');
//     $('.fadeLoad4').hide(0).delay(2250).fadeIn('slow');
// }



// var trophyScores = [wsgTrophyCount, arathiTrophyCount, eotsTrophyCount, ssTrophyCount, bfgTrophyCount, tpTrophyCount, templeTrophyCount, seethingTrophyCount]

// trophyScores.forEach(function(i) {
//     for(var i = 0; i < trophyScores.length; i++) {
//         this[i] = 0;
//     }
// });

// function resetTrophyScores() {
//     trophyScores.forEach(function(i) {
//         for(var i = 0; i < trophyScores.length; i++) {
//             this[i] = 0;
//         }
//     });
// }
// movieDatabase.foreach(function(movie){
//     var result = "you have "; 
//     if(movie.haveWatched) {
//         result += "watched ";
//     }
//     else {
//         result += "not watched ";   
//     }
//     result += movie.anime;
//     result += " " + movie.rating +" stars!";
//     console.log(result)
// })

function resetTrophyScores() {
    wsgTrophyCount = 0;
    wsgTrophyDisplay.textContent = wsgTrophyCount;
    arathiTrophyCount = 0;
    arathiTrophyDisplay.textContent = arathiTrophyCount;
    eotsTrophyCount = 0;
    eotsTrophyDisplay.textContent = eotsTrophyCount;
    ssTrophyCount = 0;
    ssTrophyDisplay.textContent = ssTrophyCount;
    bfgTrophyCount = 0;
    bfgTrophyDisplay.textContent = bfgTrophyCount;
    tpTrophyCount = 0;
    tpTrophyDisplay.textContent = tpTrophyCount;
    templeTrophyCount = 0;
    templeTrophyDisplay.textContent = templeTrophyCount;
    seethingTrophyCount = 0;
    seethingTrophyDisplay.textContent = seethingTrophyCount;
}

function resetShitScores() {
    wsgShitCount = 0;
    wsgShitDisplay.textContent = wsgTrophyCount;
    arathiShitCount = 0;
    arathiShitDisplay.textContent = arathiTrophyCount;
    eotsShitCount = 0;
    eotsShitDisplay.textContent = eotsTrophyCount;
    ssShitCount = 0;
    ssShitDisplay.textContent = ssTrophyCount;
    bfgShitCount = 0;
    bfgShitDisplay.textContent = bfgTrophyCount;
    tpShitCount = 0;
    tpShitDisplay.textContent = tpTrophyCount;
    templeShitCount = 0;
    templeShitDisplay.textContent = templeTrophyCount;
    seethingShitCount = 0;
    seethingShitDisplay.textContent = seethingTrophyCount;
}

function resetAllScores() {
    totalWinCount = 0;
    totalLoseCount = 0;
    totalWinCountDisplay.textContent = totalWinCount;
    totalLoseCountDisplay.textContent = totalLoseCount;
    resetTrophyScores();
    resetShitScores();
}


    
  