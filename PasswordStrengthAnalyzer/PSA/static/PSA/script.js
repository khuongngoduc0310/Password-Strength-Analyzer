function checkCommonPassword(password) {
 const url = `/checkPassword/${password}/`;
 console.log(url);
 fetch(url)
        .then(response => response.json())
        .then(data => {
            const result = data.exists ? "Password is a common password" : "Password is not common";
            document.getElementById('checkCommon').textContent = result;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// Enhanced Password strength checker with no switch statements
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthIndicator = document.getElementById('strengthIndicator');
    const suggestions = document.getElementById('suggestions');
    const progressBar = document.getElementById('progress'); // Reference to the progress bar
    const entropyPoints = document.getElementById('entropyPoints');

    checkCommonPassword(password);
    let strength = 0;
    let feedback = [];

    strength = entropy(password);

    if (repetitiveTest(password) > 3 || continuousTest(password) > 3 || !basicTest(password)) strength = 0;
    entropyPoints.textContent = `Entropy points: ${strength}`;

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
}

// Password generation logic
document.getElementById('generateBtn')?.addEventListener('click', generatePassword);

function generatePassword() {
    const length = 12; // You can allow the user to choose the length
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById('generatedPassword').textContent = password;
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
