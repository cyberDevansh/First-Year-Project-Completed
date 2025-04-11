// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const changeImage = document.getElementById('changeImage');
const secretMessage = document.getElementById('secretMessage');
const encodeBtn = document.getElementById('encodeBtn');
const decodeBtn = document.getElementById('decodeBtn');
const clearBtn = document.getElementById('clearBtn');
const resultContainer = document.getElementById('resultContainer');
const resultImage = document.getElementById('resultImage');
const downloadBtn = document.getElementById('downloadBtn');
const decodeResult = document.getElementById('decodeResult');
const decodedMessage = document.getElementById('decodedMessage');

// Event Listeners
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
    if (file && file.type.startsWith('image/')) {
        handleFile(file);
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
});

changeImage.addEventListener('click', () => {
    fileInput.click();
});

encodeBtn.addEventListener('click', encodeMessage);
decodeBtn.addEventListener('click', decodeMessage);
clearBtn.addEventListener('click', clearAll);
downloadBtn.addEventListener('click', downloadImage);

// Functions
function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        previewContainer.style.display = 'block';
        uploadArea.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function encodeMessage() {
    if (!imagePreview.src || !secretMessage.value) {
        alert('Please select an image and enter a message to encode.');
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const message = secretMessage.value;
        const binaryMessage = stringToBinary(message);
        
        if (binaryMessage.length > imageData.data.length / 4) {
            alert('Message is too long for this image. Please use a larger image or shorter message.');
            return;
        }
        
        // Encode message in image
        let messageIndex = 0;
        for (let i = 0; i < imageData.data.length; i += 4) {
            if (messageIndex < binaryMessage.length) {
                // Modify the least significant bit of each color channel
                imageData.data[i] = (imageData.data[i] & 0xFE) | parseInt(binaryMessage[messageIndex]);
                messageIndex++;
            } else {
                // Add end of message marker
                imageData.data[i] = (imageData.data[i] & 0xFE) | 0;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        resultImage.src = canvas.toDataURL();
        resultContainer.style.display = 'block';
        decodeResult.style.display = 'none';
    };
    
    img.src = imagePreview.src;
}

function decodeMessage() {
    if (!imagePreview.src) {
        alert('Please select an image to decode.');
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let binaryMessage = '';
        
        // Extract message from image
        for (let i = 0; i < imageData.data.length; i += 4) {
            binaryMessage += imageData.data[i] & 1;
        }
        
        const message = binaryToString(binaryMessage);
        decodedMessage.textContent = message;
        decodeResult.style.display = 'block';
        resultContainer.style.display = 'none';
    };
    
    img.src = imagePreview.src;
}

function stringToBinary(str) {
    return str.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
}

function binaryToString(binary) {
    let message = '';
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.substr(i, 8);
        if (byte === '00000000') break; // End of message marker
        message += String.fromCharCode(parseInt(byte, 2));
    }
    return message;
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'encoded_image.png';
    link.href = resultImage.src;
    link.click();
}

function clearAll() {
    fileInput.value = '';
    secretMessage.value = '';
    imagePreview.src = '';
    resultImage.src = '';
    decodedMessage.textContent = '';
    previewContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    decodeResult.style.display = 'none';
    uploadArea.style.display = 'block';
}

class Steganography {
    constructor() {
        this.imageData = null;
        this.originalImage = null;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    // Load image and prepare for processing
    async loadImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    this.originalImage = img;
                    this.canvas.width = img.width;
                    this.canvas.height = img.height;
                    this.ctx.drawImage(img, 0, 0);
                    this.imageData = this.ctx.getImageData(0, 0, img.width, img.height);
                    resolve();
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Encode message into image
    encodeMessage(message) {
        if (!this.imageData) {
            throw new Error('No image loaded');
        }

        // Convert message to binary
        const binaryMessage = this.textToBinary(message + '\0');
        const data = this.imageData.data;

        // Check if message fits in image
        if (binaryMessage.length > data.length * 4) {
            throw new Error('Message too long for image');
        }

        // Encode message in LSB of each color channel
        for (let i = 0; i < binaryMessage.length; i++) {
            const bit = binaryMessage[i];
            const pixelIndex = Math.floor(i / 4);
            const channelIndex = i % 4;
            
            if (pixelIndex * 4 + channelIndex < data.length) {
                data[pixelIndex * 4 + channelIndex] = (data[pixelIndex * 4 + channelIndex] & 0xFE) | bit;
            }
        }

        this.ctx.putImageData(this.imageData, 0, 0);
        return this.canvas.toDataURL();
    }

    // Decode message from image
    decodeMessage() {
        if (!this.imageData) {
            throw new Error('No image loaded');
        }

        const data = this.imageData.data;
        let binaryMessage = '';
        let message = '';

        // Extract LSB from each color channel
        for (let i = 0; i < data.length; i++) {
            const bit = data[i] & 1;
            binaryMessage += bit;

            // Check if we have a complete byte
            if (binaryMessage.length === 8) {
                const charCode = parseInt(binaryMessage, 2);
                if (charCode === 0) break; // End of message
                message += String.fromCharCode(charCode);
                binaryMessage = '';
            }
        }

        return message;
    }

    // Helper function to convert text to binary
    textToBinary(text) {
        return text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join('');
    }
}

// Initialize steganography tool
document.addEventListener('DOMContentLoaded', () => {
    const stego = new Steganography();
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const secretMessage = document.getElementById('secretMessage');
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultImage = document.getElementById('resultImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const decodeResult = document.getElementById('decodeResult');
    const decodedMessage = document.getElementById('decodedMessage');

    // Handle file upload
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
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    });

    // Handle file processing
    async function handleFile(file) {
        try {
            await stego.loadImage(file);
            imagePreview.src = URL.createObjectURL(file);
            uploadArea.style.display = 'none';
            previewContainer.style.display = 'block';
            resultContainer.style.display = 'none';
            decodeResult.style.display = 'none';
        } catch (error) {
            alert('Error loading image: ' + error.message);
        }
    }

    // Encode message
    encodeBtn.addEventListener('click', async () => {
        if (!stego.imageData) {
            alert('Please select an image first');
            return;
        }
        const message = secretMessage.value.trim();
        if (!message) {
            alert('Please enter a message to encode');
            return;
        }
        try {
            const result = stego.encodeMessage(message);
            resultImage.src = result;
            resultContainer.style.display = 'block';
            decodeResult.style.display = 'none';
        } catch (error) {
            alert('Error encoding message: ' + error.message);
        }
    });

    // Decode message
    decodeBtn.addEventListener('click', async () => {
        if (!stego.imageData) {
            alert('Please select an image first');
            return;
        }
        try {
            const message = stego.decodeMessage();
            decodedMessage.textContent = message;
            decodeResult.style.display = 'block';
            resultContainer.style.display = 'none';
        } catch (error) {
            alert('Error decoding message: ' + error.message);
        }
    });

    // Download result
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'encoded_image.png';
        link.href = resultImage.src;
        link.click();
    });

    // Clear everything
    clearBtn.addEventListener('click', () => {
        fileInput.value = '';
        secretMessage.value = '';
        uploadArea.style.display = 'block';
        previewContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        decodeResult.style.display = 'none';
        stego.imageData = null;
        stego.originalImage = null;
    });
}); 