let checkedPassword = {"": false};

function timeToSolve(password){
    let seconds = secondsToSolve(password);
    if (seconds < 60) return seconds + " seconds";
    let minutes = Math.floor(seconds/60);
    if (minutes < 60) return minutes + " minutes";
    let hours = Math.floor(seconds/360);
    if (hours < 24) return hours + " hours";
    let days = Math.floor(hours/24);
    if (days < 30) return days + " days"
    let months = Math.floor(days/30);
    if (months < 12) return months + " months"
    let years = Math.floor(months/12);
    return years + " years"
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
    const result = checkedPassword[password] ? "Password is a common password" : "Password is not common";
    document.getElementById('checkCommon').textContent = result;
    return checkedPassword[password];
}

let debounceTimer;
async function checkPasswordStrengthWithDebounce(){
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(checkPasswordStrength,100);
}
async function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    // const strengthIndicator = document.getElementById('strengthIndicator');
    // const suggestions = document.getElementById('suggestions');
    // const progressBar = document.getElementById('progress');
    const entropyPoints = document.getElementById('entropyPoints');
    const timeToSolveElement = document.getElementById('timeToSolve');
    const fullName = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();

    //List of score
    const lengthScore = password.length >= 12 ? 100 : (password.length / 12) * 100;
    let varietyScore = 0;
    let commonPasswordScore = await checkCommonPassword(password) ? 0 : 100;
    let patternScore = 100;
    let leakedInformationScore = 100;

    //Check if there is name in the password
    for (let name of fullName.split(' ')){
       if (name.length > 0 && password.toLowerCase().indexOf(name.toLowerCase()) != -1) leakedInformationScore = 0;
    }
    if (username.length > 0 && password.toLowerCase().indexOf(username.toLowerCase()) != -1) leakedInformationScore = 0;

    console.log(password + " and " + leakedInformationScore);
    // Calculate variety score
    if (hasLower(password)) varietyScore+=25;
    if (hasNumber(password)) varietyScore+=25;
    if (hasUpper(password)) varietyScore+=25;
    if (hasSpecial(password)) varietyScore+=25;

    // Calculate patternScore
    if (repetitiveTest(password) >= 3) patternScore -=50;
    if (continuousTest(password) >= 3) patternScore -=50;

    // checkCommonPassword(password);
    let strength = 0;

    strength = entropy(password);

    if (repetitiveTest(password) > 3 || continuousTest(password) > 3 || !basicTest(password)) strength = 0;
    entropyPoints.textContent = `Entropy points: ${entropy(password)}`;
    /*
    strength = Math.floor(strength/20);

    if (strength >= 4) strength = 4;
    console.log(strength);
    // Define messages, colors, and progress widths based on strength levels
    const strengthLevels = [
        { text: 'Very Weak', color: 'red', width: '20%', suggestion: 'Add more characters and use uppercase letters, numbers, and symbols or you password has continous pattern.' },
        { text: 'Weak', color: 'orange', width: '40%', suggestion: 'Include uppercase letters, numbers, and symbols.' },
        { text: 'Moderate', color: 'yellow', width: '60%', suggestion: 'Try using more unique characters and avoid sequences.' },
        { text: 'Strong', color: 'lightgreen', width: '80%', suggestion: '' },
        { text: 'Very Strong', color: 'green', width: '100%', suggestion: '' }
    ];

    // Fetch the current strength level
    const currentLevel = strengthLevels[strength];

    // Update strength message
    strengthIndicator.textContent = currentLevel.text;
    strengthIndicator.style.color = currentLevel.color;

    // Update suggestions
    suggestions.textContent = currentLevel.suggestion;

    // Update the progress bar
    progressBar.style.width = currentLevel.width;
    progressBar.style.backgroundColor = currentLevel.color;
    */
    updateProgressBar('lengthProgress', lengthScore, 'lengthCheck');
    updateProgressBar('varietyProgress', varietyScore, 'varietyCheck');
    updateProgressBar('commonPasswordProgress', commonPasswordScore, 'commonPasswordCheck');
    updateProgressBar('patternProgress', patternScore, 'patternCheck');
    updateProgressBar('leakedInformationProgress', leakedInformationScore, 'leakedInformationCheck');

    timeToSolveElement.textContent = "It takes " + timeToSolve(password) + " to solve by bruteforce";
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