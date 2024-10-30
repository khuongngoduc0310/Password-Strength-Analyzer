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


// Parse the JSON data passed from the view
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(jsonData.entries[randomInt(0,jsonData.entries.length)]);
let common_words = jsonData.entries;

document.getElementById('generatememorableBtn')?.addEventListener('click', generatememorablePassword);

function generatememorablePassword() {
    const length = 5;
    let password = "";
    for (let i = 0; i < length; i++){
        password += " " + common_words[randomInt(0,common_words.length - 1)]
    }
    document.getElementById('generatedmemorablePassword').textContent = password.trim();
}

