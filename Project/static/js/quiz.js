// All quiz questions (30 questions)
const allQuestions = [
    {
        question: "What is the primary purpose of a keylogger?",
        options: [
            "To record keystrokes on a computer",
            "To encrypt files",
            "To detect malware",
            "To manage passwords"
        ],
        correct: 0
    },
    {
        question: "What is steganography?",
        options: [
            "The practice of hiding messages within other files",
            "A type of encryption",
            "A password management technique",
            "A malware detection method"
        ],
        correct: 0
    },
    {
        question: "What makes a strong password?",
        options: [
            "Length, complexity, and uniqueness",
            "Using your pet's name",
            "Using your birthdate",
            "Using the same password everywhere"
        ],
        correct: 0
    },
    {
        question: "What is two-factor authentication?",
        options: [
            "Using two different methods to verify identity",
            "Using two passwords",
            "Using two usernames",
            "Using two email addresses"
        ],
        correct: 0
    },
    {
        question: "What is phishing?",
        options: [
            "A fraudulent attempt to obtain sensitive information",
            "A type of malware",
            "A password cracking technique",
            "A network scanning method"
        ],
        correct: 0
    },
    {
        question: "What does HTTPS indicate on a website?",
        options: [
            "The site uses plain text communication",
            "The site is secure and encrypted",
            "The site is a phishing scam",
            "The site has no security features"
        ],
        correct: 1
    },
    {
        question: "What is ransomware?",
        options: [
            "Software that locks files until a ransom is paid",
            "A type of antivirus program",
            "A tool for password recovery",
            "A network monitoring system"
        ],
        correct: 0
    },
    {
        question: "Why should you avoid public Wi-Fi for sensitive transactions?",
        options: [
            "It's always slow",
            "It may not be encrypted, risking data interception",
            "It blocks all websites",
            "It requires a password"
        ],
        correct: 1
    },
    {
        question: "What is a VPN used for?",
        options: [
            "To speed up your internet",
            "To hide your IP address and encrypt traffic",
            "To install malware",
            "To block ads"
        ],
        correct: 1
    },
    {
        question: "What is social engineering?",
        options: [
            "Building social media platforms",
            "Manipulating people to reveal confidential information",
            "Encrypting social media messages",
            "Hacking into social networks"
        ],
        correct: 1
    },
    {
        question: "What should you do if you receive a suspicious email?",
        options: [
            "Click all links to investigate",
            "Reply to the sender immediately",
            "Delete it or report it without clicking anything",
            "Forward it to all your contacts"
        ],
        correct: 2
    },
    {
        question: "What is a firewall?",
        options: [
            "A tool to speed up your computer",
            "A barrier that filters network traffic",
            "A type of malware",
            "A password generator"
        ],
        correct: 1
    },
    {
        question: "What does 'brute force attack' mean?",
        options: [
            "Physically breaking a device",
            "Trying many password combinations to gain access",
            "Sending spam emails",
            "Installing a virus"
        ],
        correct: 1
    },
    {
        question: "What is the purpose of antivirus software?",
        options: [
            "To detect and remove malicious software",
            "To increase internet speed",
            "To create backups",
            "To design websites"
        ],
        correct: 0
    },
    {
        question: "What is a common sign of a phishing email?",
        options: [
            "A personalized greeting",
            "Urgent language or misspellings",
            "A long email signature",
            "A verified sender address"
        ],
        correct: 1
    },
    {
        question: "What does 'end-to-end encryption' mean?",
        options: [
            "Only the sender and receiver can read the message",
            "The message is stored on a server",
            "The message is public",
            "The message is unencrypted"
        ],
        correct: 0
    },
    {
        question: "What is a DDoS attack?",
        options: [
            "A password guessing technique",
            "Overwhelming a server with traffic to disrupt service",
            "A type of email scam",
            "A hardware failure"
        ],
        correct: 1
    },
    {
        question: "Why should you update software regularly?",
        options: [
            "To get new features only",
            "To patch security vulnerabilities",
            "To slow down your device",
            "To remove old files"
        ],
        correct: 1
    },
    {
        question: "What is a Trojan horse?",
        options: [
            "A type of firewall",
            "Malware disguised as legitimate software",
            "A secure file format",
            "A network protocol"
        ],
        correct: 1
    },
    {
        question: "What should you avoid sharing on social media?",
        options: [
            "Your favorite movie",
            "Your home address or vacation plans",
            "A funny meme",
            "A public event"
        ],
        correct: 1
    },
    {
        question: "What is a zero-day exploit?",
        options: [
            "A vulnerability unknown to the software vendor",
            "A virus that lasts one day",
            "A secure coding practice",
            "A type of encryption"
        ],
        correct: 0
    },
    {
        question: "What does MFA stand for?",
        options: [
            "Multi-Factor Authentication",
            "Malware Filtering Application",
            "Main Firewall Access",
            "Mobile File Analysis"
        ],
        correct: 0
    },
    {
        question: "What is the risk of downloading pirated software?",
        options: [
            "It's always safe",
            "It may contain hidden malware",
            "It improves performance",
            "It's legally required"
        ],
        correct: 1
    },
    {
        question: "What is a cookie in web browsing?",
        options: [
            "A type of virus",
            "A small file storing user data",
            "A security certificate",
            "A password manager"
        ],
        correct: 1
    },
    {
        question: "What is the best way to back up data?",
        options: [
            "Store it only on your phone",
            "Use an external drive or cloud with encryption",
            "Email it to yourself",
            "Write it on paper"
        ],
        correct: 1
    },
    {
        question: "What is a botnet?",
        options: [
            "A network of infected devices controlled remotely",
            "A secure messaging app",
            "A type of antivirus",
            "A social media platform"
        ],
        correct: 0
    },
    {
        question: "What does 'incognito mode' do?",
        options: [
            "Hides your browsing from your ISP",
            "Prevents tracking by websites",
            "Only stops saving your browsing history locally",
            "Encrypts your connection"
        ],
        correct: 2
    },
    {
        question: "What is a common use of a rootkit?",
        options: [
            "To hide malicious activity on a system",
            "To speed up a computer",
            "To back up files",
            "To update software"
        ],
        correct: 0
    },
    {
        question: "Why is it risky to reuse passwords?",
        options: [
            "It's easier to remember",
            "If one account is breached, others are vulnerable",
            "It slows down logins",
            "It confuses websites"
        ],
        correct: 1
    },
    {
        question: "What is the purpose of a CAPTCHA?",
        options: [
            "To verify you're not a bot",
            "To encrypt your data",
            "To speed up a website",
            "To block ads"
        ],
        correct: 0
    }
];

