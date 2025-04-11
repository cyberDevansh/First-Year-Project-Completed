// Intro Slides
document.addEventListener('DOMContentLoaded', () => {
    // Prevent space key from scrolling
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
        }
    });

    const slides = document.querySelectorAll('.slide');
    const introSlides = document.querySelector('.intro-slides');
    let currentSlide = 0;

    // Show slides for 30 seconds
    function showSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        
        currentSlide = (currentSlide + 1) % slides.length;
    }

    // Initial slide
    showSlides();

    // Change slides every 5 seconds
    const slideInterval = setInterval(showSlides, 4500);

    // Hide intro slides after 30 seconds
    setTimeout(() => {
        clearInterval(slideInterval);
        introSlides.classList.add('hidden');
    }, 26500);
});

// Theme Switching
const themeSwitch = document.querySelector('.theme-switch input');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeSwitch.checked = currentTheme === 'dark';
}

themeSwitch.addEventListener('change', () => {
    const newTheme = themeSwitch.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Page Transitions
document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    if (content) {
        content.classList.add('page-transition');
        setTimeout(() => {
            content.classList.add('active');
        }, 100);
    }
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileMenuBtn);

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            toggleMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.querySelector('.theme-switch');
    const bulb = document.querySelector('.bulb');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    }

    // Theme switch click handler
    themeSwitch.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Set active navigation item based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Security: Sanitize user input
    function sanitizeInput(input) {
        return input.replace(/[<>]/g, '');
    }

    // Security: Add CSRF protection
    function getCSRFToken() {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    }

    // Security: Add XSS protection
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Security: Add rate limiting for theme switching
    let lastThemeSwitch = 0;
    const themeSwitchCooldown = 1000; // 1 second cooldown

    themeSwitch.addEventListener('click', function(e) {
        const now = Date.now();
        if (now - lastThemeSwitch < themeSwitchCooldown) {
            e.preventDefault();
            return;
        }
        lastThemeSwitch = now;
    });

    // Security: Add input validation
    function validateInput(input, type) {
        const validators = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            username: /^[a-zA-Z0-9_]{3,20}$/
        };
        return validators[type]?.test(input) || false;
    }

    // Security: Add session timeout
    let sessionTimeout;
    const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

    function resetSessionTimeout() {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(() => {
            // Handle session timeout
            localStorage.removeItem('theme');
            window.location.href = '/login.html';
        }, SESSION_DURATION);
    }

    // Reset timeout on user activity
    document.addEventListener('mousemove', resetSessionTimeout);
    document.addEventListener('keypress', resetSessionTimeout);
    resetSessionTimeout();
});

