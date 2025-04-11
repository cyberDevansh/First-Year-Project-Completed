import random
import string
import secrets

def generate_password(length=16, use_uppercase=True, use_lowercase=True, use_numbers=True, use_symbols=True):
    """
    Generate a secure random password based on specified criteria.
    
    Args:
        length (int): Length of the password (default: 16)
        use_uppercase (bool): Include uppercase letters (default: True)
        use_lowercase (bool): Include lowercase letters (default: True)
        use_numbers (bool): Include numbers (default: True)
        use_symbols (bool): Include special symbols (default: True)
    
    Returns:
        str: Generated password
    """
    # Define character sets
    uppercase = string.ascii_uppercase
    lowercase = string.ascii_lowercase
    numbers = string.digits
    symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    # Build character pool based on options
    char_pool = ""
    if use_uppercase:
        char_pool += uppercase
    if use_lowercase:
        char_pool += lowercase
    if use_numbers:
        char_pool += numbers
    if use_symbols:
        char_pool += symbols
    
    # Ensure at least one character from each selected type
    password = []
    if use_uppercase:
        password.append(secrets.choice(uppercase))
    if use_lowercase:
        password.append(secrets.choice(lowercase))
    if use_numbers:
        password.append(secrets.choice(numbers))
    if use_symbols:
        password.append(secrets.choice(symbols))
    
    # Fill the rest of the password length
    remaining_length = length - len(password)
    if remaining_length > 0:
        password.extend(secrets.choice(char_pool) for _ in range(remaining_length))
    
    # Shuffle the password
    random.shuffle(password)
    return ''.join(password)

def calculate_strength(password):
    """
    Calculate password strength based on various criteria.
    
    Args:
        password (str): Password to evaluate
    
    Returns:
        int: Strength score (0-100)
    """
    strength = 0
    
    # Length contribution (up to 25 points)
    if len(password) >= 12:
        strength += 25
    elif len(password) >= 8:
        strength += 15
    
    # Character type contribution
    if any(c.isupper() for c in password):
        strength += 25
    if any(c.islower() for c in password):
        strength += 25
    if any(c.isdigit() for c in password):
        strength += 15
    if any(not c.isalnum() for c in password):
        strength += 10
    
    return min(strength, 100)  # Cap at 100 