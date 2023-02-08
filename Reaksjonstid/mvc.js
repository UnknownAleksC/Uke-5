// MODEL
const mainDiv = document.getElementById('app');
let bestAttempt = '';
let previousAttempt = '';

// VIEW
updateView();
function updateView() {
    let startTime = new Date().getTime();
    let randomNum = 0;
    mainDiv.innerHTML = '';
    randomNum = Math.round(Math.random() * 24)
    for (let i = 0; i <= 24; i++) {
        i === randomNum ? mainDiv.innerHTML += `<div class="container" onclick="setTime(${startTime})">🌕</div>` :
            mainDiv.innerHTML += '<div class="container">🌑</div>';
        if ((i + 1) % 5 === 0) {
            mainDiv.innerHTML += '</br>'
        }
    }
    mainDiv.innerHTML += `</br>` + `<div>Best Time: ${bestAttempt}</div>` + '</br>' + `<div>Previous Attempt Time: ${previousAttempt}</div>`
}

// CONTROLLER
function setTime(startTime) {
    let finishTime = new Date().getTime();
    let spentMilliseconds = Math.floor(finishTime - startTime);
    let spentSeconds = spentMilliseconds / 1000;
    previousAttempt = spentSeconds;
    if (!bestAttempt) {
        bestAttempt = previousAttempt;
    }
    else if (spentSeconds < bestAttempt) {
        bestAttempt = previousAttempt;
    }
    updateView();
}
