import json
import os
import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import getpass

class PasswordManager:
    def __init__(self, storage_file='passwords.enc'):
        self.storage_file = storage_file
        self.key = None
        self.fernet = None
        self.passwords = {}

    def _generate_key(self, master_password):
        """Generate encryption key from master password"""
        salt = b'fixed_salt'  # In production, use a random salt and store it
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(master_password.encode()))
        return key

    def initialize(self, master_password):
        """Initialize the password manager with a master password"""
        try:
            self.key = self._generate_key(master_password)
            self.fernet = Fernet(self.key)
            if os.path.exists(self.storage_file):
                self.load_passwords()
            return True
        except Exception as e:
            print(f"Error initializing password manager: {str(e)}")
            return False

    def load_passwords(self):
        """Load encrypted passwords from file"""
        try:
            with open(self.storage_file, 'rb') as f:
                encrypted_data = f.read()
            decrypted_data = self.fernet.decrypt(encrypted_data)
            self.passwords = json.loads(decrypted_data.decode())
            return True
        except Exception as e:
            print(f"Error loading passwords: {str(e)}")
            return False

    def save_passwords(self):
        """Save encrypted passwords to file"""
        try:
            encrypted_data = self.fernet.encrypt(json.dumps(self.passwords).encode())
            with open(self.storage_file, 'wb') as f:
                f.write(encrypted_data)
            return True
        except Exception as e:
            print(f"Error saving passwords: {str(e)}")
            return False

    def add_password(self, website, username, password):
        """Add a new password entry"""
        try:
            self.passwords[website] = {
                'username': username,
                'password': password
            }
            self.save_passwords()
            return True
        except Exception as e:
            print(f"Error adding password: {str(e)}")
            return False

    def get_password(self, website):
        """Retrieve password for a website"""
        try:
            return self.passwords.get(website)
        except Exception as e:
            print(f"Error retrieving password: {str(e)}")
            return None

    def delete_password(self, website):
        """Delete password entry for a website"""
        try:
            if website in self.passwords:
                del self.passwords[website]
                self.save_passwords()
                return True
            return False
        except Exception as e:
            print(f"Error deleting password: {str(e)}")
            return False

    def list_websites(self):
        """List all stored websites"""
        try:
            return list(self.passwords.keys())
        except Exception as e:
            print(f"Error listing websites: {str(e)}")
            return []

    def update_password(self, website, username, password):
        """Update existing password entry"""
        try:
            if website in self.passwords:
                self.passwords[website] = {
                    'username': username,
                    'password': password
                }
                self.save_passwords()
                return True
            return False
        except Exception as e:
            print(f"Error updating password: {str(e)}")
            return False 