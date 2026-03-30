const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 
  'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E',
   'F', 'G', 'H', 'I', 'J', 'K', 
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
  'W','X','Y','Z', '0', '1', '2', '3', '4', 
  '5', '6', '7', '8', '9', '~', '`', '!', '@', '#', '$', '%', '^',
  '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':',
   ';', '"', "'", '<', ',', '>', '.', '?','/'];

const passwordInput = document.getElementById('password');
const passwordContainer = document.querySelector('.password-container');
const lengthInput = document.getElementById('length');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');

generateBtn.addEventListener('click', () => {
    const length = lengthInput.value || 12;
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    passwordInput.textContent = password;
    passwordContainer.classList.add('show');
});

copyBtn.addEventListener('click', () => {
    if (passwordInput.textContent) {
        navigator.clipboard.writeText(passwordInput.textContent);
        alert('Password copied to clipboard!');
    }
});