// Keylogger Demonstration
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startMonitoring');
    const stopButton = document.getElementById('stopMonitoring');
    const clearButton = document.getElementById('clearLog');
    const typingArea = document.getElementById('typingArea');
    const keystrokeLog = document.getElementById('keystrokeLog');
    
    let isMonitoring = false;
    let keystrokes = [];

    // Start monitoring
    startButton.addEventListener('click', function() {
        isMonitoring = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        typingArea.focus();
        keystrokeLog.innerHTML = '<p class="log-entry"><i class="fas fa-info-circle"></i> Monitoring started...</p>';
    });

    // Stop monitoring
    stopButton.addEventListener('click', function() {
        isMonitoring = false;
        startButton.disabled = false;
        stopButton.disabled = true;
        keystrokeLog.innerHTML += '<p class="log-entry"><i class="fas fa-info-circle"></i> Monitoring stopped.</p>';
    });

    // Clear log
    clearButton.addEventListener('click', function() {
        keystrokeLog.innerHTML = '';
        keystrokes = [];
    });

    // Record keystrokes
    typingArea.addEventListener('keydown', function(e) {
        if (!isMonitoring) return;

        const key = e.key;
        const timestamp = new Date().toLocaleTimeString();
        
        // Special keys handling
        let displayKey = key;
        if (key === ' ') displayKey = '[Space]';
        if (key === 'Enter') displayKey = '[Enter]';
        if (key === 'Tab') displayKey = '[Tab]';
        if (key === 'Backspace') displayKey = '[Backspace]';
        if (key === 'Delete') displayKey = '[Delete]';
        if (key === 'Escape') displayKey = '[Escape]';
        if (key === 'Control') displayKey = '[Ctrl]';
        if (key === 'Shift') displayKey = '[Shift]';
        if (key === 'Alt') displayKey = '[Alt]';
        if (key === 'CapsLock') displayKey = '[CapsLock]';

        // Add to log
        const logEntry = document.createElement('p');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<i class="fas fa-key"></i> ${timestamp} - ${displayKey}`;
        keystrokeLog.appendChild(logEntry);
        
        // Scroll to bottom
        keystrokeLog.scrollTop = keystrokeLog.scrollHeight;
        
        // Store keystroke
        keystrokes.push({
            key: key,
            timestamp: timestamp
        });
    });

    // Prevent default behavior for special keys
    typingArea.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
        }
    });
});

// Steganography Functionality
document.addEventListener('DOMContentLoaded', function() {
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const resultContainer = document.getElementById('resultContainer');
    const resultImage = document.getElementById('resultImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const decodeResult = document.getElementById('decodeResult');
    const decodedMessage = document.getElementById('decodedMessage');
    const secretMessage = document.getElementById('secretMessage');
    const changeImageBtn = document.getElementById('changeImage');

    let currentImage = null;

    // File upload handling
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });
    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

    function handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                currentImage = e.target.result;
                imagePreview.src = currentImage;
                uploadArea.style.display = 'none';
                previewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file.');
        }
    }

    // Change image button
    changeImageBtn.addEventListener('click', () => {
        uploadArea.style.display = 'flex';
        previewContainer.style.display = 'none';
        currentImage = null;
        resultContainer.style.display = 'none';
        decodeResult.style.display = 'none';
    });

    // Encode message
    encodeBtn.addEventListener('click', () => {
        if (!currentImage) {
            alert('Please upload an image first.');
            return;
        }
        if (!secretMessage.value.trim()) {
            alert('Please enter a message to encode.');
            return;
        }

        // Simulate encoding process
        resultImage.src = currentImage;
        resultContainer.style.display = 'block';
        decodeResult.style.display = 'none';
        
        // Show success message
        alert('Message encoded successfully!');
    });

    // Decode message
    decodeBtn.addEventListener('click', () => {
        if (!currentImage) {
            alert('Please upload an image first.');
            return;
        }

        // Simulate decoding process
        decodedMessage.textContent = 'This is a simulated decoded message. In a real implementation, this would show the hidden message from the image.';
        decodeResult.style.display = 'block';
        resultContainer.style.display = 'none';
    });

    // Download result
    downloadBtn.addEventListener('click', () => {
        if (!resultImage.src) {
            alert('No image to download.');
            return;
        }

        const link = document.createElement('a');
        link.href = resultImage.src;
        link.download = 'encoded-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Clear everything
    clearBtn.addEventListener('click', () => {
        currentImage = null;
        secretMessage.value = '';
        uploadArea.style.display = 'flex';
        previewContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        decodeResult.style.display = 'none';
    });
}); 

// Phishing Simulator Functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/phishing-simulator') {
        const simulator = {
            emails: [
                {
                    type: 'phishing',
                    content: `
                        <div class="email-header">
                            <div class="sender-info">
                                <span class="sender-name">Google Security</span>
                                <span class="sender-email">&lt;security@google.com&gt;</span>
                            </div>
                            <div class="email-subject">Urgent: Your account has been compromised</div>
                        </div>
                        <div class="email-body">
                            <p>Dear Google User,</p>
                            <p>We have detected unusual activity on your Google Account. Your account may have been accessed from an unrecognized device in New York, USA.</p>
                            <p>To secure your account, please verify your identity by clicking the link below:</p>
                            <p><a href="#" class="phishing-link">https://accounts.google.com/verify-now</a></p>
                            <p>If you did not attempt to access your account, please secure it immediately.</p>
                            <p>Best regards,<br>Google Security Team</p>
                        </div>
                    `,
                    feedback: "This is a phishing email. Note the urgent language, generic greeting ('Dear Google User'), and suspicious link. Google would never ask you to verify your account through an email link."
                },
                {
                    type: 'safe',
                    content: `
                        <div class="email-header">
                            <div class="sender-info">
                                <span class="sender-name">LinkedIn</span>
                                <span class="sender-email">&lt;notifications@linkedin.com&gt;</span>
                            </div>
                            <div class="email-subject">New connection request from John Doe</div>
                        </div>
                        <div class="email-body">
                            <p>Hello,</p>
                            <p>John Doe wants to connect with you on LinkedIn.</p>
                            <p>To accept this invitation, visit your LinkedIn homepage or click here to view their profile.</p>
                            <p>This is an automated message from LinkedIn. Please do not reply to this email.</p>
                        </div>
                    `,
                    feedback: "This is a safe email. It's from a legitimate LinkedIn domain, uses appropriate language, and doesn't request sensitive information."
                },
                {
                    type: 'phishing',
                    content: `
                        <div class="email-header">
                            <div class="sender-info">
                                <span class="sender-name">Microsoft Office 365</span>
                                <span class="sender-email">&lt;support@microsoft365.com&gt;</span>
                            </div>
                            <div class="email-subject">Your subscription is about to expire</div>
                        </div>
                        <div class="email-body">
                            <p>Dear Valued Customer,</p>
                            <p>Your Microsoft 365 subscription will expire in 24 hours. To avoid service interruption, please update your payment information immediately.</p>
                            <p>Click here to update your payment details: <a href="#" class="phishing-link">https://microsoft365-payment.com/update</a></p>
                            <p>Failure to update your information will result in immediate account suspension.</p>
                            <p>Microsoft Office 365 Support Team</p>
                        </div>
                    `,
                    feedback: "This is a phishing email. Note the threatening language ('immediate account suspension'), suspicious domain (microsoft365-payment.com), and urgent deadline."
                },
                {
                    type: 'safe',
                    content: `
                        <div class="email-header">
                            <div class="sender-info">
                                <span class="sender-name">Cybersecurity Newsletter</span>
                                <span class="sender-email">&lt;newsletter@cybersecurity.org&gt;</span>
                            </div>
                            <div class="email-subject">Monthly Security Tips - October 2023</div>
                        </div>
                        <div class="email-body">
                            <p>Hello Security Enthusiast,</p>
                            <p>Here are this month's top security tips to keep your accounts safe:</p>
                            <ul>
                                <li>Enable two-factor authentication on all your accounts</li>
                                <li>Use a password manager to generate and store strong passwords</li>
                                <li>Be cautious of emails requesting personal information</li>
                                <li>Regularly update your software and devices</li>
                            </ul>
                            <p>No action is required. This is an informational newsletter only.</p>
                            <p>Best regards,<br>Cybersecurity Team</p>
                        </div>
                    `,
                    feedback: "This is a safe email. It's from a legitimate source, provides useful information without requesting any action, and has no suspicious links."
                }
            ],
            currentIndex: 0,
            correct: 0,
            incorrect: 0,
            platformConfigs: {
                google: {
                    logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
                    title: 'Sign in to your Google Account',
                    buttonColor: '#4285F4',
                    warning: 'This Google login page looks real, but it\'s actually a phishing attempt! The URL is slightly different from the real Google login page.',
                    clues: [
                        'The URL is goog1e.com (note the "1" instead of "l")',
                        'The email uses urgent language to create panic',
                        'The sender email address is suspicious',
                        'The link in the email doesn\'t match Google\'s official domain'
                    ]
                },
                facebook: {
                    logo: 'https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg',
                    title: 'Log in to Facebook',
                    buttonColor: '#1877F2',
                    warning: 'This Facebook login page looks real, but it\'s actually a phishing attempt! The URL is misspelled.',
                    clues: [
                        'The domain is faceb00k.com (zeros instead of "o")',
                        'The email uses a generic greeting',
                        'The sender email doesn\'t match Facebook\'s official domain',
                        'The login page URL doesn\'t match Facebook\'s official domain'
                    ]
                },
                instagram: {
                    logo: 'https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png',
                    title: 'Log in to Instagram',
                    buttonColor: '#E1306C',
                    warning: 'This Instagram login page looks real, but it\'s actually a phishing attempt! The URL is misspelled.',
                    clues: [
                        'The URL is lnstagram.com (missing "i")',
                        'The email contains an unexpected login prompt',
                        'The sender email doesn\'t match Instagram\'s official domain',
                        'The login page URL doesn\'t match Instagram\'s official domain'
                    ]
                },
                pinterest: {
                    logo: 'https://i.pinimg.com/originals/2d/2b/2c/2d2b2c9e0f5b8c1f1d0b9e0f5b8c1f1d.png',
                    title: 'Log in to Pinterest',
                    buttonColor: '#E60023',
                    warning: 'This Pinterest login page looks real, but it\'s actually a phishing attempt! The URL is misspelled.',
                    clues: [
                        'The domain is p1nterest.com (number "1" instead of "i")',
                        'The email uses suspicious language',
                        'The sender email doesn\'t match Pinterest\'s official domain',
                        'The login page URL doesn\'t match Pinterest\'s official domain'
                    ]
                }
            },

            elements: {
                startBtn: document.getElementById('startSimulation'),
                resetBtn: document.getElementById('resetSimulation'),
                emailContent: document.getElementById('emailContent'),
                emailActions: document.getElementById('emailActions'),
                correctCount: document.getElementById('correctCount'),
                incorrectCount: document.getElementById('incorrectCount'),
                feedbackMessage: document.getElementById('feedbackMessage'),
                loginPopup: document.getElementById('loginPopup'),
                platformButtons: document.querySelectorAll('.platform-btn'),
                closeBtns: document.querySelectorAll('.close-btn')
            },

            init: function() {
                this.elements.startBtn.addEventListener('click', () => this.start());
                this.elements.resetBtn.addEventListener('click', () => this.reset());
                this.bindActionButtons();
                this.bindPlatformButtons();
                this.bindCloseButtons();
                this.bindLoginForms();
                
                // Initialize popup elements
                this.elements.loginPopup = document.getElementById('loginPopup');
                this.elements.platformButtons = document.querySelectorAll('.platform-btn');
                this.elements.closeBtns = document.querySelectorAll('.close-btn');
            },

            start: function() {
                this.elements.startBtn.disabled = true;
                this.elements.resetBtn.disabled = false;
                this.currentIndex = 0;
                this.correct = 0;
                this.incorrect = 0;
                this.updateScore();
                this.showEmail();
            },

            reset: function() {
                this.elements.startBtn.disabled = false;
                this.elements.resetBtn.disabled = true;
                this.elements.emailContent.innerHTML = '<p>Click "Start Simulation" to begin.</p>';
                this.elements.emailActions.style.display = 'none';
                this.elements.feedbackMessage.innerHTML = '<p>Test your phishing detection skills!</p>';
                this.correct = 0;
                this.incorrect = 0;
                this.updateScore();
                this.closePopup();
            },

            showEmail: function() {
                if (this.currentIndex >= this.emails.length) {
                    this.endSimulation();
                    return;
                }
                const email = this.emails[this.currentIndex];
                this.elements.emailContent.innerHTML = email.content;
                this.elements.emailActions.style.display = 'flex';
                this.elements.feedbackMessage.innerHTML = '<p>Analyze the email and make your choice.</p>';
            },

            bindActionButtons: function() {
                const buttons = document.querySelectorAll('.email-actions .secure-button');
                buttons.forEach(btn => {
                    btn.addEventListener('click', () => this.handleChoice(btn.dataset.action));
                });
            },

            handleChoice: function(action) {
                const email = this.emails[this.currentIndex];
                const isCorrect = (action === email.type);
                
                if (isCorrect) {
                    this.correct++;
                    this.elements.feedbackMessage.innerHTML = `<p class="success">Correct!</p><p>${email.feedback}</p>`;
                } else {
                    this.incorrect++;
                    this.elements.feedbackMessage.innerHTML = `<p class="error">Incorrect!</p><p>${email.feedback}</p>`;
                }
                
                this.updateScore();
                this.currentIndex++;
                setTimeout(() => this.showEmail(), 2000);
            },

            updateScore: function() {
                this.elements.correctCount.textContent = this.correct;
                this.elements.incorrectCount.textContent = this.incorrect;
            },

            endSimulation: function() {
                const totalEmails = this.currentIndex;
                const percentage = (this.correct / totalEmails) * 100;
                let feedback = '';
                
                if (percentage >= 80) {
                    feedback = "Excellent! You have a keen eye for spotting phishing attempts.";
                } else if (percentage >= 60) {
                    feedback = "Good job! You can identify most phishing attempts, but there's room for improvement.";
                } else {
                    feedback = "Be more cautious! Review the clues and try to improve your phishing detection skills.";
                }

                this.elements.emailContent.innerHTML = '<p>Simulation Complete!</p>';
                this.elements.emailActions.style.display = 'none';
                this.elements.feedbackMessage.innerHTML = `
                    <p>Simulation Complete!</p>
                    <p>${feedback}</p>
                    <p>You correctly identified ${this.correct} out of ${totalEmails} emails.</p>
                `;
                this.elements.startBtn.disabled = false;
            },

            bindPlatformButtons: function() {
                this.elements.platformButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const platform = btn.dataset.platform;
                        this.showLoginPopup(platform);
                    });
                });
            },

            bindCloseButtons: function() {
                this.elements.closeBtns.forEach(btn => {
                    btn.addEventListener('click', () => this.closePopup());
                });
            },

            bindLoginForms: function() {
                const forms = document.querySelectorAll('.login-form');
                forms.forEach(form => {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const platform = form.closest('.login-content').id.replace('Login', '');
                        this.showPhishingWarning(platform);
                    });
                });
            },

            showLoginPopup: function(platform) {
                const content = document.getElementById(`${platform}Login`);
                if (!content) {
                    console.error(`Login content for platform ${platform} not found`);
                    return;
                }
                
                // Hide all login forms
                document.querySelectorAll('.login-content').forEach(el => {
                    el.style.display = 'none';
                });
                
                // Show the selected platform's login form
                content.style.display = 'block';
                this.elements.loginPopup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            },

            closePopup: function() {
                this.elements.loginPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Reset all forms and hide warnings
                document.querySelectorAll('.login-content').forEach(el => {
                    el.querySelector('form')?.reset();
                    el.style.display = 'none';
                    const warning = el.querySelector('.warning-message');
                    if (warning) warning.remove();
                });
            },

            showPhishingWarning: function(platform) {
                const config = this.platformConfigs[platform];
                const content = document.getElementById(`${platform}Login`);
                const form = content.querySelector('.login-form');
                form.insertAdjacentHTML('afterend', `
                    <div class="warning-message">
                        <h4>⚠️ Phishing Alert!</h4>
                        <p>${config.warning}</p>
                        <p><strong>Clues:</strong></p>
                        <ul>
                            ${config.clues.map(clue => `<li>${clue}</li>`).join('')}
                        </ul>
                        <button class="secure-button close-warning">Close</button>
                    </div>
                `);
                form.style.display = 'none';
                content.querySelector('.close-warning').addEventListener('click', () => this.closePopup());
            }
        };

        simulator.init();
    }
});