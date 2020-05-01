/*
    Programmer: Jorge Martinez

    Typing Timer Script

*/


// Grabbing some elements
let testWrapper = document.querySelector(".test-wrapper");
let testArea = document.getElementById("test-area");
let resultsArea = document.getElementById('results-area');
let originText = document.querySelector("#origin-text p").innerHTML;
let resetButton = document.getElementById("reset");
let theTimer = document.querySelector("#clock div");
let testDone = false;
let testStarted = false;
let errors = 0;

// Add leading zero to numbers 9 or below (purely for aesthetics); overwrites the number class
Number.prototype.pad = function (size) {
    let s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

// Starts the test and prevents multiple tests from happening
function startTest() {
    if (testStarted === false) {
        testStarted = true;
        startTimer();
    }
}

// Run a standard minute/second/hundredths timer:
function startTimer() {
    // get the start time
    let startTime = new Date().getTime();

    let x = setInterval(function () {

        updateTimer(startTime);

        testLogic();

        if (testDone) {
            clearInterval(x);
            document.getElementById("errors").innerHTML = "Errors per test: " + errors;
        } else if (!testStarted) {
            clearInterval(x);
            document.querySelector("#clock div").innerHTML = "00:00:00";
            document.querySelector(".test-wrapper").setAttribute('style', 'border: 10px solid grey;');
        }

    }, 10, startTime, testDone);
}

// Updates the timer
function updateTimer(startTime) {
    let now = new Date().getTime();
    let timePassed = now - startTime;
    let minutes = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timePassed % (1000 * 60)) / 1000);
    let hundredths = Math.floor((timePassed / 10) % 60);
    // overwrite the clock with current time
    document.querySelector("#clock div").innerHTML = minutes.pad() + ":" + seconds.pad() + ":" + hundredths.pad();
    // write the current wpm
    document.getElementById("wpm").innerHTML = ("Words per minute: " + wordsTyped() * 60.0 / (seconds + timePassed / 100000));
}

// Count how many words have been typed, not really checking words but works decently enough.
function wordsTyped() {
    testString = testArea.value;
    words = testString.split(" ");
    return words.length;
}

// Match the text entered with the provided text on the page:
function testLogic() {
    if (!testDone) {
        testStringLength = testArea.value.length;
        // Here I need to check what is going on in the test and act appropriately
        if (testArea.value == originText) {
            testStarted = false;
            testDone = true;
            testWrapper.setAttribute('style', 'border: 10px solid green;');
        } else if (testStringLength >= 0) {
            if (testArea.value === originText.slice(0, testStringLength)) {
                testWrapper.setAttribute('style', 'border: 10px solid blue;');
            } else {
                if (testWrapper.getAttribute('style') !== 'border: 10px solid red;') {
                    testWrapper.setAttribute('style', 'border: 10px solid red;');
                    errors += 1;
                }
            }
        }
    }
}

// Reset everything:
function resetTest() {
    testArea.value = '';
    testDone = false;
    testStarted = false;
    theTimer.innerHTML = '00:00:00';
    testWrapper.setAttribute('style', 'border: 10px solid grey;');
    errors = 0;
    document.getElementById("wpm").innerHTML = "Words per minute: ";
    document.getElementById("errors").innerHTML = "Errors per test: ";
}

// Event listeners for keyboard input and the reset button:
testWrapper.addEventListener("keypress", startTest);
resetButton.addEventListener("click", resetTest);

