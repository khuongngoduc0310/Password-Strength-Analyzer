let checkedPassword = { "": false };
let checkedSocial = {"": false};
const suggestions = {
    "lowerCase": "Your password lacks lower case letters.",
    "upperCase": "Your password lacks upper case letters.",
    "number": "Your password lacks numbers.",
    "specialCharacter": "Your password lacks special characters.",
    "commonPassword": "Your password matches with a common password.",
    "name": "Your password contains your name.",
    "username": "You have included your username or email in your password.",
    "birthday": "Your password contains your birthday.",
    "additionalInformation": "Your password includes social engineering data about you such as your parent's name, pet's name, favorite color,...",
    "pattern": "Your password has an easily recogizable pattern.",
    "length": "Your password is not long enough.",
} 
let numOfSuggestions = 0;

function addSuggestion(suggestion) {
    const suggestionBox = document.getElementById("passwordSuggestions"); 
    const suggestionElement = document.createElement("div"); 
    suggestionElement.className = "suggestion"; 
    suggestionElement.innerText = suggestion; 
    suggestionBox.classList.remove("good");
    suggestionBox.appendChild(suggestionElement);
    numOfSuggestions++;
}
function noSuggestion(){
    const suggestionBox = document.getElementById("passwordSuggestions"); 
    const suggestionElement = document.createElement("div"); 
    suggestionElement.classList.add("noSuggestion");
    suggestionBox.classList.add("good");
    suggestionElement.innerText = "Your password is good!!!"; 
    suggestionBox.appendChild(suggestionElement);
}
function removeAllSuggestion() {
    const suggestionBox = document.getElementById("passwordSuggestions");
    suggestionBox.innerText = ""
    numOfSuggestions = 0;
}

function suggest(password, information) {
    let birthday = information["birthday"];

    if (password.length < 12) addSuggestion(suggestions.length);
    if (!hasLower(password)) addSuggestion(suggestions.lowerCase);
    if (!hasUpper(password)) addSuggestion(suggestions.upperCase);
    if (!hasNumber(password)) addSuggestion(suggestions.number);
    if (!hasSpecial(password)) addSuggestion(suggestions.specialCharacter);
    if (repetitiveTest(password) >= 3 || continuousTest(password) >= 3) addSuggestion(suggestions.pattern);
    if (information.isACommonPassword) addSuggestion(suggestions.commonPassword);
    if (hasBirthdate(password, birthday)) addSuggestion(suggestions.birthday);
    if (information.SACheck) addSuggestion(suggestions.additionalInformation);
    for (let name of information.names){
        if (password.toLowerCase().includes(name) && name.length > 0){
            addSuggestion(suggestions.name);
            break;
        }
    }
    if ((password.toLowerCase().includes(information.username) && information.username.length > 0) || (password.toLowerCase().includes(information.email) && information.email.length > 0)) addSuggestion(suggestions.username);
    if (numOfSuggestions == 0) {
        noSuggestion();
    }
}

function timeToSolve(password) {
    let seconds = secondsToSolve(password);
    if (seconds < 60) return seconds.toFixed(4) + " seconds";
    let minutes = Math.floor(seconds / 60);
    if (minutes < 60) return Math.round(minutes) + " minutes";
    let hours = Math.floor(seconds / 360);
    if (hours < 24) return Math.round(hours) + " hours";
    let days = Math.floor(hours / 24);
    if (days < 30) return Math.round(days) + " days"
    let months = Math.floor(days / 30);
    if (months < 12) return Math.round(months) + " months"
    let years = Math.floor(months / 12);
    return Math.round(years) + " years"
}

async function checkCommonPassword(password) {
    const url = `/checkPassword/${password}/`;
    if (checkedPassword[password] != undefined) return checkedPassword[password];
    if (password.length > 0) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
            const data = await response.json();
            checkedPassword[password] = data.exists;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    /*
    const result = checkedPassword[password] ? "Password is a common password" : "Password is not common";
    console.log(result);
    document.getElementById('checkCommon').textContent = result;
    */
    return checkedPassword[password];
}

async function checkSAData(password) {
    const url = `/checkSocial/${password}/`;
    if (checkedSocial[password] != undefined) return checkedSocial[password];
    if (password.length > 0) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
            const data = await response.json();
            checkedSocial[password] = data.found;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    /*
    const result = checkedPassword[password] ? "Password is a common password" : "Password is not common";
    console.log(result);
    document.getElementById('checkCommon').textContent = result;
    */
    return checkedSocial[password];
}

