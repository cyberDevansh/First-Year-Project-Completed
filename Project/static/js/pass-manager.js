// DOM Elements
const addPasswordBtn = document.getElementById('addPasswordBtn');
const passwordForm = document.getElementById('passwordForm');
const passwordList = document.getElementById('passwordList');
const searchInput = document.getElementById('searchInput');

// Event Listeners
addPasswordBtn.addEventListener('click', togglePasswordForm);
passwordForm.addEventListener('submit', handlePasswordSubmit);
searchInput.addEventListener('input', filterPasswords);

// Functions
function togglePasswordForm() {
    passwordForm.style.display = passwordForm.style.display === 'none' ? 'block' : 'none';
}

function handlePasswordSubmit(e) {
    e.preventDefault();
    
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!website || !username || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create password entry
    const passwordEntry = {
        website,
        username,
        password,
        date: new Date().toISOString()
    };
    
    // Save to localStorage
    savePassword(passwordEntry);
    
    // Add to UI
    addPasswordToUI(passwordEntry);
    
    // Reset form
    passwordForm.reset();
    passwordForm.style.display = 'none';
}

function savePassword(passwordEntry) {
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.push(passwordEntry);
    localStorage.setItem('passwords', JSON.stringify(passwords));
}

function loadPasswords() {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.forEach(password => addPasswordToUI(password));
}

function addPasswordToUI(passwordEntry) {
    const passwordItem = document.createElement('div');
    passwordItem.className = 'password-item';
    passwordItem.innerHTML = `
        <div class="password-info">
            <h3>${passwordEntry.website}</h3>
            <p>Username: ${passwordEntry.username}</p>
            <p>Password: <span class="password-text">••••••••</span></p>
            <p class="date">Added: ${new Date(passwordEntry.date).toLocaleDateString()}</p>
        </div>
        <div class="password-actions">
            <button class="secure-button" onclick="togglePassword(this, '${passwordEntry.password}')">
                <i class="fas fa-eye"></i> Show
            </button>
            <button class="secure-button" onclick="copyPassword('${passwordEntry.password}')">
                <i class="fas fa-copy"></i> Copy
            </button>
            <button class="secure-button delete" onclick="deletePassword(this, '${passwordEntry.website}')">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    passwordList.appendChild(passwordItem);
}

function togglePassword(button, password) {
    const passwordText = button.parentElement.previousElementSibling.querySelector('.password-text');
    if (passwordText.textContent === '••••••••') {
        passwordText.textContent = password;
        button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide';
    } else {
        passwordText.textContent = '••••••••';
        button.innerHTML = '<i class="fas fa-eye"></i> Show';
    }
}

function copyPassword(password) {
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy password: ', err);
    });
}

function deletePassword(button, website) {
    if (confirm('Are you sure you want to delete this password?')) {
        // Remove from localStorage
        let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords = passwords.filter(p => p.website !== website);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        
        // Remove from UI
        button.closest('.password-item').remove();
    }
}

function filterPasswords() {
    const searchTerm = searchInput.value.toLowerCase();
    const passwordItems = document.querySelectorAll('.password-item');
    
    passwordItems.forEach(item => {
        const website = item.querySelector('h3').textContent.toLowerCase();
        const username = item.querySelector('p').textContent.toLowerCase();
        
        if (website.includes(searchTerm) || username.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Load passwords when page loads
document.addEventListener('DOMContentLoaded', loadPasswords); 