
//Fries variables
var friesHeartButton = document.querySelector('#friesHeartButton');
var friesHeartCount = 0;
var friesHeartDisplay = document.querySelector('#friesHeartDisplay');
var friesShitButton = document.querySelector('#friesShitButton');
var friesShitCount = 0;
var friesShitDisplay = document.querySelector('#friesShitDisplay');

//Kiada variables
var kiadaHeartButton = document.querySelector('#kiadaHeartButton');
var kiadaHeartCount = 0;
var kiadaHeartDisplay = document.querySelector('#kiadaHeartDisplay');
var kiadaShitButton = document.querySelector('#kiadaShitButton');
var kiadaShitCount = 0;
var kiadaShitDisplay = document.querySelector('#kiadaShitDisplay');

//Danni Variables
var danniHeartButton = document.querySelector('#danniHeartButton');
var danniHeartCount = 0;
var danniHeartDisplay = document.querySelector('#danniHeartDisplay');
var danniShitButton = document.querySelector('#danniShitButton');
var danniShitCount = 0;
var danniShitDisplay = document.querySelector('#danniShitDisplay');

//Giantsmilk Variables
var giantsHeartButton = document.querySelector('#giantsHeartButton');
var giantsHeartCount = 0;
var giantsDisplay = document.querySelector('#giantsHeartDisplay');
var giantsShitButton = document.querySelector('#giantsShitButton');
var giantsShitCount = 0;
var giantsShitDisplay = document.querySelector('#giantsShitDisplay')

//Rain Vairiables
var rainHeartButton = document.querySelector('#rainHeartButton');
var rainHeartCount = 0;
var rainHeartDisplay = document.querySelector('#rainHeartDisplay');
var rainShitButton = document.querySelector('#rainShitButton');
var rainShitCount = 0;
var rainShitDisplay = document.querySelector('#rainShitDisplay');

//Kurn Variables
var kurnHeartButton = document.querySelector('#kurnHeartButton');
var kurnHeartCount = 0;
var kurnHearDisplay = document.querySelector('#kurnHearDisplay');
var kurnShitButton = document.querySelector('#kurnShitButton');
var kurnShitCount = 0;
var kurnShitDisplay = document.querySelector('#kurnShitDisplay');

// //RBG Variables
// var wsgHeartButton = document.querySelector('#wsgHeartButton');
// var wsgHeartCount = 0;
// var wsgHeartDisplay = document.querySelector('#wsgHeartDisplay');
// var wsgShitButton = document.querySelector('#wsgShitButton');
// var wsgShitCount = 0;
// var wsgShitDisplay = document.querySelector('#wsgShitDisplay');




//Heart Button Events
friesHeartButton.addEventListener('click', function(){
    friesHeartCount++;
    friesHeartDisplay.textContent = friesHeartCount;
})

kiadaHeartButton.addEventListener('click', function(){
    kiadaHeartCount++;
    kiadaHeartDisplay.textContent = kiadaHeartCount;
})

danniHeartButton.addEventListener('click', function(){
    danniHeartCount++;
    danniHeartDisplay.textContent = danniHeartCount;
})

giantsHeartButton.addEventListener('click', function(){
    giantsHeartCount++;
    giantsHeartDisplay.textContent = giantsHeartCount;
})

rainHeartButton.addEventListener('click', function(){
    rainHeartCount++;
    rainHeartDisplay.textContent = rainHeartCount;
})

kurnHeartButton.addEventListener('click', function(){
    kurnHeartCount++;
    kurnHearDisplay.textContent = kurnHeartCount;
})




//Shit Buttons
friesShitButton.addEventListener('click', function(){
    friesShitCount++;
    friesShitDisplay.textContent = friesShitCount;
})

kiadaShitButton.addEventListener('click', function(){
    kiadaShitCount++;
    kiadaShitDisplay.textContent = kiadaShitCount;
})

danniShitButton.addEventListener('click', function(){
    danniShitCount++;
    danniShitDisplay.textContent = danniShitCount;
})

giantsShitButton.addEventListener('click', function(){
    giantsShitCount++;
    giantsShitDisplay.textContent = giantsShitCount;
})

rainShitButton.addEventListener('click', function(){
    rainShitCount++;
    rainShitDisplay.textContent = rainShitCount;
})

kurnShitButton.addEventListener('click', function(){
    kurnShitCount++;
    kurnShitDisplay.textContent = kurnShitCount;
})




//WSG Buttons
// wsgHeartButton.addEventListener('click', function(){
//     wsgHeartCount++;
//     console.log('added 1')
//     wsgHeartDisplay.textContent = wsgHeartCount;
// })

// wsgShitButton.addEventListener('click', function(){
//     wsgShitCount++;
//     wsgShitDisplay.textContent = wsgShitCount;
// })

// var memberSmallFade = document.querySelectorAll('.memberSmall')
// var memberLargeFade = document.querySelectorAll('.memberLarge');

// function fadeLoad1In() {
//     for(var i = 0; i <  memberSmallFade.length; i++) {
//         memberSmallFade[i].classList.add('fadeLoad1');
//     };
//     for(var i = 0; i <  memberLargeFade.length; i++) {
//         memberLargeFade[i].classList.add('fadeLoad1');
//     };
// }


// $(document).ready(function() {
//     fadeLoad1In();
// });







// transition: background 0.6s;
//     -webkit-transition: background 0.6s;
//     -moz-transition: background 0.6s;
    
// for(i = 0; i < squares.length; i++) {
//     //assign initial colors to squares
//     squares[i].style.backgroundColor = colors[i]
//     //add click event to square
//     squares[i].addEventListener('click', function(){
//         //grab clicked color
//         var clickedColor = this.style.backgroundColor
//         //compare to picked color
//         if(clickedColor === pickedColor){
//             messageDisplay.textContent = 'Yay! winnER!';
//             changeColors(clickedColor);
//             h1.style.backgroundColor = pickedColor;
//             newColorsButton.textContent = 'Play Again!'
//         }
//         else {
//             this.style.backgroundColor = '#232323';
//             messageDisplay.textContent = 'Try Again, Loser'

//         }
//     });
// }