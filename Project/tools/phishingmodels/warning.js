document.addEventListener('DOMContentLoaded', function() {
    // Add warning when form is submitted
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showWarning('This is a phishing simulation! Never enter real credentials on suspicious sites.');
        });
    });

    // Add warning for social login buttons
    document.querySelectorAll('.social-login button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showWarning('This is a phishing simulation! Be cautious of social login buttons on suspicious pages.');
        });
    });

    // Show warning message function
    function showWarning(message) {
        const warningDiv = document.createElement('div');
        warningDiv.className = 'warning-message animate__animated animate__fadeIn';
        warningDiv.innerHTML = `
            <h4>⚠️ Security Warning</h4>
            <p>${message}</p>
            <button class="close-warning" onclick="this.parentElement.remove()">Close</button>
        `;
        document.body.appendChild(warningDiv);

        // Remove warning after 5 seconds
        setTimeout(() => {
            warningDiv.classList.add('animate__fadeOut');
            setTimeout(() => warningDiv.remove(), 1000);
        }, 5000);
    }
});
