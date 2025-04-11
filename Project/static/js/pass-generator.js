// DOM Elements
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheck = document.getElementById('uppercaseCheck');
const lowercaseCheck = document.getElementById('lowercaseCheck');
const numbersCheck = document.getElementById('numbersCheck');
const symbolsCheck = document.getElementById('symbolsCheck');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const passwordDisplay = document.getElementById('passwordDisplay');
const strengthIndicator = document.getElementById('strengthIndicator');
const strengthText = document.getElementById('strengthText');

// Character sets
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Event Listeners
lengthSlider.addEventListener('input', updateLength);
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

// Functions
function updateLength() {
    lengthValue.textContent = lengthSlider.value;
    generatePassword();
}

function generatePassword() {
    let charset = '';
    let password = '';
    
    // Build character set based on selected options
    if (uppercaseCheck.checked) charset += uppercaseChars;
    if (lowercaseCheck.checked) charset += lowercaseChars;
    if (numbersCheck.checked) charset += numberChars;
    if (symbolsCheck.checked) charset += symbolChars;
    
    // If no options are selected, use all character sets
    if (charset === '') {
        charset = uppercaseChars + lowercaseChars + numberChars + symbolChars;
        uppercaseCheck.checked = true;
        lowercaseCheck.checked = true;
        numbersCheck.checked = true;
        symbolsCheck.checked = true;
    }
    
    // Generate password
    for (let i = 0; i < lengthSlider.value; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    // Update display
    passwordDisplay.value = password;
    updateStrengthIndicator(password);
}

function updateStrengthIndicator(password) {
    let strength = 0;
    let feedback = '';
    
    // Length check
    if (password.length >= 12) strength += 2;
    else if (password.length >= 8) strength += 1;
    
    // Character type checks
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    
    // Update strength indicator
    strengthIndicator.style.width = (strength * 20) + '%';
    
    // Update strength text and color
    if (strength <= 2) {
        strengthText.textContent = 'Weak';
        strengthIndicator.style.backgroundColor = '#ff4444';
    } else if (strength <= 4) {
        strengthText.textContent = 'Medium';
        strengthIndicator.style.backgroundColor = '#ffbb33';
    } else {
        strengthText.textContent = 'Strong';
        strengthIndicator.style.backgroundColor = '#00C851';
    }
}

function copyPassword() {
    passwordDisplay.select();
    document.execCommand('copy');
    
    // Show copied feedback
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
    }, 2000);
}

// Generate initial password
generatePassword(); 