// DOM Elements
const nameForm = document.getElementById('nameForm');
const playerNameInput = document.getElementById('playerName');
const startQuizButton = document.getElementById('startQuiz');
const quizContainer = document.getElementById('quizContainer');
const playerNameDisplay = document.getElementById('playerNameDisplay');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const resultContainer = document.getElementById('resultContainer');
const finalScoreElement = document.getElementById('finalScore');
const timeTakenElement = document.getElementById('timeTaken');
const restartButton = document.getElementById('restartButton');
const leaderboardBody = document.getElementById('leaderboardBody');
const sortByDateButton = document.getElementById('sortByDate');
const sortByScoreButton = document.getElementById('sortByScore');

// Quiz state
let playerName = '';
let selectedQuestions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 60;
let startTime;
let leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];

// Initialize quiz
function initQuiz() {
    // Show name input form
    nameForm.style.display = 'block';
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    
    // Clear input
    playerNameInput.value = '';
    
    // Update leaderboard
    updateLeaderboard();
}

// Start quiz
function startQuiz() {
    playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('Please enter your name');
        return;
    }

    // Hide name form and show quiz
    nameForm.style.display = 'none';
    quizContainer.style.display = 'block';
    
    // Reset quiz state
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    playerNameDisplay.textContent = `Player: ${playerName}`;
    
    // Select 5 random questions
    selectedQuestions = [...allQuestions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
    
    // Start timer and show first question
    startTime = Date.now();
    startTimer();
    showQuestion();
}

// Show current question
function showQuestion() {
    if (currentQuestion >= selectedQuestions.length) {
        endQuiz();
        return;
    }

    const question = selectedQuestions[currentQuestion];
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
}

// Handle option selection
function selectOption(selectedIndex) {
    const question = selectedQuestions[currentQuestion];
    const options = document.querySelectorAll('.option-button');
    
    options.forEach((option, index) => {
        option.disabled = true;
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });

    if (selectedIndex === question.correct) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }

    currentQuestion++;
    setTimeout(showQuestion, 1000);
}

// Start timer
function startTimer() {
    timeLeft = 60;
    timerElement.textContent = `Time: ${timeLeft}s`;
    
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

// End quiz
function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    finalScoreElement.textContent = `Your Score: ${score}/${selectedQuestions.length}`;
    timeTakenElement.textContent = `Time Taken: ${timeTaken} seconds`;
    
    // Add to leaderboard
    leaderboard.push({
        name: playerName,
        score: score,
        date: new Date().toISOString(),
        timeTaken: timeTaken
    });
    
    // Save leaderboard
    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
    
    // Update leaderboard display
    updateLeaderboard();
}

// Update leaderboard
function updateLeaderboard() {
    leaderboardBody.innerHTML = '';
    
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}/${selectedQuestions.length}</td>
            <td>${new Date(entry.date).toLocaleString()}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

// Sort leaderboard
function sortLeaderboard(by) {
    leaderboard.sort((a, b) => {
        if (by === 'date') {
            return new Date(b.date) - new Date(a.date);
        } else if (by === 'score') {
            return b.score - a.score;
        }
    });
    updateLeaderboard();
}

// Event listeners
startQuizButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', initQuiz);
sortByDateButton.addEventListener('click', () => sortLeaderboard('date'));
sortByScoreButton.addEventListener('click', () => sortLeaderboard('score'));

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Did You Know slide rotation
    const slides = document.querySelectorAll('.did-you-know-slide');
    let currentSlide = 0;

    function showNextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }

    // Start the rotation
    if (slides.length > 0) {
        // Show first slide
        slides[0].classList.add('active');
        
        // Rotate every 2 seconds
        setInterval(showNextSlide, 5000);
    }

    // Rest of quiz functionality will go here...
}); 