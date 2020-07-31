//RBG Variables
var wsgHeartButton = document.querySelector('#wsgHeartButton');
var wsgHeartCount = 0;
var wsgHeartDisplay = document.querySelector('#wsgHeartDisplay');
var wsgShitButton = document.querySelector('#wsgShitButton');
var wsgShitCount = 0;
var wsgShitDisplay = document.querySelector('#wsgShitDisplay');



//WSG Buttons
wsgHeartButton.addEventListener('click', function(){
    wsgHeartCount++;
    wsgHeartDisplay.textContent = wsgHeartCount;
})

wsgShitButton.addEventListener('click', function(){
    wsgShitCount++;
    wsgShitDisplay.textContent = wsgShitCount;
})