let debounceTimer;
async function checkPasswordStrengthWithDebounce() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(checkPasswordStrength, 200);
}
async function checkPasswordStrength() {

    const password = document.getElementById('password').value;
    const entropyPoints = document.getElementById('entropyPoints');
    const timeToSolveElement = document.getElementById('timeToSolve');
    const fullName = document.getElementById("fullName").value.trim().toLowerCase();
    const username = document.getElementById("username").value.trim().toLowerCase();
    const birthday = document.getElementById("dob").value;
    const email = document.getElementById("email").value.split("@")[0].toLowerCase();

    //List of score
    let SACheck = await checkSAData(password);
    let SAScore = SACheck ? 0 : 100;
    const lengthScore = password.length >= 12 ? 100 : (password.length / 12) * 100;
    let varietyScore = 0;
    let isACommonPassword = await checkCommonPassword(password);
    let commonPasswordScore = isACommonPassword ? 0 : 100;
    let patternScore = 100;
    let leakedInformationScore = 100;
    let information = {
        "birthday": birthday,
        "isACommonPassword": isACommonPassword,
        "names": [],
        "username": username,
        "email": email,
        "SACheck": SACheck,

    };
    //Check if there is name or username or birthday in the password
    for (let name of fullName.split(' ')) {
        if (name.length > 0 && password.toLowerCase().indexOf(name.toLowerCase()) != -1) leakedInformationScore = 0;
        information.names.push(name);
    }
    if (username.length > 0 && password.toLowerCase().indexOf(username.toLowerCase()) != -1) leakedInformationScore = 0;
    if (hasBirthdate(password, birthday)) leakedInformationScore = 0;

    // Calculate variety score
    if (hasLower(password)) varietyScore += 25;
    if (hasNumber(password)) varietyScore += 25;
    if (hasUpper(password)) varietyScore += 25;
    if (hasSpecial(password)) varietyScore += 25;

    // Calculate patternScore
    if (repetitiveTest(password) >= 3) patternScore -= 50;
    if (continuousTest(password) >= 3) patternScore -= 50;

    // checkCommonPassword(password);
    let strength = 0;

    strength = entropy(password);

    if (repetitiveTest(password) > 3 || continuousTest(password) > 3 || !basicTest(password)) strength = 0;
    entropyPoints.textContent = `Entropy points: ${Math.round(entropy(password)*100)/100}`;
    if (entropy(password) > 80){
        entropyPoints.className = "";
        entropyPoints.classList.add("high");
    } else if (entropy(password) > 50){
        entropyPoints.className = "";
        entropyPoints.classList.add("medium");
    } else {
        entropyPoints.className = "";
        entropyPoints.classList.add("low");
    }

    updateProgressBar('lengthProgress', lengthScore, 'lengthCheck');
    updateProgressBar('varietyProgress', varietyScore, 'varietyCheck');
    updateProgressBar('commonPasswordProgress', commonPasswordScore, 'commonPasswordCheck');
    updateProgressBar('patternProgress', patternScore, 'patternCheck');
    updateProgressBar('leakedInformationProgress', leakedInformationScore, 'leakedInformationCheck');
    updateProgressBar('socialEngProgress', SAScore, 'socialEngCheck');

    timeToSolveElement.textContent = "It takes " + timeToSolve(password) + " to solve by bruteforce";

    console.log(information);
    removeAllSuggestion();
    suggest(password, information);
}


// Password visibility toggle logic
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const icon = this.querySelector('i');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

function updateProgressBar(element, value, labelElement) {
    // element.value = value;
    // labelElement.textContent = Math.round(value); // Display the score as an integer

    let elementProgess = document.getElementById(element);
    let elementCheck = document.getElementById(labelElement);

    elementProgess.value = value;
    elementCheck.textContent = Math.round(value);

    // Remove any existing color classes
    elementProgess.classList.remove('progress-red', 'progress-orange', 'progress-yellow', 'progress-greenyellow', 'progress-green');

    // Apply color based on score range
    if (value <= 20) {
        elementProgess.classList.add('progress-red');
    } else if (value <= 40) {
        elementProgess.classList.add('progress-orange');
    } else if (value <= 60) {
        elementProgess.classList.add('progress-yellow');
    } else if (value <= 80) {
        elementProgess.classList.add('progress-greenyellow');
    } else {
        elementProgess.classList.add('progress-green');
    }
}